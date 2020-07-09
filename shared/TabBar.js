import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { secondColor, $grey_1 } from "../shared/constants";
import { Icon } from "react-native-elements";

import firebase from "../services/firebaseConfig";
import styles from "./tabStyles";

export default class TabBar extends React.Component {
  constructor(props) {
    super(props);
    this.active = props.active;
    this.navigate = props.navigation.navigate;
    this.currentUserID = firebase.auth().currentUser.uid;
    this.state = {
      commKeys: [],
      communities: [],
    };
  }
  render() {
    return (
      <View style={styles.tab}>
        <View style={styles.iconContainer}>
          <Icon
            type="feather"
            name="home"
            size={26}
            color={this.active === "newsfeed" ? secondColor : $grey_1}
            onPress={() => this.navigate("NewsFeed")}
          />
          <Icon
            type="feather"
            name="users"
            size={26}
            color={this.active === "communities" ? secondColor : $grey_1}
            onPress={() =>
              this.navigate("CommunitiesStack", {
                communities: this.state.communities,
              })
            }
          />
          {this.props.post && (
            <TouchableHighlight
              style={styles.newPostContainer}
              onPress={() => this.navigate('CreatePost', { headingFromCommunity: false })}
            >
              <Icon type="feather" name="plus" size={25} color={secondColor} />
            </TouchableHighlight>
          )}
          <Icon
            type="feather"
            name="inbox"
            size={26}
            color={this.active === "inbox" ? secondColor : $grey_1}
            onPress={() => this.navigate("RecentChats")}
          />
          <Icon
            type="feather"
            name="user"
            size={26}
            color={this.active === "profile" ? secondColor : $grey_1}
            onPress={() =>
              this.navigate("MyProfile", {
                communities: this.state.communities,
              })
            }
          />
        </View>
      </View>
    );
  }

  componentWillMount() {
    firebase
      .database()
      .ref(`authenticatedUsers/${this.currentUserID}/communities`)
      .on("value", (snap) => {
        var commKeys = [];
        snap.forEach((child) => {
          commKeys.push(child.key);
        });
        this.setState({ commKeys });
      });
  }

  componentDidMount() {
    firebase
      .database()
      .ref(`communities`)
      .on("value", (snap) => {
        var communities = [];
        var keys = this.state.commKeys;
        snap.forEach((child) => {
          if (keys.includes(child.key))
            communities.push({
              name: child.val().name,
              description: child.val().description,
              image: child.val().avatar,
              cover: child.val().cover,
              key: child.key,
            });
        });
        this.setState({ communities });
      });
  }
}

