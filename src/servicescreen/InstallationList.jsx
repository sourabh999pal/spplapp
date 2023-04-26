import { StyleSheet, Text, View, ActivityIndicator, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import url from '../Common';


import Icon from 'react-native-vector-icons/AntDesign';


import Icon2 from 'react-native-vector-icons/MaterialIcons';

var screenSize = Dimensions.get('window');
var screenWidth = screenSize.width;
var screenHeight = screenSize.height;




const InstallationList = ({ route, navigation }) => {
  const { dataid } = route.params;

  const [loading, setLoading] = useState(true);
  const [serviceData, setServiceData] = useState();

  const [showoption, setShowoption] = useState(false);

  const [id, setId] = useState(null);

  const host = url.nodeUrl;

  useEffect(() => {
    newServReq();

  }, [])


  // new service request function start
  const newServReq = async () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }

    await fetch(host + `/users/userInstallationList/${dataid}`, requestOptions).then((res) => res.json())
      .then((res) => {
        // console.log(res.result);

        if (res.status === 200) {
          setServiceData(res.result);
          setLoading(false)
        }

        else if (res.status === 400) {
          alert("somthing went wrong")
        }
      }
      )
  }
  
  return (
    <>
      {/* {loading ?
      <ActivityIndicator size="large" color="#00ff00" style={{ marginTop: '90%' }} />
      : */}
      <View style={{ width: screenWidth, height: screenHeight }}>
        <View style={styles.backbg}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name='arrowleft' size={26} color='black' />
          </TouchableOpacity>

          <Text style={styles.backbtn}>Back</Text>
        </View>

        <View style={{ margin: '3%' }}>
          <Text style={styles.quick}>Installation List </Text>
        </View>
        <ScrollView>
          <View>
            {/* {(serviceData != null) &&  */}
            <View>
              {
                loading ? <ActivityIndicator size="large" color="#E71615" style={{ marginTop: '50%' }} /> :

                  (serviceData.length == 0) ? <Text style={styles.servDataheadText}>Sorry You don't Create any Installation request untill Now !</Text> :

                    serviceData && serviceData.map((item, index) => {
                      return (
                        <View key={index} id={item._id} style={{
                          backgroundColor: id == index ? 'rgba(204,204,204,0.3)' : null,
                          borderRadius: id == index ? 20 : null,
                          marginHorizontal: id == index ? 10 : null
                        }}>
                          <View>
                            <TouchableOpacity onPress={() => id == null ? setId(index) : setId(null)}>
                              <View style={styles.servDataParDiv}>
                                <Text style={styles.servDataheadText}>Installation Request {index + 1}</Text>
                                <Text numberOfLines={1} style={styles.servDataBodyText}>{item.query}</Text>

                              </View>
                              <View style={styles.servDataIconPart}>
                                <Icon2 name="keyboard-arrow-right" size={30} color="#000" style={{ position: 'absolute', right: '3%', top: '10%', transform: [{ rotate: id == index ? '90deg' : '0deg' }] }} />
                              </View>
                            </TouchableOpacity>

                          </View>

                          {
                            id == index &&
                            <View style={styles.servDataopenDiv}>
                              <Text style={styles.datastyle}>FirstName : {item.firstname}</Text>
                              <Text style={styles.datastyle}>Lastname : {item.lastname}</Text>
                              <Text style={styles.datastyle}>Mobile : {item.mobile}</Text>
                              <Text style={styles.datastyle}>Altmobile : {item.altmobile}</Text>
                              <Text style={styles.datastyle}>Email : {item.email}</Text>
                              <Text style={styles.datastyle}>Address : {item.address}</Text>
                              <Text style={styles.datastyle}>City : {item.city}</Text>
                              <Text style={styles.datastyle}>State : {item.state}</Text>
                              <Text style={styles.datastyle}>Pincode : {item.pincode}</Text>
                              <Text style={styles.datastyle}>ProductName : {item.productname}</Text>
                              <Text style={styles.datastyle}>Brand  : {item.brand}</Text>


                            </View> 
                          }
                        </View>
                      )
                    })
              }
            </View>



          </View>




        </ScrollView>




      </View>

    </>

  )
}

export default InstallationList

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
  paymentCard: {
    marginVertical: '1.5%'
  },
  servDataParDiv: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 15,
    marginHorizontal: 15,
  },
  servDataheadText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 10,
    paddingBottom: 3,
  },
  servDataBodyText: {
    fontSize: 15,
    color: 'rgba(0,0,0,0.6)',
    width: '88%',
    overflow: 'hidden',
    marginLeft: 8
  },
  servDataIconPart: {
    position: 'absolute',
    right: 20,
    top: '30%',
  },
  servDataopenDiv: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  datastyle: {
    fontSize: 15,
    color:'black'
  },
})