import { View, StyleSheet, Text, Image, TouchableOpacity, Alert, ScrollView, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar';
import { storeData, getData } from '../helpers/asyncStorage'
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

const Profile = () => {

    const [userId, setUserId] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')

    const [elements, setElements] = useState([])

    const [refresh, setRefresh] = useState(false)

    const pullMe = () => {
        setRefresh(true)
        setTimeout(() => {
            setRefresh(false)
            console.log('pagina refrescada')
            if (userId !== '' && userId !== 'nouser') {
                async function searchMangas() {
                    await axios.get('https://backend-mangaread.herokuapp.com/buscar-seguido/' + userId)
                        .then(res => {
                            setElements(res.data)
                        })
                }
                searchMangas()
                console.log('busqueda ready')
            }
        }, 3000)
    }

    const navigation = useNavigation();

    useEffect(() => {
        console.log('cargo profile')

        getData('username').then(result => {
            setUsername(result)
        })
        getData('email').then(result => {
            setEmail(result)
        })
        getData('name').then(result => {
            setName(result)
        })
        getData('userId').then(result => {
            setUserId(result)
        })
    }, [])

    useEffect(() => {
        console.log('cargo profile')

        if (userId !== '' && userId !== 'nouser') {
            async function searchMangas() {
                await axios.get('https://backend-mangaread.herokuapp.com/buscar-seguido/' + userId)
                    .then(res => {
                        setElements(res.data)
                    })
            }
            searchMangas()
            console.log('busqueda ready')
        }
        
    }, [userId])

    

    if (userId == 'nouser') {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Register')
                    }}
                    style={styles.buttonregister}>
                    <Text style={styles.textbuttonr}>
                        Registrarse
                    </Text>
                </TouchableOpacity>
                <NavBar />
            </View>
        )
    } else {
        return (
            <View style={styles.container}>

                <ScrollView contentContainerStyle={styles.containerusername}
                refreshControl={<RefreshControl
                refreshing={refresh}
                onRefresh={()=>pullMe()}
                />}
                >

                    <Text style={styles.username}>{username}</Text>

                    <View style={styles.containerbio}>
                        <Text style={styles.nombre}>{name}</Text>
                    </View>

                    <View style={styles.containerbotones}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('ImageUpload')
                            }}
                            style={styles.button}>
                            <Text style={styles.textbutton}>
                                Subir Manga
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.mangas}>
                        Mangas Seguidos
                    </Text>

                    {elements.map(elemento => {
                        return (
                            <View style={styles.containerb}>
                                <TouchableOpacity
                                    onPress={() => {
                                        storeData('mangaselected', elemento.seguido)
                                        navigation.navigate('Chapters')
                                    }}
                                    style={styles.buttonm}>
                                    <Text style={styles.textbuttonm}>
                                        {elemento.seguido}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        console.log('dejar de seguir '+elemento.seguido)
                                        const deleteFollow = async () => {
                                            const res = await axios.delete('https://backend-mangaread.herokuapp.com/borrar-seguido/'+userId+'/'+elemento.seguido)

                                            const newdata = (elements.filter(element => element.seguido !== elemento.seguido))
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

                </ScrollView>

                <NavBar />

            </View>
        )
    }

}

export default Profile

/*---------------------------------------------------------------------------------------
------------------------------------- Estilos -------------------------------------------
---------------------------------------------------------------------------------------*/
const styles = StyleSheet.create({

    container: {
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "gold",
        width: '100%'

    },
    containerusername: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: "gold",
        width: '100%',
        marginTop: 50,

    },
    containerbio: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: "gold",
        textAlign: 'left',
        padding: 10,
        marginBottom: 5,

    },
    containerbotones: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "gold",
        marginBottom: 20

    },
    containerb: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
    
      },
    username: {
        marginTop: 20,
        fontSize: 50,
        color: "black",
        marginBottom: 10,
        fontWeight: 'bold'

    },
    nombre: {
        fontSize: 25,
        color: "black",
        marginBottom: 20,
        fontWeight: 'bold',
        padding: 10,

    },
    textbutton: {
        fontSize: 20,
        color: "white",

    },
    button: {
        backgroundColor: "black",
        padding: 10,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        width: 150,

    },
    mangas: {
        marginTop: 30,
        fontSize: 30,
        color: "black",
        marginBottom: 30,
        fontWeight: 'bold'

    },
    buttonregister: {
        backgroundColor: 'darkgoldenrod',
        padding: 10,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        width: 200,

    },
    textbuttonr: {
        fontSize: 20,
        color: "white",

    },
    buttonm: {
        backgroundColor: "darkgoldenrod",
        padding: 10,
        marginBottom: 15,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        height: 75,
        width: 250,

    },
    textbuttonm: {
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

});