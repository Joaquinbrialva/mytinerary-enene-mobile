import React from 'react'
import { View,Text, Button ,StyleSheet, Alert } from 'react-native'
import {useAddUserSignUpMutation} from '../../features/citiesAPI'
import Swal from 'sweetalert2'
import { useEffect,useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'


export default function SignUp() {

let [name,setName]=useState()
let [lastName, setLastName]= useState()
let [email,setMail]=useState()
let [password,setPassword]=useState()
let [photo,setPhoto]=useState()
let [user,setUser]=useState()

////////////////////////////////////////////////// object that will be filled for send in post/////////////////////////////////////

useEffect(()=>{
    let obj ={
        name: name,
        lastName: lastName,
        mail: email,
        password:password,
        photo: photo,
        role: 'user',
        from:'form',
    }

    setUser(obj)
   
    },[name,email,lastName,password,photo])

////////////////////////////////////////////////////reducer that will be called when the user doit submit////////////////////////////////

const [signUpUser] = useAddUserSignUpMutation()

const handleSubmit = function(e){
    e.preventDefault()

    if(user.name.length < 2 ){
      Alert.alert('name need had more of two characters')

    }else if(user.lastName.length < 2 ){
        Alert.alert('please verify that the last name has more than 2 letters and does not include numbers')
      
    }else if(user.mail.includes('@')===false){
        Alert.alert('please verify that the email includes @ sign')

    }else if(user.password.length < 4){
        Alert.alert('please verify the password , need have more of 4 characters')

    }else if(user.photo.length < 4){
        Alert.alert('please verify that the photo exist')


    }else{
        
             signUpUser(user)
             .unwrap()
             .then(() => {})
             .then((error) => {
                console.log(error)
             })
             Alert.alert('you are sign up successfully')

    }



    
}




  return (
    <View  style={styles.container}>
        <Text style={styles.title}>Please Sign Up</Text>
      <View onSubmit={handleSubmit} >
    <View >
    <Text style={styles.fixToText} >Name</Text>
    <TextInput style={styles.inputs} type='text' onChangeText={text=>setName(text)}></TextInput>
    <Text style={styles.fixToText} >Last name</Text>
    <TextInput style={styles.inputs} type='text' onChangeText={text=>setLastName(text)}></TextInput>
    <Text style={styles.fixToText} >Photo Link</Text>
    <TextInput style={styles.inputs} type='text' onChangeText={text=>setPhoto(text)}></TextInput>
    <Text style={styles.fixToText} >Email</Text>
    <TextInput style={styles.inputs} type='text' onChangeText={text=>setMail(text)}></TextInput>
    <Text style={styles.fixToText} >Password</Text>
    <TextInput style={styles.inputs} type='password' onChangeText={text=>setPassword(text)}></TextInput>
        <View style={styles.button} >
        <Button onPress={handleSubmit} title="Sing Up">Sign Up</Button>
        </View>
    </View>
   </View>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      marginLeft:50,
      marginTop:50,
      justifyContent:'space between',
      alignItems:'center',
      textAlign:'center',
      width:300,
      height:500,
      color:'blue',
      borderRadius:10,
      overflow:'hidden',
      backgroundColor :'white',
      borderWidth:1
      
   
      
    },
    title: {
      textAlign: 'center',
      marginTop:25,
      marginBottom:5,
      fontSize:25,
      color:'green',
      fontStyle:'italic',
    },
    fixToText: {
      justifyContent: 'space-between',
      fontStyle:'italic',
      marginTop : 5,
      marginBottom:8,
      textAlign:'center',
      borderBottom:5,
      fontSize:18
    },
  
    inputs:{
  
     
     
      borderRadius:5,
      width:200,
      height:30,
      color:'blue',
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
      backgroundColor: '#C0C0C0',
    },
    textButton: {
      color:'black'
    },
  
  
  });
  