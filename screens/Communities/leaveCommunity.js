import React from 'react'
import * as firebase from 'firebase'
import { Alert } from "react-native";

const leaveCommunity = (communityKey, mNumber, navigate) => {
    let uuid = firebase.auth().currentUser.uid, msgTitle, msgDesc, flag, text

    if (mNumber == 1) {
        text = 'Delete'
        msgTitle = 'Delete Community'
        msgDesc = 'If you left the community. It will be Deleted'
        flag = true
    } else {
        text = 'Leave'
        msgTitle = 'Leave Community'
        msgDesc = 'Do you want to leave community?'
        flag = false
    }

    Alert.alert(msgTitle, msgDesc, [
        {
            text: text,
            onPress: () => {
                firebase.database()
                    .ref(`authenticatedUsers/${uuid}/communities/${communityKey}`).remove()

                flag ?
                    firebase.database().ref(`communities/${communityKey}`).remove()

                    : firebase.database().ref(`communities/${communityKey}/members/${uuid}`)
                        .remove().then(() => {
                            firebase.database().ref(`communities/${communityKey}/`)
                                .set({ membersNumber: mNumber })
                        }).then(() => { navigate('CommunitiesList') })
            }
        },
        {
            text: "Cancel",
        }
    ])
}

const leaveCommunityAction = (communityKey, navigate) => {
    let membersNumber, adminsNumber

    firebase.database()
        .ref(`/communities/${communityKey}/membersNumber`).once(`value`, snap => {
            membersNumber = snap.val()
        })

    firebase.database()
        .ref(`/communities/${communityKey}/adminsNumber`).once(`value`, snap => {
            adminsNumber = snap.val()
        })

    if (adminsNumber == 1 && membersNumber > 1) {
        Alert.alert(' you cant leave community as you are the only admin')
    } else {
        leaveCommunity(communityKey, membersNumber, navigate)
    }
}

export default leaveCommunityAction