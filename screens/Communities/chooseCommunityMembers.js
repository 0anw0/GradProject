import { View, FlatList, Text, TouchableOpacity ,ScrollView , Dimensions} from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import * as firebase from 'firebase'
import React from 'react';

import { firebaseConfig } from "../../services/firebaseConfig";
import { secondColor } from '../../shared/constants'

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default class ChooseCommunityMembers extends React.Component {
    constructor(props) {
        super(props)
        this.currentUser = firebase.auth().currentUser
        this.state = {
            friends: this.props.friends,
            friendsPicked: [],
            headingFromCommunity: false,
        }
        this.setPickedFriendsState = this.props.setPickedFriendsState
    }

    componentDidMount() {
        this.getUserFriendsUids()
    }

    getUserFriendsUids() {
        var friendsUid = []
        firebase.database()
            .ref(`authenticatedUsers/${this.currentUser.uid}/friends`)
            .on('value', snap => {
                snap.forEach(child => {
                    friendsUid.push(child.val().uuid)
                })
            })
        this.getUserFriendsInfo(friendsUid)
    }

    getUserFriendsInfo(friendsUid) {
        var friends = this.state.friends
        var uids = friendsUid
        uids.forEach(element => {
            if (element != null) {
                firebase.database()
                    .ref(`authenticatedUsers/${element}`).on('value', snap => {
                        friends.push({
                            name: snap.val().fullName,
                            avatar: snap.val().avatar,
                            key: element,
                            selected: false,
                            adminRole: false
                        })
                    })
                this.setState({ friends })
            }
        })
    }

    chooseFriend(friend, selected, adminRole) {
        let friends = this.state.friends
        let afterSelectionFriends = []
        for (const child in friends) {
            if (friend.key == friends[child].key) {
                afterSelectionFriends.push({
                    name: friend.name,
                    avatar: friend.avatar,
                    key: friend.key,
                    selected: selected,
                    adminRole: adminRole
                })
            }
            else {
                afterSelectionFriends.push(friends[child])
            }
        }

        this.setState({
            friends: afterSelectionFriends
        })

        this.setPickedFriendsState(afterSelectionFriends)
    }
    render() {
        return (
            <View>
            <ScrollView style={{ borderRadius: 5 }}>
                <FlatList
                    style={{
                        borderColor: secondColor,
                        borderWidth: 1, borderRadius: 10, height: 225, 
                        height: Dimensions.get('window').height * 0.55
                    }}
                    data={this.state.friends}
                    keyExtractor={(item) => item.key}
                    renderItem={({ item }) =>
                        <View style={{margin: 5}}>
                            <TouchableOpacity onPress={() => {
                                if (item.selected && !item.adminRole)
                                    this.chooseFriend(item, false, false)
                                else this.chooseFriend(item, true, false)
                            }}>
                                <ListItem
                                    key={item.key}
                                    leftAvatar={{ source: { uri: item.avatar } }}
                                    title={item.name}
                                    titleStyle={item.selected ?
                                        { color: secondColor, fontWeight: 'bold' } :
                                        null}

                                    containerStyle={
                                        {
                                            backgroundColor: item.selected ? '#ebe3ff' : null,
                                            borderRadius: 3
                                        }
                                    }

                                    bottomDivider
                                    rightElement={
                                        <TouchableOpacity
                                            onPress={() => {
                                                !item.adminRole ?
                                                    this.chooseFriend(item, true, true)
                                                    : this.chooseFriend(item, true, false)
                                            }}>
                                            <View
                                                style={{
                                                    borderRadius: 5,
                                                    borderWidth: item.adminRole ? 1 : null,
                                                    borderColor: secondColor
                                                }}>
                                                <Text
                                                    style={{
                                                        color: item.adminRole
                                                            ? secondColor : null,
                                                        padding: 10,
                                                        letterSpacing: 2,
                                                        fontWeight: item.adminRole
                                                            ? 'bold' : null,
                                                    }}
                                                >admin </Text>
                                            </View>
                                        </TouchableOpacity>
                                    }
                                />
                            </TouchableOpacity>
                        </View>
                    }
                />
            </ScrollView>
        </View>
        );
    }
}
