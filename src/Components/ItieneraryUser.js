import React from 'react'
import { View, Text, Button} from 'react-native'
import { useState } from "react"
import { useGetItinerariesUserQuery, useRemoveItineraryMutation } from "../../features/citiesAPI"
// import '../styles/ItineraryUser.css'
import ModalEdit from "./Modals/ModalEdit"
// import * as jose from 'jose'

export default function EventItineraries() {

    // const tokenDecoded = jose.decodeJwt(localStorage.getItem('token'))
    const [input, setInput] = useState(false)
    const [idel, setIdel] = useState({})
    // const id = tokenDecoded.id
    const id = '63239ae771c1230c5342c6c8'

    const [destroyItinerary] = useRemoveItineraryMutation()
    const {
        data: elem,
        refetch:comeback

    } = useGetItinerariesUserQuery(id)


    const handleClose = () => {
        setInput(false)
        comeback

    }


    const handleDelete = (e) => {
        let remove = e.target.value
        destroyItinerary(remove)
            .unwrap()
            .then(() => {})
            .then((error) => {
                console.log(error)
            })
        comeback
    }



    let cityShow = (city) => (
        <View >
            <Button onPress={handleDelete} title="Delete" value={city._id} >x</Button>
            <Text > {city.name}</Text>


            <Text >User : {city.user.name}</Text>

            <Text >City:   {city.city.city}</Text>
            <Text >Price: $ {city.price}</Text>
            <Text >Likes:   {city.likes}</Text>
            <Text >Tags:  {city.tags}</Text>
            <Text >Duration: {city.duration}</Text>

            <Button title='Edit' onPress={() => setIdel({
                id: city._id,
                user: city.user.name,
                likes: city.likes,
                cities: city.city.city,
                cityId: city.city._id,
                userId: city.user._id
            }) & setInput(true)} >Edit</Button>
        </View>

    )

    return (
        <View>
            <Text>Itineraries</Text>
            <View >

                {input ? <ModalEdit elemento={idel} onclose={handleClose} /> : elem ? elem.response.map(cityShow) : ''}

            </View>
        </View>


    )

}