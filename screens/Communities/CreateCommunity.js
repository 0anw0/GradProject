import React from 'react';
import { View, Button, StatusBar, ActivityIndicator } from 'react-native';

import { _launchCameraRoll, _takePhoto } from '../../services/CameraAPI'
import ChooseCommunityMembers from "./chooseCommunityMembers";
import { handleCreation } from './handleCommunityCreation'
import firebase from '../../services/firebaseConfig'
import { CommunityHeader } from './communityHeader'

export default class CreateCommunity extends React.Component {
    constructor(props) {
        super(props)
        this.navigate = this.props.navigation.navigate
        this.db = firebase.database()
        this.state = {
            commName: '',
            commDesc: '',
            commAvatar: 'http://placehold.it/130',
            commCover: 'http://placehold.it/360x166',
            adminID: '',
            loadingCreatorInfo: false,
            friendsPicked: []
        }
    }

    componentDidMount() {
        this.getUserInfo()
    }

    setPickedFriendsState = (friends) => {
        let friendsPicked = []

        friends.forEach(child => {
            if (child.selected == true) {
                friendsPicked.push(child)
            }
        })
        this.setState({ friendsPicked })
    }

    getUserInfo = async () => {
        let friendsPicked
        let creatorInfo = {}, currentUid = firebase.auth().currentUser.uid

        firebase.database()
            .ref(`authenticatedUsers/${currentUid}/`)
            .once('value', child => {
                creatorInfo = {
                    name: child.val().fullName,
                    avatar: child.val().avatar,
                    key: currentUid,
                    selected:true,
                    adminRole: true
                }
            })
        friendsPicked = [creatorInfo]
        this.setState({ friendsPicked: friendsPicked, loadingCreatorInfo: true })
    }

    pickAvatar = () => {
        let promObject = _launchCameraRoll()
        promObject.then(res => {
            res.url.then(res => {
                this.setState({ commAvatar: res })
            })
        })
    }

    pickCover = () => {
        let promObject = _launchCameraRoll()
        promObject.then(res => {
            res.url.then(res => {
                this.setState({ commCover: res })
            })
        })
    }

    setCommDescState = (commDesc) => {
        this.setState({ commDesc })
    }

    setCommNameState = (commName) => {
        this.setState({ commName })
    }

    render() {

        return (
            <View style={{ marginTop: StatusBar.currentHeight }}>
                <CommunityHeader
                    pickCover={this.pickCover}
                    pickAvatar={this.pickAvatar}

                    commCover={this.state.commCover}
                    commAvatar={this.state.commAvatar}
                    commDesc={this.state.commDesc}
                    commName={this.state.commName}

                    setCommDescState={this.setCommDescState}
                    setCommNameState={this.setCommNameState}
                />

                <View style={{ borderWidth: 1, borderColor: 'blue', margin: 15 }}>
                    {this.state.loadingCreatorInfo ?
                        < ChooseCommunityMembers
                            friends={this.state.friendsPicked}
                            setPickedFriendsState={this.setPickedFriendsState}
                        />
                        : <ActivityIndicator size="large" color="blue" style={{ paddingTop: 275 }} />
                    }
                </View>

                <View style={{ alignItems: 'center', marginTop: 25 }}>
                    <Button
                        title="CREATE"
                        onPress={() => handleCreation(this.state, this.navigate)}
                    />
                </View>
            </View>
        );
    }
}
