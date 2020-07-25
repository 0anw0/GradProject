import * as firebase from 'firebase'

const listenForPosts =
    async (headingFromCommunity, updatePosts, communityKey, changehasCommunitiesState,
        changehasPostsState , uuid) => {

        let userCommunitiesKey = [], commObj = {}, posts = [], postsContainer = [],
            commRetrieved = false, postKey = '', currentUid = uuid, hiddenPosts = [],
            index=1

        if (!headingFromCommunity) { //Render from user's communities if fn is fired from Newsfeed
            firebase.database()
                .ref(`authenticatedUsers/${currentUid}/communities`)
                .on('value', userCommunitiesSnap => {
                    //console.log("userCommunitiesSnap :", userCommunitiesSnap)
                    userCommunitiesSnap.forEach(child => {
                        userCommunitiesKey.push(child.key)
                    })
                })
        } else { //Render from a community if fn is fired from Community overview
            userCommunitiesKey.push(communityKey)
        }

        commObj = { userCommunitiesKey: userCommunitiesKey, commRetrieved: true }
        //Render User's joined Communities! //Render Posts from community with interactStates.

        firebase.database().ref(`authenticatedUsers/${currentUid}/hiddenPosts`)
            .on('value', snap => {
                if (snap) {
                    snap.forEach(child => {
                        hiddenPosts.push(child.val().postKey)
                    })
                }
            })

        try {
            if (firebase.auth()) {
                currentUid = firebase.auth().currentUser.uid
            }

            userCommunitiesKey = commObj.userCommunitiesKey
            commRetrieved = commObj.commRetrieved

            if (userCommunitiesKey.length == 0 && !headingFromCommunity) {
                changehasCommunitiesState
            }
            //console.log('userCommunitiesKey:-', userCommunitiesKey)
            for (let i = 0; i < userCommunitiesKey.length; i++) {
                firebase.database()
                    .ref(`communities/${userCommunitiesKey[i]}/posts`).on('value', snap => {
                        snap.forEach(child => {
                            postKey = child.val().postKey
                            if (!postsContainer.includes(postKey) && !hiddenPosts.includes(postKey)) {
                                postsContainer.push(postKey)
                            }
                        })
                    })
            }
            //console.log('postsContainer:-', postsContainer)
            if (commRetrieved) {
                for (const child in postsContainer) {
                    let communities, images
                    firebase.database().ref(`posts/${postsContainer[child]}`).on('value',
                        post => {
                            if (post.val()) {
                                images = post.val().images || null
                                communities = post.val().communities

                                let commNames = [], postImages = []
                                for (const child in communities) {
                                    //console.log('communities:-', communities[child])
                                    let name = ''
                                    firebase.database()
                                        .ref(`communities/${communities[child].key}/name`)
                                        .on('value', commNameSnap => {
                                            name = commNameSnap.val()
                                        })
                                    commNames.push({
                                        name: name,
                                        key: communities[child].key
                                    })
                                }

                                for (const child in images) {
                                    postImages.push(images[child]['img'])
                                }

                                let uuid = post.val().user || ''

                                if (uuid) {
                                    firebase.database()
                                        .ref(`authenticatedUsers/${uuid}/`).on('value', user => {
                                            //console.log('user ', user.val())
                                            let { fullName, avatar } = user.val()
                                            posts.push({
                                                postKey: post.key,
                                                text: post.val().text || '',
                                                likesNumber: post.val().likesNumber || 0,
                                                commentsNumber: post.val().commentsNumber || 0,
                                                communities: commNames,
                                                userName: fullName || '',
                                                userAvatar: avatar || '',
                                                postMakerKey: uuid || '',
                                                timestamp: post.val().timestamp || 0,
                                                images: postImages.length > 0 ? postImages : [],
                                                index: index++
                                            })
                                        })
                                }
                            }
                        })
                }
            }

            if (posts.length == 0) {
                changehasPostsState
            }
            updatePosts(posts)
        } catch (e) {
            console.log('error in loading posts:- ', e)
        }
    }

export default listenForPosts