import React from 'react'
import {
    View, Text, StatusBar, Dimensions,
    StyleSheet, FlatList, TouchableOpacity, ScrollView, Alert
} from 'react-native'
import { ListItem, Button } from 'react-native-elements'

import Header from '../../shared/Header'
import firebase from '../../services/firebaseConfig'
import { secondColor } from '../../shared/constants'


export default class ChooseMembers extends React.Component {
    constructor(props) {
        super(props)
        this.navigate = this.props.navigation.navigate
        this.currentUser = firebase.auth().currentUser
        this.commKey = this.props.navigation.state.params.communityKey
        this.state = {
            authUsers: [],
            selMembers: [],
            selected: false,
            friends: [],
            btnLoading: false,
            loaded: true
        }
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
        this.getCommunityMember(this.commKey, friendsUid)
    }

    getCommunityMember(commKey, friendsUid) {
        let commMembers = []
        firebase.database().ref(`communities/${commKey}/members`)
            .on('value', snap => {
                snap.forEach(child => {
                    commMembers.push(child.key)
                })
            })
        this.getUserFriendsInfo(commMembers, friendsUid)
    }

    getUserFriendsInfo(commMembers, friendsUid) {
        var friends = this.state.friends
        var uids = friendsUid
        uids.forEach(element => {
            if (element != null && !commMembers.includes(element)) {
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
    }

    inviteMembers = () => {
        let { friends } = this.state
        let selectedNum = 0
        friends.forEach(child => {
            if (child.selected == true) {
                selectedNum++
            }
        })
        if (selectedNum >= 1) {
            this.setState({ btnLoading: true, disabled: true })

            try {
                friends.forEach(child => {

                    if (child.selected == true) {
                        firebase.database().ref(`communities/${this.commKey}/members/${child.key}`)
                            .set({ admin: child.adminRole }) //Invite Folder!

                        firebase.database() // Invite Folder!
                            .ref(`authenticatedUsers/${child.key}/communities/${this.commKey}`)
                            .set({
                                admin: child.adminRole
                            })
                    }
                })
            }
            catch (e) {
                console.log('an error occured while inviting a friend to community')
                this.setState({ btnLoading: false, disabled: false })
            } finally {
                this, navigate('CommunityOverview', {
                    communityKey: this.commKey
                })
            }

        } else {
            Alert.alert('please choose a friend to invite!')
        }
    }

    render() {
        return (
            <View style={{
                marginTop: StatusBar.currentHeight, margin: 15,
            }}>
                <Header
                    title="Choose Members .."
                    icon='done' type='material'
                    onPress={this.goBack}
                />
                <ScrollView style={{ borderRadius: 5 }}>
                    <FlatList
                        style={{
                            borderColor: secondColor,
                            borderWidth: 1, borderRadius: 10, height: 225,
                            height: Dimensions.get('window').height * 0.76,
                        }}
                        data={this.state.friends}
                        keyExtractor={(item) => item.key}
                        renderItem={({ item }) =>
                            <View style={{ margin: 5 }}>
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

                <View style={{ paddingTop: 10 }}>
                    <Button
                        containerStyle={{ backgroundColor: secondColor }}
                        loading={this.state.btnLoading}
                        disabled={this.state.disabled}
                        loadingProps={{ size: 'small' }}
                        title="Add"
                        onPress={() => this.inviteMembers()} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        borderColor: '#AAA',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    memberName: {
        fontSize: 20,
        marginLeft: 15,
        letterSpacing: 1
    },
    memberStatus: {
        fontSize: 17,
        marginLeft: 15,
        marginTop: 3,
        color: '#333'
    }
})

