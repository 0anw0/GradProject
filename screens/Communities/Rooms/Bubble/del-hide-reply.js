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

export const hideReply = (bubbleKey, replyKey, uuid) => {

    firebase.database()
        .ref(`authenticatedUsers/${uuid}/hiddenBubbles/${bubbleKey}`)
        .push({ replyKey: replyKey })
    updateReply(replyKey)
}
