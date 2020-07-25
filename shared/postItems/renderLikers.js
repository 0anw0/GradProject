import { View, TouchableOpacity, Text } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-elements'
import styles from './postStyles';

const renderLikers = (item) => {
    return (
        <View >
            <TouchableOpacity style={styles.renderLikers}>
                <View>
                    <Avatar
                        rounded
                        size={40}
                        source={{ uri: item.userAvatar }}
                    />
                </View>
                <View>
                    <Text
                        style={{ fontWeight: 'bold', paddingTop: 8, paddingLeft: 8 }}
                    >{item.userName}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default renderLikers