import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { useState, useEffect } from "react";
import NavBar from '../components/NavBar';
import axios from 'axios'

const Manga = () => {

  const [search, setSearch] = useState({
    word: '',
  })

  const [elements, setElements] = useState({
    element: []
  })

  const handleChangeText = (word, value) => {
    setSearch({ ...search, [word]: value })
  }

  const searchImage = async () => {
    const res = await axios.get('https://backend-mangaread.herokuapp.com/buscar-manga/' + search.word)
    const datos = res.data
    setElements({ element: datos })
  }


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.containerscroll}>
        <TextInput
          style={styles.tinputu}
          keyboardType='default'
          placeholder='Titulo del Manga'
          placeholderTextColor='gray'
          onChangeText={(value) => handleChangeText('word', value)} />

        <TouchableOpacity
          onPress={() => {
            searchImage()
          }}
          style={styles.button}>
          <Text style={styles.textbutton}>
            Buscar
          </Text>
        </TouchableOpacity>
        <View style={styles.containerMOVIES}>
          {elements.element.map(elemento => {
            return (
              <View>
                <Text>
                  Capitulo: {elemento.capitulo}, Manga: {elemento.manga}
                </Text>
                <Image
                  style={{ width: 200, height: 400 }}
                  source={{ uri: elemento.url }}
                />
              </View>
            )
          })}
        </View>
      </ScrollView>
      <NavBar />
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
  containerscroll: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 420

  },
  containerMOVIES: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "darkgoldenrod",
    marginTop: 10,
    marginBottom: 10,
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
  button: {
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

});