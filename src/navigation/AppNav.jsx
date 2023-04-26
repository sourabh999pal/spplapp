import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import Navigation from './Navigation';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './TabNavigation';
import SlideNavigation from './SlideNavigation';

import AsyncStorage from '@react-native-async-storage/async-storage';



const AppNav = () => {
  const [isLogged, setIsLogged] = useState(false);
  
  const [loading, setLoading] = useState(false);

  const Authorized = async () => {
    try {
      const data = await AsyncStorage.getItem("keepLoggedIn");
      setIsLogged(data); 
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    Authorized();
   
    setTimeout(() => setLoading(false), 1000)
  }, [])



  return (
    loading ? <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: '90%' }} />
      :

      <NavigationContainer >
        {isLogged ?  <TabNavigation /> : <Navigation />}
        
      </NavigationContainer>
  )
}

export default AppNav

const styles = StyleSheet.create({})