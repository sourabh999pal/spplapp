import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  ActivityIndicator
} from 'react-native';

import React, { useState, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from "react-native-toast-notifications";

import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import colors from '../constant/colors';
import url from '../Common';

import { GoogleSignin, statusCodes, GoogleSignButton, } from '@react-native-google-signin/google-signin';

var screenSize = Dimensions.get('window');
var screenWidth = screenSize.width;
var screenHalfWidth = screenSize.width * 0.465;


const Register = ({ navigation }) => {

  const host = url.nodeUrl;



  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');


  const [code, setCode] = useState('');

  const [showPassword, setShowPassword] = useState(true);
  const [showCPassword, setShowCPassword] = useState(true);
  const [showCode, setShowCode] = useState(true);
  const [loading, setLoading] = useState(false);

  const [hideOTP, setHideOTP] = useState(true);

  const [errField, setErrField] = useState({
    nameErr: '',
    emailErr: '',
    mobileErr: '',
    passwordErr: '',
    cpasswordErr: '',
    codeErr: ''
  })


  // OTP send here for registration // setup here // 

  const SendOtp = async () => {
    if (validForm()) {
      setLoading(true);
      let result = await fetch(host + "/users/registerotp", {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email
        })
      })
      result = await result.json();
      if (result.status === 200) {
        alert("Please check your Otp in email");
        setLoading(false);
        setHideOTP(false);
      }

      else if (result.status === 400) {
        alert("Email is already in use! Please Login")
      }
    }

  }


  const Submit = async () => {                                              //submit function here//
    if (validcode()) {
      setLoading(true);
      let result = await fetch(host + "/users/add", {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          mobile,
          password,
          code
        })
      })
      const response = await result.json();
    
      
      // to show the alert 
      if (response.status == 200) {
        toast.show("User Added successfully", {
          type: "success",
          placement: "top",
          duration: 1000,
          offset: 30,
          animationType: "zoom-in",
        });
        // timeout for redirect the screen
        // setTimeout(() => {
          navigation.navigate('Login');
          setLoading(false);
        // }, 1000);
      }
        else if (response.status == 400) {
          setLoading(false);
          toast.show("Token Expire !", {
            type: "warning",
            placement: "top",
            duration: 1000,
            offset: 30,
            animationType: "zoom-in",
          });
        }
        else if (response.status == 404) {
          setLoading(false);
          toast.show("code or email is wrong", {
            type: "warning",
            placement: "top",
            duration: 1000,
            offset: 30,
            animationType: "zoom-in",
          });
        }
      
    }
  }

  const validcode = () => {
    setErrField({
      nameErr: '',
      emailErr: '',
      mobileErr: '',
      passwordErr: '',
      cpasswordErr: '',
      codeErr: ''
    })
    let formIsValid = true;

    if (code == '') {
      formIsValid = false;
      setErrField(prevState => ({
        ...prevState, codeErr: 'Please Enter four digit code'
      }))
    }
    if (code != '' && code.length != 4 ) {
      formIsValid = false;
      setErrField(prevState => ({
        ...prevState, codeErr: 'Please Enter 4 Digit code only'
      }))
    }
    return formIsValid;
  }

  
  const validForm = () => {
    setErrField({
      nameErr: '',
      emailErr: '',
      mobileErr: '',
      passwordErr: '',
      cpasswordErr: '',
      codeErr: ''
    })
    let formIsValid = true;

    const validEmailRegex = RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i);

    if (name == '') {
      formIsValid = false;
      setErrField(prevState => ({
        ...prevState, nameErr: 'Please Enter Name'
      }))
    }
    if (email == '') {
      formIsValid = false;
      setErrField(prevState => ({
        ...prevState, emailErr: 'Please Enter EmaiID'
      }))
    }
    if (email != '' && !validEmailRegex.test(email)) {
      formIsValid = false;
      setErrField(prevState => ({
        ...prevState, emailErr: 'Please Enter a valid Email ID'
      }))
    }
    if (mobile == '') {
      formIsValid = false;
      setErrField(prevState => ({
        ...prevState, mobileErr: 'Please Enter  Mobile no'
      }))
    }
    if (mobile != '' && mobile.length != 10) {
      formIsValid = false;
      setErrField(prevState => ({
        ...prevState, mobileErr: 'Please Enter 10 Digit Mobile no'
      }))
    }
    if (password == '') {
      formIsValid = false;
      setErrField(prevState => ({
        ...prevState, passwordErr: 'Please Enter Password'
      }))
    }
    if (cpassword == '') {
      formIsValid = false;
      setErrField(prevState => ({
        ...prevState, cpasswordErr: 'Please Enter Confirm Password'
      }))
    }
    if (cpassword != '' && password != cpassword) {
      formIsValid = false;
      setErrField(prevState => ({
        ...prevState, cpasswordErr: 'Password and confirm Password must be same'
      }))
    }
    return formIsValid;
  }
  const toast = useToast();

  // google signin setup here

  const googleaddLogin = async (userInfo) => {

    let email = userInfo.email;
    let name = userInfo.name;

    setLoading(true);
    let result = await fetch(host + "/users/googlelogin", {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        name
      })
    })
    result = await result.json();


    if (result.data.status == 200) {
      toast.show("You login Succesfully ", {
        type: "success",
        placement: "top",
        duration: 1000,
        offset: 30,
        animationType: "zoom-in",
      });

      // try {
        await AsyncStorage.setItem("token", result.data.token);
        await AsyncStorage.setItem("keepLoggedIn", JSON.stringify(true));
        // setTimeout(() => {
          setLoading(false);
          navigation.navigate('Tab');
        // }, 2000);

      // } catch (error) {
      //   console.log(error);
      // }


    } else if (result.data.status == 201) {
      toast.show("You Register and login Succesfully ", {
        type: "success",
        placement: "top",
        duration: 1000,
        offset: 30,
        animationType: "zoom-in",
      });
      // try {
        await AsyncStorage.setItem("token", result.data.token);
        await AsyncStorage.setItem("keepLoggedIn", JSON.stringify(true));
        // setTimeout(() => {
          setLoading(false);
          navigation.navigate('Tab');
        // }, 2000);

      // } catch (error) {
      //   console.log(error);
      // }

    }
  }

  useEffect(() => {
    GoogleSignin.configure()
  }, [])

  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // console.log(userInfo.user);
      googleaddLogin(userInfo.user);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('error');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };


  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <KeyboardAvoidingView behavior='padding'>

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

            <Text style={styles.logintext} >Register</Text>


            <View style={styles.inputStyle}>


              {
                hideOTP ?
                  <>
                    <TextInput
                      placeholderTextColor="black"
                      style={styles.input}
                      placeholder="Name"
                      keyboardType='default'
                      onChangeText={setName}
                      value={name}
                    />
                    {errField.nameErr.length > 0 && <Text style={styles.validline}>{errField.nameErr}</Text>}

                    <TextInput
                      placeholderTextColor="black"
                      style={styles.input}
                      placeholder="Email"
                      keyboardType='default'
                      onChangeText={setEmail}
                      value={email}
                    />
                    {errField.emailErr.length > 0 && <Text style={styles.validline}>{errField.emailErr}</Text>}
                    <TextInput
                      placeholderTextColor="black"
                      style={styles.input}
                      placeholder="Mobile"
                      keyboardType='number-pad'
                      onChangeText={setMobile}
                      value={mobile}
                    />
                    {errField.mobileErr.length > 0 && <Text style={styles.validline}>{errField.mobileErr}</Text>}

                    <View>
                      <TextInput
                        placeholderTextColor="black"
                        style={styles.input}
                        placeholder="Password"
                        keyboardType='default'
                        onChangeText={setPassword}
                        value={password}
                        secureTextEntry={showPassword}
                      />
                      <Icon2 name={showPassword ? 'eye-with-line' : 'eye'} color = 'black' size={24} onPress={() => setShowPassword(!showPassword)} style={styles.passIcon} />
                      {errField.passwordErr.length > 0 && <Text style={styles.validline}>{errField.passwordErr}</Text>}
                    </View>

                    <View>
                      <TextInput
                        placeholderTextColor="black"
                        style={styles.input}
                        placeholder="Confirm-Password"
                        keyboardType='default'
                        onChangeText={setCpassword}
                        value={cpassword}
                        secureTextEntry={showCPassword}
                      />
                      <Icon2 name={showCPassword ? 'eye-with-line' : 'eye'} color='black' size={24} onPress={() => setShowCPassword(!showCPassword)} style={styles.passIcon} />
                      {errField.cpasswordErr.length > 0 && <Text style={styles.validline}>{errField.cpasswordErr}</Text>}
                    </View>
                  </> :
                  <View>
                    <TextInput
                      placeholderTextColor="black"
                      style={styles.input}
                      placeholder="OTP"
                      keyboardType='numeric'
                      onChangeText={setCode}
                      value={code}
                      secureTextEntry={showCode}
                    />
                    <Icon2 name={showCode ? 'eye-with-line' : 'eye'} color='black' size={24} onPress={() => setShowCode(!showCode)} style={styles.passIcon} />
                    {errField.codeErr.length > 0 && <Text style={styles.validline}>{errField.codeErr}</Text>}
                  </View>
              }



              <TouchableOpacity onPress={hideOTP ? SendOtp : Submit}>
                <View style={styles.inputbutton}>
                  <Text style={styles.inputbuttontext}>{hideOTP ? "GET OTP" : "SUBMIT"}</Text>
                </View>
              </TouchableOpacity>

              <View style={styles.orparent} >
                <View style={styles.orline}></View>
                <Text style={styles.ortext}>OR</Text>
                <View style={styles.orline}></View>
              </View>

              <TouchableOpacity onPress={googleLogin}>
                <View style={styles.googlebtn}>
                  <Icon name='google' size={22} color={colors.buttonColor} />
                  <Text style={styles.googlebtntext}> Register with Google</Text>
                </View>
              </TouchableOpacity>


            </View>
          </>
        }


      </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default Register

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
    color: 'black'
  },

  logintext: {
    color: 'black',
    fontSize: 30,
    fontWeight: '800',
    marginLeft: '5%',
    marginVertical: '5%'
  },
  registerline: {
    fontSize: 15,
    alignSelf: 'center',
    marginLeft: 100,
    marginTop: 40,

  },
  bgbtn: {
    fontSize: 16,
    fontWeight: '800',
    backgroundColor: colors.buttonColor,
    borderRadius: 5,
    color: 'black',
  },
  validline: {
    color: 'red',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: '2%'
  },
  container: {
    flex: 1
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
    marginVertical: 20
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

  },
  googlebtntext: {
    color: '#030303',
    fontSize: 14,
    fontWeight: '400'
  },
  googlebtn: {
    fontWeight: '400',
    alignItems: 'center',
    marginVertical: '2%',
    height: 52,
    borderRadius: 5,
    backgroundColor: "#f4f2f2",
    paddingVertical: '4%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  orline: {
    width: 100,
    height: 1,
    backgroundColor: "rgba(205,211,211,0.8)",
  },
  ortext: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    color:'black'
  },
  orparent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
})