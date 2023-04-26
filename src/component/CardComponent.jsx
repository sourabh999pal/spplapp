import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native'
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import colors from '../constant/colors';


var screenSize = Dimensions.get('window');
var screenWidth = screenSize.width;
var screenHeight = screenSize.height;
var screenHalfWidth = screenSize.width * 0.465;

const cardComponent = ({ heading, para, image }) => {
    return (
        <View style={styles.box}>
            <View style={styles.iconback}>
                <Image source={image} style={styles.icon} />
            </View>
            <View style={styles.textstyle}>
                <Text style={styles.heading}>{heading}</Text>

            </View>

        </View>
    )
}

export default cardComponent

const styles = StyleSheet.create({

    box: {
        backgroundColor: 'rgba(217, 217, 217, 0.5)',
        padding: 5,
        flexDirection: 'column',
        borderRadius: 20,
        marginBottom: 15,

    },
    heading: {
        color: '#000000',
        fontSize: 14,
        fontWeight: '800',
        textAlign: 'center',
    },
   
    
    icon: {
        alignSelf: 'center',
        justifyContent: 'center',
        width: '80%',
        height: '80%',
        resizeMode: 'contain',
        padding: 10,
    },
    iconback: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 15,
        height: 100,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    textstyle: {
        marginHorizontal: '4%'
    }
})