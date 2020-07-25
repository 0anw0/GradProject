import React from 'react'
import * as firebase from 'firebase'
import { Alert } from 'react-native'

export function handleCreation(state, navigate) {
    let adminsNumber = 0
    if (state.commName.length > 6 && state.friendsPicked.length >= 1) {
        firebase.database().ref(`communities`).push({
            name: state.commName,
            description: state.commDesc,
            avatar: state.commAvatar,
            cover: state.commCover,
            membersNumber: state.friendsPicked.length
        }).then(res => {
            const members = state.friendsPicked
            members.forEach(item => {
                if (item.adminRole) { adminsNumber++ }
                firebase.database().ref(`communities/${res.key}/members/${item.key}`).set({
                    admin: item.adminRole
                })

                firebase.database()
                    .ref(`authenticatedUsers/${item.key}/communities/${res.key}`).set({
                        admin: item.adminRole
                    })
            })
            firebase.database().ref(`communities/${res.key}/members/`).set({
                adminsNumber: adminsNumber
            })
            navigate(`CommunityOverview`, { communityKey: res.key })
        })
    } else {
        Alert.alert(`can't create community. community name need to greater than 6 letters `)
    }
}