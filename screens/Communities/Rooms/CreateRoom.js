import React from "react";
import { TextInput, StatusBar, View, Button, Alert } from 'react-native';
import { Avatar } from 'react-native-elements'

import { _launchCameraRoll, _takePhoto } from '../../../services/CameraAPI'
import firebase from '../../../services/firebaseConfig'
import { secondColor } from '../../../shared/constants'
import ChooseRoomMembers from "./ChooseRoomMembers";
import Header from '../../../shared/Header'
import styles from "./roomStyles";


export default class CreateRoom extends React.Component {
    constructor(props) {
        super(props);
        this.adminID = firebase.auth().currentUser.uid
        this.navigate = this.props.navigation.navigate
        this.state = {
            newRoom: '',
            avatar: '',
            communityKey: '',
            members: [],
            membersPicked: [],
            profileIcon: 'http://placehold.it/130'
        }
    }

    componentDidMount() {
        let { communityKey } = this.props.navigation.state.params
        this.setState({ communityKey })
    }

    setPickedMemberState = (members) => {
        let membersPicked = []

        members.forEach(child => {
            if (child.selected == true) {
                membersPicked.push(child)
            }
        })
        this.setState({ membersPicked })
        console.log('ssssssssssssssssss', membersPicked)
    }

    pickAvatar = () => {
        let promObject = _launchCameraRoll()
        promObject.then(res => {
            res.url.then(res => {
                this.setState({ avatar: res })
            })
        })
    }

    addRoom = () => {
        let adminsNumber = 0, communityKey = this.state.communityKey
        if (this.state.newRoom === '') {
            Alert.alert('please, Enter Room Name!')
            return;
        }
        firebase.database().ref(`rooms/${communityKey}/`).push({
            name: this.state.newRoom,
            avatar: this.state.avatar,
        }).then(res => {
            this.state.membersPicked.forEach(item => {
                if (item.adminRole) { adminsNumber++ }

                firebase.database()
                    .ref(`rooms/${communityKey}/${res.key}/members/${item.key}`).set({
                        admin: item.key === this.adminID ? true : false,
                    })

                firebase.database()
                    .ref(`authenticatedUsers/${item.key}/rooms/${res.key}`).set({
                        admin: item.key === this.adminID ? true : false
                    })

                firebase.database()
                    .ref(`authenticatedUsers/${item.key}/communities/${communityKey}/rooms/${res.key}`)
                    .set({
                        admin: item.key === this.adminID ? true : false
                    })
                firebase.database().ref(`rooms/${communityKey}/${res.key}`).set({
                    adminsNumber: adminsNumber
                })
            })
        })

        this.props.navigation.navigate("RoomsList")
        this.setState({ newRoom: '' });
    }

    render() {
        return (
            <View style={{ marginTop: StatusBar.currentHeight }}>
                <Header title='New Room' />
                <View style={{ padding: 15 }}>
                    <View style={styles.avatarContainer}>
                        <Avatar
                            rounded
                            showEditButton
                            onEditPress={this.pickAvatar}
                            size={'large'}
                            icon={{ name: 'user', type: 'font-awesome' }}
                            source={{
                                uri: this.state.avatar ?
                                    this.state.avatar :
                                    this.state.profileIcon
                            }}
                        />
                    </View>
                    <TextInput
                        style={styles.newRoomTextInput}
                        placeholder="Enter Room Name"
                        value={this.state.newRoom}
                        onChangeText={newRoom => this.setState({ newRoom })}
                    />
                    <ChooseRoomMembers
                        communityKey={this.state.communityKey}
                        members={this.state.membersPicked}
                        setPickedMemberState={this.setPickedMemberState}
                        navigation={this.props.navigation}
                    />
                    <View style={{ marginBottom: 5 }}>
                        <Button title="Create" color={secondColor} onPress={() => this.addRoom()} />
                    </View>
                </View>
            </View>
        );
    }
}


