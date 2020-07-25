import React from 'react';
import { View, FlatList, Text, StatusBar, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase'
import { Avatar } from 'react-native-elements';

import { firebaseConfig } from "../../services/firebaseConfig";
import styles from '../../shared/postItems/createPostStyles'
import { secondColor } from '../../shared/constants'

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default class ChooseCommunities extends React.Component {
    constructor(props) {
        super(props)
        this.currentUser = firebase.auth().currentUser
        this.state = {
            communities: [],
            communitiesPicked: [],
            headingFromCommunity: false,
        }
        this.setPickedCommunitiesState = this.props.setPickedCommunitiesState
    }

    componentDidMount() {
        let { headingFromCommunity } = this.props.headingFromCommunity
        this.setState({ headingFromCommunity })
        if (!this.state.headingFromCommunity) {
            this.getUserCommunities()
        }
    }

    getUserCommunities() {
        var commKeys = []
        firebase.database()
            .ref(`authenticatedUsers/${this.currentUser.uid}/communities`)
            .on('value', snap => {
                snap.forEach(child => {
                    commKeys.push(child.key)
                })
            })
        this.retrieveCommunities(commKeys)
    }

    retrieveCommunities(commKeys) {
        firebase.database().ref(`communities`).on('value', snap => {
            var communities = []
            var keys = commKeys
            snap.forEach(child => {
                if (keys.includes(child.key))
                    communities.push({
                        name: child.val().name,
                        image: child.val().avatar,
                        key: child.key, 
                        selected: false
                    })
            })
            this.setState({ communities })
        })
    }

    chooseComunity(community) {
        let communities = this.state.communities
        let afterSelectionCommunities = []
        for (const child in communities) {
            if (community.key == communities[child].key) {

                afterSelectionCommunities.push({
                    name: community.name,
                    image: community.image,
                    key: community.key,
                    selected: true
                })
            }
            else {
                afterSelectionCommunities.push( communities[child] )
            }
        }

        this.setState({
            communities: afterSelectionCommunities
        })

        this.setPickedCommunitiesState(afterSelectionCommunities)
    }

    deleteChosenCommunity(community) {
        
        let communities = this.state.communities
        let afterSelectionCommunities = []
        for (const child in communities) {
            if (community.key == communities[child].key) {

                afterSelectionCommunities.push({
                    name: community.name,
                    image: community.image,
                    key: community.key,
                    selected: false
                })
            } 
            else {
                afterSelectionCommunities.push ( communities[child] )
            }
        }

        this.setState({
            communities: afterSelectionCommunities
        })

        this.setPickedCommunitiesState(afterSelectionCommunities)
    }

    render() {
        return (
            <View style={{ marginTop: StatusBar.currentHeight }}>
                <FlatList
                    style={{ borderColor: secondColor, borderWidth: 2, marginTop: 20 }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={this.state.communities}
                    keyExtractor={(item) => item.key}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => {
                            if (item.selected) this.deleteChosenCommunity(item)
                            else this.chooseComunity(item)
                        }}>
                            <View style={
                                [styles.item, { borderWidth: item.selected ? 2 : null }]}>
                                <Avatar rounded size={40} source={{ uri: item.image }} />
                                <View>
                                    <Text style={styles.communityName}>{item.name}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                />
            </View>
        );
    }
}

