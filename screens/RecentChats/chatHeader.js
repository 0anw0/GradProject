import React from 'react'
import * as firebase from 'firebase'
import { View, TouchableOpacity, Text } from "react-native";
import { Avatar, ListItem, Icon } from 'react-native-elements'

import styles from "./recentChatStyles"
import moment from 'moment'

export const ChatHeader = function ({ item, manageChat ,navigate
}) {
    let current = new Date().getTime(), createdAt = item.timestamp, roomName, avatar, hidden = false

    firebase.database().ref(`rooms/${item.roomKey}/`
    ).on('value', snap => {
        roomName = snap.val().name,
            avatar = snap.val().avatar
    })

    return (
        <View style={{ marginTop: 5, marginHorizontal:5 }}>
            <ListItem
                onPress={navigate('ChatScreen', {
                    roomKey: item.roomKey
                })}
                containerStyle={{
                    borderRadius: 10,
                    backgroundColor: item.hidden ? '#ffffff50' : '#ffffff'
                }}
                key={item.msgKey}
                leftElement={
                    <View style={{ flexDirection: "row" }}>
                        <Avatar
                            size={50}
                            rounded
                            source={{ uri: avatar }}
                        />
                        <View style={{ flexDirection: 'column', paddingLeft: 8 }}>
                            <Text style={{
                                color: '#2a46b5', fontWeight: '700'
                            }}
                            >{roomName}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ color: '#8090ff', fontSize: 13 }}>{item.user.name}:</Text>
                                <Text style={{ color: '#0f1b6b' }}>  {item.text}</Text>
                            </View>
                            <View>
                                {current - createdAt <= 86400000 ?
                                    <Text style={[styles.timestamp, { color: '#b5b4d4' }]}>{
                                        moment(createdAt).startOf('minute').fromNow()}
                                    </Text>
                                    : <Text style={styles.timeStyle}>
                                        {moment(createdAt).calendar()}
                                    </Text>
                                }
                            </View>
                        </View>

                    </View>
                }
                bottomDivider
                rightElement={
                    item.hidden ?
                        <TouchableOpacity onPress={() => manageChat(item.roomKey, true)}>
                            <Icon
                                name='eye'
                                type='font-awesome'
                                color='#2a46b550'
                                size={20}
                            />
                        </TouchableOpacity>
                        : <TouchableOpacity onPress={() => manageChat(item.roomKey, false)}>
                            <Icon
                                name='eye-slash'
                                type='font-awesome'
                                color='#a6a6a650'
                                size={20}
                            />
                        </TouchableOpacity>
                } />
        </View>
    )
}
