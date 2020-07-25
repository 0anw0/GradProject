import React from "react";
import { TextInput, StatusBar, View, Button } from 'react-native';
import { Avatar } from 'react-native-elements'

import { _launchCameraRoll, _takePhoto } from '../../../services/CameraAPI'
import firebase from '../../../services/firebaseConfig'
import { secondColor } from '../../../shared/constants'
import Header from '../../../shared/Header'
import styles from "./roomStyles";

export default class EditRoom extends React.Component {
    constructor(props) {
        super(props);
        this.adminID = firebase.auth().currentUser.uid
        this.navigate = this.props.navigation.navigate
        this.state = {
            roomName: '',
            avatar: 'http://placehold.it/130',
            communityKey: '',
            roomKey: '',
        }
    }
    componentDidMount() {
        let { communityKey, roomKey, roomName, roomAvatar } = this.props.navigation.state.params
        let avatar = roomAvatar
        this.setState({ communityKey, roomKey, roomName, avatar })
    }

    pickAvatar = () => {
        let promObject = _launchCameraRoll()
        promObject.then(res => {
            res.url.then(res => {
                this.setState({ avatar: res })
            })
        })
    }

    updateRoomInfo = () => {
        let { avatar, communityKey, roomKey } = this.state, name = this.state.roomName
        firebase.database().ref(`rooms/${communityKey}/${roomKey}`)
            .update({ avatar, name }).then(() => {
                this.props.navigation.navigate('RoomsList')
            })
    }

    render() {
        return (
            <View style={{ marginTop: StatusBar.currentHeight }}>
                <Header title='Edit Room Profile' />
                <View style={{ padding: 15 }}>
                    <View style={styles.avatarContainer}>
                        <Avatar
                            rounded
                            showEditButton
                            onEditPress={this.pickAvatar}
                            size={'large'}
                            icon={{ name: 'user', type: 'font-awesome' }}
                            source={{ uri: this.state.avatar }}
                        />
                    </View>
                    <View style={{ 
                        borderWidth: 1 , borderColor:secondColor, paddingLeft:2 ,
                        borderRadius:5 
                        }}>
                        <TextInput
                            style={{ margin : 5 , fontSize: 16 , fontWeight:'bold'}}
                            autoCapitalize="none"
                            value={this.state.roomName}
                            onChangeText={roomName => this.setState({ roomName })}
                        />
                    </View>
                    <View style={{ marginBottom: 5, paddingTop: 10 }}>
                        <Button title="Update" color={secondColor} onPress={() => this.updateRoomInfo()} />
                    </View>
                </View>
            </View>
        );
    }
}
