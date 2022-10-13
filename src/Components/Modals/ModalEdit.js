import React, { useEffect, useState } from 'react'
import { useEditItineraryMutation } from '../../../features/citiesAPI'
import Swal from 'sweetalert2'
import { Button, View, Text, StyleSheet, Alert} from 'react-native'
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





   

    const handleSubmit = (e)=>{
        e.preventDefault()
      console.log(edit)
        if(edit.name.length < 5 ){
          Alert.alert('please verify that the name has more than 5 letters , the name must be a descriptive name for the itinerary')

        }else if(edit.duration > 36){
          Alert.alert('the duration cannot be longer than 36 hours')

        }
        //mandarlo al controlador update
  editItinerary(edit)
    .unwrap()
    .then(() => {
      Alert.alert('Edited with success')
      })
      .then((error) => {
         console.log(error)
      })

    }



  return (
    <View style={styles.container} >
          <Text style={styles.title} >edit your itinerary </Text>
            <Text style={styles.fixToText} >Name </Text>
            <TextInput style={styles.inputs} type='text' onChangeText={name => setName(name)}></TextInput>

            <Text style={styles.fixToText} >City: {elemento.cities} </Text>

            <Text style={styles.fixToText} >Price: </Text>
            <TextInput style={styles.inputs} type='number' onChangeText={price =>setPrice(price)} ></TextInput>
            <Text style={styles.fixToText} >Tags:  </Text>
            <TextInput style={styles.inputs} type='number' onChangeText={tags => setTags(tags)} ></TextInput>
            <Text style={styles.fixToText} >Duration:</Text>
            <TextInput style={styles.inputs} type='number' onChangeText={dur =>setDuration(dur)} ></TextInput>
            <View style={styles.button}>
              <View style={styles.textButton}>
            <Button  title='SAVE' onPress={handleSubmit}>Save</Button>
              </View>
              <View style={styles.textButton2}>
              <Button  title='CLOSE' onPress={onclose}>Close</Button>
              </View>
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
    height:420,
    borderRadius:10,
    overflow:'hidden',
    backgroundColor :'white',
    borderWidth:1
  },




  title: {
    margin:20,
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
    borderWidth:0.5,

  },
  button: {
    marginTop:20,
    alignItems: 'center',
    width:230,
    justifyContent:'space-between',
    flexDirection:'row',
    paddingVertical: 5,
    paddingHorizontal: 25,
    marginBottom:20,
   
    
  },
  textButton: {
      backgroundColor:'#00CC66',
      borderRadius: 4,
      borderWidth:0.5,
      width:80
  },
  textButton2: {
    backgroundColor:'#FF6666',
    borderRadius: 4,
    borderWidth:0.5,  
    width:80
},


});