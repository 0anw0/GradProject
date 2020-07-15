import React from 'react'
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-elements'
import * as firebase from "firebase"

import BubbleContent from './bubbleContent'
import RenderReplies from "./renderReplies"
import getReplies from './getReplies'
import styles from "./bubbleStyles"

class BubbleItem extends React.Component {
    constructor(props) {
        super(props)
        this.item = this.props.item
        this.numOfItems = this.props.numOfItems
        this.state = {
            showReplySection: false,
            showReplyNumber: this.item.replyNumber,
            replies: [],
            fullName: '',
            showReactorSection: false,
            currentUid: '',
            communityKey: '',
            roomKey: '',
            repliesLoaded: false
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ currentUid: user.uid })
                firebase.database()
                    .ref(`authenticatedUsers/${user.uid}/fullName`)
                    .once('value', snap =>
                        this.setState({ fullName: snap.val() })
                    )
            }
        })

        let { communityKey, roomKey } = this.props.navigation.state.params
        this.setState({ communityKey, roomKey })
    }

    decreaseReplyNum = () => {
        this.setState(prevState => ({
            showReplyNumber: prevState.showReplyNumber - 1
        }))
        //console.log('decreased: ', this.state.showReplyNumber)
    }

    uploadReply = (replyTxt) => {
        this.setState(prevState => ({
            showReplyNumber: prevState.showReplyNumber + 1
        }))

        firebase.database().ref(`Bubbles/${this.item.bubbleKey}/replies`).push({
            replyTxt: replyTxt,
            creator: this.state.currentUid,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        }).then((res) => {
            firebase.database()
                .ref(`messages/${this.state.communityKey}/${this.state.roomKey}`)
                .push({
                    replyKey: res.key,
                    reply: true,
                    text: replyTxt,
                    bubbleKey: this.item.bubbleKey,
                    timestamp: firebase.database.ServerValue.TIMESTAMP,
                    user: {
                        _id: this.state.currentUid,
                        avatar: this.item.avatar,
                        name: this.item.fullName
                    }
                })
        }).then(() => {
            firebase.database().ref(`Bubbles/${this.item.bubbleKey}/`).update({
                replyNumber: this.state.showReplyNumber
            })
            this.setState({ replyTxt: '' })
        })
    }

    setReplyTextState = (value) => {
        this.setState({ replyTxt: value })
    }

    toggleShowReply = () => {
        this.setState(prevState =>
            ({ showReplySection: !prevState.showReplySection }))

        if (this.state.showReplySection) {
            getReplies(this.item.bubbleKey,
                this.state.currentUid,
                this.setRepliesState)
        }
    }

    setRepliesState = (value) => {
        this.setState({ replies: value, repliesLoaded: true })
    }

    updateReply = (replyKey) => {
        let ind = this.state.replies.findIndex(
            (item) => item.replyKey == replyKey
        )
        //console.log(' Deleted Reply :-', this.state.replies[ind])
        let filteredReplies = this.state.replies.splice(ind, 1)

        this.setState({ replies: filteredReplies });
    }

    render() {
        //console.log('state:-', this.state)
        return (
            <View style={
                [styles.bubbleContainer,
                {
                    marginLeft:
                        this.numOfItems == 1 ? Dimensions.get('window').width * 0.1 :
                            Dimensions.get('window').width * 0.05
                }]} >

                <BubbleContent
                    item={this.item}
                    currentUid={this.state.currentUid}
                    updateBubbles={this.props.updateBubbles}
                    communityKey={this.state.communityKey}
                    roomKey={this.state.roomKey}
                />

                <View style={styles.bubbleFooter}>
                    <TouchableOpacity onPress={this.toggleShowReply}>
                        <Text>{this.state.showReplyNumber} reply</Text>
                        <Icon name='commenting' type='font-awesome' size={22} color='#555' />
                    </TouchableOpacity>
                </View>

                {this.state.showReplySection ?

                    this.state.repliesLoaded ?
                        <RenderReplies
                            replies={this.state.replies}
                            communityKey={this.state.communityKey}
                            roomKey={this.state.roomKey}
                            bubbleKey={this.item.bubbleKey}
                            uuid={this.state.currentUid}

                            uploadReply={this.uploadReply}
                            updateReply={this.updateReply}
                            decreaseReplyNum={this.decreaseReplyNum}
                        />
                        : <ActivityIndicator
                            size="large" color="blue" style={{ paddingTop: 100 }} />
                    : null
                }
            </View >
        )
    }
}

export default BubbleItem
