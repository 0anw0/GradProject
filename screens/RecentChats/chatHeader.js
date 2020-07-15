import React from 'react'
import * as firebase from 'firebase'
import { View, TouchableOpacity, Text } from "react-native";
import { Avatar } from 'react-native-elements'
import moment from 'moment'

import PopMenu from '../../shared/PopMenu'
import styles from "./recentChatStyles"

export const ChatHeader = function ({
    content, sender, uri, timestamp, roomName, HideChat, id, hidden, ShowChat
}) {
    let current = new Date().getTime()
    let createdAt = timestamp
    let name = ''
    firebase.database()
        .ref(`authenticatedUsers/${sender}/fullName`)
        .on('value', snap => {
            name = snap.val()
        })

    return (
        <View style={styles.roomChat}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity>
                    <Avatar source={{ uri: uri }} rounded size='medium' />
                </TouchableOpacity>
                <View style={{ width: '2%' }}>

                </View>
                <View style={{ width: '70%' }}>
                    <Text style={{ fontSize: 10 }}> {roomName} </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 15, color: 'green' }}> {name}</Text>
                        <Text> : {content} </Text>
                    </View>
                </View>
                <View>
                    {current - createdAt <= 86400000 ?
                        <Text style={styles.timestamp}>{
                            moment(createdAt).startOf('minute').fromNow()}
                        </Text>
                        : <Text style={styles.timeStyle}>
                            {moment(createdAt).calendar()}
                        </Text>}

                    {hidden ?
                        <PopMenu item1="Reset"
                            onPress1={() => ShowChat(id)}
                            button={
                                <TouchableOpacity>
                                    <Icon name='kebab-vertical' type='octicon' size={15} />
                                </TouchableOpacity>
                            } /> :
                        <PopMenu item1="Hide" onPress1={() => HideChat(id)}

                            button={
                                <TouchableOpacity>
                                    <Icon name='kebab-vertical' type='octicon' size={15} />
                                </TouchableOpacity>
                            } />
                    }
                </View>
            </View>
        </View>

    )
}