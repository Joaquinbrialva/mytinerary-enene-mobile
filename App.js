import 'react-native-gesture-handler'
import React from 'react'
import { Provider } from 'react-redux';
import store from './features/store'
import { StatusBar } from 'expo-status-bar';
import Index from './src/Navetagion/Index'

export default function App() {

  return (
    <Provider store={store}>
      <StatusBar style='auto' />
      <Index />
    </Provider>
  )
}