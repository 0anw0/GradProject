import { View, FlatList, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { ListItem } from 'react-native-elements';
import * as firebase from 'firebase'
import React from 'react';

import { firebaseConfig } from "../../../services/firebaseConfig";
import { secondColor } from '../../../shared/constants'

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default class ChooseRoomMembers extends React.Component {
    constructor(props) {
        super(props)
        this.currentUser = firebase.auth().currentUser
        this.communityKey = this.props.communityKey
        this.state = {
            members: this.props.members,
            membersPicked: [],
            adminNum: 0
        }
        this.setPickedMemberState = this.props.setPickedMemberState
    }

    componentDidMount() {
        this.getCommMembers(this.communityKey)
    }

    getCommMembers(communityKey) {
        let commMembers = []
        firebase.database()
            .ref(`communities/${communityKey}/members`)
            .on('value', snap => {
                snap.forEach(child => {
                    if (!commMembers.includes(child.key)) {
                        commMembers.push(child.key)
                    }
                })
            })

        this.getCommMembersInfo(commMembers)
    }

    getCommMembersInfo(commMembers) {
        var members = this.state.members
        var uids = commMembers
        uids.forEach(element => {
            if (element != null) {
                firebase.database()
                    .ref(`authenticatedUsers/${element}`).on('value', snap => {
                        members.push({
                            name: snap.val().fullName,
                            avatar: snap.val().avatar,
                            key: element,
                            selected: false,
                            adminRole: false
                        })
                    })
                this.setState({ members })
            }
        })
    }

    chooseMember(member, selected, adminRole) {
        let members = this.state.members
        let afterSelectionMembers = []
        for (const child in members) {
            if (member.key == members[child].key) {
                afterSelectionMembers.push({
                    name: member.name,
                    avatar: member.avatar,
                    key: member.key,
                    selected: selected,
                    adminRole: adminRole,
                })
            }
            else {
                afterSelectionMembers.push(members[child])
            }
        }

        this.setState({
            members: afterSelectionMembers
        })

        if (adminRole && this.state.adminNum != 0)
            this.setState(prevState => ({ adminNum: prevState.adminNum + 1 }))
        else this.setState(prevState => ({ adminNum: prevState.adminNum - 1 }))

        this.setPickedMemberState(afterSelectionMembers)
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
                        data={this.state.members}
                        keyExtractor={(item) => item.key}
                        renderItem={({ item }) =>
                            <View style={{ margin: 5 }}>
                                <TouchableOpacity onPress={() => {
                                    if (item.selected && !item.adminRole)
                                        this.chooseMember(item, false, false)
                                    else this.chooseMember(item, true, false)
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
                                                        this.chooseMember(item, true, true)
                                                        : this.chooseMember(item, true, false)
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
        )
    }
}
