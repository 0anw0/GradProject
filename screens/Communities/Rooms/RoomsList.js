import React from "react";
import { FlatList, Text, View, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { Avatar, Icon } from 'react-native-elements'

import TouchableButton from '../../../shared/TouchableButton'
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
        this.navigate = this.props.navigation.navigate
        this.uuid = firebase.auth().currentUser.uid
        this.communityKey = this.props.navigation.state.params.communityKey
        this.state = {
            rooms: [],
            newRoom: '',
            existRooms: true,
            loaded: false,
        }
    }

    componentDidMount() {
        this.listenForRooms()
    }

    listenForRooms() {
        var roomsFB = []
        firebase.database()
            .ref(`authenticatedUsers/${this.uuid}/communities/${this.communityKey}/rooms`)
            .on('value', snap => {
                snap.forEach(child => {
                    firebase.database().ref(`rooms/${child.key}`)
                        .on('value', element => {
                            roomsFB.push({
                                name: element.val().name,
                                avatar: element.val().avatar,
                                key: child.key
                            });
                        });
                })
            })

        this.setState({
            rooms: roomsFB,
            existRooms: roomsFB.length == 0 ? false : true,
            loaded: true
        })
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
        return (
            <View style={{ marginTop: StatusBar.currentHeight, flex: 1 }}>
                <Header
                    title="Rooms"
                    icon='plus' type='font-awesome'
                    onPress={() => this.navigate('CreateRoom',
                        { communityKey: this.communityKey })}
                />
                {this.state.loaded ?
                    !this.state.existRooms ?
                        <TouchableButton btnStyleType={styles.icon}
                            btnFunction={() => this.navigate('CreateRoom',
                                { communityKey: this.communityKey })}
                            txt={true} icon={true} name='plus' type='font-awesome' size={30}
                            color={'blue'} txtValue={'Create Your First Room!'}
                            txtStyleType={{ margin: 10 }} />
                        :
                        <FlatList
                            data={this.state.rooms}
                            renderItem={({ item }) =>
                                <View style={[styles.container]}>
                                    <Avatar rounded size={65} source={{ uri: item.avatar }} />
                                    <View underlayColor="#fff" style={styles.item}>
                                        <View style={{ paddingBottom: 5 }}>
                                            <Text style={styles.roomName}>{item.name}</Text>
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-around'
                                        }}>
                                            <SubButton actionFunc={() => this.openMessages(item)}
                                                iconName={'comments-o'} />

                                            <SubButton actionFunc={() => this.navigate('BotStack', {
                                                communityKey: this.communityKey,
                                                roomKey: item.key
                                            })}
                                                iconName={'user-o'} />

                                            <SubButton actionFunc={() => this.navigate('BubbleStack', {
                                                communityKey: this.communityKey,
                                                roomKey: item.key
                                            })}

                                                iconName={'circle-thin'} />
                                            <SubButton actionFunc={() => this.updateRoom(item)}
                                                iconName={'pencil-square-o'} />
                                        </View>
                                    </View>
                                </View>
                            }
                        />
                    : <ActivityIndicator size="large" color="blue" style={{ paddingTop: 275 }} />}
            </View>
        );
    }
}