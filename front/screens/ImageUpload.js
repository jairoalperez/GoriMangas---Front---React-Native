import { View, Text, StyleSheet, Touchable, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import axios from 'axios'

const ImageUpload = () => {

    const [image, setImage] = useState('')

    const openLibrary = async () => {
        const {status} = await ImagePicker.requestCameraPermissionsAsync();
        
        if (status !== 'granted') {
            alert('Permiso para la camara denegado')
        }
        if (status === 'granted') {
            const res = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true
            })
            if (!res.cancelled){
                console.log(res)
                setImage(res.uri)
            }
        }
    }

    const uploadImage = () => {
        const fetchUpload = async () => {

            const res = await axios.post('/upload-image', data, {

            })
        }
        fetchUpload()
    }

    const loginapp = () => {
        const fetchlogin = async () => {
          const res = await axios.post('https://backend-mangaread.herokuapp.com/login', {
            username: log.username,
            password: log.pass
          },
            console.log('Conexion Satisfactoria'),
          )
          console.log(res.data)
          if(res.data == 1) {
            Alert.alert('Login Satisfactorio')
            console.log('Login Satisfactorio')
            getuser()
            navigation.navigate('Profile')
          }else {
            Alert.alert('Datos Incorrectos')
            console.log('Datos Incorrectos')
          }
          
        }
        fetchlogin()
      }




    return (
        <View style={styles.container}>
            <View style={styles.containerimg}>
                <TouchableOpacity onPress={openLibrary} style={styles.uploadBtn}>
                    <Text style={styles.textbutton}>
                        Upload Image
                    </Text>
                </TouchableOpacity>
                <View style={styles.containerimg}>
                    {image ? (<Image source={{uri: image}} style={styles.image}/>):null}
                </View>
                
                {image? (
                    <Text style={styles.skip} onPress={uploadImage}>
                        Upload
                    </Text>
                ) : null}
                
                
            </View>
        </View>
    )
}

export default ImageUpload

/*---------------------------------------------------------------------------------------
------------------------------------- Estilos -------------------------------------------
---------------------------------------------------------------------------------------*/
const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "gold",

    },
    containerimg: {
        justifyContent: "center",
        alignItems: "center",
    },
    uploadBtn: {
        backgroundColor: "darkgoldenrod",
        padding: 10,
        marginTop: 30,
        marginBottom: 100,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        width: 300,
    },
    textbutton: {
        fontSize: 20,
        color: "white",
    },
    skip: {
        fontSize: 20,
        color: "black",
        textAlign: 'center'
    },
    image: {
        height: 184,
        width: 368,
        marginBottom: 30
    
    },

});
