import * as firebase from "firebase";
import { Alert } from "react-native";

export const deletePost = (postKey, clearPosts, communities) => {
    Alert.alert("Delete Post", "Would you like to delete this post?", [
        {
            text: "Delete",
            onPress: () => {
                firebase.database().ref(`posts/${postKey}`).remove()
                    .catch(error => {
                        alert(error.toString())
                        return
                    })

                communities.forEach(element => {
                    firebase.database().ref(`communities/${element.key}/posts/`)
                        .on('value', snap => {
                            snap.forEach(child => {
                                if (postKey == child.val().postKey) {
                                    firebase.database()
                                        .ref(`communities/${element.key}/posts/${child.key}`)
                                        .remove()
                                }
                            })
                        })
                })
                clearPosts(postKey)
            }
        },
        {
            text: "Cancel",
            onPress: () => console.log("Post deletion has been canceled by user")
        }
    ])
}

export const hidePost = (postKey, clearPosts, uuid) => {
    Alert.alert("Hide Post", 'do you want to hide this post?', [{
        text: "Edit",
        onPress: () => {
            clearPosts(postKey)
            firebase.database().ref(`authenticatedUsers/${uuid}/hiddenPosts`)
                .push({ postKey: postKey })
        }
    }, {
        text: "Cancel"
    }])
}

export const reportPost = (postKey, clearPosts, uuid, postMakerKey) => {
    Alert.alert("Repot Post", 'do you want to report this post?', [{
        text: "Edit",
        onPress: () => {
            clearPosts(postKey)
            firebase.database().ref(`authenticatedUsers/${postMakerKey}/receivedReports`)
                .push({
                    postKey: postKey,
                    uuid: uuid,
                })

            firebase.database().ref(`authenticatedUsers/${uuid}/hiddenPosts`)
                .push({ postKey: postKey })
        }
    }, {
        text: "Cancel"
    }])
}
