import React from 'react'
import * as firebase from 'firebase'

export const deleteBubble = (bubbleKey, communityKey, roomKey, updateBubbles) => {

    firebase.database()
        .ref(`rooms/${communityKey}/${roomKey}/Bubbles/`).on('value', snap => {
            snap.forEach(child => {
                if (bubbleKey == child.val().bubbleKey) {
                    firebase.database()
                        .ref(`rooms/${communityKey}/${roomKey}/Bubbles/${child.key}`).remove()

                    firebase.database()
                        .ref(`Bubbles/${bubbleKey}`).remove()

                    updateBubbles(bubbleKey)
                }
            })
        })

}

export const HideBubble = (bubbleKey, uuid) => {

    firebase.database()
        .ref(`authenticatedUsers/${uuid}/hiddenBubbles`).push({ bubbleKey: bubbleKey })
        updateBubbles(bubbleKey)
}