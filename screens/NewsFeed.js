import React from "react";
import { View, StatusBar, ScrollView, RefreshControl, Dimensions } from "react-native";
import * as firebase from "firebase";

import listenForPosts from "../shared/postItems/listenForPosts";
import { firebaseConfig } from "../services/firebaseConfig";
import Announcement from "../shared/postItems/Announcement";
import RenderPosts from "../shared/postItems/renderPosts";
import WelcomeHeader from "../shared/WelcomeHeader";
import Tab from "../shared/TabBar";

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
      announcement: false,
      refreshing: false,
    };
  }

  componentDidMount() {
    listenForPosts(
      false,
      this.updatePosts,
      "",
      this.changehasCommunitiesState,
      this.changehasPostsState,
      this.uuid
    )
  }

  async refreshScrollView() {
    this.setState({ refreshing: true });
    await listenForPosts(
      false,
      this.updatePosts,
      "",
      this.changehasCommunitiesState,
      this.changehasPostsState,
      this.uuid

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
    console.log('heeeeeeeeeeeeeeeere', value)
    if (value.length == 0) {
      this.setState({ hasPosts: false });
    }else{
      this.setState({ hasPosts: true });
    }
    this.setState({ posts: value, loaded: true });
  };

  render() {
    console.log('value:_', this.state.loaded)
    return (
      <View style={{ paddingTop: StatusBar.currentHeight, flex: 1 }}>
        <WelcomeHeader navigate={this.navigate} />
        <ScrollView
          style={{
            padding: 12, flex: 1,
            marginBottom: Dimensions.get('window').height * 0.1
          }}

          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.refreshScrollView()}
            />
          }
        >
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
