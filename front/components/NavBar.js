import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';

const NavBar = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity 
      onPress={() => {
        navigation.navigate('Dashboard'), 
        console.log('Presionaste el boton de Inicio')
      }}
      style={styles.button}>
        <Icon name="home" size={30} color="white" />
      </TouchableOpacity>

      <TouchableOpacity 
      onPress={() => {
        navigation.navigate('Manga'), 
        console.log('Presionaste el boton de Buscar')
      }}
      style={styles.button}>
        <Icon name="search" size={30} color="white" />
      </TouchableOpacity>

      <TouchableOpacity 
      onPress={() => {
        navigation.navigate('Profile'), 
        console.log('Presionaste el boton de Perfil')
      }}
      style={styles.button}>
        <Icon name="user" size={30} color="white" />
      </TouchableOpacity>
      
      <TouchableOpacity 
      onPress={() => {
        localStorage.clear()
        navigation.navigate('Home'), 
        console.log('Presionaste el boton de LogOut')
      }}
      style={styles.button}>
        <Icon name="close" size={30} color="white" />
      </TouchableOpacity>

    </View>
  )
}

export default NavBar


const styles = StyleSheet.create({

    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row'
        
    },
    button: {
        flex: 1,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'darkgoldenrod',
        
    },
    textbutton: {
        fontSize: 20,
        color: "white",
        

      },

})