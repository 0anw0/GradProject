import React from "react";
import { FlatList, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { Avatar } from 'react-native-elements'

import firebase from '../../../services/firebaseConfig'
import Header from '../../../shared/Header'
import styles from "./roomStyles";

function SubButton({ actionFunc, ButtonTxt }) {
    return (
        <TouchableOpacity onPress={actionFunc}>
            <Text style={styles.option}>{ButtonTxt}</Text>
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

    updateRoom(roomUP) {
        this.props.navigation.navigate('EditRoomProfile', {
            roomKey: roomUP.key,
            roomAvatar: roomUP.avatar,
            roomName: roomUP.name,
            communityKey: this.communityKey,
        })
    }

    render() {
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
                        <View style={styles.container}>
                            <Avatar rounded size={65} source={{ uri: item.avatar }} />
                            <View underlayColor="#fff" style={styles.item}>
                                <Text style={styles.roomName}>{item.name}</Text>
                                <View style={{ flexDirection: 'row', marginTop: 5, marginLeft: 5 }}>
                                    <SubButton actionFunc={() => this.openMessages(item)}
                                        ButtonTxt={'chat'} />
                                    <SubButton actionFunc={() => this.navigate('BotStack' , {
                                        communityKey: this.communityKey, roomKey: item.key
                                    }) }
                                        ButtonTxt={'Chatbot'} />
                                    <SubButton actionFunc={() => this.navigate('BubbleStack',{
                                        communityKey: this.communityKey, roomKey: item.key
                                    })}
                                        ButtonTxt={'Bubble'} />
                                    <SubButton actionFunc={() => this.updateRoom(item)}
                                        ButtonTxt={'setting'} />
                                </View>
                            </View>
                        </View>
                    }
                />
            </View>
        );
    }
}