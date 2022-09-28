import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Drawer from './src/Navetagion/Drawer'
import { Provider } from 'react-redux';
import store from './features/store'

export default function App() {

  

  return(
    <Provider store={store}>
      <NavigationContainer>
        <Drawer />
      </NavigationContainer>
    </Provider>
  )
}


