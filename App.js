import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Drawer from './src/Navetagion/Drawer'
import { Provider } from 'react-redux';
import store from './features/store'
import { StatusBar } from 'expo-status-bar';

export default function App() {



  return (
    <Provider store={store}>
      <StatusBar style='auto' />
      <NavigationContainer>
        <Drawer />
      </NavigationContainer>
    </Provider>
  )
}


