import React, { useState, useEffect } from 'react'
import socketio from 'socket.io-client'
import { Alert, SafeAreaView, ScrollView, TouchableOpacity, Platform, StatusBar, StyleSheet, Image, AsyncStorage } from 'react-native'

import SpotList from '../components/SpotList'

import logo from '../assets/logo.png'

export default function List({ navigation }) {

    const [techs, setTechs] = useState([])

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.15.13:3333', {
                query: { user_id }
            })

            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA' }`)
            })

        })
    }, [])

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storageTechs => {
            const techsArray = storageTechs.split(',').map(tech => tech.trim())

            setTechs(techsArray)
        })
    }, [])

    const handleLogout = () => {
        AsyncStorage
          .setItem('user', '')
          .then(() => {
            navigation.navigate('Login')
          })
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={handleLogout}>
                <Image style={styles.logo} source={logo} />
            </TouchableOpacity>    

            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech} />)}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },

    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 10
    }

})