import * as firebase from 'firebase'
import { Alert } from "react-native";

const submit = (postTxt, postImg, navigate,
    communitiesPicked, headingFromCommunity, communityKey, uuid ,communityName) => {
    let postKey
    if ((headingFromCommunity && communityKey != '') || communitiesPicked.length >= 1) {
        if ((postTxt === '' && postImg.length < 1)) {

            if (headingFromCommunity) {
                navigate('CommunityOverview')
            } else {
                navigate('NewsFeed')
            }
        } else {
            firebase.database().ref('posts').push({
                user: uuid,
                text: postTxt,
                //image:  postImg,
                likesNumber: 0,
                commentsNumber: 0,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
            })
                .then((res) => { postKey = res.key })
                .then(() => {
                    if (!headingFromCommunity) {
                        communitiesPicked.forEach((choosenCommunity) => {
                            firebase.database()
                                .ref(`posts/${postKey}/communities/${choosenCommunity.key}`)
                                .set({ key: choosenCommunity.key, name: choosenCommunity.name })

                            firebase.database().ref(`communities/${choosenCommunity.key}/posts/`)
                                .push({
                                    postKey: postKey
                                })
                        })
                    }
                    else {
                        firebase.database()
                            .ref(`posts/${postKey}/communities/${communityKey}`)
                            .set({ key: communityKey , name: communityName})

                        firebase.database().ref(`communities/${communityKey}/posts/`)
                            .push({
                                postKey: postKey
                            })
                    }



                    postImg.forEach((postImage) => {
                        firebase.database()
                            .ref(`posts/${postKey}/images`).push({ img: postImage })
                    })
                })
                .then(() => {
                    if (headingFromCommunity) {
                        navigate('CommunityOverview')
                    } else {
                        navigate('NewsFeed')
                    }
                })
                .catch(error => { alert(error.toString()) })
        }

    } else {
        Alert.alert(" please choose a community")
    }
}

export default submit