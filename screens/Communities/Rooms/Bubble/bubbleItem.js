import React from 'react'
import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import { Icon } from 'react-native-elements';
import * as firebase from "firebase";

import BubbleContent from './bubbleContent';
import RenderReplies from "./renderReplies";
import styles from "./bubbleStyles";

class BubbleItem extends React.Component {
    constructor(props) {
        super(props)
        this.item = this.props.item
        this.numOfItems = this.props.numOfItems
        this.state = {
            showReplySection: false,
            showLoveNumber: '',
            showReplyNumber: 0,
            replies: [],
            fullName: '',
            showReactorSection: false,
            currentUid: ''
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ currentUid: user.uid })
            }
        });

        let fullName
        firebase.database()
            .ref(`authenticatedUsers/${this.currentUid}/fullName`)
            .once('value', snap => {
                fullName = snap.val()
            })

        this.setState({ fullName })
    }

    addReply = (replyTxt) => {

        this.setState(prevState => ({
            replies: [...prevState.replies, {
                name: this.state.fullName,
                creator: this.currentUid,
                reply: replyTxt
            }]

        }))

        this.setState({ replyTxt: '' })
    }

    setReplyTextState = (value) => {
        this.setState({ replyTxt: value })
    }

    toggleShowReply = () => {
        this.setState(prevState =>
            ({ showReplySection: !prevState.showReplySection }))
    }

    render() {
        return (
            <View style={[styles.bubbleContainer,
            {
                marginLeft:
                    this.numOfItems == 1 ? Dimensions.get('window').width * 0.1 :
                        Dimensions.get('window').width * 0.05
            }]}>

                <BubbleContent item={this.item} currentUid={this.state.currentUid} />

                <View style={styles.bubbleFooter}>
                    <TouchableOpacity onPress={this.toggleShowReply}>
                        <Text>{this.state.showReplyNumber}  reply</Text>
                        <Icon name='commenting' type='font-awesome' size={22} color='#555' />
                    </TouchableOpacity>
                </View>

                {this.state.showReplySection ?
                    <RenderReplies
                        replies={this.state.replies} addReply={this.addReply}
                    />
                    : null}
            </View>
        )
    }
}

export default BubbleItem
