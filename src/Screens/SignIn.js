
import { View,Text, Button,StyleSheet, Alert } from 'react-native'
import React, { useEffect,useState } from 'react'
import {useAddUserSignInMutation} from '../../features/citiesAPI'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../features/authSlice'
import { TextInput } from 'react-native-gesture-handler'
import { AsyncStorage } from '@react-native-async-storage/async-storage'
import SweetAlert from 'react-native-sweet-alert';



export default function SignIn() {


const dispatch = useDispatch()
const [mail,setEmail]=useState()
const [password,setPassword]=useState()
const [user,setUser]=useState()






useEffect(()=>{
    let obj ={
        mail:mail,
        password:password,
        form:'form',
        role:'user'
    }

    setUser(obj)

    },[mail,password])

const [signInUser] = useAddUserSignInMutation()

async function handleSubmit (e) {
    e.preventDefault()
    console.log('hola')
    console.log(user)
    if(user.mail.includes('@')===false){
      Alert.alert('your mail not include @ simbol')
    }else if(user.password.length < 4 ){
      Alert.alert('your password need had more of 4 characters ')

    }else{

    try {
        let res = await signInUser(user)
        AsyncStorage.setItem('token',JSON.stringify(res.data.response.user))
        dispatch(setCredentials(res.data.response.user))
    }catch(err){
        console.error(err)
    }

    Alert.alert('you are signIn succesfully')
    
    }
}




  return (
    <View style={styles.container}>
        <Text style={styles.title}>Please Sign In</Text>
      <View onSubmit={handleSubmit} >
    <View >
        <View >

    <Text style={styles.fixToText}>Email</Text>
    <TextInput style={styles.inputs} type='mail' onChangeText={text =>setEmail(text)}></TextInput>
    <Text style={styles.fixToText} >Password</Text>
    <TextInput style={styles.inputs} secureTextEntry={true} type='password' onChangeText={text =>setPassword(text)}></TextInput>
        </View>
        <View style={styles.button}>
        <Button style={ styles.textButton} title='Sign In'  onPress={handleSubmit}>Sign In</Button>

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
    height:400,
    color:'blue',
    borderRadius:10,
    overflow:'hidden',
    backgroundColor :'white',
    borderWidth:1
    
 
    
  },
  title: {
    textAlign: 'center',
    marginTop:70,
    fontSize:25,
    color:'green',
    fontStyle:'italic',
  },
  fixToText: {
    justifyContent: 'space-between',
    fontStyle:'italic',
    marginTop : 40,
    marginBottom:8,
    textAlign:'center',
    borderBottom:5,
    fontSize:20
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
    backgroundColor: '#C0C0C0',
  },
  textButton: {
    color:'black'
  },


});


