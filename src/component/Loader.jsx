import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'

const Loader = () => {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({
    
})