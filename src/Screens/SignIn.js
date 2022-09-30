
import { View,Text, Button,StyleSheet, Alert } from 'react-native'
import React, { useEffect,useInsertionEffect,useState } from 'react'
import {useAddUserSignInMutation} from '../../features/citiesAPI'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../features/authSlice'
import { TextInput } from 'react-native-gesture-handler'
import  AsyncStorage  from '@react-native-async-storage/async-storage'




export default function SignIn() {


const dispatch = useDispatch()
const [mail,setEmail]=useState()
const [password,setPassword]=useState()
const [user,setUser]=useState()
const [userLog,setUserLog]=useState()

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('user', jsonValue)
  } catch (error) {
    console.log(error);
  }
}
const getData = async () => {
  try {
    await AsyncStorage.getItem('user').then(value => setUserLog(value))
  } catch(error) {
    console.log(error);
  }
}


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

const handleSubmit = async () =>{
    console.log('hola')
    if(user.mail.includes('@')===false){
      Alert.alert('your mail not include @ simbol')
    }else if(user.password.length < 4 ){
      Alert.alert('your password need had more of 4 characters ')

    }else{

    
     let  {data,error} = await signInUser(user)
        if(error){
          Alert.alert('please again')
          console.log(error)
        }else{
          storeData(data.response.user)
          await getData()
          
          
          console.log('lol')
          
          if(userLog!=undefined){
            dispatch(setCredentials(data.response.user))
            Alert.alert(
            "You are logged in",
            "Enjoy the trip",
            [
            { text: "Ok", onPress: () => console.log(userLog)
            //navigation.goBack()
            }
            ],
            )

          }else{
            Alert.alert(
              'please try again'
            )
          }
          

        }
                // .unwrap()
                // .then(() => {console.log('envio')})
                // .then((error) => {
                //     console.log(error)
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


