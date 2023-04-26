import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import React,{useEffect, useState} from 'react';
import Demo from '../servicescreen/Demo';

var screenSize = Dimensions.get('window');
var screenWidth = screenSize.width;
var screenHight = screenSize.height;

const Thankyou = ({ route, navigation  }) => {
 const [name, setName] = useState(null);
  const { id, thankyoutext, productname , estimatetime} = route.params;
  
 
useEffect(() => {
  const value =  Demo();
  setTimeout(() => {
    setName(value._j.name);
  }, 1500);

  setTimeout(() => {
    navigation.navigate('Home2');
  }, 5000);

   
  
}, [])

  
  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Image source={{uri:'https://www.linkpicture.com/q/grateful.png'}} style={styles.image} />
        <View style={styles.text}>
          <Text style={styles.heytext}>Hey {name != null && name }!</Text>
          <Text style={styles.usertext}>{thankyoutext}</Text>
          <Text style={styles.usertext}>{productname}</Text>
          <Text style={styles.usertext2}> Request No :{id} </Text>
          <Text style={styles.usertext3}>Estimate Time: {estimatetime}</Text>
        </View>
      </View>
    </View >
  )
}

export default Thankyou

const styles = StyleSheet.create({
  container: {
    height: screenHight,
    width: screenWidth,
    backgroundColor: 'white',
  },
  background: {
    backgroundColor: '#F2F2F2BD',
    height: '100%',
    marginTop: '20%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50

  },
  image: {
    position: 'absolute',
    alignSelf: 'center',
    width: '80%',
    height: '40%',
    top: '8%'
  },
  heytext: {
    color: 'black',
    fontSize: 20,
    fontWeight: '800',
    marginBottom:22,
  },
  text: {
    alignItems: 'center',
    paddingHorizontal: '2%',
    position: 'absolute',
    top: '62%',
    transform: [{ translateY: -70 }],
    width: '100%'
  },
  usertext: {
    color: 'black',
    fontWeight: '400',
    fontSize: 18,

  },
  usertext2: {
    color: 'black',
    fontWeight: '400',
    fontSize: 16,
   marginTop:20,
  },
  usertext3: {
    color: 'black',
    fontWeight: '400',
    fontSize: 16,

  },
})