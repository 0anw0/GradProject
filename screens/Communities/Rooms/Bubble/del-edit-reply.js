import React from 'react'
import * as firebase from 'firebase'

export const deleteReply =
    (communityKey, roomKey, bubbleKey, replyKey, updateReply, decreaseReplyNum) => {
        //console.log(communityKey, roomKey, bubbleKey, replyKey)

        firebase.database()
            .ref(`messages/${communityKey}/${roomKey}/`).on('value', snap => {
                snap.forEach(child => {
                    if (child.val().reply != null && child.val().reply
                        && replyKey == child.val().replyKey) {
                        firebase.database()
                            .ref(`messages/${communityKey}/${roomKey}/${child.key}`).remove()
                    }
                })
            })

        firebase.database().ref(`Bubbles/${bubbleKey}/replies/${replyKey}`)
            .remove().then(() => {
                decreaseReplyNum()
                updateReply(replyKey)
            })

        firebase.database().ref(`Bubbles/${bubbleKey}/replyNumber`)
            .once('value', snap => {
                let a = snap.val() - 1
                firebase.database().ref(`Bubbles/${bubbleKey}`).update({
                    replyNumber: a
                })
            })

    }

export const HideReply = (bubbleKey, uuid) => {

    firebase.database()
        .ref(`authenticatedUsers/${uuid}/hiddenBubbles`).push({ bubbleKey: bubbleKey })
    updateBubbles(bubbleKey)
}

/*
if (replyKey == child.val().replyKey) {
                    firebase.database()
                        .ref(`${room_address}/replies/${replyKey}`)
                        .remove().then(() => {

                            firebase.database()
                                .ref(messages_address)
                                .on('value', snap => {
                                    snap.forEach(child => {
                                        if (replyKey == child.val().replyKey) {
                                            firebase.database()
                                                .ref(`${messages_address}/${child.key}`).remove()
                                        }
                                    })
                                }
                                )

                        }).then(()=> {
                            firebase.database()
                            .ref(`${room_address}/replyNumber`)
                        })
                }
 */