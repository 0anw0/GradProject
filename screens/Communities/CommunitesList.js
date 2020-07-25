import React from "react";
import {
  View,
  StatusBar,
  Alert,
  ScrollView,
  RefreshControl,
} from "react-native";

import Header from "../../shared/Header";
import Tab from "../../shared/TabBar";
import { CommunityListElements } from "./CommunityListElements";
import firebase from "../../services/firebaseConfig";

console.ignoredYellowBox = true;

export default class CommunitiesList extends React.Component {
  constructor(props) {
    super(props);
    this.navigate = this.props.navigation.navigate;
    this.currentUserID = firebase.auth().currentUser.uid;

    this.state = {
      search: "",
      communities: [],
      loaded: false,
      hasCommunities: false,
    };
  }

  componentDidMount() {
    this.retrieveCommunities();
  }

  retrieveCommunities = async () => {
    let communitiesKeys = await this.getUserCommunities(),
      commInfo = [];

    communitiesKeys.forEach((element) => {
      firebase
        .database()
        .ref(`communities/${element}`)
        .on("value", (child) => {
          commInfo.push({
            name: child.val().name,
            image: child.val().avatar,
            cover: child.val().cover,
            key: child.key,
          });
        });
    });
    this.setState({
      communities: commInfo,
      loaded: true,
      hasCommunities: commInfo.length != 0 ? true : false,
    });
  };

  getUserCommunities = async () => {
    let userCommunitiesKey = [];
    firebase
      .database()
      .ref(`authenticatedUsers/${this.currentUserID}/communities`)
      .on("value", (userCommunitiesSnap) => {
        userCommunitiesSnap.forEach((child) => {
          userCommunitiesKey.push(child.key);
        });
      });
    return userCommunitiesKey;
  };

  refreshScrollView() {
    this.setState({ refreshing: true });
    this.retrieveCommunities().then(() => {
      this.setState({ refreshing: false });
    });
  }

  render() {
    return (
      <View style={{ paddingTop: StatusBar.currentHeight, flex: 1 }}>
        <Header
          title="Your Communities"
          onPress={() => this.props.navigation.navigate("CreateCommunity")}
        />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.refreshScrollView()}
            />
          }
          style={{flex: 1, marginBottom: 50}}
        >
          <CommunityListElements
            loaded={this.state.loaded}
            hasCommunities={this.state.hasCommunities}
            communities={this.state.communities}
            navigate={this.navigate}
          />
        </ScrollView>
        <Tab active="communities" navigation={this.props.navigation} />
      </View>
    );
  }
}
