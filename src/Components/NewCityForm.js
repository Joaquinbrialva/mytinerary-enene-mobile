import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Picker } from '@react-native-picker/picker';

const NewCityForm = () => {

    const [country, setCountry] = useState()
    const [city, setCity] = useState()
    const [photo, setPhoto] = useState()
    const [population, setPopulation] = useState()
    const [fundation, setFundation] = useState()
    const [formValues, setFormValues] = useState()

    useEffect(() => {
        let cityData = {
            city: city,
            country: country,
            photo: photo,
            population: population,
            fundation: fundation,
        }
        setFormValues(cityData)
    },[city, country, photo, population, fundation])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (formValues.city.length < 3) {
            Alert.alert({
                title: 'Name failed',
                text: 'Name must contain more than 3 letters'
            })
        } else if (formValues.country === "") {
            Alert.alert({
                title: 'Country failed',
                text: `It seems that you didn't write anything, please fill this input`
            })
        } else if (formValues.photo.length < 5 && formValues.photo.startsWith('http')) {
            Alert.alert({
                title: 'Photo failed',
                text: 'The photo must be a link and contain more than 5 characters'
            })
        } else if (formValues.population <= 100) {
            Alert.alert({
                title: 'Population failed',
                text: "The population it's bigger than that, don't you think? "
            })
        } else if (formValues.fundation <= 10) {
            Alert.alert({
                title: 'Fundation failed',
                text: "I know, there are cities older than Christ, but they are not available, please write again "
            })
        } else {
            axios.post('https://mytinerary-enene-back.herokuapp.com/cities', formValues)
                .then((response) => console.log(response))
                .catch((error) => console.log(error))

            Alert.alert({
                icon: 'success',
                title: 'City created',
                text: 'You can create as many cities as you want',
                confirmButtonText: 'OK'
            })
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create New City</Text>
            <ScrollView>
                <View>
                    <Picker
                        selectedValue={country}
                        onValueChange={(itemValue) =>
                            setCountry(itemValue)
                        }>
                        <Picker.Item label="Argentina" value="Argentina" />
                        <Picker.Item label="Belgium" value="Belgium" />
                        <Picker.Item label="Italy" value="Italy" />
                        <Picker.Item label="France" value="France" />
                    </Picker>
                    <Text style={styles.fixToText}>City Name</Text>
                    <TextInput style={styles.inputs} onChangeText={text => setCity(text)}></TextInput>
                    <Text style={styles.fixToText}>Photo URL</Text>
                    <TextInput style={styles.inputs} onChangeText={text => setPhoto(text)}></TextInput>
                    <Text style={styles.fixToText}>Population</Text>
                    <TextInput style={styles.inputs} onChangeText={text => setPopulation(text)}></TextInput>
                    <Text style={styles.fixToText}>Fundation</Text>
                    <TextInput style={styles.inputs} onChangeText={text => setFundation(text)}></TextInput>
                </View>
                <View style={styles.button}>
                    <Button style={styles.textButton} title='Create' onPress={handleSubmit}>Create</Button>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 40,
        marginVertical: 40,
        textAlign: 'center',
        width: 300,
        color: 'blue',
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: 'white',
        borderWidth: 1
    },

    title: {
        textAlign: 'center',
        padding: 10,
        fontSize: 25,
        color: 'green',
        fontStyle: 'italic',
    },

    fixToText: {
        justifyContent: 'space-between',
        fontStyle: 'italic',
        marginBottom: 8,
        textAlign: 'center',
        borderBottom: 5,
        fontSize: 20
    },

    inputs: {
        borderRadius: 5,
        width: 200,
        height: 30,
        color: 'black',
        backgroundColor: '#FFFFFF',
        borderWidth: 0.5,
        marginHorizontal: 50
    },

    button: {
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#C0C0C0',
    },

    textButton: {
        color: 'black'
    },
});

export default NewCityForm