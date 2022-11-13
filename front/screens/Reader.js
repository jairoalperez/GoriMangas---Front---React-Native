import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar';
import { storeData, getData } from '../helpers/asyncStorage'
import axios from 'axios';

const Reader = () => {

  const [elements, setElements] = useState([])
  const [mangaselected, setMangaSelected] = useState('')
  const [chapterselected, setChapterSelected] = useState('')
  

  useEffect(() => {
    console.log('cargo reader')

    getData('mangaselected').then(result => {
        setMangaSelected(result)
    })
    getData('chapterselected').then(result => {
        setChapterSelected(result)
    })

  }, [])

  useEffect(() => {
    console.log(mangaselected)
    console.log(chapterselected)

    if (mangaselected !== '' && chapterselected !== ''){
        async function searchImage() {
            await axios.get('https://backend-mangaread.herokuapp.com/buscar-cap/'+mangaselected+'/'+chapterselected)
              .then(res => {
                setElements(res.data)
              })
          }
          searchImage()
    }

  }, [mangaselected, chapterselected])

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.containerscroll}>
        <View style={styles.containerMangas}>
          <Text style={styles.textS}>{mangaselected}</Text>
          <Text style={styles.textC}>Capitulo: {chapterselected}</Text>
          {elements.map(elemento => {
            return (
                <View>
                <Image
                  style={{ width: 380, height: 571, marginTop: 5, marginBottom: 5 }}
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

export default Reader

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
    marginTop: 50,
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
    fontWeight: 'bold',
  },
  textC: {
    fontSize: 25,
    marginBottom: 20,
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