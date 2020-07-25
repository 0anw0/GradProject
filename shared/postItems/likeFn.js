import * as firebase from "firebase";

import { firebaseConfig } from "../../services/firebaseConfig";
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export const like = async (postKey, toggleLike, updateLikesNumber) => {
    let uuid = firebase.auth().currentUser.uid
    let likeNumberIncrement, liked
    firebase.database().ref(`posts/${postKey}`)
        .on('value', snap => {
            //console.log("snap for likes number", snap.val().likesNumber)
            likeNumberIncrement = snap.val().likesNumber || 0
        })

    firebase.database().ref(`posts/${postKey}/likers/`)
        .on('value', snap => {
            liked = false
            if (snap) {
                snap.forEach(child => {
                    //console.log('this is ', child.val().uuid)
                    if (child.val().uuid == uuid) {
                        liked = true
                    } else {
                        liked = false
                    }
                })
            }
        })

    if (likeNumberIncrement == 0) {
        liked = false;
    }

    if (!liked) {
        likeNumberIncrement++
        firebase.database().ref(`posts/${postKey}/likesNumber`).set(likeNumberIncrement)
        firebase.database().ref(`posts/${postKey}/likers`).push({ uuid: uuid })
    }
    else {
        await unlike(likeNumberIncrement, postKey, uuid)
    }

    updateLikesNumber(likeNumberIncrement)
    toggleLike()
}

const unlike = async (likeNumberIncrement, postKey, uuid) => {

    if (likeNumberIncrement > 0) {
        likeNumberIncrement--
        firebase.database().ref(`posts/${postKey}/likesNumber`).set(likeNumberIncrement)
    }
    firebase.database()
        .ref(`posts/${postKey}/likers/`)
        .on('value', snap => {
            snap.forEach(child => {
                if (child.val().uuid == uuid) {
                    firebase.database()
                        .ref(`posts/${postKey}/likers/${child.key}`).remove()
                }
            })
        })
}