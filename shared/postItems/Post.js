import React from "react";
import { View } from "react-native";
import * as firebase from "firebase";

import { PostHeader } from "./postHeader";
import { PostFooter } from "./postFooter";
import { PostBody } from "./postBody";
import { $grey_2 } from "../constants";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.item = this.props.item;
    this.currentUser = firebase.auth().currentUser.uid;
    this.state = {
      liked: false,
      likesNumber: 0,
      edited: false,
      text: this.item.text,
      postImages: this.item.images,
    };
  }

  componentDidMount() {
    this.loadLikes()
  }

  loadLikes = () => {
    firebase
      .database()
      .ref(`posts/${this.item.postKey}/likers/`)
      .on("value", (snap) => {
        if (snap) {
          snap.forEach((child) => {
            if (child.val().key == this.currentUser) {
              this.setState({ liked: true });
            }
          })
        }
      })
  };

  updateLikesNumber = (value) => {
    this.setState({ likesNumber: value });
  };

  toggleLike = () => {
    this.setState((prevState) => ({ liked: !prevState.liked }));
  };

  editPost = () => {
    this.setState({ edited: true });
    this.props.navigation.navigate("EditPost", {
      postKey: this.item.postKey,
      postTxt: this.item.text,
      postImages: this.item.images,
      headingFrom: "NewsFeed",
    });
  };

  render() {
    let commentsNumber = this.props.commentByUser
      ? this.props.commentsNumber
      : this.item.commentsNumber;

    return (
      <View style={{ borderWidth: 1, borderColor: $grey_2, borderRadius: 10, flex: 1 }}>
        <PostHeader
          postMakerKey={this.item.postMakerKey}
          postKey={this.item.postKey}
          communities={this.item.communities}
          userAvatar={this.item.userAvatar}
          userName={this.item.userName}
          editPost={this.editPost}
          currentUser={this.currentUser}
          clearPosts={this.props.clearPosts}
          headingFromCommunity={this.props.headingFromCommunity}
          setCommunityModalVisible={this.props.setCommunityModalVisible}
        />

        <PostBody
          communities={this.item.communities}
          postText={this.item.text}
          postImages={this.item.images}
          navigate={this.props.navigation.navigate}
          calledInCommunity={this.props.calledInCommunity}
          setCommunityModalVisible={this.props.setCommunityModalVisible}
        />

        <PostFooter
          commentsNumber={commentsNumber}
          toggleLike={this.toggleLike}
          updateLikesNumber={this.updateLikesNumber}
          communities={this.item.communities}
          likesNumber={this.item.likesNumber}
          postKey={this.item.postKey}
          liked={this.state.liked}
          loadLikesBoolean={this.props.loadLikesBoolean}
          setCommentModalVisible={this.props.setCommentModalVisible}
          setLikersModalVisible={this.props.setLikersModalVisible}
          updateLikersState={this.props.updateLikersState}
          timestamp={this.item.timestamp}
        />
      </View>
    );
  }
}

export default Post;
