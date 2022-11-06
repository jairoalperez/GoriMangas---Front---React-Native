import React, {useEffect} from 'react'
import {View, StyleSheet, Text, TouchableOpacity} from "react-native";

    

const Home = ({navigation}) => {

    useEffect(() => {
        console.log('cargo home')
    }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        GoriMangas
      </Text>
    
      <TouchableOpacity
      onPress={() => {
        navigation.navigate('Login')
      }}
      style={styles.buttonlogin}>
        <Text style={styles.textbuttonl}>
          Iniciar Sesion
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
      onPress={() => {
        navigation.navigate('Register')
      }}
      style={styles.buttonregister}>
        <Text style={styles.textbuttonr}>
          Registrarse
        </Text>
      </TouchableOpacity>
      
        </View>
    )
};

export default Home


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
    image: {
      height: 184, 
      width: 368,
  
    },
    buttonlogin: {
      backgroundColor: "white",
      padding: 10,
      marginTop: 80,
      marginBottom: 10,
      borderRadius: 40,
      justifyContent: "center",
      alignItems: "center",
      height: 50, 
      width: 150,
    
    },
    buttonregister: {
      backgroundColor: 'darkgoldenrod',
      padding: 10,
      borderRadius: 40,
      justifyContent: "center",
      alignItems: "center",
      height: 50, 
      width: 150,
    
    },
    textbuttonl: {
      fontSize: 20,
      
    },
  
    textbuttonr: {
      fontSize: 20,
      color: "white",
      
    },

});