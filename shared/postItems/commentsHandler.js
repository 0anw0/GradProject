import * as firebase from 'firebase'

export const commentHandler = (postKey , updateCommentersState ,updateCommentsNumber) => {
    firebase.database().ref(`posts/${postKey}/commentsNumber`).on('value', snap => {
        updateCommentsNumber(snap.val())
        console.log('snap val is ' ,snap.val())
    })
    firebase.database().ref(`posts/${postKey}/comments`)
        .on(`value`, snap => {
            let comments = []
            snap.forEach(comment => {
                firebase.database().ref(`authenticatedUsers/${comment.val().user}`)
                    .on(`value`, user => {
                        comments.push({
                            commentTxt: comment.val().commentTxt,
                            userName: user.val().fullName,
                            userAvatar: user.val().avatar,
                            commentKey: comment.key,
                            userKey: comment.val().user,
                            postKey: postKey
                        })
                    })
            })        
            updateCommentersState(comments)
        })
    
}
