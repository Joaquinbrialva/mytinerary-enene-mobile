import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeScreen from '../Screens/HomeScreen'
import CitiesScreen from '../Screens/CitiesScreen'
import MytinerariesScreen from '../Screens/MytinerariesScreen'
import Edit from '../Screens/Edit'
import SignIn from '../Screens/SignIn'
import SignUp from '../Screens/SignUp'
import NewCity from '../Screens/NewCity'
import { useSelector } from 'react-redux'

const DrawerNavigator = createDrawerNavigator();



export default function Drawer() {

  const user = useSelector(state => state.auth.user)
  const role = useSelector(state => state.auth.role)
  const logged = useSelector(state => state.auth.logged)

  const navItems = [
    {name: "Home", component:HomeScreen},
    {name: "Cities", component:CitiesScreen},
    
  ]

  console.log(role)

  if (role === null) {
    navItems.push(
      {name: "SignIn", component:SignIn},
      {name: "SignUp", component:SignUp}
      )
  }

  if(role === 'user'){
    navItems.push({name: "Itineraries", component:MytinerariesScreen})
  }

  if(role === "admin"){
    navItems.push(
      {name: "Itineraries", component:MytinerariesScreen},
      {name: "Edit", component:Edit},
      {name: "New City", component:NewCity}
      )
  }





  const generateBtn = (item) => (
    <DrawerNavigator.Screen name={ item.name } component={ item.component }/>
  )

  return (
    <DrawerNavigator.Navigator>
      {navItems.map(generateBtn)}
    </DrawerNavigator.Navigator>
  )
}