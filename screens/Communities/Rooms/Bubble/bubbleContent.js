import React from 'react'
import * as firebase from 'firebase'
import { View, Text, TouchableOpacity } from 'react-native'
import { Avatar, Icon } from 'react-native-elements';
import moment from "moment";

import { deleteBubble, HideBubble } from './del-Edit'
import styles from "./bubbleStyles";

function BubbleContent({ item, currentUid, updateBubbles, communityKey, roomKey }) {

    let current = new Date().getTime()
    let createdAt = item.timestamp
    return (
        <View>
            <View style={styles.headerContainer}>
                <View style={styles.userInfo}>
                    <Avatar
                        rounded
                        size={40}
                        source={{ uri: item.avatar }}
                    />
                    <View >
                        <Text style={styles.nameStyle}>{item.fullName}</Text>
                        {current - createdAt <= 86400000 ?
                            <Text style={styles.timeStyle}>{
                                moment(createdAt).startOf('minute').fromNow()}
                            </Text>
                            : <Text style={styles.timeStyle}>
                                {moment(createdAt).calendar()}
                            </Text>}
                    </View>
                </View>
                <TouchableOpacity onPress={() => {
                    item.bubbleCreator ? deleteBubble(item.bubbleKey, communityKey, roomKey, updateBubbles)
                        : HideBubble(item.bubbleKey, currentUid)
                }}>
                    <Icon
                        name={currentUid == item.bubbleCreator ? 'trash' : 'eye-slash'}
                        type='font-awesome' size={22} color='#555' iconStyle={styles.rightIcon} />
                </TouchableOpacity>
            </View>
            <View style={styles.bubbleBody}>
                <TouchableOpacity>
                    <Text style={styles.bodyText}>{item.bubbleContent}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default BubbleContent