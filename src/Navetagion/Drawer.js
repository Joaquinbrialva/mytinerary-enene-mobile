import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeScreen from '../Screens/HomeScreen'
import CitiesScreen from '../Screens/CitiesScreen'
import { useSelector } from 'react-redux'


const DrawerNavigator = createDrawerNavigator();



export default function Drawer() {

  const user = useSelector(state => state.auth.user)
  const role = useSelector(state => state.auth.role)
  const logged = useSelector(state => state.auth.logged)

  console.log(user)

  return (
    <DrawerNavigator.Navigator>
      <DrawerNavigator.Screen name='home' component={HomeScreen}/>
      <DrawerNavigator.Screen name='cities' component={CitiesScreen}/>
    </DrawerNavigator.Navigator>
  )
}