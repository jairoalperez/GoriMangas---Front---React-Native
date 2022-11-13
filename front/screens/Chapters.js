import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar';
import { storeData, getData } from '../helpers/asyncStorage'
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";

const Chapters = () => {

    const navigation = useNavigation();

    const [elements, setElements] = useState([])
    const [mangaselected, setMangaSelected] = useState('')

    useEffect(() => {
        console.log('cargo chapters')

        getData('mangaselected').then(result => {
            setMangaSelected(result)
        })

    }, [])

    useEffect(() => {
        console.log(mangaselected)

        if (mangaselected !== '') {
            async function searchImage() {
                await axios.get('https://backend-mangaread.herokuapp.com/mostrar-caps/' + mangaselected)
                    .then(res => {
                        setElements(res.data)
                    })
            }
            searchImage()
        }

    }, [mangaselected])

    const setChapter = () => {
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.containerscroll}>
                <View style={styles.containerMangas}>
                    <Text style={styles.textS}>{mangaselected}</Text>
                    {elements.map(elemento => {
                        return (
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        storeData('chapterselected', elemento.capitulo.toString())
                                        navigation.navigate("Reader")
                                    }}
                                    style={styles.button}>
                                    <Text style={styles.textbutton}>
                                        Capitulo {elemento.capitulo}
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

export default Chapters

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