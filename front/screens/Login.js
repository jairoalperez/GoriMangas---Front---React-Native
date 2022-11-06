import React from 'react'
import {View, StyleSheet, Text, TouchableOpacity, TextInput, Alert} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import axios from 'axios';

const Login = () => {

    useEffect(() => {
        console.log('cargo login')
    }, [])

    const navigation = useNavigation();

    //Se declara el state log con los parametros del username y password que recibiran de los text input
    const [log, setLog] = useState({
        username: '',
        pass: '',
    })

    //Se utiliza para setear los parametros del state log
    const handleChangeText = (username, value) => {
        setLog({...log, [username]: value})
      }

    //HTTP Login
    const loginapp = () => {
      const fetchlogin = async () => {
        const res = await axios.post('https://backend-mangaread.herokuapp.com/login', {
          username: log.username,
          password: log.pass
        },
        console.log('Conexion Satisfactoria')
        )
        console.log(res.data)
      }
      fetchlogin()
    }

  return (
    <View style={styles.container}>

            <Text style={styles.title}>
                INICIAR SESION
            </Text>

            <TextInput
            style={styles.tinputu} 
            keyboardType='default'
            placeholder='Username'
            placeholderTextColor= 'gray'
            onChangeText={(value) => handleChangeText('username', value)}/>

            <TextInput
            secureTextEntry={true} 
            style={styles.tinputp}
            keyboardType='default'
            placeholder='Contraseña'
            placeholderTextColor= 'gray'
            onChangeText={(value) => handleChangeText('pass', value)}/>

            <TouchableOpacity
                onPress={() => {

                    loginapp()

                  

                }}
                style={styles.button}>
                    <Text style={styles.textbutton}>
                    Iniciar Sesion
                    </Text>
            </TouchableOpacity>

        </View>
    )
};

export default Login


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