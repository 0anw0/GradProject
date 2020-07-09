import React from 'react'
import { View } from 'react-native'
import * as firebase from 'firebase'

import Post from "./postItems/Post";
import { LikeModal } from './postItems/likeModal'
import { CommentModal } from './postItems/commentModal'
import { CommunityModal } from './postItems/communityModal'
import { EditCommentModal } from './postItems/editCommentModal'

export default class PostElements extends React.Component {
    constructor(props) {
        super(props)
        this.currentUser = firebase.auth().currentUser.uid
        this.db = firebase.database()
        this.item = this.props.item
        this.state = {
            commentsModalVisible: false,
            likersModalVisible: false,
            editCommentModalVisible: false,
            communityModalVisible: false,
            comments: [],
            likers: [],
            editCommentKey: '',
            editComment: '',
            editCommentKey: '',
            loadLikes: false,
            commentsNumber: 0,
            commentByUser: false,
        }
    }

    loadLikesBoolean = () => {
        this.setState({ loadLikes: true })
    }

    setCommentModalVisible(visible) {
        this.setState({ commentsModalVisible: visible })
    }

    setLikersModalVisible(visible) {
        this.setState({ likersModalVisible: visible })
    }

    setCommunityModalVisible(visible) {
        this.setState({ communityModalVisible: visible })
    }

    setCommunityModalUnVisible = (visible, navigating, communityKey) => {
        console.log('fn is fired', navigating, communityKey)
        this.setState({ communityModalVisible: visible })
        if (navigating) {
            this.props.navigation.navigate('CommunityOverview',
                { communityKey: communityKey })
        }
    }

    setEditCommentModalUnVisible() {
        this.setState({ editCommentModalVisible: false })
    }

    updateCommentsNumber = (value) => {
        this.setState({ commentsNumber: value })
    }

    updateLikersState = (value) => {
        this.setState({ likers: value })
    }

    updateCommentersState = (value) => {
        this.setState({ comments: value, commentByUser: true })
    }

    setEditCommentModalVisible = (item) => {
        this.setState({
            editComment: item.commentTxt,
            editCommentKey: item.commentKey,
            editCommentModalVisible: true
        })
    }

    render() {
        return (
            <View style={{ marginBottom: 15, flex: 1 }}>
                <Post
                    item={this.item}

                    setLikersModalVisible={() => { this.setLikersModalVisible(true) }}
                    setCommentModalVisible={() => { this.setCommentModalVisible(true) }}
                    setCommunityModalVisible={() => { this.setCommunityModalVisible(true) }}

                    updateCommentsNumber={this.updateCommentsNumber}
                    updateLikersState={this.updateLikersState}
                    loadLikesBoolean={this.loadLikesBoolean}

                    navigation={this.props.navigation}
                    clearPosts={this.props.clearPosts}
                    calledInCommunity={this.props.calledInCommunity}
                    headingFromCommunity={this.props.headingFromCommunity}

                    commentsNumber={this.state.commentsNumber}
                    commentByUser={this.state.commentByUser}
                />

                <LikeModal
                    likers={this.state.likers}
                    likersModalVisible={this.state.likersModalVisible}
                    loadLikes={this.state.loadLikes}

                    loadLikesBoolean={this.loadLikesBoolean}
                    updateLikersState={this.updateLikersState}
                    setLikersModalVisible={() => { this.setLikersModalVisible(false) }}

                    postKey={this.item.postKey}
                />

                <CommentModal
                    commentsModalVisible={this.state.commentsModalVisible}
                    comments={this.state.comments}

                    setCommentModalVisible={() => { this.setCommentModalVisible(false) }}
                    setEditCommentModalVisible={this.setEditCommentModalVisible}
                    updateCommentsNumber={this.updateCommentsNumber}
                    updateCommentersState={this.updateCommentersState}

                    postKey={this.item.postKey}
                />

                <EditCommentModal
                    editCommentModalVisible={this.state.editCommentModalVisible}
                    editComment={this.state.editComment}
                    editCommentKey={this.state.editCommentKey}

                    setEditCommentModalUnVisible={() => { this.setEditCommentModalUnVisible() }}
                    setEditCommentModalVisible={this.setEditCommentModalVisible}
                    editCommentModalVisibleOff={() => this.setState({ editCommentModalVisible: false })}

                    postKey={this.item.postKey}
                />

                <CommunityModal
                    communities={this.item.communities}
                    communityModalVisible={this.state.communityModalVisible}

                    setCommunityModalUnVisible={this.setCommunityModalUnVisible}
                />
            </View >
        )
    }
}
