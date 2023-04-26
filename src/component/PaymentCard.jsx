import { StyleSheet, Text, TouchableOpacity, View, Linking} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../constant/colors';
import url from '../Common';

const PaymentCard = ({ totalpay, status, payments, checkoutHandler, paymentcomplete, payment_id }) => {

  const host = url.nodeUrl;

  const [showoption, setShowoption] = useState(false);

  const Reciept = async () =>{
    await fetch( host + `/users/pdfget/${payment_id}`,{
      method : 'POST',
      headers : {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        Linking.openURL(host + res.filename);
      }
      else if (res.status === 400) {
        alert('Somthing went wrong');
      }

    }).catch((err)=>{
      console.log(err)
    })
  }


  return (


    <View>
      <TouchableOpacity style={[styles.box, { borderBottomEndRadius: showoption ? 0 : 10, borderBottomStartRadius: showoption ? 0 : 10, backgroundColor: status == 'payment completed' ? 'rgba(0, 92, 75, 0.3)' : '#D9D9D9', }]} onPress={() => setShowoption(!showoption)}>
        <View style={styles.pricebox}>
          <Text style={styles.price}>{totalpay}</Text>
        </View>
        <Text style={styles.status}>{status}</Text>

        <Icon name='keyboard-arrow-down' size={32} color='black' style={{ position: 'absolute', right: '3%', top: '35%', transform: [{ rotate: showoption ? '180deg' : '0deg' }] }} />
      </TouchableOpacity>
      {
        showoption && <View style={[styles.bottombox, { backgroundColor: status == 'payment completed' ? 'rgba(0, 92, 75, 0.3)' : '#D9D9D9', }]}>
          <View style={{ flex: 1, height: 1, backgroundColor: 'black', marginHorizontal: '5%', marginTop: '2%', marginBottom: '4%' }} />

          {
            payments && payments.map((item, index) => {
              return (
                <View key={index} style={styles.statement}>
                  <Text style={styles.statementtext}>{item.name}</Text>
                  <Text style={styles.statementtext}>{'\u20B9'} {item.price}</Text>
                </View>
              )
            })
          }

          <View style={{ flex: 1, height: 1, backgroundColor: 'black', marginHorizontal: '5%', marginTop: '4%' }} />
          <View style={styles.statement}>
            <Text style={styles.statementtext}>Total</Text>
            <Text style={styles.statementtext}>{'\u20B9'}{totalpay}</Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: 'black', marginHorizontal: '5%', marginTop: '2%' }} />



          {
            status == 'payment completed' ?
              <TouchableOpacity style={{ backgroundColor: 'red', width:150, borderRadius:10,alignSelf:'center',marginTop:8}} onPress={Reciept}>
                <Text style={{textAlign:'center',fontSize:18, padding:8,color:'white'}}>Invoice</Text>
              </TouchableOpacity>
              :
              <>
                <Text style={styles.disclaimer}>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                </Text>
                <TouchableOpacity onPress={() => checkoutHandler(totalpay, payment_id)} >
                  <View style={styles.inputbutton}>
                    <Text style={styles.inputbuttontext}>PAY NOW</Text>
                  </View>
                </TouchableOpacity>
              </>

          }

        </View>
      }
    </View>


  )
}

export default PaymentCard

const styles = StyleSheet.create({
  box: {


    marginHorizontal: '3%',
    // marginVertical:'1.8%',
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    flexDirection: 'row'
  },
  pricebox: {
    backgroundColor: 'white',
    width: '25%',
    height: '65%',
    marginVertical: '4%',
    borderRadius: 10,
    marginHorizontal: '2%',
    paddingVertical: '3%'
  },
  price: {
    fontSize: 22,
    fontWeight: '700',
    alignSelf: 'center',
    color: 'black'
  },
  status: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
    marginVertical: '7%',
    paddingLeft:-4,
    textTransform:'capitalize',
  },
  bottombox: {

    marginHorizontal: '3%',
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    paddingBottom: '3%'
  },
  statement: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    marginTop: '1%'
  },
  statementtext: {
    fontSize: 17,
    fontWeight: '500',
    color: 'black'
  },
  disclaimer: {
    fontSize: 11,
    alignSelf: 'center',
    marginHorizontal: '4%',
    marginTop: '9%',
    color: 'black',
    fontWeight: '500'
  },
  inputbutton: {
    fontWeight: '400',
    alignItems: 'center',
    marginVertical: '2%',
    height: 52,
    borderRadius: 5,
    backgroundColor: colors.buttonColor,
    paddingVertical: '4%',
    marginHorizontal: '3%'
  },
  inputbuttontext: {
    color: 'white',
    fontSize: 14,
    fontWeight: '900'

  }
})