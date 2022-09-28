import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { View } from 'react-native'
import Drawer from './src/Navetagion/Drawer'

export default function App() {
  return(
    <NavigationContainer>
      <Drawer/>
    </NavigationContainer>
  )
}


