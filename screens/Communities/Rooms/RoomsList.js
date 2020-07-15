import React from "react";
import { FlatList, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { Avatar, Icon } from 'react-native-elements'

import firebase from '../../../services/firebaseConfig'
import Header from '../../../shared/Header'
import styles from "./roomStyles";

function SubButton({ actionFunc, iconName }) {
    return (
        <TouchableOpacity onPress={actionFunc}>
            <Icon type="font-awesome" name={iconName} size={25} color='#a0b0ff' />
        </TouchableOpacity>
    )
}

export default class RoomsList extends React.Component {
    constructor(props) {
        super(props);
        var firebaseDB = firebase.database();
        this.navigate = this.props.navigation.navigate
        this.communityKey = this.props.navigation.getParam('communityKey')
        this.roomsRef = firebaseDB.ref('rooms/' + this.communityKey).orderByChild('name');
        this.state = {
            rooms: [],
            newRoom: ''
        }
    }

    componentDidMount() {
        this.listenForRooms(this.roomsRef);
    }

    listenForRooms(roomsRef) {
        roomsRef.on('value', (dataSnapshot) => {
            var roomsFB = [];
            dataSnapshot.forEach((child) => {
                roomsFB.push({
                    name: child.val().name,
                    avatar: child.val().avatar,
                    key: child.key
                });
            });
            this.setState({ rooms: roomsFB });
        });
    }

    openMessages(room) {
        this.navigate('ChatScreen', {
            roomKey: room.key,
            roomName: room.name,
            roomAvatar: room.avatar,
            communityKey: this.communityKey
        });
    }

    updateRoom(room) {
        this.props.navigation.navigate('EditRoom', {
            roomKey: room.key,
            roomAvatar: room.avatar,
            roomName: room.name,
            communityKey: this.communityKey,
        })
    }

    render() {
        //console.log('communityKey, roomKey', this.communityKey)
        return (
            <View style={{ marginTop: StatusBar.currentHeight, flex: 1 }}>
                <Header
                    title="Rooms"
                    icon='plus' type='font-awesome'
                    onPress={() => this.navigate('CreateRoom', { communityKey: this.communityKey })}
                />
                <FlatList
                    data={this.state.rooms}
                    renderItem={({ item }) =>
                        <View style={[styles.container]}>
                            <Avatar rounded size={65} source={{ uri: item.avatar }} />
                            <View underlayColor="#fff" style={styles.item}>
                                <View style={{paddingBottom: 5}}>
                                    <Text style={styles.roomName}>{item.name}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <SubButton actionFunc={() => this.openMessages(item)}
                                        iconName={'comments-o'} />

                                    <SubButton actionFunc={() => this.navigate('BotStack', {
                                        communityKey: this.communityKey, roomKey: item.key
                                    })}
                                        iconName={'user-o'} />

                                    <SubButton actionFunc={() => this.navigate('BubbleStack', {
                                        communityKey: this.communityKey, roomKey: item.key
                                    })}

                                        iconName={'circle-thin'} />
                                    <SubButton actionFunc={() => this.updateRoom(item)}
                                        iconName={'pencil-square-o'} />
                                </View>
                            </View>
                        </View>
                    }
                />
            </View>
        );
    }
}