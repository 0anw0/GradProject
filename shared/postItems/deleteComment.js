import { Alert } from 'react-native'
import * as firebase from 'firebase'

export const deleteComment = (item , updateCommentsNumber) => {
    let makeCommentIncrement 
    Alert.alert("Delete Comment", "Would you like to delete this comment ?", [
        {
            text: "Delete",
            onPress: () => {
                firebase.database()
                .ref(`posts/${item.postKey}/`)
                .once(`value`, snap => { 
                    makeCommentIncrement = snap.val().commentsNumber || 0 })
                if(makeCommentIncrement> 0) {makeCommentIncrement = makeCommentIncrement - 1}

                firebase.database()
                .ref(`posts/${item.postKey}/commentsNumber`).set(makeCommentIncrement)

                firebase.database()
                .ref(`posts/${item.postKey}/comments/${item.commentKey}`).remove()
                    .catch(error => {
                        alert(error.toString())
                        return
                    })
                updateCommentsNumber(makeCommentIncrement)
            }
        },
        {
            text: "Cancel",
            onPress: () => console.log("Comment deletion has been canceled by user")
        }
    ])


}