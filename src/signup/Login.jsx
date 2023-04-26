import { StyleSheet, ActivityIndicator, RefreshControl, Text, View, Dimensions, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import React, { useState, useEffect } from 'react';

import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import colors from '../constant/colors';
import url from '../Common';





import AsyncStorage from '@react-native-async-storage/async-storage';

import { useToast } from "react-native-toast-notifications";

import { GoogleSignin, statusCodes, GoogleSignButton, } from '@react-native-google-signin/google-signin';

var screenSize = Dimensions.get('window');
var screenWidth = screenSize.width;
var screenHalfWidth = screenSize.width * 0.465;



const Login = ({ navigation }) => {


  const host = url.nodeUrl;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [errField, setErrField] = useState({
    emailErr: '',
    passwordErr: '',
  })

  const [showPassword, setShowPassword] = useState(true);




  const Submit = async () => {
    if (validForm()) {
      setLoading(true);
      let result = await fetch(host + "/users/Login", {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      })
      result = await result.json();

      if (result.data.status == 200) {
        setEmail('');
        setPassword('');
        toast.show("You login Succesfully ", {
          type: "success",
          placement: "top",
          duration: 1000,
          offset: 30,
          animationType: "zoom-in",
        });

       
          await AsyncStorage.setItem("token", result.data.token);
          await AsyncStorage.setItem("keepLoggedIn", JSON.stringify(true));
          // setTimeout(() => {
            
            navigation.navigate('Tab');
            setLoading(false);
          // }, 2000);


      } else if (result.data.status == 401) {
        toast.show("Wrong Password", {
          type: "warning",
          placement: "top",
          duration: 1000,
          offset: 30,
          animationType: "zoom-in",
        });
        setLoading(false);
      } else {
        toast.show("Invalid Email or Password", {
          type: "warning",
          placement: "top",
          duration: 1000,
          offset: 30,
          animationType: "zoom-in",
        });
        setLoading(false);
      }
    }
  }



  const validForm = () => {
    setErrField({
      emailErr: '',
      passwordErr: ''
    })
    let formIsValid = true;
    const validEmailRegex = RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i);

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
    if (password == '') {
      formIsValid = false;
      setErrField(prevState => ({
        ...prevState, passwordErr: 'Please Enter Password'
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

            <Text style={styles.logintext} >Log in</Text>

            <View style={styles.inputStyle}>
              <TextInput
                placeholderTextColor="black"
                style={styles.input}
                placeholder="Email"
                keyboardType='default'
                onChangeText={setEmail}
                value={email}
              />
              {errField.emailErr.length > 0 && <Text style={styles.validline}>{errField.emailErr}</Text>}
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
                <Icon2 name={showPassword ? 'eye-with-line' : 'eye'} size={24} color = 'black' onPress={() => setShowPassword(!showPassword)} style={styles.passIcon} />
                {errField.passwordErr.length > 0 && <Text style={styles.validline}>{errField.passwordErr}</Text>}



              </View>

              <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
                <View >
                  <Text style={styles.forgettext}>Forgot Password ?</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={Submit}>
                <View style={styles.inputbutton}>
                  <Text style={styles.inputbuttontext}>LOG IN</Text>
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
                  <Text style={styles.googlebtntext}> Login with Google</Text>
                </View>
              </TouchableOpacity>

            </View>
          </>
        }
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default Login

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
  forgettext: {
    color: 'red',
    textAlign: "right",
    paddingVertical: 5,
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