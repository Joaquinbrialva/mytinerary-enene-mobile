import { View, Text, Image, StyleSheet, TextInput, Button } from 'react-native'
import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react';
import APIurl from '../APIBack'
import { ScrollView } from 'react-native-gesture-handler';

export default function CityCard() {

    const [cities, setCities] = useState([])
    const [filteredCity, setFilteredCity] = useState('all')

    useEffect(() => {
        axios.get(`${APIurl}/cities/?city=${filteredCity}`)
            .then(res => setCities(res.data.response))
            .catch(err => console.error(err))
    }, [filteredCity])

    
    const card = item => {

        return (
            <ScrollView>
                <View style={styles.card}>
                    <View className="container-img">
                        <Image style={styles.logo} source={{ uri: item.photo }} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Country: {item.country}</Text>
                        <Text style={styles.text}>City: {item.city}</Text>
                        <View style={styles.btnContainer}>
                            <Button
                                onPress={() => console.log(item._id)}
                                title = "See more..."
                                color = "#ABBF7C"
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }

    return (
        <>
            <View style={styles.containerText}>
                <TextInput placeholder='Search city...' style={styles.textInput} type='text' onChangeText={text => text === '' ? setFilteredCity('all') : setFilteredCity(text)}></TextInput>
            </View>
            <ScrollView>
                {cities.length !== 0 ? cities.map(card) : <View><Text>Search not found</Text></View>}
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: 300,
        height: 150,
    },
    card:{
        marginLeft:'auto',
        marginRight:'auto',
        marginTop: 25,
        marginBottom:25,
        alignItems:'center',
        textAlign:'center',
        width:300,
        height:300,
        borderRadius:10,
        overflow:'hidden',
        backgroundColor :'white',
        borderWidth:1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 10,
        backgroundColor:'#E2E2E2',
    },
    textContainer:{
        display:'flex',
        justifyContent: 'center',
        alignItems:'center'
    },
    text: {
        marginTop:25,
        fontWeight:'bold',
        width: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput:{
        marginTop: 25,
        borderWidth:1,
        width: 300,
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: 10,
        fontWeight:'bold',
    },
    btnContainer:{
        marginTop: 10,
        color:'black'
    }
});