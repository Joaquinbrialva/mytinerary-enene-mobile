
import { View, Text, Button,StyleSheet, Alert, ImageBackground, Dimensions } from 'react-native'
import React, { useEffect,useState } from 'react'
import {useAddUserSignInMutation} from '../../features/citiesAPI'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../features/authSlice'
import { TextInput } from 'react-native-gesture-handler'
import { AsyncStorage } from '@react-native-async-storage/async-storage'
import SweetAlert from 'react-native-sweet-alert';

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

export default function SignIn() {


const dispatch = useDispatch()
const [mail,setEmail]=useState()
const [password,setPassword]=useState()
const [user,setUser]=useState()
const [stor,setStor]=useState()





useEffect(()=>{
    let obj ={
        mail:mail,
        password:password,
        from:'form',
        role:'user'
    }

    setUser(obj)

    },[mail,password])

const [signInUser] = useAddUserSignInMutation()

const handleSubmit = (e)=> {
    e.preventDefault()
    console.log('hola')
    console.log(user)
    if(user.mail.includes('@')===false){
      Alert.alert('your mail not include @ simbol')
    }else if(user.password.length < 4 ){
      Alert.alert('your password need had more of 4 characters ')

    }else{

    try {
        let res =signInUser(user)
                .unwrap()
                .then(() => {console.log('envio')})
                .then((error) => {
                    console.log(error)
                })
        console.log(user)
        AsyncStorage.setItem('token',JSON.stringify(res.data.response.user))
        dispatch(setCredentials(res.data.response.user))
        AsyncStorage.getItem('token').then(value => setStor(JSON.parse(value)))
      
    }catch(err){
        console.error(err)
    }

    Alert.alert('you are signIn succesfully')
    
    }
}




  return (
    <View>
      <ImageBackground source={require('../../assets/nav_logo.png')} resizeMode="contain" style={styles.containerMain}>
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
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({

  containerMain:{
    height: ScreenHeight,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: ScreenWidth,
  },

  container: {
    display: 'flex',
    alignItems:'center',
    textAlign:'center',
    width:300,
    height:400,
    color:'blue',
    borderRadius:10,
    overflow:'hidden',
    backgroundColor :'white',
    borderWidth:1,
    opacity:0.95
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


