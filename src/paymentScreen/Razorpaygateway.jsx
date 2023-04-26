import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import RazorpayCheckout from 'react-native-razorpay';

const Razorpaygateway = () => {
    var options = {
        description: 'service payment by user',
        image: 'https://i.imgur.com/3g7nmJC.png',
        currency: 'INR',
        key: '', // Your api key
        amount: '5000',
        name: 'foo',
        prefill: {
          email: 'void@razorpay.com',
          contact: '9191919191',
          name: 'Razorpay Software'
        },
        theme: {color: '#F37254'}
      }
      RazorpayCheckout.open(options).then((data) => {
        // handle success
        alert(`Success: ${data.razorpay_payment_id}`);
      }).catch((error) => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });
  return (
    <View>
      <Text>Razorpaygateway</Text>
    </View>
  )
}

export default Razorpaygateway

const styles = StyleSheet.create({})