import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

import MainScreen from '../screens/MainScreen';
import Product from '../productscreen/Product';
import Services from '../servicescreen/Services';
import Thankyou from '../servicescreen/Thankyou';
import PaymentScreen from '../paymentScreen/PaymentScreen';


import Icons from 'react-native-vector-icons/Ionicons';
import Navigation from './Navigation';

import InstallationList from '../servicescreen/InstallationList';
import ServicesList from '../servicescreen/ServicesList';
import ServicesImg from '../servicescreen/ServicesImg';
import Contactus from '../screens/Contactus';
import WarrantyRegister from '../screens/WarrantyRegister';






const StackScreen =()=>{
  return(
    <Stack.Navigator
    initialRouteName='Home2'
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Home2" component={MainScreen} />
    <Stack.Screen name="Service" component={Services} />
    <Stack.Screen name="Serviceimg" component={ServicesImg} />
    <Stack.Screen name="Product" component={Product} />
    <Stack.Screen name="Thankyou" component={Thankyou} />
    <Stack.Screen name="Payment" component={PaymentScreen} />
    <Stack.Screen name="Servicelist" component={ServicesList} />
    <Stack.Screen name="Installationlist" component={InstallationList} />
    <Stack.Screen name="Onboard" component={Navigation} />
    <Stack.Screen name="contactus" component={Contactus} />
    <Stack.Screen name="warrantyregister" component={WarrantyRegister} />

   
   
  </Stack.Navigator>
  )
}
 
const TabNavigation = () => {
  return (
  //   <Tab.Navigator
  //   screenOptions={{
  //       headerShown: false,
  //       tabBarShowLabel: false,
  //       tabBarStyle: {backgroundColor: '#E71615'},
  //       tabBarInactiveTintColor: '#fff',
  //       tabBarActiveTintColor: '#fff',
  //     }}
  //     >
  //   <Tab.Screen name="Home" component={StackScreen} 
  //   options={{
        
  //     tabBarIcon:({focused,color}) => {
  //          let iconName;
  //          iconName = focused ? 'home':'home-outline'
  //       return(
            
  //           <Icons name={iconName} color={color} size={26}/>
  //       )},
        
  //   }}
  //   />
  //   <Tab.Screen name="Settings" component={Product} 
  //   options={{
        
  //     tabBarIcon:({focused, color}) => {
  //        let iconName;
  //        iconName = focused ? 'person':'person-outline'
  //     return(
          
  //         <Icons name={iconName}  color={color} size={26}/>
  //     )},
      
  // }}
  // />
  // </Tab.Navigator>
  <StackScreen />
  )
}

export default TabNavigation

const styles = StyleSheet.create({})