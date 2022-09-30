import React from 'react'
import { View,Text ,ScrollView} from 'react-native'
import EventItineraries from '../Components/ItieneraryUser'
export default function MytinerariesScreen() {
  return (
    <View>
      <ScrollView>

        <EventItineraries/>
      </ScrollView>
    </View>
  )
}
