import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar';
import axios from 'axios';
import { storeData, getData } from '../helpers/asyncStorage'
import { useNavigation } from "@react-navigation/native";


const Dashboard = () => {

  const navigation = useNavigation();

  const [elements, setElements] = useState([])

  useEffect(() => {
    console.log('cargo dashboard')

    async function searchImage() {
      await axios.get('https://backend-mangaread.herokuapp.com/mostrar-mangas')
        .then(res => {
          setElements(res.data)
        })

    }
    searchImage()

  }, [])

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.containerscroll}>
        <View style={styles.containerMangas}>
          <Text style={styles.textS}>Manga List</Text>
          {elements.map(elemento => {
            return (
              <View>
                <TouchableOpacity
                  onPress={() => {

                    storeData('mangaselected', elemento.manga)
                    navigation.navigate('Chapters')

                  }}
                  style={styles.button}>
                  <Text style={styles.textbutton}>
                    {elemento.manga}
                  </Text>
                </TouchableOpacity>
              </View>
            )
          })}
        </View>
      </ScrollView>
      <NavBar />
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
  containerscroll: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 80,
    width: 420

  },
  containerMangas: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gold",
    marginTop: 10,
    marginBottom: 10,
  },
  textS: {
    fontSize: 50,
    marginBottom: 80,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: "darkgoldenrod",
    padding: 10,
    marginBottom: 15,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    height: 75,
    width: 250,

  },
  textbutton: {
    fontSize: 20,
    color: "white",

  },

});