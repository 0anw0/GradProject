import * as firebase from "firebase";

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
            snap.forEach(child => {
                if (child.key == uuid) {
                    liked = true
                } else {
                    liked = false
                }
            })
        })

    if (likeNumberIncrement == 0) {
        liked = true;
    }

    console.log('liked :-', liked)

    if (liked) {
        likeNumberIncrement++
        firebase.database().ref(`posts/${postKey}/likesNumber`).set(likeNumberIncrement)
        firebase.database().ref(`posts/${postKey}/likers`).push({ [uuid]: uuid })
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
    firebase.database().ref(`posts/${postKey}/likers/`)
        .on('value', snap => {
            if (snap != null) {
                snap.forEach(child => {
                    firebase.database().ref(`posts/${postKey}/likers/${child.key}`)
                        .on('value', uidSnap => {
                            if (uidSnap != null) {
                                uidSnap.forEach(uidSnapChild => {
                                    if (uidSnapChild.key == uuid) {
                                        firebase.database()
                                            .ref(`posts/${postKey}/likers/${child.key}/${uuid}`).remove()
                                    }
                                })
                            }
                        })

                })
            }
        }) // review and recode this

}