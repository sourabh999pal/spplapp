import { Linking, Alert, StyleSheet, Text, View, Touchable, TouchableOpacity } from 'react-native';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';
import React from 'react';

const Utils = () => {

    const sleep = async (timeout) => {
        return (
            new Promise(resolve => setTimeout(resolve, timeout))
        )
    }
    const openLink = async () => {
        try {
            const url = 'https://sarkariresult.com'
            if (await InAppBrowser.isAvailable()) {
                const result = await InAppBrowser.open(url, {

                    showTitle: false,
                    toolbarColor: '#6200EE',
                    secondaryToolbarColor: 'black',
                    navigationBarColor: 'black',
                    navigationBarDividerColor: 'white',
                    enableUrlBarHiding: true,
                    enableDefaultShare: true,
                    forceCloseOnRedirection: false,
                    // Specify full animation resource identifier(package:anim/name)
                    // or only resource name(in case of animation bundled with app).
                    animations: {
                        startEnter: 'slide_in_right',
                        startExit: 'slide_out_left',
                        endEnter: 'slide_in_left',
                        endExit: 'slide_out_right'
                    },
                    headers: {
                        'my-custom-header': 'my custom header value'
                    }
                })
                await this.sleep(800);
                Alert.alert(JSON.stringify(result))
            }
            else Linking.openURL(url)

        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <View>
            
            <TouchableOpacity onPress={openLink}>
                <Text>click here</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Utils

const styles = StyleSheet.create({})