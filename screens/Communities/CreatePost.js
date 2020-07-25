import React from 'react';
import { Alert, View, StatusBar } from 'react-native';
import * as firebase from 'firebase'

import { firebaseConfig } from "../../services/firebaseConfig";
import { _launchCameraRoll, _takePhoto } from '../../services/CameraAPI'
import { PostCreation } from "./postCreation";
import submit from "./submitPost"

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default class CreateNewPostScreen extends React.Component {
    constructor(props) {
        super(props)
        this.currentUser = firebase.auth().currentUser
        this.state = {
            postTxt: '',
            postImg: [],
            imgPicked: false,
            postExist: false,
            communitiesPicked: [],
            headingFromCommunity: false,
            postKey: '',
            communityKey: '',
            communityName: ''
        }
    }

    componentDidMount() {
        let { headingFromCommunity, createPost } = this.props.navigation.state.params
        this.setState({ headingFromCommunity })

        if (headingFromCommunity) {
            let { communityKey, communityName } = this.props.navigation.state.params
            this.setState({ communityKey, communityName })
        }
    }

    setPostTxtState = (postTxt) => {
        this.setState({ postTxt })
    }

    setPickedCommunitiesState = (communities) => {
        let communitiesPicked = []

        communities.forEach(child => {
            if (child.selected == true) {
                communitiesPicked.push(child)
            }
        })

        this.setState({ communitiesPicked })
    }

    pickImage = () => {
        let promObject = _launchCameraRoll()
        promObject.then(res => {
            res.url.then(res => {
                this.setState({ postImg: [...this.state.postImg, res] })
            })
        })
    }

    takePhoto = () => {
        let promObject = _takePhoto()
        promObject.then(res => {
            res.url.then(res => {
                this.setState({ postImg: [...this.state.postImg, res] })
            })
        })
    }

    render() {
        let { postTxt, postImg, communitiesPicked,
            headingFromCommunity, communityKey, communityName } = this.state

        let { navigate } = this.props.navigation
        let uuid = this.currentUser.uid

        return (
            <View style={{ marginTop: StatusBar.currentHeight }}>
                <PostCreation
                    setPickedCommunitiesState={this.setPickedCommunitiesState}
                    setPostTxtState={this.setPostTxtState}
                    pickImage={this.pickImage}
                    takePhoto={this.takePhoto}
                    submit={() => submit(postTxt, postImg, navigate,
                        communitiesPicked, headingFromCommunity,
                        communityKey, uuid, communityName)}

                    postImg={this.state.postImg}
                    postTxt={this.state.postTxt}
                    headingFromCommunity={this.state.headingFromCommunity}
                />
            </View>
        );
    }
}

