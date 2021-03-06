import React from "react";
import { TouchableOpacity, StyleSheet, View, StatusBar } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import * as firebase from 'firebase'
import Header from "../../../../shared/Header"
import { validURL, secondColor } from '../../../../shared/constants'
import { _launchCameraRoll, _takePhoto } from '../../../../services/CameraAPI'


!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default class ChatScreen extends React.Component {
    constructor(props) {
        super(props)
        this.currentUser = firebase.auth().currentUser
        this.communityKey = this.props.navigation.getParam("communityKey")
        this.roomKey = this.props.navigation.getParam("roomKey")
        this.roomRef = firebase.database().ref(`messages/${this.communityKey}/${this.roomKey}`)
        this.uploadedImages = firebase.database().ref(`rooms/${this.communityKey}/${this.roomKey}/uploadedImages`)
        this.chatLinks = firebase.database().ref(`rooms/${this.communityKey}/${this.roomKey}/chatLinks`)
        this.state = {
            messages: [],
            pickedImage: null,
            pickedVideo: null,
            botName: '',
            communityKey: '',
            roomKey: '',
            botKey: ''
        };
    }

    get user() {
        return {
            _id: (this.currentUser || {}).uid,
            name: (this.currentUser.displayName || {}),
            avatar: (this.currentUser.photoURL)
        };
    }

    send = messages => {
        messages.forEach(item => {
            const message = {
                text: item.text,
                image: this.state.pickedImage,
                video: this.state.pickedVideo,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: item.user
            };
            this.roomRef.push(message);

            // In Case of Links
            if (validURL(item.text)) {
                this.chatLinks.push({
                    link: item.text,
                })
            }

            // Push Media to Room's Uploaded Media Path
            this.uploadedImages.push({
                image: this.state.pickedImage,
                //video: this.state.pickedVideo
            }).then(this.setState({ pickedImage: '', pickedVideo: '' }))
        });
    };


    parse = message => {
        const { user, text, timestamp, image, video } = message.val();
        const { key: _id } = message;
        const createdAt = new Date(timestamp);
        return {
            _id,
            createdAt,
            text,
            image,
            video,
            user
        };
    };

    get = callback => {
        this.roomRef.on("child_added", snapshot => callback(this.parse(snapshot)));
    };

    url = ''
    pickImage = () => {
        let promObject = _launchCameraRoll()
        promObject.then(res => {
            res.url.then(res => {
                this.url = res
            })
            res.data.then(res => {
                if (res.contentType.includes('image')) {
                    this.setState({ pickedImage: this.url })
                }
                else {
                }
            })
        })
    }

    componentDidMount() {
        let { communityKey, roomKey, botKey , name} = this.props.navigation.state.params
        this.setState({ communityKey, roomKey, botKey  , botName : name})
        this.get(message =>
            this.setState(previous => ({
                messages: GiftedChat.append(previous.messages, message)
            }))
        );
    }

    render() {
        return (
            <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
                <Header title={this.state.botName} />
                <GiftedChat
                    messages={this.state.messages}
                    onSend={this.send}
                    user={this.user}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 7,
        marginRight: 2
    },
    headerLeft: {
        paddingLeft: 10,
    },
});

