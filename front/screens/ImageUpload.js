import { View, Text, StyleSheet, Touchable, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker'
import axios from 'axios'
import NavBar from '../components/NavBar';
import { storeData, getData } from '../helpers/asyncStorage'

const ImageUpload = () => {

    const [userId, setUserId] = useState('')

    useEffect(() => {
        console.log('cargo imageupload')

        getData('userId').then(result => {
            setUserId(result)
        })
    }, [])

    useEffect(() => {
        console.log(userId)
    }, [userId])

    const [image, setImage] = useState('')
    const [imgdata, setImgdata] = useState({
        nombre: '',
        capitulo: '',
        pagina: '',
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
        formData.append('autor', userId)
        formData.append('capitulo', imgdata.capitulo)
        formData.append('pagina', imgdata.pagina)

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
            Alert.alert(res.data)

        } catch (error) {
            console.log(error.message)
        }

    }

    return (
        <View style={styles.container}>
            <View style={styles.containerimg}>
            <Text style={styles.textS}>Subir Pagina</Text>

                <TextInput
                    style={styles.tinputu}
                    keyboardType='default'
                    placeholder='Titulo del Manga'
                    placeholderTextColor='gray'
                    onChangeText={(value) => handleChangeText('nombre', value)} />

                <TextInput
                    style={styles.tinputp}
                    keyboardType='default'
                    placeholder='Capitulo'
                    placeholderTextColor='gray'
                    onChangeText={(value) => handleChangeText('capitulo', value)} />

                <TextInput
                    style={styles.tinputp}
                    keyboardType='default'
                    placeholder='Pagina'
                    placeholderTextColor='gray'
                    onChangeText={(value) => handleChangeText('pagina', value)} />

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
            <NavBar />
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
        fontSize: 25,
        color: "black",
        textAlign: 'center',
        fontWeight: 'bold'
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
    textS: {
        fontSize: 50,
        marginBottom: 10,
        fontWeight: 'bold',
      },

});
