import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();

import TabNavigation from './TabNavigation';

const SlideNavigation = () => {
  return (
    <Drawer.Navigator
    screenOptions={{
        
    }}
    >
      <Drawer.Screen name="Hometab" component={TabNavigation} />
      {/* <Drawer.Screen name="Article" component={Article} /> */}
    </Drawer.Navigator>
  )
}

export default SlideNavigation

const styles = StyleSheet.create({})