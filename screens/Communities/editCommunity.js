import React from 'react';
import { View, TouchableOpacity, ImageBackground, TextInput, StatusBar } from 'react-native';
import { Avatar, Button } from 'react-native-elements';

import { _launchCameraRoll, _takePhoto } from '../../services/CameraAPI'
import { secondColor } from '../../shared/constants'
import firebase from '../../services/firebaseConfig'
import styles from "./communityStyles";

export default class EditCommunity extends React.Component {
    constructor(props) {
        super(props)
        this.navigate = this.props.navigation.navigate
        this.adminID = firebase.auth().currentUser.uid
        this.communityKey = this.props.navigation.getParam("communityKey")
        this.currentUser = firebase.auth().currentUser
        this.db = firebase.database().ref(`communities/${this.communityKey}`)
        this.state = {
            name: '',
            avatar: 'http://placehold.it/130',
            cover: 'http://placehold.it/360x166',
            description: '',
            communityDetails: {},
        }
    }

    componentDidMount() {

        let { communityDetails } = this.props.navigation.state.params
        this.setState({
            name: communityDetails.name,
            avatar: communityDetails.avatar,
            cover: communityDetails.cover,
            description: communityDetails.description
        })
    }

    pickAvatar = () => {
        let promObject = _launchCameraRoll()
        promObject.then(res => {
            res.url.then(res => {
                this.setState({ avatar: res })
            })
        })
    }

    pickCover = () => {
        let promObject = _launchCameraRoll()
        promObject.then(res => {
            res.url.then(res => {
                this.setState({ cover: res })
            })
        })
    }


    updateCommunityInfo = () => {
        let { cover, avatar, name, description } = this.state
        this.db.update({ cover, avatar, name, description }).then(() => {
            this.navigate('CommunityOverview')
        })
    }

    render() {
        return (
            <View style={{ marginTop: StatusBar.currentHeight }}>
                <View>
                    <TouchableOpacity onPress={this.pickCover}>
                        <ImageBackground
                            source={{ uri: this.state.cover }}
                            style={styles.cover}>
                        </ImageBackground>
                    </TouchableOpacity>
                    <View style={styles.profilePic}>
                        <TouchableOpacity onPress={this.pickAvatar}>
                            <Avatar
                                editButton
                                rounded
                                size={130}
                                source={{ uri: this.state.avatar }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
                        <TextInput
                            style={styles.communityNameTxtInput}
                            placeholderTextColor='#444'
                            autoCapitalize="none"
                            value={this.state.name}
                            onChangeText={name => this.setState({ name })}
                        />
                        <TextInput
                            style={styles.communityDisTxtInput}
                            placeholderTextColor='#444'
                            autoCapitalize="none"
                            value={this.state.description}
                            onChangeText={description => this.setState({ description })}
                        />
                    </View>
                </View>

                <View style={{ alignItems: 'center', marginTop: 25 }}>
                    <Button
                        buttonStyle={{ color: secondColor, width: 285, height: 39, backgroundColor: secondColor }}
                        title="UPDATE"
                        onPress={() => this.updateCommunityInfo()}
                    />
                </View>
            </View>
        );
    }
}