import { StyleSheet, ActivityIndicator, RefreshControl, Text, View, Dimensions, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import React, { useState, useEffect, isValidElement } from 'react';
import OtpInputs from 'react-native-otp-inputs';

import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import colors from '../constant/colors';
import url from '../Common';



import AsyncStorage from '@react-native-async-storage/async-storage';

import { useToast } from "react-native-toast-notifications";

var screenSize = Dimensions.get('window');
var screenWidth = screenSize.width;
var screenHalfWidth = screenSize.width * 0.465;



const OtpVerify = ({ navigation }) => {


  const host = url.nodeUrl;
  // const [email, setEmail] = useState('');
  const [otp, setotp] = useState('');
  const [loading, setLoading] = useState(false);

  const [errField, setErrField] = useState({
    emailErr: '',
    otpErr: '',
  })

  const [disableOtp, setdisableOtp] = useState(true);




  const Submit = async () => {

  }



  const validForm = () => {

  }

  const toast = useToast();




  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <KeyboardAvoidingView behavior='position'>

        {loading ?
          <ActivityIndicator size="large" color="#E71615" style={{ marginTop: '90%' }} />
          :
          <>

            <View style={styles.backbg}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name='arrowleft' size={26} color='black' />
              </TouchableOpacity>
              <Text style={styles.backbtn}>Back</Text>
            </View>

            <Text style={styles.logintext} >OTP Verification</Text>
           

         

            <View style={styles.inputStyle}>

              <View>
                <Text>Please check your email id/mobile for OPT. The OTP is valid upto 5 min only.</Text>
              </View>

              <View>
                <TextInput
                  placeholderTextColor="black"
                  style={styles.input}
                  placeholder="OTP"
                  keyboardType='numeric'
                  onChangeText={setotp}
                  value={otp}
                  secureTextEntry={disableOtp}
                />

                {errField.otpErr.length > 0 && <Text style={styles.validline}>{errField.otpErr}</Text>}
              </View>



              <TouchableOpacity onPress={Submit}>
                <View style={styles.inputbutton}>
                  <Text style={styles.inputbuttontext}>SUBMIT</Text>
                </View>
              </TouchableOpacity>

            </View>

          </>
        }
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default OtpVerify

const styles = StyleSheet.create({
  inputStyle: {
    paddingVertical: '4%',
    paddingHorizontal: '4%',
    width: screenWidth,

  },
  input: {
    fontSize: 15,
    fontWeight: '400',
    paddingLeft: 10,
    marginVertical: '2%',
    fontFamily: 'roboto',
    borderWidth: 1,
    height: 52,
    backgroundColor: 'white',
    color: 'black',
  },
  logintext: {
    color: 'black',
    fontSize: 30,
    fontWeight: '800',
    marginLeft: '5%',
    marginVertical: '5%'
  },

  bgbtn: {
    fontSize: 16,
    fontWeight: '800',
    backgroundColor: colors.buttonColor,
    borderRadius: 5,
    color: 'black'
  },
  registerline: {
    fontSize: 15,
    alignSelf: 'center',
    marginLeft: 100,
    marginTop: 40,

  },
  validline: {
    color: 'red',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: '2%'
  },
  backbtn: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Roboto',
    marginLeft: 10
  },
  backbg: {
    flexDirection: 'row',
    marginHorizontal: '5%',
    marginVertical: 20,
  },
  passIcon: {
    position: 'absolute',
    right: '4%',
    top: '31%'
  },
  inputbutton: {
    fontWeight: '400',
    alignItems: 'center',
    marginVertical: '2%',
    height: 52,
    borderRadius: 5,
    backgroundColor: colors.buttonColor,
    paddingVertical: '4%'
  },
  inputbuttontext: {
    color: 'white',
    fontSize: 14,
    fontWeight: '900'

  }
})

