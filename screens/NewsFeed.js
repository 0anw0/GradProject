import React from "react";
import { View, StatusBar, ScrollView, RefreshControl } from "react-native";
import * as firebase from "firebase";

import listenForPosts from "../shared/postItems/listenForPosts";
import { firebaseConfig } from "../services/firebaseConfig";
import RenderPosts from "../shared/postItems/renderPosts";
import Announcement from "../shared/postItems/Announcement";
import Tab from "../shared/TabBar";
import WelcomeHeader from "../shared/WelcomeHeader";

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default class NewsFeed extends React.Component {
  constructor(props) {
    super(props);
    this.navigate = this.props.navigation.navigate;
    this.uuid = firebase.auth().currentUser.uid;

    this.state = {
      posts: [],
      loaded: false,
      hasCommunities: true,
      hasPosts: true,
      announcement: true,
      refreshing: false,
    };
  }

  componentDidMount() {
    listenForPosts(
      false,
      this.updatePosts,
      "",
      this.changehasCommunitiesState,
      this.changehasPostsState
    );
    //checkForAnnouncement(this.changeAnnouncementState())
  }

  refreshScrollView() {
    this.setState({ refreshing: true });
    listenForPosts(
      false,
      this.updatePosts,
      "",
      this.changehasCommunitiesState,
      this.changehasPostsState
    ).then(() => {
      this.setState({ refreshing: false });
    });
  }

  changehasCommunitiesState = () => {
    this.setState({ hasCommunities: false });
  };

  changeAnnouncementState = () => {
    this.setState({ announcement: true });
  };

  changehasPostsState = () => {
    this.setState({ hasPosts: false });
  };

  clearPosts = (postKey) => {
    const filteredPosts = this.state.posts.filter(
      (item) => item.postKey !== postKey
    );
    //console.log(" filteredPosts :-", filteredPosts)
    this.setState({ posts: filteredPosts });
  };

  updatePosts = (value) => {
    //console.log('value:_', value )
    if (value.length == 0) {
      this.setState({ hasPosts: false });
    }
    this.setState({ posts: value, loaded: true });
  };

  render() {
    return (
      <View style={{ paddingTop: StatusBar.currentHeight, flex: 1 }}>
        <WelcomeHeader />
        <ScrollView
          style={{ padding: 12, flex: 1, marginBottom: 60 }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.refreshScrollView()}
            />
          }
        >
          {/* <Divider style={{ backgroundColor: '#AAA', marginBottom: 20 }} /> */}
          {this.state.announcement ? (
            <Announcement text="important announcement goes here!" />
          ) : null}
          <RenderPosts
            loaded={this.state.loaded}
            hasCommunities={this.state.hasCommunities}
            hasPosts={this.state.hasPosts}
            clearPosts={this.clearPosts}
            posts={this.state.posts}
            navigation={this.props.navigation}
            secBtnRoute={"communitiesStack"}
            headingFromCommunity={false}
          />
        </ScrollView>
        <Tab active="newsfeed" navigation={this.props.navigation} post />
      </View>
    );
  }
}
