import React from 'react'
import CityCard from '../Components/CityCard'
import { ScrollView, } from 'react-native-gesture-handler';
import { ImageBackground, StyleSheet, Dimensions, View } from 'react-native'

let ScreenHeight = Dimensions.get("window").height;

export default function CitiesScreen() {
  return (
    <View>
      <ImageBackground source={require('../../assets/nav_logo.png')} resizeMode="contain" style={styles.containerMain}>
        <ScrollView>
          <CityCard />
        </ScrollView>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  
  containerMain:{
    height: ScreenHeight
  },

});