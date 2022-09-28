import React, { useEffect, useState } from 'react'
import { Button, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Swal from 'sweetalert2'
import { useCreateItineraryMutation } from '../../features/citiesAPI';

export default function ModalCreate({ children, onClose }) {

  const [createItinerary] = useCreateItineraryMutation()
  const userSession = JSON.parse(localStorage.getItem('user'))
  const [photo, setPhoto] = useState()
  const [duration, setDuration] = useState()
  const [price, setPrice] = useState()
  const [tags, setTags] = useState()
  const [name, setName] = useState()
  const [edit, setEdit] = useState()
 


  const handlePhoto = (e) => {
    setPhoto(e.target.value)
  }

  const handleDuration = (e) => {
    setDuration(e.target.value)

  }
  const handleTags = (e) => {
    setTags(e.target.value)
  }

  const handleName = (e) => {
    setName(e.target.value)

  }
  const handlePrice = (e) => {
    setPrice(e.target.value)

  }



  useEffect(() => {
    let objCreate = {
      user: children.idUser,
      name: name,
      city: children._id,
      photo: photo,
      price: price,
      tags: tags,
      duration: duration
    }

    setEdit(objCreate)

  }, [photo, price, tags, name, duration])






  const handleSubmit = (e) => {
    e.preventDefault()
    //mandarlo al controlador create

    if (edit.name.length <= 1) {
      Swal.fire({
        title: 'Name Failed',
        text: 'please verify that the name has more than 2 letters and does not include numbers'
      })
    } else {
      createItinerary(edit)
        .unwrap()
        .then(() => { })
        .then((error) => {
          console.log(error)
        })
      Swal.fire({
        icon: 'success',
        title: 'Registred with success',
        text: 'please look and read or create yours itineraries',
        confirmButtonText: 'Do It'
      })


    }

  }



  return (
    <View >
      <Text >Create your New Itinerary </Text>
      <p >Name  </p>
      <TextInput type='text' onChange={handleName}></TextInput>


      <h4 >User :   {userSession.name} </h4>


      <p >City   {children.city} </p>

      <p >Image  </p>
      <TextInput type='text' onChange={handlePhoto}></TextInput>
      <p >Price </p>
      <TextInput type='Number' onChange={handlePrice}></TextInput>

      <p >Tags  </p>
      <TextInput type='Number' onChange={handleTags}></TextInput>
      <p >Duration</p>
      <TextInput type='Number' onChange={handleDuration}></TextInput>
      <View >

        <Button title="save" onPress={handleSubmit} >Save</Button>
        <Button title="close"onPress={onClose} >Close</Button>
      </View>
    </View>
  )
}
