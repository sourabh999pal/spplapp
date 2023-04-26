import { StyleSheet, ActivityIndicator, RefreshControl, Text, View, Dimensions, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import React, { useState, useEffect, isValidElement } from 'react';

import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import colors from '../constant/colors';
import url from '../Common';



import AsyncStorage from '@react-native-async-storage/async-storage';

import { useToast } from "react-native-toast-notifications";

var screenSize = Dimensions.get('window');
var screenWidth = screenSize.width;
var screenHalfWidth = screenSize.width * 0.465;



const ForgotPassword = ({ navigation }) => {


    const host = url.nodeUrl;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);

    const [hideOTP, setHideOTP] = useState(true);

    const [showPassword, setShowPassword] = useState(true);
    const [showCPassword, setShowCPassword] = useState(true);


    const [errField, setErrField] = useState({
        emailErr: '',
        codeErr: '',
        passwordErr: '',
        cpasswordErr: ''
    })

    const [disableOtp, setdisableOtp] = useState(true);




    const Submit = async () => {

        if (validForm()) {

            let result = await fetch(host + "/users/changepassword", {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password,
                    code
                })
            })
            result = await result.json();

            if (result.status === 200) {
                alert("Your Password is successfully changed");
                navigation.goBack();
            }

            else if (result.status === 400) {
                alert("Your OTP is expire please re-send then try")
            }
            else if (result.status === 404) {
                alert("Your OTP is valid ")
            }

        }
    }
    

    const SendOtp = async () => {
        if (validemail()) {

            let result = await fetch(host + "/users/emailsendotp", {
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
                setHideOTP(false);
            }

            else if (result.status === 400) {
                alert("Your Email is either not registered or valid")
            }
        }
    }

    const validForm = () => {
        setErrField({
            emailErr: '',
            passwordErr: '',
            cpasswordErr: '',
            codeErr: ''
        })
        let formIsValid = true;
        const validEmailRegex = RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i);


        if (code == '') {
            formIsValid = false;
            setErrField(prevState => ({
                ...prevState, codeErr: 'Please Enter four digit code'
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

    const validemail = () => {
        setErrField({
            emailErr: '',
            passwordErr: '',
            cpasswordErr: '',
            codeErr: ''
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
        return formIsValid;
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

                        <Text style={styles.logintext} >Forgot Password</Text>

                        <View style={styles.inputStyle}>


                            {
                                hideOTP ?
                                    <View>
                                        <TextInput
                                            placeholderTextColor="black"
                                            style={styles.input}
                                            placeholder="Email"
                                            keyboardType='default'
                                            onChangeText={setEmail}
                                            value={email}
                                        />
                                        {errField.emailErr.length > 0 && <Text style={styles.validline}>{errField.emailErr}</Text>}
                                    </View> :
                                    <>
                                        <View>
                                            <TextInput
                                                placeholderTextColor="black"
                                                style={styles.input}
                                                placeholder="OTP"
                                                keyboardType='numeric'
                                                onChangeText={setCode}
                                                value={code}
                                                secureTextEntry={disableOtp}
                                            />
                                            {errField.codeErr.length > 0 && <Text style={styles.validline}>{errField.codeErr}</Text>}
                                        </View>
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
                                            <Icon2 name={showPassword ? 'eye-with-line' : 'eye'} size={24} onPress={() => setShowPassword(!showPassword)} style={styles.passIcon} />
                                            {errField.passwordErr.length > 0 && <Text style={styles.validline}>{errField.passwordErr}</Text>}
                                        </View>
                                        <View>
                                            <TextInput
                                                placeholderTextColor="black"
                                                style={styles.input}
                                                placeholder="ConformPassword"
                                                keyboardType='default'
                                                onChangeText={setCpassword}
                                                value={cpassword}
                                                secureTextEntry={showCPassword}
                                            />
                                            <Icon2 name={showCPassword ? 'eye-with-line' : 'eye'} size={24} onPress={() => setShowCPassword(!showCPassword)} style={styles.passIcon} />
                                            {errField.cpasswordErr.length > 0 && <Text style={styles.validline}>{errField.cpasswordErr}</Text>}
                                        </View>
                                    </>

                            }




                            <TouchableOpacity onPress={hideOTP ? SendOtp : Submit}>
                                <View style={styles.inputbutton}>
                                    <Text style={styles.inputbuttontext}>{hideOTP ? "SEND OTP" : "SUBMIT"}</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </>
                }
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default ForgotPassword

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

    },
    passIcon: {
        position: 'absolute',
        right: '4%',
        top: '31%'
    },
})