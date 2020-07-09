import { View, TouchableOpacity, Text } from "react-native"
import { Avatar } from 'react-native-elements'


function Bot({ name, type, botAvatar, navigate, communityKey, roomKey, botKey }) {
    return (
        <View style={styles.botItem}>
            <TouchableOpacity onPress={() => navigate('chatBot', {
                communityKey, roomKey, botKey, name
            })}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Avatar editButton rounded size={60} source={{ uri: botAvatar }} />
                    <Text style={{
                        fontSize: 16, letterSpacing: 1, fontWeight: 'bold',
                        paddingTop: 15, textAlign: 'center'
                    }}>{name}</Text>
                    <Text>{type}</Text>
                </View>
            </TouchableOpacity >
        </View>

    )
}

export default Bot