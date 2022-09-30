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

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <StatusBar style='auto' />
      <NavigationContainer>
        <Stack.Navigator initialRouteName={HomeScreen}>
          <Stack.Screen name='Drawer' component={Drawer} options={{ headerShown: false }} />
          <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}


