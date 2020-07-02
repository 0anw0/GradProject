import * as firebase from "firebase";

export const editCommentFn = (postKey, editComment, editCommentKey , editCommentModalVisibleOff) => {
    firebase.database()
        .ref(`posts/${postKey}/comments/${editCommentKey}`)
        .once(`value`, snapshot => {
            if (editComment !== snapshot.val().commentTxt) {
                firebase.database()
                    .ref(`posts/${postKey}/comments/${editCommentKey}/commentTxt`)
                    .set(editComment)
            }
            editCommentModalVisibleOff()
        })
}