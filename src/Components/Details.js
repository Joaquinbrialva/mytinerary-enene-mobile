import React from 'react'
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios'
// import ModalCreate from './Modals/ModalCreate';
import APIurl from '../APIBack';
import { useNavigation } from '@react-navigation/native';

function Details(props) {

    const [cities, setCities] = useState([])
    const [itinerary, setItinerary] = useState(false)

    useEffect(() => {
        axios.get(`${APIurl}/cities/${props.route.params.itemId}`)
            .then(res => setCities([res.data.response]))
            .catch(err => console.error(err))
    }, [])

    const navigation = useNavigation()

    const detailsItem = item => (

        <>
            <View style={styles.container}>
                <View style={styles.imgContainer}>
                    <Image style={styles.img} source={{ uri: item.photo }} />
                </View>
                <View style={styles.info}>
                    <Text style={styles.text}>Name: {item.city}</Text>
                    <Text style={styles.text}>Country: {item.country}</Text>
                    <Text style={styles.text}>Population: {item.population}</Text>
                    <Text style={styles.text}>Fundation: {item.fundation}</Text>
                </View>
                <View style={styles.button}>
                    <Button
                        color="#ABBF7C"
                        title="Check itineraries"
                        onPress={() => navigation.navigate('Itinerary', { itemId: item._id })}
                    />
                </View>
            </View>
        </>
    )

    return (
        <View>
            {cities.map(detailsItem)}
            {/* {itinerary ? <ModalCreate children={cities[0]} onClose={handleClose} /> : cities.map(detailsItem)} */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 30
    },

    imgContainer: {
        marginLeft: 'auto',
        marginRight: 'auto',
    },

    img: {
        width: 320,
        height: 300,
        borderRadius: 10,
    },

    info: {
        marginTop: 20
    },

    text: {
        fontSize: 16,
        marginTop: 5,
    },

    button: {
        marginTop: 20
    }
});

export default Details