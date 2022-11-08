import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import NavBar from '../components/NavBar';

const Manga = () => {
  return (
    <View style={styles.container}>
      <Text>Manga</Text>
      <NavBar/>
    </View>
  )
}

export default Manga

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
  
  });