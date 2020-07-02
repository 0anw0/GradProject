import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import * as firebase from 'firebase'
import React from 'react';

import { firebaseConfig } from "../../services/firebaseConfig";
import styles from '../../shared/postItems/createPostStyles'
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
                    image: friend.image,
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
    /*
        deleteChosenFriend(friend) {
            let friends = this.state.friends
            let afterSelectionFriends = []
            for (const child in friends) {
                if (friend.key == friends[child].key && friend.key != friends[0].key) {
    
                    afterSelectionFriends.push({
                        name: friend.name,
                        image: friend.image,
                        key: friend.key,
                        selected: false,
                        adminRole: false
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
        }*/

    render() {
        return (
            <View>
                <FlatList
                    style={{ borderColor: secondColor, borderWidth: 2, height: 225 }}
                    data={this.state.friends}
                    keyExtractor={(item) => item.key}
                    renderItem={({ item }) =>
                        <View style={[styles.memberList,
                        { borderWidth: item.selected ? 2 : null, margin: 10 }]}>
                            <TouchableOpacity onPress={() => {
                                if (item.selected && !item.adminRole)
                                    this.chooseFriend(item, false, false)
                                else this.chooseFriend(item, true, false)
                            }}>
                                <Avatar rounded size={25} source={{ uri: item.avatar }} />
                                <Text style={styles.communityName}>{item.name}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                !item.adminRole ? this.chooseFriend(item, true, true)
                                    : this.chooseFriend(item, true, false)
                            }}>
                                {item.adminRole ?
                                    <Text> remove admin </Text> : <Text> make admin </Text>
                                }
                            </TouchableOpacity>
                        </View>
                    }
                />
            </View>
        );
    }
}
