import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserData = () => {
  const [valida, setValida] = useState(null);


  const Authorized = async () => {
    setValida(await AsyncStorage.getItem('token'));

  }
  useEffect(() => {
    Authorized();
  }, [])
  const data = valida;
  console.log(data);

  // useEffect(() => {
  //   Authorized();
  // }, [])
  return (
    data
  )
}

export default UserData

