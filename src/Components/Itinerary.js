import { View, Text, Button, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useRemoveItineraryMutation } from '../../features/citiesAPI'
import { useGetIdItinerariesQuery } from '../../features/citiesAPI'
import { useSelector } from 'react-redux'

const Itinerary = (props) => {

    const [deleItiner] = useRemoveItineraryMutation()
    const id = useSelector(state => state.auth.id)
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
        logo: {
            width: 300,
            height: 150,
        },
    })

    const cardItinerary = (data) => {

        return (
            <View>
                <View>
                    <Text>{data.name}</Text>
                </View>
                <View>
                    <Image
                        style={styles.logo}
                        source={{
                            uri: data.photo
                        }}
                    />
                </View>
                <View>
                    <View>
                        <View>
                            <Image
                                style={styles.logo}
                                source={{ uri: data?.user?.photo }}
                            />
                        </View>
                        <View>
                            <Text>{data?.user?.name} {data?.user?.lastName}</Text>
                            <Text>{data?.user?.mail}</Text>
                        </View>
                    </View>
                    <View>
                        <View>
                            <Text>💲{data.price}</Text>
                        </View>
                        <View>
                            <Text>🕐{data.duration}hr</Text>
                        </View>
                        {/* <View className="data-container">
                            <Like like={data.likes} itinerary={data._id} userId={id} />
                        </View> */}
                        <View>
                            <Text>Tags:</Text>
                            {data.tags.map(tag => <Text>#{tag}</Text>)}
                        </View>
                    </View>
                    <View>
                        <Button className='delete-itinerary-button' title='Delete itinerary' onPress={handleDelete} value={data._id}></Button>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View>
            {data.map(e => cardItinerary(e))}
        </View>
    );
}

export default Itinerary