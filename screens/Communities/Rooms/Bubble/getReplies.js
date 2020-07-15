import React from 'react'
import * as firebase from 'firebase'

const getReplies = async (bubbleKey,uuid,  setRepliesState) => {

    let hiddenReplies = []
    firebase.database()
        .ref(`authenticatedUsers/${uuid}/hiddenReplies/${bubbleKey}/`)
        .on('value', snap => {
            if (snap != null) {
                snap.forEach(child => {
                    hiddenReplies.push(child.val().replyKey)
                })
            }
        })

    firebase.database().ref(`Bubbles/${bubbleKey}/replies/`)
        .on('value', snap => {
            //console.log('true')
            if (snap.val() == null) {
                setRepliesState([])
            }

            let replies = []
            if (snap != null) {

                snap.forEach(child => {
                    if (child != null) {
                        firebase.database().ref(`authenticatedUsers/${child.val().creator}`)
                            .once('value', user => {
                                if (user != null) {
                                    if (!hiddenReplies.includes(child.key)) {
                                        replies.push({
                                            replyKey: child.key,
                                            replyTxt: child.val().replyTxt,
                                            timestamp: child.val().timestamp || 0,
                                            creator: child.val().creator,
                                            avatar: user.val().avatar,
                                            name: user.val().fullName,
                                        })
                                    }
                                }
                            })
                    }
                    //console.log(' replies :- ', replies)
                    setRepliesState(replies)
                })
            }
        })
}

export default getReplies
