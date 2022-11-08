import { View, StyleSheet, Text, Image, TouchableOpacity, Alert, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar';

const Profile = () => {

    useEffect(() => {
        console.log('cargo profile')
    }, [])

    if (localStorage.getItem('userId') == 'nouser') {
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

                    <Text style={styles.username}>{localStorage.getItem('username')}</Text>

                    <View style={styles.containerbio}>
                        <Text style={styles.nombre}>{localStorage.getItem('name')}</Text>
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
        backgroundColor: "gold",
        width: '100%'

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