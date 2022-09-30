import { View,Text, Button,StyleSheet, Alert } from 'react-native'
import { useDispatch } from 'react-redux'
import { deleteCredentials } from '../../features/authSlice'



export default function LogOut() {
  
const dispatch = useDispatch()
 dispatch(deleteCredentials())
  return (
    <View></View>
  )
}
