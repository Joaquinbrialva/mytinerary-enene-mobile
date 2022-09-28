
import { View,Text, Button } from 'react-native'
import React, { useEffect,useState } from 'react'
import {useAddUserSignInMutation} from '../../features/citiesAPI'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../features/authSlice'
import { TextInput } from 'react-native-gesture-handler'


export default function SignIn() {


const dispatch = useDispatch()
const [mail,setEmail]=useState()
const [password,setPassword]=useState()
const [user,setUser]=useState()



const handleEmail = function(e){
    setEmail(e.target.value)
    
}
const handlePassword = function(e){
    setPassword(e.target.value)
    
}


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
    if(user.mail.includes('@')===false){
        Swal.fire({
            title:'Error email',
            text:'need include the @ sign',
            confirmButtonText:'Write Again'
        })
    }else if(user.password.length < 4 ){
        Swal.fire({
            title:'Error Password',
            text:'need be more of 4 characters',
            confirmButtonText:'Write Again'

        })

    }else{

    try {
        let res = await signInUser(user)
        dispatch(setCredentials(res.data.response.user))
    }catch(err){
        console.error(err)
    }


       Swal.fire({
        icon:'success',
        title:'Sign In successfully',
        text : 'please look and read or create yours itineraries',
        confirmButtonText:'Do It'
       })
    }
}




  return (
    <View >
        <Text >Please Sign In</Text>
      <View onSubmit={handleSubmit} >
    <View >
        <View >

    <Text >Email</Text>
    <TextInput type='text' onChange={handleEmail}></TextInput>
    <Text >Password</Text>
    <TextInput type='password' onChange={handlePassword}></TextInput>
        </View>
        <View >
        <Button title='signIn' >Sign In</Button>

        </View>
    </View>
   </View>
    </View>
  )
}


