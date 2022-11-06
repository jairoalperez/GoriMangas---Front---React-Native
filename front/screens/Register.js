import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Alert, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';

const Register = () => {

    useEffect(() => {
        console.log('cargo register')
    }, [])

    const navigation = useNavigation();

    //Se declara el state user con los parametros que recibiran de los text input
    const [user, setUser] = useState({
        name: '',
        user: '',
        email: '',
        pass: '',
        passc: ''
    })

    //Se utiliza para setear los parametros del state user
    const handleChangeText = (name, value) => {
        setUser({ ...user, [name]: value })
    }

    //HTTP Register
    const registerapp = () => {
      const fetchregister = async () => {
        const res = await axios.post('https://backend-mangaread.herokuapp.com/registro', {
          username: user.user,
          correo: user.email,
          nombre: user.name,
          contraseña: user.pass,
          verificarclave: user.passc
        },
        console.log('Conexion Satisfactoria')
        )
        console.log(res.data)
      }
      fetchregister()
    }



    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                REGISTRARSE
            </Text>

            <TextInput
            style={styles.tinput1} 
            keyboardType='default'
            placeholder='Nombre Completo'
            placeholderTextColor= 'gray'
            onChangeText={(value) => handleChangeText('name', value)}/>

            <TextInput
            style={styles.tinput} 
            keyboardType='default'
            placeholder='Username'
            placeholderTextColor= 'gray'
            onChangeText={(value) => handleChangeText('user', value)}/>

            <TextInput
            style={styles.tinput} 
            keyboardType='email-address'
            placeholder='Correo Electronico'
            placeholderTextColor= 'gray'
            onChangeText={(value) => handleChangeText('email', value)}/>

            <TextInput
            secureTextEntry={true} 
            style={styles.tinput} 
            keyboardType='default'
            placeholder='Contraseña'
            placeholderTextColor= 'gray'
            onChangeText={(value) => handleChangeText('pass', value)}/>

            <TextInput
            secureTextEntry={true} 
            style={styles.tinput} 
            keyboardType='default'
            placeholder='Confirmar Contraseña'
            placeholderTextColor= 'gray'
            onChangeText={(value) => handleChangeText('passc', value)}/>

            <TouchableOpacity
                onPress={() => { 

                  //if para confirmar si las contraseñas coinciden.
                  if(user.pass === user.passc){

                    console.log(user.user+' '+user.name+' '+user.email+' '+user.pass)
                    registerapp()

                  }else{
                    console.log('Las contraseñas deben coincidir')
                    Alert.alert('Las contraseñas deben coincidir')
                  }
                    
                }}
                style={styles.button}>
                    <Text style={styles.textbutton}>
                    Registrarse
                    </Text>
            </TouchableOpacity>

        </View>
    )
}

export default Register

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
      title: {
        fontSize: 40,
        marginBottom: 50,
        fontWeight: 'bold',
        color: 'darkgoldenrod'
    
      },
      tinput1: {
        height: 40,
        marginTop: 50,
        padding: 10,
        height: 50, 
        width: 250,
        borderRadius: 40,
        backgroundColor: "white",

      },
      tinput: {
        height: 40,
        marginTop: 12,
        padding: 10,
        height: 50, 
        width: 250,
        borderRadius: 40,
        backgroundColor: "white"
        
      },
      button: {
        backgroundColor: "darkgoldenrod",
        padding: 10,
        marginTop: 30,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        height: 50, 
        width: 150,
      
      },
      textbutton: {
        fontSize: 20,
        color: "white",
        
      },


});