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

var screenSize = Dimensions.get('window');
var screenWidth = screenSize.width;
var screenHeight = screenSize.height;

const WarrantyRegister = ({ navigation }) => {
  const host = url.nodeUrl;

  const [auth, setAuth] = useState(false);
  const [valid, setValid] = useState(null);
  const [loading, setLoading] = useState(false);

  const Authorized = async () => {
    setValid(await AsyncStorage.getItem('token'));
    if (valid != null) {
      setAuth(true);
    }
  }


  useEffect(() => {
    Authorized();
  }, [])

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');

  const [brand, setBrand] = useState('');
  const [productType, setProductType] = useState();
  const [productname, setProductname] = useState('');

  const [purchase_date, setPurchase_date] = useState('');



  const [invoice, setInvoice] = useState('');


  const [productData, setProductData] = useState();
  const [brandData, setBrandData] = useState(null);
  const [modelData, setModelData] = useState(null);

  const [date, setDate] = useState(new Date);
  const [open, setOpen] = useState(false);
  const [oneMonth, setOneMonth] = useState(false);

  const [errField, setErrField] = useState({
    nameErr: '',
    mobileErr: '',
    emailErr: '',
    brandErr: '',
    productTypeErr: '',
    productNameErr: '',
    purchase_dateErr: '',
    invoiceErr: '',
  })


  const [filename, setFilename] = useState();

  const handleFilePicker = async () => {
    try {
      const response = await FilePicker.pick({
        presentationStyle: 'fullScreen'
      });
      let result = response;
      let name = response[0].name;
      setInvoice(result);
      setFilename(name);

    } catch (err) {
      console.log(err);
    }
  }








  const [brandid, setBrandid] = useState();
  const [productTypeid, setProductTypeid] = useState();
  const [productid, setProductid] = useState();
  const [complaintid, setComplaintid] = useState();
  const [wararantyid, setWarrantyid] = useState();
  const [purchaseModeid, setPurchaseModeid] = useState();



  let warrantydata = [
    { _id: 1, name: "Under Warranty" },
    { _id: 2, name: "Extended Warranty" },
    { _id: 3, name: "Out of Warranty" }
  ];
  let modedata = [
    { _id: 1, name: "Online Purchase" },
    { _id: 2, name: "Offline Purchase" }


  ];

  useEffect(() => {

  

    const productDataReq = async () => {

      await fetch(host + `/products/getproduct`, {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },

      }).then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setProductData(res.result);
            setLoading(false);
          }

          else if (res.status === 400) {
            alert("somthing went wrong")
          }
        })
        .catch((err) => {
          console.log(err)
        })

    }

    productDataReq();

  }, [])


  const onSelect = (e) => {
    setBrand(e.name);
    setBrandid(e._id);
    setBrandData(e.categories);
  };
  const onSelect1 = (e) => {
    setProductType(e.name);
    setProductTypeid(e._id);
    setModelData(e.category);
  }

  const onSelect3 = (e) => {
    setProductname(e.name);
    setProductid(e._id);

  };




  console.log(brand);

  const Submit = async () => {
    const data = new FormData();
    data.append('invoice', invoice[0]);
    data.append('name',name );
    data.append('email', email);
    data.append('mobile', mobile);
    data.append('productType', productType);
    data.append('productname', productname);
    data.append('purchase_date', purchase_date);
    data.append('brand', brand);

    if (validForm()) {
    
      setLoading(true);
      await fetch(host + `/users/registerWarranty`, {
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        body: data
      }).then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            toast.show("Warranty detail successfully update", {
              type: "success",
              placement: "top",
              duration: 1000,
              offset: 30,
              animationType: "zoom-in",
            });
            
            setTimeout(() => {
              setLoading(false);
              navigation.goBack();
            }, 1000);
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
        .catch((err) => {
          console.log(err)
        })
    }
  }





  const validForm = () => {
    setErrField({
      nameErr: '',
      mobileErr: '',
      emailErr: '',
      brandErr: '',
      productTypeErr: '',
      productNameErr: '',
      purchase_dateErr: '',
      invoiceErr: '',
    })
    let formIsValid = true;

    const validEmailRegex = RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i);



    if (brand == '') {
      formIsValid = false;
      setErrField(prevState => ({
        ...prevState, brandErr: 'Please Select Brand name'
      }))
    }
    if (productType == '') {
      formIsValid = false;
      setErrField(prevState => ({
        ...prevState, productTypeErr: 'Please Select Product type'
      }))
    }
    if (productname == '') {
      formIsValid = false;
      setErrField(prevState => ({
        ...prevState, productNameErr: 'Please enter Product'
      }))
    }
    if (name == '') {
      formIsValid = false;
      setErrField(prevState => ({
        ...prevState, nameErr: 'Please Enter Name'
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
    if (email == '') {
      formIsValid = false;
      setErrField(prevState => ({
        ...prevState, emailErr: 'Please Enter EmailID'
      }))
    }
    if (email != '' && !validEmailRegex.test(email)) {
      formIsValid = false;
      setErrField(prevState => ({
        ...prevState, emailErr: 'Please Enter a valid Email ID'
      }))
    }
    if (invoice == '') {
      formIsValid = false;
      setErrField(prevState => ({
        ...prevState, invoiceErr: 'Please Enter Invoice No'
      }))
    }
    if (purchase_date == '') {
      formIsValid = false;
      setErrField(prevState => ({
        ...prevState, purchase_dateErr: 'Please enter Purchase Date'
      }))
    }
    return formIsValid;
  }


  const toast = useToast()

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
                <Text style={styles.logintext}>Warranty Registration Form</Text>

                <View style={styles.inputStyle}>

                  <View><Text style={styles.subheading}>Enter Some Data about your product</Text></View>

                  <Dropdown daata={productData} value={brand} onSelect={onSelect} name='Select Brand' style={styles.input} />

                  {errField.brandErr.length > 0 && <Text style={styles.validline}>{errField.brandErr}</Text>}

                  {brandData != null && <Dropdown daata={brandData} value={productType} onSelect={onSelect1} name='Select Product' style={styles.input} />}

                  {errField.productTypeErr.length > 0 && <Text style={styles.validline}>{errField.productTypeErr}</Text>}

                  {modelData != null && <Dropdown daata={modelData} value={productname} onSelect={onSelect3} name='Select Model' style={styles.input} />}

                  {errField.productNameErr.length > 0 && <Text style={styles.validline}>{errField.productNameErr}</Text>}

                  {/* <Dropdown daata={warrantydata} value={warranty} onSelect={onSelect2} name='Select Your Warranty' style={styles.input} />
                  {errField.warrantyErr.length > 0 && <Text style={styles.validline}>{errField.warrantyErr}</Text>} */}

                  {/* <Dropdown daata={modedata} value={purchaseMode} onSelect={onSelect4} name='Mode of Purchasing' style={styles.input} />
                  {errField.purchaseModeErr.length > 0 && <Text style={styles.validline}>{errField.purchaseModeErr}</Text>} */}

{/* 
                  <TextInput
                    placeholderTextColor="black"
                    style={styles.input}
                    placeholder="Invoice No"
                    keyboardType='default'
                    onChangeText={setInvoice}
                    value={invoice}
                  />
                  {errField.invoiceErr.length > 0 && <Text style={styles.validline}>{errField.invoiceErr}</Text>} */}

                  <TouchableOpacity onPress={() => handleFilePicker()}>
                        <View style={styles.upload}>
                          <Text style={styles.uploadtext}>{!filename ? 'Upload Invoice' : filename}</Text>
                          <Icon1 name='upload' color='black' size={28} style={styles.icon1} />
                        </View>
                      </TouchableOpacity>
                      {errField.invoiceErr.length > 0 && <Text style={styles.validline}>{errField.invoiceErr}</Text>}





                  <TouchableOpacity onPress={() => setOpen(true)} style={styles.input}>
                    <Text style={styles.input2}>{purchase_date === '' ? 'Enter Purchase Date' : purchase_date}</Text>
                  </TouchableOpacity>


                  <DatePicker
                    modal
                    open={open}
                    date={date}

                    mode="date"
                    textColor='black'
                    onConfirm={(date) => {
                      setOpen(false)
                      setDate(date)

                      let yyyy = date.getFullYear();
                      let mm = date.getMonth() + 1; // Months start at 0!
                      let dd = date.getDate();

                      let today = dd + '-' + mm + '-' + yyyy;
                      setPurchase_date(today);

                    }}
                    onCancel={() => {
                      setOpen(false)
                    }}
                    style={{}}
                  />

                  {errField.purchase_dateErr.length > 0 && <Text style={styles.validline}>{errField.purchase_dateErr}</Text>}


                  <View><Text style={styles.subheading2}>Enter Some Personal Data</Text></View>


                  <View style={[styles.halfContInner,]}>
                    <TextInput
                      placeholderTextColor="black"
                      style={styles.input}
                      placeholder="Name"
                      keyboardType='default'
                      onChangeText={setName}
                      value={name}
                    />


                    {errField.nameErr.length > 0 && <Text style={styles.validline}>{errField.nameErr}</Text>}
                  </View>





                  <View style={[styles.halfContInner,]}>
                    <TextInput
                      placeholderTextColor="black"
                      style={styles.input}
                      placeholder="Mobile Number"
                      keyboardType='number-pad'
                      onChangeText={setMobile}
                      value={mobile}
                    />
                    {errField.mobileErr.length > 0 && <Text style={styles.validline}>{errField.mobileErr}</Text>}
                  </View>



                  <TextInput
                    placeholderTextColor="black"
                    style={styles.input}
                    placeholder="Email Address"
                    keyboardType='default'
                    onChangeText={setEmail}
                    value={email}
                  />
                  {errField.emailErr.length > 0 && <Text style={styles.validline}>{errField.emailErr}</Text>}

                  {/* <TextInput
                    placeholderTextColor="black"
                    style={styles.input}
                    placeholder="Address"
                    keyboardType='default'
                    onChangeText={setAddress}
                    value={address}
                    multiline={true}
                  />
                  {errField.addressErr.length > 0 && <Text style={styles.validline}>{errField.addressErr}</Text>} */}


                  {/* <View style={styles.halfCont}>
                    <TextInput
                      placeholderTextColor="black"
                      style={[styles.input, { width: '31.8%' }]}
                      placeholder="City"
                      keyboardType='default'
                      onChangeText={setCity}
                      value={city}
                    />


                    <TextInput
                      placeholderTextColor="black"
                      style={[styles.input, { width: '31.8%' }]}
                      placeholder="State"
                      keyboardType='default'
                      onChangeText={setState}
                      value={state}
                    />


                    <TextInput
                      placeholderTextColor="black"
                      style={[styles.input, { width: '31.8%' }]}
                      placeholder="Pincode"
                      keyboardType='number-pad'
                      onChangeText={setPincode}
                      value={pincode}
                    />

                  </View> */}
                  {/* {errField.cityErr.length > 0 && <Text style={styles.validline}>{errField.cityErr}</Text>}
                  {errField.stateErr.length > 0 && <Text style={styles.validline}>{errField.stateErr}</Text>}
                  {errField.pincodeErr.length > 0 && <Text style={styles.validline}>{errField.pincodeErr}</Text>} */}

                  <TouchableOpacity onPress={Submit}>
                    <View style={styles.inputbutton}>
                      <Text style={styles.inputbuttontext}>Submit</Text>
                    </View>
                  </TouchableOpacity>



                </View>

              </View>

            </>
          }
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ScrollView>

  )
}

export default WarrantyRegister

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
  input2: {
    fontSize: 15,
    fontWeight: '400',
    marginVertical: '2%',
    fontFamily: 'roboto',
    color: 'black',
    marginTop: 12,

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