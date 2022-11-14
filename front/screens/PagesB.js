import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar';
import { storeData, getData } from '../helpers/asyncStorage'
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

const PagesB = () => {

    const [elements, setElements] = useState([])
    const [mangaselected, setMangaSelected] = useState('')
    const [chapterselected, setChapterSelected] = useState('')
    const [userId, setUserId] = useState('') 


    useEffect(() => {
        console.log('cargo reader')

        getData('mangaselected').then(result => {
            setMangaSelected(result)
        })
        getData('chapterselected').then(result => {
            setChapterSelected(result)
        })
        getData('userId').then(result => {
            setUserId(result)
        })

    }, [])

    useEffect(() => {
        console.log(mangaselected)
        console.log(chapterselected)

        if (mangaselected !== '' && chapterselected !== '' && userId !== '') {
            async function searchImage() {
                await axios.get('https://backend-mangaread.herokuapp.com/mostrar-pagesb/' + mangaselected + '/' + chapterselected + '/' + userId)
                    .then(res => {
                        setElements(res.data)
                    })
            }
            searchImage()
        }

    }, [mangaselected, chapterselected, userId])

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.containerscroll}>
                <View style={styles.containerMangas}>
                    <Text style={styles.textS}>{mangaselected}</Text>
                    <Text style={styles.textC}>Capitulo: {chapterselected}</Text>
                    {elements.map(elemento => {
                        return (
                            <View style={styles.containerb}>
                                <TouchableOpacity
                                    onPress={() => {

                                    }}
                                    style={styles.button}>
                                    <Text style={styles.textbutton}>
                                        Pagina: {elemento.pagina}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        console.log('dejar de seguir ' + elemento.pagina)
                                        const deleteFollow = async () => {
                                            const res = await axios.delete('https://backend-mangaread.herokuapp.com/borrar-manga/' + elemento.manga + '/' + elemento.capitulo + '/' +elemento.pagina)

                                            const newdata = (elements.filter(element => element.pagina !== elemento.pagina))
                                            setElements(newdata)

                                        }
                                        deleteFollow()
                                    }}
                                    style={styles.buttonsf}>
                                    <Icon name="close" size={30} color="white" />
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

export default PagesB

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
    containerb: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
    
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
    buttonsf: {
        backgroundColor: "red",
        padding: 10,
        marginBottom: 15,
        marginLeft: 10,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        height: 75,
        width: 75,

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

});