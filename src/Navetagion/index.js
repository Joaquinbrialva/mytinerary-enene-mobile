
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Details from '../Components/Details';
import HomeScreen from '../Screens/HomeScreen';
import Drawer from '../Components/Drawer';
import Itinerary from '../Components/Itinerary';

const Stack = createNativeStackNavigator();

function Index() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={HomeScreen}>
                <Stack.Screen name="Drawer" component={Drawer} options={{headerShown:false}} />
                <Stack.Screen name="Details" component={Details} />
                <Stack.Screen name="Itinerary" component={Itinerary} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Index;