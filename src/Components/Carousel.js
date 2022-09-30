import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import axios from 'axios'
import Arrow from './Arrow';
import { useEffect, useState } from 'react';
import APIurl from '../APIBack'
import { TextInput } from 'react-native-gesture-handler';


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


  useEffect(() => {
    let id = setInterval(function () {
      next();
    }, 3000)

    setIntervalId(id)

    return () => clearInterval(intervalId);
  }, [getStart]);




  const itemView = (item) => (
    <View >
      <Image style={styles.logo} source={{ uri: item.photo }} />
      <Text >{item.city}</Text>
    </View>
  )

  return (
    <>
      <View >
        <Text>Popular MYtineraries</Text>
      </View>
      <View >
        <View >
          <Arrow click={previus}>
            <TextInput type="image" src="https://cdn-icons-png.flaticon.com/512/271/271220.png" alt="Left arrow"></TextInput>
          </Arrow>
        </View>
        <View >
          {cities.slice(getStart, getEnd).map(itemView)}
        </View>
        <View >
          <Arrow click={next}>
            <TextInput type="image" src="https://cdn-icons-png.flaticon.com/512/271/271228.png" alt="Right arrow"></TextInput>
          </Arrow>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 100,
  },
});