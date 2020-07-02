import * as firebase from 'firebase'
export const likersHandler = (postKey, updateLikersState, loadLikesBoolean) => {
    firebase.database().ref(`posts/${postKey}/likers`)
        .on(`value`, snap => {
            let likers = []
            snap.forEach(likerSnap => {
                likerSnap.forEach(child => {
                    firebase.database().ref(`authenticatedUsers/${child.key}`)
                        .on('value', user => {
                            loadLikesBoolean()
                            likers=[ ...likers , {
                                userName: user.val().fullName || '',
                                userAvatar: user.val().avatar || [],
                                userKey: child.key || ''
                            }]
                        })
                })
            })
            updateLikersState(likers)
        })
}


