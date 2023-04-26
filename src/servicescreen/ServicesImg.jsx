import { SafeAreaView, ActivityIndicator, StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput, ScrollView, KeyboardAvoidingView, CheckBox } from 'react-native';
import React, { useState, useEffect } from 'react';



import Dropdown from '../component/Dropdown';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Feather';
import colors from '../constant/colors';

import FilePicker from 'react-native-document-picker';
import url from '../Common';

import { useToast } from "react-native-toast-notifications";

import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';

// import Demo from './Demo';


var screenSize = Dimensions.get('window');
var screenWidth = screenSize.width;
var screenHeight = screenSize.height;

var halfscreenWidth = (screenWidth - 44) / 2;



const ServicesImg = ({ route, navigation }) => {

  const { _id, complaint_type, warranty } = route.params;
  console.log(warranty, complaint_type);

  const host = url.nodeUrl;


  const [loading, setLoading] = useState(false);
  const [invoice, setInvoice] = useState(null);
  const [issue_image, setIssue_image] = useState(null);
  const [under_warranty, setUnder_warranty] = useState(null);

  const [invoiceNext, setInvoiceNext] = useState(true);
  const [warrantyNext, setWarrantyNext] = useState(false);
  const [issueimageNext, setIssueimageNext] = useState(false);



  const [errField, setErrField] = useState({

    issue_imageErr: '',
    under_warrantyErr: '',
    invoiceErr: '',
  })


  const [filename, setFilename] = useState();


  const handleFilePicker = async () => {
    
      const response = await FilePicker.pick({
        presentationStyle: 'fullScreen'
      });
      let result = response;
      let name = response[0].name;
      setInvoice(result);
      setFilename(name);

  }


  const [issueimagename, setIssueimagename] = useState('');

  const issueimagePicker = async () => {
   
      const response = await FilePicker.pickMultiple({
        presentationStyle: 'fullScreen'
      });
      let result = response;
      let name = response[0].name;
      setIssue_image(result);
      setIssueimagename(name);

   
  }


  const [warrantyname, setWarrantyname] = useState('');

  const warrantyfilePicker = async () => {
   
      const response = await FilePicker.pick({
        presentationStyle: 'fullScreen'
      });
      let result = response;
      let name = response[0].name;
      setUnder_warranty(result);
      setWarrantyname(name);

   
  }




  const Submitinvoice = async () => {

    // if (validForm()) {
    setLoading(true);

    const data = new FormData();
    data.append('invoice', invoice[0]);

    await fetch(host + `/users/invoiceupdate/${_id}`, {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: data,
    }).then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status === 200) {

          toast.show("invoice image successfully update", {
            type: "success",
            placement: "top",
            duration: 1000,
            offset: 30,
            animationType: "zoom-in",
          })

          if (complaint_type != 'Service' && warranty != 'Extended Warranty') {
            // setTimeout(() => {
              navigation.navigate('Thankyou', { id: _id, thankyoutext: `Thankyou for choose ${complaint_type} form `, productname: `${complaint_type} Request`, estimatetime: '2 to 3 days' });
            // }, 1000);
          }
          else if (warranty === 'Extended Warranty' || complaint_type === 'Service') {
            if (complaint_type === 'Service') {
              setIssueimageNext(true);
            } else {
              setWarrantyNext(true);
            }
          }
          setLoading(false);
          setInvoiceNext(false);

        }
        else {
          setLoading(false);
          toast.show("Something went wrong", {
            type: "warning",
            placement: "top",
            duration: 1000,
            offset: 30,
            animationType: "zoom-in",
          })
        }
      }
      );

    // let result = await fetch(host + `/users/invoiceupdate/${_id}`, {
    //   method: 'post',
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   },
    //   body: data,
    // })
    // const response = await result.json();
    // console.log(response);

    // if (response.status == 200) {
    //   toast.show("invoice image successfully update", {
    //     type: "success",
    //     placement: "top",
    //     duration: 1000,
    //     offset: 30,
    //     animationType: "zoom-in",
    //   });
    //   // timeout for redirect the screen


    //   if (complaint_type != 'Service' && warranty != 'Extended Warranty') {
    //     setTimeout(() => {
    //       navigation.navigate('Thankyou', { id: _id, thankyoutext: 'Thankyou for choose service form ', productname: 'Service Request ', estimatetime: '2 to 3 days' });
    //     }, 1000);
    //   }

    //   if (warranty === 'Extended Warranty' || complaint_type === 'Service') {
    //     if (complaint_type === 'Service') {
    //       setIssueimageNext(true);
    //     } else {
    //       setWarrantyNext(true);
    //     }
    //   }
    //   setLoading(false);
    //   setInvoiceNext(false);



    // } else {
    //   setLoading(false);
    //   toast.show("Something went wrong", {
    //     type: "warning",
    //     placement: "top",
    //     duration: 1000,
    //     offset: 30,
    //     animationType: "zoom-in",
    //   });
    // }
    // }
    // else{
    //   alert("somthimg went wrong");
    // }
  }

  const Submitwaraanty = async () => {



    // if (validForm()) {

    const data = new FormData();
    data.append('under_warranty', under_warranty[0]);

    setLoading(true);


    await fetch(host + `/users/warrantyupdate/${_id}`, {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: data,
    }).then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toast.show("Extended warranty image successfully update", {
            type: "success",
            placement: "top",
            duration: 1000,
            offset: 30,
            animationType: "zoom-in",
          });

          setLoading(false);
          setWarrantyNext(false);
          if (complaint_type != 'Service') {
            // setTimeout(() => {
              navigation.navigate('Thankyou', { id: _id, thankyoutext: `Thankyou for choose ${complaint_type} form `, productname: `${complaint_type} Request`, estimatetime: '2 to 3 days' });
            // }, 1000);
          }

          navigation.navigate('Thankyou', { id: _id, thankyoutext: `Thankyou for choose ${complaint_type} form `, productname: `${complaint_type} Request`, estimatetime: '2 to 3 days' });


        }
        else {
          setLoading(false);
          toast.show("Something went wrong", {
            type: "warning",
            placement: "top",
            duration: 1000,
            offset: 30,
            animationType: "zoom-in",
          });
        }
      })


    
  }

  const Submitissue = async () => {



    // if (validForm()) {

    const data = new FormData();

    for (let i = 0; i < issue_image.length; i++) {
      data.append('issue_image', issue_image[i]);
    }

    setLoading(true);

    await fetch(host + `/users/issueimgupdate/${_id}`, {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: data,
    }).then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toast.show("issue image successfully update", {
            type: "success",
            placement: "top",
            duration: 1000,
            offset: 30,
            animationType: "zoom-in",
          });

          setLoading(false);
          setIssueimageNext(false);
          if (warranty != 'Extended Warranty') {
            // setTimeout(() => {
              navigation.navigate('Thankyou', { id: _id, thankyoutext: `Thankyou for choose ${complaint_type} form `, productname: `${complaint_type} Request`, estimatetime: '2 to 3 days' });
            // }, 1000);
          }

          else if (warranty === 'Extended Warranty') {
            setWarrantyNext(true);
          }

        }
        else {
          setLoading(false);
          toast.show("Something went wrong", {
            type: "warning",
            placement: "top",
            duration: 1000,
            offset: 30,
            animationType: "zoom-in",
          });
        }
      })


    // let result = await fetch(host + `/users/issueimgupdate/${_id}`, {
    //   method: 'post',
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   },
    //   body: data,
    // })
    // const response = await result.json();
    // console.log(response);

    // if (response.status == 200) {
    //   toast.show("issue image successfully update", {
    //     type: "success",
    //     placement: "top",
    //     duration: 1000,
    //     offset: 30,
    //     animationType: "zoom-in",
    //   });
    //   // timeout for redirect the screen
    //   setLoading(false);
    //   setIssueimageNext(false);
    //   if (warranty != 'Extended Warranty') {
    //     setTimeout(() => {
    //       navigation.navigate('Thankyou', { id: response.id, thankyoutext: 'Thankyou for choose service form ', productname: 'Service Request ', estimatetime: '2 to 3 days' });
    //     }, 1000);
    //   }

    //   if (warranty === 'Extended Warranty') {
    //     setWarrantyNext(true);
    //   }


    // } else {
    //   setLoading(false);
    //   toast.show("Something went wrong", {
    //     type: "warning",
    //     placement: "top",
    //     duration: 1000,
    //     offset: 30,
    //     animationType: "zoom-in",
    //   });
    // }
    // }
  }


  const validForm = () => {
    setErrField({

      issue_imageErr: '',
      under_warrantyErr: '',
      invoiceErr: '',
    })
    let formIsValid = true;

    const validEmailRegex = RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i);



    // if (invoice == null) {
    //   formIsValid = false;
    //   setErrField(prevState => ({
    //     ...prevState, invoiceErr: 'Please choose invoice file'
    //   }))
    // }

    // if (issue_image == null) {
    //   formIsValid = false;
    //   setErrField(prevState => ({
    //     ...prevState, issue_imageErr: 'Please choose issue file or image'
    //   }))
    // }


    return formIsValid;
  }


  const toast = useToast();
  return (
    <ScrollView style={{ backgroundColor: 'white' }} >
      <KeyboardAvoidingView >
        <SafeAreaView>

          {loading ?
            <ActivityIndicator size="large" color="#E71615" style={{ marginTop: '90%' }} />
            :
            <>
              <View style={{ width: screenWidth }}>
                <View style={styles.backbg}>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name='arrowleft' size={26} color='black' />
                  </TouchableOpacity>

                  <Text style={styles.backbtn}>Back</Text>
                </View>
                <Text style={styles.logintext}>{complaint_type}</Text>

                <View style={styles.inputStyle}>




                  {
                    invoiceNext &&
                    <>
                      <View><Text style={styles.subheading}>Upload Invoices and Images</Text></View>
                      <TouchableOpacity onPress={() => handleFilePicker()}>
                        <View style={styles.upload}>
                          <Text style={styles.uploadtext}>{!filename ? 'Upload Invoice' : filename}</Text>
                          <Icon1 name='upload' color='black' size={28} style={styles.icon1} />
                        </View>
                      </TouchableOpacity>
                      {errField.invoiceErr.length > 0 && <Text style={styles.validline}>{errField.invoiceErr}</Text>}
                      {
                        invoice != null &&
                        <TouchableOpacity onPress={Submitinvoice}>
                          <View style={styles.inputbutton}>
                            <Text style={styles.inputbuttontext}>SUBMIT</Text>
                          </View>
                        </TouchableOpacity>
                      }

                    </>
                  }


                  {
                    issueimageNext && complaint_type === 'Service' &&
                    <>
                      <View><Text style={styles.subheading} >Upload Issue images and document  </Text></View>
                      <TouchableOpacity onPress={() => issueimagePicker()}>
                        <View style={styles.upload}>
                          <Text style={styles.uploadtext}>{!issueimagename ? 'Issue Image' : issueimagename}</Text>
                          <Icon1 name='upload' color='black' size={28} style={styles.icon1} />
                        </View>
                      </TouchableOpacity>
                      {errField.issue_imageErr.length > 0 && <Text style={styles.validline}>{errField.issue_imageErr}</Text>}
                    {
                      issue_image != null &&
                      <TouchableOpacity onPress={Submitissue}>
                        <View style={styles.inputbutton}>
                          <Text style={styles.inputbuttontext}>SUBMIT</Text>
                        </View>
                      </TouchableOpacity>
                    }
                      
                    </>
                  }

                  {
                    warrantyNext && warranty === 'Extended Warranty' &&
                    <>
                      <View><Text style={styles.subheading} >Upload Warranty Document/Images  </Text></View>
                      <TouchableOpacity onPress={() => warrantyfilePicker()}>
                        <View style={styles.upload}>
                          <Text style={styles.uploadtext}>{!warrantyname ? 'Warranty document' : warrantyname}</Text>
                          <Icon1 name='upload' color='black' size={28} style={styles.icon1} />
                        </View>
                      </TouchableOpacity>
                     {
                      under_warranty != null &&
                      <TouchableOpacity onPress={ Submitwaraanty}>
                        <View style={styles.inputbutton}>
                          <Text style={styles.inputbuttontext}>SUBMIT</Text>
                        </View>
                      </TouchableOpacity>
                     }
                      
                    </>
                  }

                </View>


              </View>
            </>
          }
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default ServicesImg

const styles = StyleSheet.create({
  inputStyle: {
    paddingVertical: '4%',
    paddingHorizontal: '4%',
    width: screenWidth,

  },
  logintext: {
    fontWeight: '400',
    fontSize: 20,
    color: '#878686',
    marginLeft: '5%',
    marginVertical: '5%'
  },

  backbtn: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Roboto',
    marginLeft: 10,
    color: 'black'
  },
  backbg: {
    flexDirection: 'row',
    paddingHorizontal: '4%',
    paddingVertical: '5%',
    backgroundColor: '#D9D9D9',
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25
  },
  halfCont: {
    flexDirection: 'row',
    gap: 9,
  },
  halfContInner: {
    flexDirection: 'column',
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
    color: 'red'

  },
  inputRemark: {
    marginBottom: 5,
    lineHeight: 20,
    color: 'rgba(0,0,0,0.8)',
    fontSize: 13,
  },
  addinput: {
    fontSize: 15,
    fontWeight: '400',
    paddingLeft: 10,
    marginVertical: '2%',
    fontFamily: 'roboto',
    borderWidth: 1,
    height: 90,
    backgroundColor: 'white'
  },
  validline: {
    color: 'red',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: '2%'
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
  upload: {
    paddingLeft: 10,
    marginVertical: '2%',
    borderWidth: 1,
    height: 52,
    backgroundColor: 'white',
    paddingVertical: '3%'
  },
  icon1: {
    position: 'absolute',
    top: '50%',
    left: '2%'
  },
  uploadtext: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'roboto',
    position: 'absolute',
    top: '50%',
    left: '13%',
    color: 'black'
  },
  checkparent: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    rowGap: 10,
    columnGap: 5,
  },
  subheading: {
    fontSize: 16,
    marginVertical: '2%',
    color: '#000',
  },
  subheading2: {
    fontSize: 16,
    marginVertical: '2%',
    color: '#000',
    marginTop: 20,
  },

})

