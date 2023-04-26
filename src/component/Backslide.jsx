import { StyleSheet, Text, View , TouchableOpacity} from 'react-native';
import React from 'react';

import Icon from 'react-native-vector-icons/AntDesign';

const Backslide = ({ navigation }) => {
  return (
    <View>
       <View style={styles.backbg}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name='arrowleft' size={26} color='black' />
              </TouchableOpacity>

              <Text style={styles.backbtn}>Back</Text>
            </View>
    </View>
  )
}

export default Backslide

const styles = StyleSheet.create({
    backbtn: {
        fontSize: 18,
        fontWeight: '600',
        fontFamily: 'Roboto',
        marginLeft: 10
      },
      backbg: {
        flexDirection: 'row',
        paddingHorizontal: '5%',
        paddingVertical:'5%',
        height:'45%',
        backgroundColor:'#D9D9D9',
        borderBottomEndRadius:25,
        borderBottomStartRadius:25
      },
})