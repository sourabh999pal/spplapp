import { StyleSheet, TouchableOpacity, Text, View, Modal, Dimensions } from 'react-native';
import React, { useState } from 'react';

import Icon1 from 'react-native-vector-icons/Entypo';
import { ScrollView } from 'react-native-gesture-handler';

var screenSize = Dimensions.get('window');

var screenWidth = screenSize.width;
var screenHeight = screenSize.height;

var halfscreenWidth = (screenWidth - 44) / 2;

const Dropdown = ({ daata, value, onSelect, name }) => {




  const [showoption, setShowoption] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);




  const dropDownFunc = () => {
    setShowoption(true);
    setModalVisible(true);
  }

  const selecteditems = (e) => {
    setShowoption(false);
    setModalVisible(false);
    onSelect(e)

  }

  const modalbg = (e) => {
    if (modalVisible) {
      setModalVisible(false);
      setShowoption(false);
    }
  }


  return (
    <>
      <TouchableOpacity onPress={() => dropDownFunc()}>
        <View style={styles.Dropdowni}>
          <Text style={{ fontSize: 16, color: 'black' }}>{!!value ? value : name} </Text>
          <Icon1 name='chevron-small-down' size={25} color='black' style={{ position: 'absolute', right: '6%', top: '55%', transform: [{ rotate: modalVisible ? '180deg' : '0deg' }] }} />
        </View>
      </TouchableOpacity>


      {showoption &&

        <View style={modalVisible ? styles.modalbackdrop : null} >


          <Modal transparent={true}
            animationType="none"
            style={{}}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View><Text style={styles.close} onPress={(e) => modalbg()}></Text></View>


            <View style={styles.dropModal}>
              <ScrollView scrollEnabled={true}>
                {daata.map((e) => (

                  <View key={e._id} style={styles.option}>
                    <TouchableOpacity onPress={() => selecteditems(e)}>
                      <View style={{}}>
                        <Text style={{
                          fontSize: 15,
                          color: 'black',
                          padding: 5,
                          textAlign: 'center',
                          borderBottomWidth: 1,
                          borderBottomColor: 'rgba(0,0,0,0.25)',
                          paddingVertical: 10,
                        }}>{e.name}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                ))}
              </ScrollView>
            </View>

          </Modal>
        </View>

      }


    </>
  )
}


export default Dropdown

const styles = StyleSheet.create({
  modalbackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    width: screenWidth,
    height: '100%',
    position: 'absolute',
    zIndex: 9,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    transform: [{ scale: 3 }],
    justifyContent: 'center',
    alignContent: 'center',

  },
  modalcont: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignContent: 'center',
  },
  dropModal: {
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'rgba(255,255,255,1)',
    padding: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    position: 'absolute',
    bottom: 0,
    left: 10,
    width: (screenWidth - 20),
    maxHeight: 400,
    overflow: 'hidden',
  },
  option: {
    fontSize: 15,
    backgroundColor: 'white',
    borderRadius: 2,
    marginHorizontal: 'auto',
    justifyContent: 'center',
    alignContent: 'center',


  },
  dropMain: {
    backgroundColor: '#cccccc',
  },
  Dropdowni: {
    height: 52,
    fontWeight: '400',
    borderWidth: 1,
    padding: 13,
    backgroundColor: 'white',
    marginVertical: '2%',
    flexDirection: 'row',
  },
  input: {
    fontSize: 15,
    fontWeight: '400',
    paddingLeft: 10,
    marginVertical: '2%',
    fontFamily: 'roboto',
    borderWidth: 1,
    height: 52,
    backgroundColor: 'white'
  },
  close: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: 'rgba(0,0,0,0)',

  },
})