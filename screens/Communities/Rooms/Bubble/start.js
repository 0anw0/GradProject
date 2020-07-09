import React, { Component } from 'react'
import { View, FlatList, StatusBar, ActivityIndicator } from 'react-native'
import * as firebase from 'firebase'

import { firebaseConfig } from "../../../../services/firebaseConfig"
import TouchableButton from "../../../../shared/TouchableButton";
import Header from '../../../../shared/Header'
import getBubbleKeys from './getBubbles'
import BubbleItem from './bubbleItem'

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const auth = firebase.auth()

export default class BubbleHome extends Component {
    constructor(props) {
        super(props)
        this.navigate = this.props.navigation.navigate
        this.state = {
            roomKey: '',
            communityKey: '',
            bubbles: [],
            loaded: false,
            existBubbles: true,
            showReplySection: false,
            currentUid:''
        }
    }

    componentDidMount() {
        let { communityKey, roomKey } = this.props.navigation.state.params
        this.setState({ communityKey, roomKey })

        getBubbleKeys(communityKey, roomKey, this.setBubbleState)

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ currentUid: user.uid })
            }
        });

    }

    setBubbleState = (value) => {
        if (value.length == 0) {
            this.setState({ existBubbles: false, loaded: true })
        }

        this.setState({ bubbles: value, loaded: true })
    }

    naviToCreateBubble = () => {
        const { communityKey, roomKey } = this.state
        this.navigate('createBubble', { communityKey, roomKey })
    }

    naviToBubble = () => {
        const { communityKey, roomKey } = this.state
        this.navigate('Bubble', { communityKey, roomKey })
    }

    render() {
        return (
            <View style={{ paddingTop: StatusBar.currentHeight }}>
                <Header
                    center
                    title='Bubbles'
                />
                {this.state.loaded ?
                    this.state.existBubbles ?
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={this.state.bubbles}
                            renderItem={({ item }) =>
                                <BubbleItem
                                    item={item}
                                    numOfItems={this.state.bubbles.length}
                                />
                            } /> :
                        <TouchableButton btnStyleType={{ margin: 15 }}
                            btnFunction={() => this.navigate('createBubble', {
                                communityKey: this.state.communityKey,
                                roomKey: this.state.roomKey
                            })}
                            txt={true} icon={true} name='plus' type='font-awesome' size={30}
                            color={'blue'} txtValue={`create room's Bubble!`}
                            txtStyleType={{ margin: 10 }} />
                    :
                    <ActivityIndicator size="large" color="blue" style={{ paddingTop: 275 }} />
                }
            </View>
        )
    }
}