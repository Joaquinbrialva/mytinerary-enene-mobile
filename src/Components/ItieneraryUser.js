import React from 'react'
import { View, Text, Button,StyleSheet , ScrollView} from 'react-native'
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
        
       comeback()

    }


    const handleDelete = (e) => {
        let remove = e
      console.log(e)
     destroyItinerary(remove)
         .unwrap()
         .then(() => {console.log('envio')})
         .then((error) => {
             console.log(error)
         })
       comeback()
         
    }



    let cityShow = (city) => (
        <View  style={styles.container}>
            <View style={styles.textButton}>
            <Button  onPress={()=>handleDelete(city._id)} title="X" value={city._id} ></Button>

            </View>
            <Text style={styles.title} > {city.name}</Text>

            <View style={styles.body}>

            <Text style={styles.fixToText} >User : {city.user.name}</Text>

            <Text style={styles.fixToText} >City:   {city.city.city}</Text>
            <Text style={styles.fixToText} >Price: $ {city.price}</Text>
            <Text style={styles.fixToText} >Likes:   {city.likes}</Text>
            <Text style={styles.fixToText} >Tags:  {city.tags}</Text>
            <Text style={styles.fixToText} >Duration: {city.duration}</Text>
            </View>

            <View style={styles.button}>
            <Button title='Edit' onPress={() => setIdel({
                id: city._id,
                user: city.user.name,
                likes: city.likes,
                cities: city.city.city,
                cityId: city.city._id,
                userId: city.user._id
            }) & setInput(true)} >Edit</Button>

            </View>
        </View>

    )

    return (
        <View>
            {!input ? <Text style={styles.h1}>Itineraries</Text> : null}
            <View >

                {input ? <ModalEdit elemento={idel} onclose={handleClose} /> : elem ? elem.response.map(cityShow) : ''}

            </View>
        </View>


    )

}

const styles = StyleSheet.create({
    container: {
      marginLeft:50,
      marginTop:50,
      justifyContent:'space-around',
      alignItems:'center',

      width:300,
      height:400,
      borderRadius:10,
      overflow:'hidden',
      backgroundColor :'white',
      borderWidth:1
    },

    body:{
    justifyContent:'center',
    backgroundColor:'#E0E0E0',
    width:400,
    height:200
    
    },

    h1:{
    textAlign:'center',
    fontSize : 20,
    marginTop:20,
    fontStyle:'italic',
    backgroundColor:'#FFB266',
    textDecorationLine:'underline',
    height:30
    
    },

    title: {
      textAlign: 'center',
      textDecorationLine:'underline',
      fontSize:20,
      color:'green',
      fontStyle:'italic',
    },
    fixToText: {
      justifyContent: 'space-between',
      fontStyle:'italic',

      marginBottom:8,
      textAlign:'center',
      borderBottom:5,
      fontSize:15
    },

    inputs:{



      borderRadius:5,
      width:200,
      height:30,
      color:'black',
      backgroundColor: '#FFFFFF',
      borderWidth:0.5

    },
    button: {
      marginTop:20,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 5,
      paddingHorizontal: 25,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: '#FFB266',
    },
    textButton: {
        marginRight:240,
    },


  });