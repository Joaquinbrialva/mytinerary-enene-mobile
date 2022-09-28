import { View, Text } from 'react-native'
import { Provider } from 'react-redux'
import store from '../Features/store'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeScreen from '../Screens/HomeScreen'
import CitiesScreen from '../Screens/CitiesScreen'
import MytinerariesScreen from '../Screens/MytinerariesScreen'
import Edit from '../Screens/Edit'
import SignIn from '../Screens/SignIn'
import SignUp from '../Screens/SignUp'
import NewCity from '../Screens/NewCity'
const DrawerNavigator = createDrawerNavigator();

export default function Drawer() {
  return (
    <Provider store={store}>
    <DrawerNavigator.Navigator>
      <DrawerNavigator.Screen name='home' component={HomeScreen}/>
      <DrawerNavigator.Screen name='cities' component={CitiesScreen}/>
      <DrawerNavigator.Screen name='itineraries' component={MytinerariesScreen}/>
      <DrawerNavigator.Screen name='newcity' component={NewCity}/>
      <DrawerNavigator.Screen name='edit' component={Edit}/>
      <DrawerNavigator.Screen name='signIn' component={SignIn}/>
      <DrawerNavigator.Screen name='singUp' component={SignUp}/>
    </DrawerNavigator.Navigator>
    </Provider>
  )
}