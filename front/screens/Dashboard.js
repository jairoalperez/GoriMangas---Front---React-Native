import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import NavBar from '../components/NavBar';

const Dashboard = () => {
  return (
    <View style={styles.container}>
      <Text>Dashboard</Text>
      <NavBar/>
    </View>
  )
}

export default Dashboard

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