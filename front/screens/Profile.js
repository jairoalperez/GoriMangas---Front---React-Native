import { View, StyleSheet, Text, Image, TouchableOpacity, Alert, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar';
import { storeData, getData } from '../helpers/asyncStorage'
import { useNavigation } from "@react-navigation/native";

const Profile = () => {

    const [userId, setUserId] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')

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

                <ScrollView contentContainerStyle={styles.containerusername}>

                    <Text style={styles.username}>{username}</Text>

                    <View style={styles.containerbio}>
                        <Text style={styles.nombre}>{name}</Text>
                    </View>

                    <View style={styles.containerbotones}>
                        <TouchableOpacity
                            onPress={() => {
                                console.log('Presionaste el boton de Configuracion')
                                /*getData('username').then(result => {
                                    alert('value: '+result)
                                })*/

                                console.log(userId)
                                console.log(email)
                                console.log(name)
                                console.log(username)
                            }}
                            style={styles.button}>
                            <Text style={styles.textbutton}>
                                Configuracion
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.mangas}>
                        Mangas Guardados
                    </Text>

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
        backgroundColor: "whitesmoke",
        width: '100%'

    },
    containerbio: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: "whitesmoke",
        textAlign: 'left',
        padding: 10,
        marginBottom: 5,

    },
    containerbotones: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "whitesmoke",
        marginBottom: 20

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
        backgroundColor: "darkslategrey",
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
        marginBottom: 10,
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

});