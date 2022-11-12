import { View, Text, StyleSheet, Touchable, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
//import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios'

const ImageUpload = () => {

    const [image, setImage] = useState('')
    const [imgdata, setImgdata] = useState({
        nombre: '',
        autor: '',
        capitulo: '',
    })

    const handleChangeText = (nombre, value) => {
        setImgdata({ ...imgdata, [nombre]: value })
    }

    const openLibrary = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();

        if (status !== 'granted') {
            alert('Permiso para la camara denegado')
        }
        if (status === 'granted') {
            const res = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
            })
            if (!res.cancelled) {
                setImage(res)
            }
        }
    }

    const uploadImage = async () => {

        const mangadata = {
            name: new Date().getTime() + '_manga',
            uri: image.uri,
            type: 'image/jpg',
        }

        const mdstring = JSON.stringify(mangadata)

        const formData = new FormData()
        formData.append("manga", mangadata)
        formData.append('nombre', imgdata.nombre)
        formData.append('autor', imgdata.autor)
        formData.append('capitulo', imgdata.capitulo)

        try {
            const res = await axios.post('https://backend-mangaread.herokuapp.com/upload', formData, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            },
                console.log('conexion satisfactoria')
            )
            console.log(res.data)

        } catch (error) {
            console.log(error.message)
        }

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
            if (res.data == 1) {
                Alert.alert('Login Satisfactorio')
                console.log('Login Satisfactorio')
                getuser()
                navigation.navigate('Profile')
            } else {
                Alert.alert('Datos Incorrectos')
                console.log('Datos Incorrectos')
            }

        }
        fetchlogin()
    }

    const fillFormData = () => {

    }




    return (
        <View style={styles.container}>
            <View style={styles.containerimg}>



                <TextInput
                    style={styles.tinputu}
                    keyboardType='default'
                    placeholder='Titulo del Manga'
                    placeholderTextColor='gray'
                    onChangeText={(value) => handleChangeText('nombre', value)} />

                <TextInput
                    style={styles.tinputp}
                    keyboardType='default'
                    placeholder='Autor del Manga'
                    placeholderTextColor='gray'
                    onChangeText={(value) => handleChangeText('autor', value)} />

                <TextInput
                    style={styles.tinputp}
                    keyboardType='default'
                    placeholder='Capitulo'
                    placeholderTextColor='gray'
                    onChangeText={(value) => handleChangeText('capitulo', value)} />

                <TouchableOpacity onPress={openLibrary} style={styles.uploadBtn}>
                    <Text style={styles.textbutton}>
                        Upload Image
                    </Text>
                </TouchableOpacity>
                <View style={styles.containerimg}>
                    {image ? (<Image source={{ uri: image.uri }} style={styles.image} />) : null}
                </View>

                {image ? (
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
    tinputu: {
        height: 40,
        marginTop: 80,
        padding: 10,
        height: 50,
        width: 250,
        borderRadius: 40,
        backgroundColor: "white",
    
      },
      tinputp: {
        height: 40,
        marginTop: 12,
        padding: 10,
        height: 50,
        width: 250,
        borderRadius: 40,
        backgroundColor: "white"
    
      },

});
