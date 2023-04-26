import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Dimensions, ScrollView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';

import Card from '../component/CardContact';

import Icon from 'react-native-vector-icons/AntDesign';

var screenSize = Dimensions.get('window');
var screenWidth = screenSize.width;
var screenHeight = screenSize.height;

const image = require('../../android/app/src/main/assets/thomson.png')

const Contactus = ({ navigation }) => {
    return (
        <View style={{ width: screenWidth, height: screenHeight }}>
            <View style={styles.backbg}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name='arrowleft' size={26} color='black' />
                </TouchableOpacity>

                <Text style={styles.backbtn}>Back</Text>
            </View>

            <View style={{ margin: '3%' }}>
                <Text style={styles.quick}>Contact Information </Text>
            </View>
            <ScrollView>
                <View style={{ gap: 20 ,marginBottom:20, }}>
                    <View style={styles.card}>

                        {/* <View style={styles.iconbg}>
                       <Image source={image} style={styles.icont} />
                   </View> */}
                        <Text style={styles.heading2}>Thomson</Text>
                        <Text style={styles.text}>{'\n'}For Complaint :-</Text>
                        <Text style={styles.text}>Large Appliances :  consumercare@thomsontv.in</Text>
                        <Text style={styles.text} >Small Appliances : support.thomson@flipkart.com</Text>

                        <Text style={styles.text}>{'\n'}Customer support :-</Text>
                        <Text style={styles.text}>Large Appliances :  1800-843-8777</Text>
                        <Text style={styles.text} >Small Appliances : 636-604-3210</Text>

                    </View>

                    <View style={styles.card}>

                        {/* <View style={styles.iconbg}>
                       <Image source={image} style={styles.icont} />
                   </View> */}
                        <Text style={styles.heading2}>Kodak</Text>
                        <Text style={styles.text}>{'\n'}Complaint :  consumercare@kodaktv.in</Text>
                        <Text style={styles.text}>Sales      :  sales@kodaktv.in</Text>
                        <Text style={styles.text}>Info      :   customersupport@kodaktv.in</Text>
                        <Text style={styles.text}>{'\n'}Customer support    :   1800-103-3036</Text>
                    </View>

                    <View style={styles.card}>

                        <Text style={styles.heading2}>Blaupunkt</Text>
                        <Text style={styles.text}>{'\n'}Contact Mail :  info@sppl.ind.in</Text>

                        <Text style={styles.text}>{'\n'}Customer support    :   0114-3228-817</Text>
                    </View>

                    <View style={styles.card}>

                        <Text style={styles.heading2}>Westinghouse TV</Text>
                        <Text style={styles.text}>{'\n'}Contact Mail :  consumercare@westinghousetv.in</Text>

                        <Text style={styles.text}>{'\n'}Customer support    :   1800-258-4409</Text>
                    </View>

                    
                    <View style={styles.card}>

                        <Text style={styles.heading2}>White Westinghouse </Text>
                        <Text style={styles.text}>{'\n'}Contact Mail :  wwhsupport@sppl.ind.in</Text>

                        <Text style={styles.text}>{'\n'}Customer support    :   1800-103-3661</Text>
                    </View>

                </View>




            </ScrollView>

        </View>
    )
}

export default Contactus

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
        alignSelf: 'center'
    },
    box: {
        backgroundColor: 'rgba(217, 217, 217, 0.5)',
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 20,
    },
    heading: {
        color: '#000000',
        fontSize: 23,
        fontWeight: '800',
        left: 40
    },



    icon: {
        width: '80%',
        height: '80%',
        alignSelf: 'center',


    },
    iconback: {
        backgroundColor: 'white',
        borderRadius: 15,
        width: '30%',
        height: 100,
        justifyContent: 'center',
        alignContent: 'center',
        position: 'absolute',
        right: 0

    },
    textstyle: {
        fontSize: 10
    },

    card: {
        backgroundColor: 'rgba(217, 217, 217, 0.5)',
        padding: 10,
        marginHorizontal: 13,
        borderRadius: 20,
    },
    iconbg: {
        backgroundColor: 'white',
        borderRadius: 15,
        alignItems: 'center',
    },
    icont: {



    },
    heading2: {
        color: '#000000',
        fontSize: 22,
        fontWeight: '700',
        margin: 5
    },
    text: {
        fontSize: 13.5,
        color: 'black',
        marginHorizontal: 5

    },

})