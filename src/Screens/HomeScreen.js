import { View, ImageBackground, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import Carousel from '../Components/Carousel'

let ScreenHeight = Dimensions.get("window").height;
export default function HomeScreen() {
  
  return (
    <View >
    <ImageBackground source={require('../../assets/nav_logo.png')} resizeMode="contain" style={styles.containerMain}>
      <View style={styles.containerMain2}>
        <Carousel/>
      </View>
    </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  
  containerMain:{
    height: ScreenHeight
  },

  containerMain2:{
    height: ScreenHeight,
    display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center'
  }

});