import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'

import styles from './postStyles';
import { like } from "./likeFn"

export function PostFooter({ setCommentModalVisible,
    communities, postKey, updateLikesNumber, toggleLike, likesNumber, liked
    , setLikersModalVisible, commentsNumber }) {

    let communityInfo = communities
    let [virtualLikeNumbers, setVirtualLikeNumbers] = useState(likesNumber)

    if (communityInfo) {
        return (
            <View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    
                    <TouchableOpacity
                        style={{ marginLeft: 10 }}
                        onPress={setLikersModalVisible}>
                        <Text>{virtualLikeNumbers} likes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ marginLeft: 10 }}
                        onPress={setCommentModalVisible}>
                        <Text>{commentsNumber.toString()} comments</Text>
                    </TouchableOpacity>

                </View>
                <View style={styles.postReactions}>

                    <TouchableOpacity style={styles.reaction} onPress={
                        () => {
                            like(postKey, toggleLike, updateLikesNumber)
                            if (!liked && likesNumber == 0) setVirtualLikeNumbers(1)
                            else {
                                if (liked) {
                                    setVirtualLikeNumbers(virtualLikeNumbers + 1)
                                } else {
                                    setVirtualLikeNumbers(virtualLikeNumbers - 1)
                                }
                            }
                        }}>
                        <Icon name='heart-o' type='font-awesome'
                            size={22} color='#555' iconStyle={{ color: liked ? '#000000' : '#555fff' }} />
                        <Text
                            style={[styles.reactionText, { color: liked ? '#000000' : '#555fff' }]}
                        >Like</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.reaction} onPress={setCommentModalVisible}>
                        <Icon name='comment-o' type='font-awesome' size={22} color='#555' />
                        <Text style={styles.reactionText}>Comment</Text>
                    </TouchableOpacity>
                </View>
            </View >
        )
    } else return null
}
