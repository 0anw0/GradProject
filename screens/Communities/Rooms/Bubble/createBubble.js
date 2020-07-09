import React from "react";
import { View, Button, TextInput, StatusBar } from "react-native";
import * as firebase from "firebase";

export default class createBubble extends React.Component {
    constructor() {
        super()
        this.uuid = firebase.auth().currentUser.uid
        this.state = {
            bubble: '',
            userId: 0,
            sentMsg: false,
            communityKey: '',
            roomKey: ''
        }
    }

    componentDidMount() {
        let { communityKey, roomKey } = this.props.navigation.state.params
        this.setState({ communityKey, roomKey })
    }

    handleMsg = (msg) => { this.setState({ bubble: msg }) }

    pushBubble = () => {
        const { bubble, communityKey, roomKey } = this.state
        let uuid = this.uuid
        let sentMsg = this.state.sentMsg ? uuid : 'created'
        firebase.database().ref(`Bubbles/`).push({
            bubble: bubble,
            uuid: uuid,
            sentMsg: sentMsg,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            loveNumber: 0 , 
            replyNumber: 0
        }).then((res) => {
            firebase.database()
            .ref(`rooms/${communityKey}/${roomKey}/Bubbles/`).push({
                bubbleKey: res.key
            })
        }).catch((error) => {
            console.log('error ', error)
        })
    }

    handleComments = (comment) => {
        this.setState({ comment: comment })
    }

    render() {
        return (
            <View style={{ paddingTop: StatusBar.currentHeight }}>
                <TextInput
                    placeholder='msg'
                    onChangeText={(msg) => this.handleMsg(msg)}
                    style={{ width: 250, borderWidth: 1, margin: 5 }} />
                <Button title='createBubble' onPress={this.pushBubble} />
            </View>
        )
    }
}