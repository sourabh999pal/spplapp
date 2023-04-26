import React, { useState, useEffect } from 'react';
import {Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";


const Demo = async () => {
  
  const token = await AsyncStorage.getItem('token');

  const _id = await jwt_decode(token).id;

  const name = await jwt_decode(token).name;
  
  return {token,_id,name}; 
};

export default Demo;