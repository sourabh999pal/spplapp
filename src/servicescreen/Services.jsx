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

var halfscreenWidth = (screenWidth - 44) / 2;



const Services = ({ route, navigation }) => {
  const host = url.nodeUrl;
  const { complaint_type } = route.params;


  const [auth, setAuth] = useState(false);
  const [valid, setValid] = useState(null);
  const [loading, setLoading] = useState(true);

  const Authorized = async () => {
    setValid(await AsyncStorage.getItem('token'));
    if (valid != null) {
      setAuth(true);
    }
  }


  useEffect(() => {
    Authorized();
  }, [])


  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [mobile, setMobile] = useState('');
  const [altmobile, setAltmobile] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');

  const [brand, setBrand] = useState('');
  const [productType, setProductType] = useState();
  const [productname, setProductname] = useState('');
  // const [complaint_type, setComplaint_type] = useState('');
  const [warranty, setWarranty] = useState('');
  const [purchaseMode, setPurchaseMode] = useState('');
  const [extended, setExtended] = useState(false);
  const [purchase_date, setPurchase_date] = useState('');
  const [pdate, setPdate] = useState('');


  const [set_serialno, setSet_serialno] = useState('');
  const [query, setQuery] = useState('');
  const [invoice, setInvoice] = useState();
  const [issue_image, setIssue_image] = useState();
  const [under_warranty, setUnder_warranty] = useState();

  const [productData, setProductData] = useState();
  const [brandData, setBrandData] = useState(null);
  const [modelData, setModelData] = useState(null);

  const [date, setDate] = useState(new Date);
  const [open, setOpen] = useState(false);
  const [oneMonth, setOneMonth] = useState(false);



  const [errField, setErrField] = useState({
    firstnameErr: '',
    lastnameErr: '',
    mobileErr: '',
    altmobileErr: '',
    emailErr: '',
    addressErr: '',
    cityErr: '',
    stateErr: '',
    pincodeErr: '',
    brandErr: '',
    productErr: '',
    productTypeErr: '',
    complaint_typeErr: '',
    warrantyErr: '',
    purchaseModeErr:'',
    purchase_dateErr: '',
    serialnoErr: '',
    queryErr: '',
    issue_imageErr: '',
    under_warrantyErr: '',
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


  const [issueimagename, setIssueimagename] = useState('');

  const issueimagePicker = async () => {
    try {
      const response = await FilePicker.pickMultiple({
        presentationStyle: 'fullScreen'
      });
      let result = response;
      let name = response[0].name;
      setIssue_image(result);
      setIssueimagename(name);

    } catch (err) {
      console.log(err);
    }
  }


  const [warrantyname, setWarrantyname] = useState('');

  const warrantyfilePicker = async () => {
    try {
      const response = await FilePicker.pick({
        presentationStyle: 'fullScreen'
      });
      let result = response;
      let name = response[0].name;
      setUnder_warranty(result);
      setWarrantyname(name);

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

  const onSelect2 = (e) => {
    setWarranty(e.name);
    setWarrantyid(e.id);

  };
  const onSelect4 = (e) => {
    setPurchaseMode(e.name);
    setPurchaseModeid(e.id);

  };

  console.log(brand);

  const Submit = async () => {
    
    const detail = jwt_decode(valid);
    const _id = detail.id;
    if (validForm()) {

      setLoading(true);
      await fetch(host + `/users/detailupdate/${_id}`, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstname, lastname, mobile, altmobile, email, address, city, state, pincode, brand, productType, productname, purchaseMode, complaint_type, warranty, purchase_date, set_serialno, query
        })
      }).then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            toast.show("User detail successfully update", {
              type: "success",
              placement: "top",
              duration: 1000,
              offset: 30,
              animationType: "zoom-in",
            });
            setLoading(false);
            navigation.navigate('Serviceimg', { _id: res.id, complaint_type: complaint_type, warranty: warranty });
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
      firstnameErr: '',
      lastnameErr: '',
      mobileErr: '',
      altmobileErr: '',
      emailErr: '',
      addressErr: '',
      cityErr: '',
      stateErr: '',
      pincodeErr: '',
      brandErr: '',
      productTypeErr: '',
      productErr: '',
      complaint_typeErr: '',
      warrantyErr: '',
      purchaseModeErr:'',
      purchase_dateErr: '',
      serialnoErr: '',
      queryErr: '',
      issue_imageErr: '',
      under_warrantyErr: '',
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
        ...prevState, productErr: 'Please enter Product'
      }))
    }
    if (firstname == '') {
      formIsValid = false;
      setErrField(prevState => ({
        ...prevState, firstnameErr: 'Please Enter first Name'
      }))
    }

    if (lastname == '') {
      formIsValid = false;
      setErrField(prevState => ({
        ...prevState, lastnameErr: 'Please Enter Last Name'
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
    if (altmobile == '') {
      formIsValid = false;
      setErrField(prevState => ({
        ...prevState, altmobileErr: 'Please Enter Mobile no'
      }))
    }
    if (altmobile != '' && altmobile.length != 10) {
      formIsValid = false;
      setErrField(prevState => ({
        ...prevState, altmobileErr: 'Please Enter 10 Digit alt Mobile no'
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

    if (address == '') {
      formIsValid = false;
      setErrField(prevState => ({
        ...prevState, addressErr: 'Please Enter Address'
      }))
    }
    if (state == '') {
      formIsValid = false;
      setErrField(prevState => ({
        ...prevState, stateErr: 'Please Enter State'
      }))
    }
    if (city == '') {
      formIsValid = false;
      setErrField(prevState => ({
        ...prevState, cityErr: 'Please Enter City'
      }))
    }
    if (pincode == '') {
      formIsValid = false;
      setErrField(prevState => ({
        ...prevState, pincodeErr: 'Please Enter Pincode'
      }))
    }

    if (set_serialno == '') {
      formIsValid = false;
      setErrField(prevState => ({
        ...prevState, serialnoErr: 'Please Enter serial No'
      }))
    }

    if (query == '') {
      formIsValid = false;
      setErrField(prevState => ({
        ...prevState, queryErr: 'Please enter your query'
      }))
    }

    if (purchase_date == '') {
      formIsValid = false;
      setErrField(prevState => ({
        ...prevState, purchase_dateErr: 'Please enter Purchase Date'
      }))
    }

    if (complaint_type == '') {
      formIsValid = false;
      setErrField(prevState => ({
        ...prevState, complaint_typeErr: 'Please enter compaint type'
      }))
    }

    if (warranty == '') {
      formIsValid = false;
      setErrField(prevState => ({
        ...prevState, warrantyErr: 'Please enter your warranty'
      }))
    }

    if (purchaseMode == '') {
      formIsValid = false;
      setErrField(prevState => ({
        ...prevState, purchaseModeErr: 'Please choose purchase mode '
      }))
    }

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

                  <View><Text style={styles.subheading}>Enter Some Data about your product</Text></View>

                  <Dropdown daata={productData} value={brand} onSelect={onSelect} name='Select Brand' style={styles.input} />

                  {errField.brandErr.length > 0 && <Text style={styles.validline}>{errField.brandErr}</Text>}

                  {brandData != null && <Dropdown daata={brandData} value={productType} onSelect={onSelect1} name='Select Product' style={styles.input} />}

                  {errField.productTypeErr.length > 0 && <Text style={styles.validline}>{errField.productTypeErr}</Text>}

                  {modelData != null && <Dropdown daata={modelData} value={productname} onSelect={onSelect3} name='Select Model' style={styles.input} />}

                  {errField.productErr.length > 0 && <Text style={styles.validline}>{errField.productErr}</Text>}

                  <Dropdown daata={warrantydata} value={warranty} onSelect={onSelect2} name='Select Your Warranty' style={styles.input} />
                  {errField.warrantyErr.length > 0 && <Text style={styles.validline}>{errField.warrantyErr}</Text>}

                  <Dropdown daata={modedata} value={purchaseMode} onSelect={onSelect4} name='Mode of Purchasing' style={styles.input} />
                  {errField.purchaseModeErr.length > 0 && <Text style={styles.validline}>{errField.purchaseModeErr}</Text>}
              

                  <TextInput
                    placeholderTextColor="black"
                    style={styles.input}
                    placeholder="Set Serial no"
                    keyboardType='default'
                    onChangeText={setSet_serialno}
                    value={set_serialno}
                  />
                  {errField.serialnoErr.length > 0 && <Text style={styles.validline}>{errField.serialnoErr}</Text>}


                  <TextInput
                    placeholderTextColor="black"
                    style={styles.input}
                    placeholder="Enter Query"
                    keyboardType='default'
                    onChangeText={setQuery}
                    value={query}
                  />
                  {errField.queryErr.length > 0 && <Text style={styles.validline}>{errField.queryErr}</Text>}

                  {/* <TextInput
                    placeholderTextColor="black"
                    style={styles.input}
                    placeholder="Enter Purchase Date"
                    keyboardType='number-pad'
                    onChangeText={setPurchase_date}
                    value={purchase_date}
                  /> */}

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

                      const pastTime = new Date(date);
                      const now = new Date();

                      const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;

                      const timeDiffInMs = now.getTime() - pastTime.getTime();

                      if (timeDiffInMs >= thirtyDaysInMs) {
                        console.log('Date is older than 30 days');
                        setOneMonth(true);
                      } else {
                        console.log('Date is not older than 30 days');
                      }

                    }}
                    onCancel={() => {
                      setOpen(false)
                    }}
                    style={{}}
                  />
                  { oneMonth && complaint_type ==='Installation' && <Text style={styles.inputRemark}>Since Your Purchase Date is older than One Month. You have to Pay Some Extra charges.</Text>}
                  {errField.purchase_dateErr.length > 0 && <Text style={styles.validline}>{errField.purchase_dateErr}</Text>}


                  <View><Text style={styles.subheading2}>Enter Some Personal Data</Text></View>

                  <View style={styles.halfCont}>
                    <View style={[styles.halfContInner, { width: '49%' }]}>
                      <TextInput
                        placeholderTextColor="black"
                        style={styles.input}
                        placeholder="First Name"
                        keyboardType='default'
                        onChangeText={setFirstname}
                        value={firstname}
                      />


                      {errField.firstnameErr.length > 0 && <Text style={styles.validline}>{errField.firstnameErr}</Text>}
                    </View>
                    <View style={[styles.halfContInner, { width: '49%' }]}>
                      <TextInput
                        placeholderTextColor="black"
                        style={styles.input}
                        placeholder="Last Name"
                        keyboardType='default'
                        onChangeText={setLastname}
                        value={lastname}
                      />
                      {errField.lastnameErr.length > 0 && <Text style={styles.validline}>{errField.lastnameErr}</Text>}
                    </View>
                  </View>



                  <View style={styles.halfCont}>
                    <View style={[styles.halfContInner, { width: '49%' }]}>
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
                    <View style={[styles.halfContInner, { width: '49%' }]}>
                      <TextInput
                        placeholderTextColor="black"
                        style={styles.input}
                        placeholder="Alternate Mobile Number"
                        keyboardType='number-pad'
                        onChangeText={setAltmobile}
                        value={altmobile}
                      />
                      {errField.altmobileErr.length > 0 && <Text style={styles.validline}>{errField.altmobileErr}</Text>}
                    </View>
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

                  <TextInput
                    placeholderTextColor="black"
                    style={styles.input}
                    placeholder="Address"
                    keyboardType='default'
                    onChangeText={setAddress}
                    value={address}
                    multiline={true}
                  />
                  {errField.addressErr.length > 0 && <Text style={styles.validline}>{errField.addressErr}</Text>}


                  <View style={styles.halfCont}>
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

                  </View>
                  {errField.cityErr.length > 0 && <Text style={styles.validline}>{errField.cityErr}</Text>}
                  {errField.stateErr.length > 0 && <Text style={styles.validline}>{errField.stateErr}</Text>}
                  {errField.pincodeErr.length > 0 && <Text style={styles.validline}>{errField.pincodeErr}</Text>}

                  <TouchableOpacity onPress={Submit}>
                    <View style={styles.inputbutton}>
                      <Text style={styles.inputbuttontext}>Submit</Text>
                    </View>
                  </TouchableOpacity>

                  {/* <TouchableOpacity onPress={() => navigation.navigate("Serviceimg")}>
                    <View style={styles.inputbutton}>
                      <Text style={styles.inputbuttontext}>Next Step</Text>
                    </View>
                  </TouchableOpacity> */}

                </View>

              </View>
            </>
          }
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default Services

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

