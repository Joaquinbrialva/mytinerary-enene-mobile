import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux';
import store from './features/store'
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Details from './src/Components/Details';
import HomeScreen from './src/Screens/HomeScreen';
import Drawer from './src/Components/Drawer';
import Index from './src/Navetagion/Index'

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <StatusBar style='auto' />
        <Index />
    </Provider>
  )
}


