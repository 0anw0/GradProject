import React from "react";
import { View, TouchableOpacity, TextInput, Text, StatusBar, Dimensions } from "react-native";
import * as firebase from "firebase";

import styles from '../../../../shared/postItems/createPostStyles'
import Header from '../../../../shared/Header'

export default class createBubble extends React.Component {
    constructor(props) {
        super(props)
        this.navigate = this.props.navigation.navigate
        this.uuid = firebase.auth().currentUser.uid || 0
        this.state = {
            bubbleTxt: '',
            sentMsg: false,
            communityKey: '',
            roomKey: '',
            currentUid: ''
        }
    }

    componentDidMount() {
        let { communityKey, roomKey } = this.props.navigation.state.params
        this.setState({ communityKey, roomKey })

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ currentUid: user.uid })
            }
        });

    }

    handleMsg = (bubbleTxt) => { this.setState({ bubbleTxt: bubbleTxt }) }

    pushBubble = () => {
        let { bubbleTxt, communityKey, roomKey } = this.state
        let uuid = this.uuid
        let sentMsg = this.state.sentMsg ? uuid : 'created'
        firebase.database().ref(`Bubbles/`).push({
            bubbleTxt: bubbleTxt,
            uuid: uuid,
            sentMsg: sentMsg,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            replyNumber: 0
        }).then((res) => {
            firebase.database()
                .ref(`rooms/${communityKey}/${roomKey}/Bubbles/`).push({
                    bubbleKey: res.key
                })
        }).catch((error) => {
            console.log('error ', error)
        })
        this.navigate('RoomsList', {
            communityKey: this.state.communityKey, roomKey: this.state.roomKey
        })
    }

    render() {
        return (
            <View style={{ paddingTop: StatusBar.currentHeight, alignItems: 'center' }} >
                <Header title="New Bubble .." />
                <View style={{
                    paddingHorizontal: 20, paddingVertical: 20,
                    width: Dimensions.get('window').width
                }}>

                    <View style={styles.postContainer}>
                        <TextInput style={styles.post}
                            placeholder="Type something ... "
                            placeholderTextColor='#888'
                            autoCapitalize="none"
                            value={this.state.bubbleTxt}
                            multiline={true}
                            numberOfLines={3}
                            onChangeText={(bubbleTxt) => {
                                this.setState({ bubbleTxt })
                            }}
                        />
                    </View>
                </View>
                <View style={{
                    justifyContent: 'center', alignItems: 'center', backgroundColor: '#092A75',
                    height: 40, width: 150, borderRadius: 5
                }}>
                    <TouchableOpacity onPress={() => this.pushBubble()}>
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
                            S E N D
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}