import { View, Text, Button, Image, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { useRemoveItineraryMutation } from '../../features/citiesAPI'
import { useGetIdItinerariesQuery } from '../../features/citiesAPI'
import { useSelector } from 'react-redux'

const Itinerary = (props) => {

    const [deleItiner] = useRemoveItineraryMutation()
    const role = useSelector(state => state.auth.role)

    const {
        data: elem,
        error,
        isLoading,
        isSuccess,
        isFailed,
    } = useGetIdItinerariesQuery(props.route.params.itemId)

    let data = []
    if (isLoading) {
        data = []
    } else if (isSuccess) {
        data = elem.response
    } else if (isFailed) {
        data = []
        console.log(error)
    };

    const handleDelete = (e) => {
        let remove = (e.target.value)
        if (role === 'admin') {
            deleItiner(remove)
        }
    }

    const styles = StyleSheet.create({
        container: {
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingBottom: 50,
            paddingTop: 30,
            borderRadius: 10
        },

        title: {
            borderRadius: 10,
            backgroundColor: '#000000',
        },

        text: {
            marginLeft: 'auto',
            marginRight: 'auto',
            color: 'white'
        },

        imgContainer: {
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        img: {
            width: 300,
            height: 250,
            borderRadius: 10
        },

        profileImg: {
            width: 80,
            height: 80,
            borderRadius: 360
        },

        profileContainer: {
            padding: 5
        },

        itinInfo: {
            padding: 10,
        },

        item: {
            fontSize: 18,
            padding: 5
        }

    })

    const cardItinerary = (data) => {

        return (
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.text}>{data.name}</Text>
                </View>
                <View style={styles.profileContainer}>
                    <View>
                        <Image
                            style={styles.profileImg}
                            source={{ uri: data?.user?.photo }}
                        />
                        <View style={styles.profileInfo}>
                            <Text>{data?.user?.name} {data?.user?.lastName}</Text>
                            <Text>{data?.user?.mail}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.imgContainer}>
                    <Image
                        style={styles.img}
                        source={{
                            uri: data.photo
                        }}
                    />
                </View>
                <View style={styles.itinInfo}>
                    <View>
                        <View>
                            <Text style={styles.item}>💲{data.price}</Text>
                        </View>
                        <View>
                            <Text style={styles.item}>🕐{data.duration}hr</Text>
                        </View>
                        {/* <View className="data-container">
                            <Like like={data.likes} itinerary={data._id} userId={id} />
                        </View> */}
                        <View>
                            <Text style={styles.item}>Tags:</Text>
                            {data.tags.map(tag => <Text>#{tag}</Text>)}
                        </View>
                    </View>
                    {/* <View>
                        <Button title='Delete itinerary' onPress={handleDelete} value={data._id}></Button> // IF ADMIN SHOW BUTTON, ELSE NO
                    </View> */}
                </View>
            </View>
        )
    }

    return (
        <ScrollView>
            {data.map(e => cardItinerary(e))}
        </ScrollView>
    );
}

export default Itinerary