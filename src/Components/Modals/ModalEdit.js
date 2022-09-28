import React, { useEffect, useState } from 'react'
import { useEditItineraryMutation } from '../../features/citiesAPI'
import Swal from 'sweetalert2'
import { Button, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
export default function ModalEdit({onclose,elemento}) {

  const [editItinerary]=useEditItineraryMutation()


 const [price,setPrice]=useState()
 const [duration,setDuration]=useState()
 const [tags,setTags]=useState()
 const [name,setName]=useState()
const [edit,setEdit]=useState()

  useEffect(()=>{
    let editItiner ={
      id:elemento.id,
      name:name,
      user:elemento.userId,
      likes:elemento.likes,
      city:elemento.cityId,
      price:price,
      duration:duration,
      tags:tags
    }
    setEdit(editItiner)

  },[elemento.id,elemento.user,elemento.likes,elemento.cityId,price,duration,tags])

  



    const handlePrice = (e) =>{
      setPrice(e.target.value)
    }


    const handleDuration = (e) =>{
      setDuration(e.target.value)
    }

    const handleTags =(e)=>{
      setTags(e.target.value)
    }
    const handleName =(e)=>{
      setName(e.target.value)
    }


    const handleSubmit = (e)=>{
        e.preventDefault()

        if(edit.name.length < 5 ){
          Swal.fire({
              title:'Name Failed',
              text:'please verify that the name has more than 5 letters , the name must be a descriptive name for the itinerary'
          })
        }else if(edit.duration > 36){
          Swal.fire({
            title:'Duration Failed',
            text:'the duration cannot be longer than 36 hours'
        })

        }
        //mandarlo al controlador update
      editItinerary(edit)
      .unwrap()
      .then(() => {      Swal.fire({
                          icon:'success',
                          title:'Edited with success',
                          text:'if you will edit agait thats itinerary, can do it , if finished please press close for the come back the previus page',
                          confirmButtonText:'ok'
                                })})
      .then((error) => {
         console.log(error)
      })

    }



  return (
    <View onPress={handleSubmit}>
          <Text >edit your itinerary </Text>
            <Text>Name </Text>
            <TextInput type='text' onChange={handleName}></TextInput>
            
            <Text >User : {elemento.user}</Text>
            
            <Text>City: {elemento.cities} </Text>
           
            <Text>Price: </Text>
            <TextInput type='number' onChange={handlePrice} ></TextInput>
            <Text>Likes:  {elemento.likes} </Text>
            <Text>Tags:  </Text>
            <TextInput type='number' onChange={handleTags} ></TextInput>
            <Text>Duration:</Text>
            <TextInput type='number' onChange={handleDuration} ></TextInput>
            <div>
            <Button onPress={handleSubmit}>Save</Button>
            <Button onPress={onclose}>Close</Button>

            </div>
    </View>
  )
}
