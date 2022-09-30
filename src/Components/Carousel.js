import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import axios from 'axios'
import Arrow from './Arrow';
import { useEffect, useState } from 'react';
import APIurl from '../APIBack'
import { ScrollView, TextInput } from 'react-native-gesture-handler';


export default function Carousel() {

  const [cities, setCities] = useState([])

  useEffect(() => {
    axios.get(`${APIurl}/cities/?city=all`)
      .then(res => setCities(res.data.response))
      .catch(err => console.error(err))
  }, [])


  const range = 4
  const [getStart, setStart] = useState(0)
  const [getEnd, setEnd] = useState(getStart + range);
  const [intervalId, setIntervalId] = useState();

  function previus() {
    if (getStart >= range) {
      setStart(getStart - range);
      setEnd(getEnd - range);
    } else {
      setEnd(12);
      setStart(12 - 4);
    }
    clearInterval(intervalId);
  }

  function next() {
    if (getEnd < 12) {
      setStart(getStart + range);
      setEnd(getEnd + range);
    } else {
      setStart(0);
      setEnd(range)
    }
    clearInterval(intervalId);
  }


  // useEffect(() => {
  //   let id = setInterval(function () {
  //     next();
  //   }, 3000)

  //   setIntervalId(id)

  //   return () => clearInterval(intervalId);
  // }, [getStart]);




  const itemView = (item) => (
    <View style={styles.carousel} >
      <Image style={styles.logo} source={{ uri: item.photo }} />
      <Text style={{fontSize:16,fontStyle:'italic' , padding:20,marginTop:1, }}>{item.city}</Text>
    </View>
  )

  return (
    <>
      <View >
        <Image style={styles.hero} source={require('../../assets/hero.png')}/>
        <Text style={{textAlign:'center',fontSize:22,fontStyle:'italic' , padding:20,marginTop:10,marginBottom:10,backgroundColor:'#FFB266'}}>Popular MYtineraries</Text>

      </View>
      <View >
        <View style={styles.container}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {cities.map(itemView)}

        </ScrollView>

        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  logo: {
    marginTop:10,
    width: 210,
    height: 200,
    borderRadius:10,
    overflow:'hidden',
  },
  container:{
   flexDirection:'row'


  },
  hero:{
    width:420,
    height:300,
  },
  carousel:{
    marginRight:20,
    justifyContent:"center",
    alignItems:'center'
  }
});