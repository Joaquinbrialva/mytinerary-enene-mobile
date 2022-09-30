import React from 'react'
import CityCard from '../Components/CityCard'
import { ScrollView } from 'react-native-gesture-handler';

export default function CitiesScreen() {
  return (
    <ScrollView>
      <CityCard />
    </ScrollView>
  )
}