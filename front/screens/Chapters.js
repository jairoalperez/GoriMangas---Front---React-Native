import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar';
import { storeData, getData } from '../helpers/asyncStorage'
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";

const Chapters = () => {

    const navigation = useNavigation();

    const [elements, setElements] = useState([])
    const [mangaselected, setMangaSelected] = useState('')
    const [userId, setUserId] = useState('') 

    useEffect(() => {
        console.log('cargo chapters')

        getData('mangaselected').then(result => {
            setMangaSelected(result)
        })
        getData('userId').then(result => {
            setUserId(result)
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

    const followManga = async () => {
        const res = await axios.post('https://backend-mangaread.herokuapp.com/registro', {
          id_usuario: userId,
          seguido: mangaselected,
        },
        console.log('Conexion Satisfactoria')
        )
        console.log(res.data)
        Alert.alert('Siguiendo!')
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.containerscroll}>
                <View style={styles.containerMangas}>
                    <Text style={styles.textS}>{mangaselected}</Text>
                    <TouchableOpacity
                                    onPress={() => {
                                        if (userId === 'nouser') {
                                            Alert.alert('registrate para poder seguir mangas!') 
                                        } else {
                                            followManga()
                                        }
                                    }}
                                    style={styles.buttonseguir}>
                                    <Text style={styles.textbutton}>
                                        Seguir
                                    </Text>
                                </TouchableOpacity>

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
        marginBottom: 10,
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
    buttonseguir: {
        backgroundColor: "black",
        padding: 10,
        marginBottom: 70,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        width: 100,

    },
    textbutton: {
        fontSize: 20,
        color: "white",

    },

});