import React from "react";
import { TextInput, StatusBar, View, Alert } from 'react-native';
import { Avatar, Button } from 'react-native-elements'

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
        this.communityKey = this.props.navigation.state.params.communityKey
        this.state = {
            newRoom: '',
            avatar: '',
            btnLoading: false,
            members: [],
            membersPicked: [],
            profileIcon: 'http://placehold.it/130',
            disabled: false,
        }   
    }

    setPickedMemberState = (members) => {
        let membersPicked = []

        members.forEach(child => {
            if (child.selected == true) {
                membersPicked.push(child)
            }
        })
        this.setState({ membersPicked })
        console.log(membersPicked)
    }

    pickAvatar = () => {
        let promObject = {}
        Alert.alert(
            "ًSelect Location",'',
            [
                {
                    text: "Launch Camera Roll",
                    onPress: () => {
                        promObject = _launchCameraRoll()
                        promObject.then(res => {
                            res.url.then(res => {
                                this.setState({ avatar: res })
                            })
                        })
                    }
                },
                {
                    text: "Open Camera",
                    onPress: () => {
                        promObject = _takePhoto()
                        promObject.then(res => {
                            res.url.then(res => {
                                this.setState({ avatar: res })
                            })
                        })
                    }
                }
            ]
        )

    }

    addRoom = () => {
        this.setState({ btnLoading: true, disabled: true })
        let adminsNumber = 0, communityKey = this.communityKey 

        if (this.state.newRoom === '') {
            Alert.alert('please, Enter Room Name!')
            this.setState({ btnLoading: false, disabled: false })
            return;
        }

        firebase.database().ref(`rooms/`).push({
            name: this.state.newRoom,
            avatar: this.state.avatar,
        }).then(res => {
            this.state.membersPicked.forEach(item => {
                if (item.adminRole) { adminsNumber++ }

                firebase.database()
                    .ref(`rooms/${res.key}/members/${item.key}`).set({
                        admin: item.key === this.adminID ? true : false,
                    })

                firebase.database()
                    .ref(`authenticatedUsers/${item.key}/rooms/${res.key}`).set({
                        admin: item.key === this.adminID ? true : false ,
                        hidden: false   
                    })

                firebase.database()
                    .ref(`authenticatedUsers/${item.key}/communities/${communityKey}/rooms/${res.key}`)
                    .set({
                        admin: item.key === this.adminID ? true : false 
                    
                    })

                firebase.database()
                    .ref(`communities/${communityKey }/rooms/`)
                    .push({ roomKey: res.key })

                firebase.database().ref(`rooms/${res.key}/adminsNumber`).set({
                    adminsNumber: adminsNumber
                })
            })
        }).then(() => {
            this.navigate("RoomsList")
        })

        this.setState({ newRoom: '' });
    }

    render() {
        //console.log("this",this.communityKey)
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
                        communityKey={this.communityKey}
                        members={this.state.membersPicked}
                        setPickedMemberState={this.setPickedMemberState}
                        navigation={this.props.navigation}
                    />
                    <View style={{ marginBottom: 5, paddingTop: 5 }}>
                        <Button
                            loading={this.state.btnLoading}
                            disabled={this.state.disabled}
                            loadingProps={{ size: 'small' }}
                            title="Create" color={secondColor}
                            onPress={() => this.addRoom()} />
                    </View>
                </View>
            </View>
        );
    }
}


