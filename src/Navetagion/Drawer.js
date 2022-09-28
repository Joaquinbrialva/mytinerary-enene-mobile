import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeScreen from '../Screens/HomeScreen'
import CitiesScreen from '../Screens/CitiesScreen'

const DrawerNavigator = createDrawerNavigator();

export default function Drawer() {
  return (
    <DrawerNavigator.Navigator>
      <DrawerNavigator.Screen name='home' component={HomeScreen}/>
      <DrawerNavigator.Screen name='cities' component={CitiesScreen}/>
    </DrawerNavigator.Navigator>
  )
}