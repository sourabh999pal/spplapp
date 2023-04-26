import { Animated, StyleSheet, Text, View,Image,  ActivityIndicator, SafeAreaView, Dimensions, ScrollView, TouchableOpacity, Linking, Alert, BackHandler, } from 'react-native';
import React, { useState, useEffect } from 'react';

import { InAppBrowser } from 'react-native-inappbrowser-reborn';

import { useFocusEffect } from '@react-navigation/native';


import CardComponent from '../component/CardComponent';

import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import url from '../Common';
import jwt_decode from "jwt-decode";
import Demo from '../servicescreen/Demo';

import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';


var screenSize = Dimensions.get('window');
var screenWidth = screenSize.width;
var screenHeight = screenSize.height;


const image1 = require('../../android/app/src/main/assets/helpdesk.png');
const image4 = require('../../android/app/src/main/assets/install.png');
const image2 = require('../../android/app/src/main/assets/product.png');
const image3 = require('../../android/app/src/main/assets/payment.png');
const image5 = require('../../android/app/src/main/assets/contact.png');
const image6 = require('../../android/app/src/main/assets/warranty.png');
const image7 = require('../../android/app/src/main/assets/chaty.png');

const MainScreen = ({ navigation }) => { 
  const [slide, setSlide] = useState(false);
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(null);
  const [userdata, setUserdata] = useState(null);

  const value = Demo();
  const host = url.nodeUrl;



  const Logout = async () => {
    setLoading(true);
    AsyncStorage.clear();
    await GoogleSignin.signOut();
    // setTimeout(() => {
    setLoading(false);
    // navigation.goBack();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Onboard' }],
    });

    // }, 1000);
  }

  useEffect(() => {
    GoogleSignin.configure()
   
  }, [])

  const userdetail = async () => {

    const _id = value._j._id;
    let result = await fetch(host + `/users/userdata/${_id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

    })
    const response = await result.json();

    if (response.status == 200) {

      await AsyncStorage.setItem("userdata", JSON.stringify(response.result));
      setUserdata(response.result);
      setLoading(false);

    }
  }




  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      userdetail()
    }, 1000)


  }, [])

  // backbutton action //
  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        Alert.alert("Stop", "Are You sure you want to go back", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          {
            text: "Yes",
            onPress: () => BackHandler.exitApp()
          }
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    }, [])
  );

  // redirect browser link and many thing setup here//
  const sleep = async (timeout) => {
    return (
      new Promise(resolve => setTimeout(resolve, timeout))
    )
  }
  const openLink = async () => {
    try {
      const url = 'https://shopsppl.in/'
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {

          showTitle: false,
          toolbarColor: '#0A0A0A',
          secondaryToolbarColor: 'black',
          navigationBarColor: 'black',
          navigationBarDividerColor: 'white',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right'
          },
          headers: {
            'my-custom-header': 'my custom header value'
          }
        })
        await this.sleep(800);
        Alert.alert(JSON.stringify(result))
      }
      else Linking.openURL(url)

    } catch (error) {
      console.log(error.message)
    }
  }


  return (

    <SafeAreaView>

      {loading ?
        <ActivityIndicator size="large" color="#E71615" style={{ marginTop: '90%' }} />
        :
        <>
          <View style={{ backgroundColor: 'white', height: screenHeight }}>

            <View style={styles.userbox}>
              <View style={styles.welcome}>
                <Text numberOfLines={1} style={{ color: 'black', fontSize: 32, fontWeight: '400', width: '85%' }}>Hi {(userdata != null) && userdata.name} </Text>
                <Text style={{ color: 'black', fontSize: 36, fontWeight: '700' }}>Welcome back 👋</Text>

                <TouchableOpacity style={styles.dotbackground} onPress={() => setSlide(!slide)}>
                  <View style={styles.parentdot}>
                    <Icon2 name="ellipsis-vertical" color='black' size={20} />
                  </View>
                </TouchableOpacity>

              </View>

            </View>
            <View style={{
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              width: '100%',
              height: '100%',
              position: 'absolute',
              zIndex: 1,
              transition: 'right 1s',
              right: slide ? 0 : '-100%',

            }}>
              <View style={{
                width: '75%',
                height: '100%',
                backgroundColor: 'white',
                position: 'absolute',
                right: slide ? 0 : '-100%',
                zIndex: 1,
                transition: '2s',
                paddingVertical: 20,
                paddingHorizontal: 10,
              }}>
                <TouchableOpacity onPress={() => setSlide(!slide)}>
                  <Icon name="closecircle" size={30} color='#7F7F7F' style={{
                    paddingVertical: 20,
                    marginHorizontal: 10,
                    borderColor: '#ccc',
                    borderBottomWidth: 1,

                  }} />
                </TouchableOpacity>


                <TouchableOpacity onPress={Logout}>
                  <Text style={{
                    fontSize: 20,
                    color: 'black',
                    fontWeight: 'bold',
                    borderBottomWidth: 1,
                    borderColor: '#ccc',
                    paddingHorizontal: 10,
                    paddingVertical: 10
                  }}>Logout</Text>
                </TouchableOpacity>
                {/* { dataid : userdata._id } */}
                <TouchableOpacity onPress={() => navigation.navigate('Servicelist', { dataid: userdata._id })}>
                  <Text style={{
                    fontSize: 20,
                    color: 'black',
                    fontWeight: 'bold',
                    borderBottomWidth: 1,
                    borderColor: '#ccc',
                    paddingHorizontal: 10,
                    paddingVertical: 10
                  }}>Service List</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Installationlist', { dataid: userdata._id })}>
                  <Text style={{
                    fontSize: 20,
                    color: 'black',
                    fontWeight: 'bold',
                    borderBottomWidth: 1,
                    borderColor: '#ccc',
                    paddingHorizontal: 10,
                    paddingVertical: 10
                  }}>Installation List </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ margin: '3%' }}>
              <Text style={styles.quick}>Quick Action 💡</Text>
            </View>

            <View style={{ 
              width:screenWidth,
              flexDirection:'row',
              flexWrap:'wrap',
              }}>
              {/* <View > */}
                <TouchableOpacity style={{ width: '50%', paddingHorizontal:8, }} onPress={() => navigation.navigate('Service', { complaint_type: 'Service' })}>
                  <CardComponent heading='Service' para='For any Services request' image={image1} />
                </TouchableOpacity>
              {/* </View> */}

              {/* <View > */}
                <TouchableOpacity style={{ width: '50%', paddingHorizontal:8, }} onPress={() => navigation.navigate('Service', { complaint_type: 'Installation' })}>
                  <CardComponent heading='Installation' para='For any Installation request' image={image4} />
                </TouchableOpacity>
              {/* </View> */}

              {/* <View > */}
                <TouchableOpacity style={{ width: '50%', paddingHorizontal:8, }} onPress={openLink}>
                  <CardComponent heading='Product Information' para='For any Product Information' image={image2} />
                </TouchableOpacity>
              {/* </View> */}

              {/* <View > */}
                <TouchableOpacity style={{ width: '50%', paddingHorizontal:8, }} onPress={() => navigation.navigate('Payment')} >
                  <CardComponent heading='Payment' para='Payment for services and installation' image={image3} />
                </TouchableOpacity>

                <TouchableOpacity style={{ width: '50%', paddingHorizontal:8, }} onPress={() => navigation.navigate('contactus')} >
                  <CardComponent heading='Contact Us' para='Payment for services and installation' image={image5} />
                </TouchableOpacity>

                <TouchableOpacity style={{ width: '50%', paddingHorizontal:8, }} onPress={() => navigation.navigate('warrantyregister')} >
                  <CardComponent heading='Warranty Registration' para='Payment for services and installation' image={image6} />
                </TouchableOpacity>
              {/* </View> */}
            </View>
            <TouchableOpacity style={{width:80,height:80,backgroundColor:'black',alignItems:'center',justifyContent:'center',borderRadius:40}}>
            <Image source={image7} style={{width:50,height:50,}}/>
            </TouchableOpacity>
           
          </View>
        </>
      }
    </SafeAreaView>


  )
}

export default MainScreen

const styles = StyleSheet.create({
  user: {
    fontWeight: '400',
    fontSize: 20,
    color: '#878686',
    margin: '2%'
  },
  userbox: {
    backgroundColor: 'rgba(217, 217, 217, 0.3)',
    flexDirection: 'row',
    width: '100%',
    paddingBottom: 20,
    borderBottomEndRadius: 25,
    borderBottomLeftRadius: 25
  },
  userboxbg: {
    width: '10%',
    backgroundColor: '#D9D9D9',
    paddingHorizontal: '2%',
    paddingVertical: '1%'
  },

  welcome: {
    width: '90%',
    height: '60%',
    marginHorizontal: '5%',
    // position: 'absolute',
    // top: '35%'
    marginTop: 30
  },
  dots: {
    color: 'black',
    transform: [{ rotate: '90deg' }],
    position: 'absolute',
    top: '22%',
    left: '20%',


  },
  quick: {
    color: 'black',
    fontSize: 19,
    fontWeight: '800',
  },
  dotbackground: {
    position: 'absolute',
    right: '1%',
    top: '4%',
    backgroundColor: 'rgba(231, 22, 21, 0.2)',
    width: 45,
    height: 45,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  parentdot: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
})
