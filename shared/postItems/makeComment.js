import * as firebase from "firebase";

const makeComment = (postKey, commentTxt ,updateCommentsNumber ) => {
    let makeCommentIncrement = 0
    firebase.database().ref(`posts/${postKey}/`)
        .on(`value`, snap => { 
            makeCommentIncrement = snap.val().commentsNumber || 0 })
    makeCommentIncrement = makeCommentIncrement + 1
    firebase.database().ref(`posts/${postKey}/commentsNumber`).set(makeCommentIncrement)
        .then(() => {
            firebase.database().ref(`posts/${postKey}/comments`).push({
                user: firebase.auth().currentUser.uid,
                commentTxt: commentTxt,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
            })
            updateCommentsNumber(makeCommentIncrement)
        }
        )
        .catch(error => {
            alert(error.toString())
            return
        })
}

export default makeComment