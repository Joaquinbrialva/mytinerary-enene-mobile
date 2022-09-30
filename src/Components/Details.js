import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios'
// import ModalCreate from './Modals/ModalCreate';
import APIurl from '../APIBack';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Details(props) {

    const [cities, setCities] = useState([])

    useEffect(() => {
        axios.get(`${APIurl}/cities/${props.route.params.itemId}`)
            .then(res => setCities([res.data.response]))
            .catch(err => console.error(err))
    }, [])

    const navigation = useNavigation()

    const detailsItem = item => (
        <>
            <View className="details-container">
                <View className="details-img-body">
                    <View>
                        <Image style={styles.logo} source={{ uri: item.photo }} />
                    </View>
                </View>
                <View className='details-body'>
                    <Text>Name: {item.city}</Text>
                    <Text>Country: {item.country}</Text>
                    <Text>Population: {item.population}</Text>
                    <Text>Fundation: {item.fundation}</Text>
                </View>
                <Button
                    color="#ABBF7C"
                    title="Check itineraries"
                    onPress={() => navigation.navigate('Itinerary', { itemId: item._id })}
                />
            </View>
        </>
    )

    return (
        <View className='main-content'>
            {cities.map(detailsItem)}
            {/* {itinerary ? <ModalCreate children={cities[0]} onClose={handleClose} /> : cities.map(detailsItem)} */}
        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: 200,
        height: 100,
    },
});

export default Details