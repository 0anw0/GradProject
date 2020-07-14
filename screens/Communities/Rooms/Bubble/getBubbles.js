import React from 'react'
import * as firebase from 'firebase'

const getBubbleKeys = async (communityKey, roomKey, setBubbleState) => {


    firebase.database().ref(`rooms/${communityKey}/${roomKey}/Bubbles/`)
        .on('value', snap => {
            let bubbles = []

            if (snap.val() == null) {
                setBubbleState([])
            }

            if (snap != null) {
                snap.forEach(child => {
                    //console.log('child :-',child)
                    firebase.database().ref(`Bubbles/${child.val().bubbleKey}`)
                        .once('value', element => {
                            //console.log('element :-',element)
                            if (element != null) {
                                firebase.database().ref(`authenticatedUsers/${element.val().uuid}`)
                                    .once('value', user => {
                                        //console.log("users:-", user)
                                        if (user != null) {
                                            bubbles.push({
                                                bubbleContent: element.val().bubbleTxt,
                                                sendMsg: element.val().sentMsg,
                                                timestamp: element.val().timestamp,
                                                bubbleCreator: element.val().uuid,
                                                loveNumber: element.val().loveNumber || 0,
                                                replyNumber: element.val().replyNumber || 0,
                                                avatar: user.val().avatar,
                                                fullName: user.val().fullName,
                                                bubbleKey: child.val().bubbleKey
                                            })
                                            //console.log('bubbles:- after push :- ', bubbles)
                                        }
                                    })
                            }
                            //console.log('bubbles:- after push :- ', bubbles)
                            setBubbleState(bubbles)
                        })
                })
            }
        })

}

export default getBubbleKeys
