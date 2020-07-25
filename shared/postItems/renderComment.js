import { View, TouchableOpacity, Text } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-elements'

import { deleteComment } from './deleteComment'
import styles  from './postStyles';
import Pop from '../PopMenu'

const renderComment = (item ,setEditCommentModalVisible , updateCommentsNumber) => {
    return (
        <View style={styles.renderComment}>
            <TouchableOpacity>
                <Avatar
                    rounded
                    size={40}
                    source={{ uri: item.userAvatar }}
                />
            </TouchableOpacity>
            <View style={{ flexDirection: 'column', marginLeft: 10, flex: 1 }}>
                <Text style={{ fontWeight: 'bold' }}>{item.userName}</Text>
                <Text>{item.commentTxt}</Text>
            </View>
            <View style={{ position: 'relative', right: 15 }}>
                <Pop
                    dark
                    size={25}
                    item1='Edit' onPress1={() => { setEditCommentModalVisible(item) }}
                    item2='Delete' onPress2={() => { deleteComment(item , updateCommentsNumber) }}
                />
            </View>
        </View>
    )
}

export default renderComment