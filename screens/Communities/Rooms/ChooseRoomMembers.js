import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import * as firebase from 'firebase'
import React from 'react';

import { firebaseConfig } from "../../../services/firebaseConfig";
import styles from '../../../shared/postItems/createPostStyles'
import { secondColor } from '../../../shared/constants'

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default class ChooseRoomMembers extends React.Component {
    constructor(props) {
        super(props)
        this.currentUser = firebase.auth().currentUser
        this.state = {
            members: this.props.members,
            membersPicked: [],
            communityKey:''
        }
        this.setPickedMemberState = this.props.setPickedMemberState
    }

    componentDidMount() {
        let { communityKey } = this.props.navigation.state.params
        this.setState({ communityKey })
        this.getCommMembers(communityKey)
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
                    adminRole: adminRole
                })
            }
            else {
                afterSelectionMembers.push(members[child])
            }
        }

        this.setState({
            members: afterSelectionMembers
        })

        this.setPickedMemberState(afterSelectionMembers)
    }
    render() {
        return (
            <View>
                <FlatList
                    style={{ borderColor: secondColor, borderWidth: 2, height: 225 }}
                    data={this.state.members}
                    keyExtractor={(item) => item.key}
                    renderItem={({ item }) =>
                        <View style={[styles.memberList,
                        { borderWidth: item.selected ? 2 : null, margin: 10 }]}>
                            <TouchableOpacity onPress={() => {
                                if (item.selected && !item.adminRole)
                                    this.chooseMember(item, false, false)
                                else this.chooseMember(item, true, false)
                            }}>
                                <Avatar rounded size={25} source={{ uri: item.avatar }} />
                                <Text style={styles.communityName}>{item.name}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                !item.adminRole ? this.chooseMember(item, true, true)
                                    : this.chooseMember(item, true, false)
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
