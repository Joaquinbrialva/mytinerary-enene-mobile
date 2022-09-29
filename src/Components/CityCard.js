import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react';
import APIurl from '../APIBack'
import { ScrollView } from 'react-native-gesture-handler';

export default function CityCard() {

    const [cities, setCities] = useState([])

    useEffect(() => {
        axios.get(`${APIurl}/cities/?city=all`)
            .then(res => setCities(res.data.response))
            .catch(err => console.error(err))
    }, [])

    const card = item => {

        return (
            <View className="card">
                <View className="container-img">
                    <Image style={styles.logo} source={{ uri: item.photo }} />
                </View>
                <View className="card-content">
                    <Text>Country: {item.country}</Text>
                    <Text>City: {item.city}</Text>
                    {/* <View className="btns-container">
                        
                    </View> */}
                </View>
            </View>
        )
    }

    return (
        <>
            <ScrollView>
                {cities.map(card)}
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: 200,
        height: 100,
    },
});