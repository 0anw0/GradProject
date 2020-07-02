import React from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'

import { deletePost, hidePost, reportPost } from "./deleteEditReport";
import { Avatar } from 'react-native-elements'
import Pop from '../PopMenu'
import styles from './postStyles';
import moment from 'moment';

const renderTimestamp = (timestamp) => {
    const current = new Date().getTime()
    const createdAt = timestamp
    if (current - createdAt <= 86400000) {
        return (
            <Text style={styles.timestamp_today}>{moment(createdAt).startOf('minute').fromNow()}</Text>
        )
    }
    else
        return (
            <Text style={styles.timestamp}>{moment(createdAt).calendar()}</Text>
        )
}

export function PostHeader({
    postMakerKey, postKey, currentUser, editPost,
    communities, timestamp, userAvatar, userName, 
    clearPosts, headingFromCommunity , setCommunityModalVisible}) {
    let communityInfo = communities

    if (communityInfo) {
        return (
            <View>
                <View style={{ position: 'absolute', right: 20, top: 20, zIndex: 1 }}>
                    {postMakerKey === currentUser
                        ? <Pop
                            dark
                            size={25}
                            item1='Edit' onPress1={editPost}
                            item2='Delete' onPress2={() => {
                                deletePost(postKey, clearPosts, communities)
                            }
                            }
                        />
                        : <Pop
                            dark
                            size={25}
                            item1='Hide' onPress1={() => hidePost(postKey, clearPosts, currentUser)}
                            item2='Report' onPress2={() =>
                                reportPost(postKey, clearPosts, currentUser, postMakerKey)
                            }
                        />
                    }
                </View>
                <View style={styles.post}>
                    <View style={styles.userDetails}>
                        <Avatar
                            rounded
                            size={50}
                            source={{ userAvatar }}
                        />
                        <Text style={styles.userName}>{userName}</Text>
                        <View style={styles.communities}>
                            {!headingFromCommunity ?
                                <TouchableOpacity
                                    onPress={setCommunityModalVisible}>
                                    <Text style={styles.commName}>{communityInfo[0].name}</Text>
                                    <Text>{communityInfo.length > 1 ?
                                        `and ${communityInfo.length - 1} more!` : null}</Text>
                                </TouchableOpacity> : null}

                            {renderTimestamp(timestamp)}
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    else {
        return null
    }
}
