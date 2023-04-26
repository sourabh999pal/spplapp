import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';

import RazorpayCheckout from 'react-native-razorpay';


import Icon from 'react-native-vector-icons/AntDesign';
import PaymentCard from '../component/PaymentCard';

import url from '../Common';
import Demo from '../servicescreen/Demo';

const image = require('../../android/app/src/main/assets/logoback.jpg')

var screenSize = Dimensions.get('window');
var screenWidth = screenSize.width;
var screenHeight = screenSize.height;

const PaymentScreen = ({ navigation }) => {

  const [loading, setLoading] = useState(true);
  const [paymentData, setPaymentData] = useState();
  const [totalprice, setTotalprice] = useState(0);

  const host = url.nodeUrl;
  const value = Demo();



  useEffect(() => {

    setTimeout(() => { paymentReq() }, 2000)
    // setTimeout(() => { console.log(paymentData[0]) }, 3000)

  }, [])

  const extravalue = (res) => {
    let price = 0;
    let data = res;
    let datalength = data.length;
    for (let j = 0; j < datalength; j++) {

      price = price + parseInt(data[j].price);
    }

    return price
  }




  // new service request function start
  const paymentReq = async () => {
    const _id = value._j._id;



    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }

    await fetch(host + `/users/userpayment/${_id}`, requestOptions).then((res) => res.json())
      .then((res) => {
        // console.log(res.result[0].payments);

        if (res.status === 200) {
          setPaymentData(res.result);
          // totalVal(res.result);
          setLoading(false)
        }

        else if (res.status === 400) {
          alert("somthing went wrong")
        }
      }
      );


  }

  const getKeyHandler = async () => {
    let key = null;
    await fetch(host + `/users/getkey`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          key = res.key;
        }
        else if (res.status === 400) {
          console.log('error in getKeyHandler')
        }
      }
      );

    return key
  }
  const checkoutdata = async (amount) => {
    let checkdata = null;
    await fetch(host + `/users/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount
      })
    }).then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          checkdata = res.result;
        }
        else if (res.status === 400) {
          console.log('error in checkoutHandler')
        }
      }
      );
    return checkdata
  }
  const checkoutHandler = async (amount, payment_id) => {

    let keyid = await getKeyHandler();

    let order = await checkoutdata(amount);

    const options = {
      description: 'service payment by user',
      image: image,
      currency: 'INR',
      key: keyid, 
      amount: order.amount,
      name: 'Sppl payment Portal',
      order_id: order.id,
      // callback_url: host + '/users/paymentverfication',
      // redirect:true,
      // prefill: {
      //   email: 'void@razorpay.com',
      //   contact: '9191919191',
      //   name: 'Razorpay Software'
      // },
      theme: { color: '#F37254' },
        method: {
          netbanking: true,
          card: true,
          wallet: false,
          upi:true,
        },

    }
    
    RazorpayCheckout.open(options).then((data) => {
      // handle success

      success(data, payment_id);
    }).catch((error) => {
      // handle failure
      alert(`Here is some Error kindly try again the payment`);
    });
  }

  const success = async (data, payment_id) => {
    let result = null;
    const _id = value._j._id;

    await fetch(host + `/users/paymentverfication/${payment_id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data
      })
    }).then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          result = res.result;
          navigation.navigate('Thankyou', { id: data.razorpay_payment_id, thankyoutext: 'Thankyou for Complete the payment ', productname: 'Payment Request ', estimatetime: '1 to 2 days' })
        }
        else if (res.status === 400) {
          alert("Your payment is not real please do again")
        }
      }
      );

  }



  return (
    <View style={{ width: screenWidth, height: screenHeight }}>
      <View style={styles.backbg}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name='arrowleft' size={26} color='black' />
        </TouchableOpacity>

        <Text style={styles.backbtn}>Back</Text>
      </View>

      <View style={{ margin: '3%' }}>
        <Text style={styles.quick}>Payment List 💡</Text>
      </View>
      <ScrollView>
        <View>
          {
            loading ? <ActivityIndicator size="large" color="#E71615" style={{ marginTop: '50%' }} /> :

              (paymentData.length == 0) ? <Text style={styles.servDataheadText}>Sorry You Don't have any payment pending here untill Now !</Text> :
                paymentData && paymentData.map((item, index) => {
                  return (
                    <View key={index} id={item._id} style={{}}>
                      <View style={styles.paymentCard}>
                        <PaymentCard payment_id={paymentData[index]._id} totalpay={extravalue(paymentData[index].payments)} status={paymentData[index].status} payments={paymentData[index].payments} checkoutHandler={checkoutHandler} paymentcomplete={paymentData[index]} />
                      </View>
                    </View>

                  )
                })
          }
        </View>




      </ScrollView>




    </View>
  )
}

export default PaymentScreen

const styles = StyleSheet.create({
  backbtn: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Roboto',
    marginLeft: 10,
    color: 'black'
  },
  backbg: {
    flexDirection: 'row',
    paddingHorizontal: '5%',
    paddingVertical: '5%',
    height: '10%',
    backgroundColor: '#D9D9D9',
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25
  },
  quick: {
    color: 'black',
    fontSize: 19,
    fontWeight: '800',
  },
  servDataheadText: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    color: 'rgba(0,0,0,0.8)',
    paddingBottom: 3,
  },
  paymentCard: {
    marginVertical: '1.5%'
  }
})