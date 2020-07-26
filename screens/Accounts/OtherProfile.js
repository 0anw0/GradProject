import React from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import Avatar from "../../shared/Avatar";
import ListModal from "../../shared/Modals/ListModal";
import { secondColor, $grey_2 } from "../../shared/constants";
import firebase from "../../services/firebaseConfig";

export default class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.navigate = this.props.navigation.navigate;
    this.key = this.props.navigation.getParam("key");
    // this.name = this.props.navigation.getParam("name");
    // this.avatar = this.props.navigation.getParam("avatar");
    this.state = {
      friends: [],
      communities: [],
      name: "",
      avatar: "",
      bio: "",
      comModalVisible: false,
      friendsModalVisible: false,
    };
  }

  setComModalVisible(visible) {
    this.setState({ comModalVisible: visible });
  }

  setFriendsModalVisible(visible) {
    this.setState({ friendsModalVisible: visible });
  }

  // Life cycle executed before rendering on both client & server side (Will be deprecated soon => Find alternative)
  componentWillMount() {
    firebase
      .database()
      .ref(`authenticatedUsers/${this.key}/communities`)
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
      .ref(`authenticatedUsers/${this.key}/`)
      .on("value", (snap) => {
        this.setState({
          name: snap.val().fullName,
          avatar: snap.val().avatar,
          bio: snap.val().bio || "",
        });
      });

    // Get Friends
    firebase
      .database()
      .ref("authenticatedUsers")
      .on("value", (snap) => {
        var friends = [];
        snap.forEach((child) => {
          if (child.key != this.key) {
            friends.push({
              key: child.key,
              name: child.val().fullName,
              avatar: child.val().avatar,
            });
          }
        });
        this.setState({ friends });
      });

    // Get Communities
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
              avatar: child.val().avatar,
              cover: child.val().cover,
              key: child.key,
            });
        });
        this.setState({ communities });
      });
  }

  render() {
    const more = (list) => {
      if (list.length > 4) {
        return (
          <View style={styles.boxMore}>
            <Text style={{ fontWeight: "bold", fontSize: 22, flex: 1 }}>
              ...
            </Text>
          </View>
        );
      }
    };
    return (
      <View
        style={{ marginTop: StatusBar.currentHeight, alignItems: "center" }}
      >
        <ListModal
          closeModal={() => this.setState({ comModalVisible: false })}
          listModalVisible={this.state.comModalVisible}
          setListModalVisible={() => {
            this.setComModalVisible(false);
          }}
          title="Communities"
          data={this.state.communities}
          toScreen="CommunityOverview"
          navigation={this.props.navigation}
        />

        <ListModal
          closeModal={() => this.setState({ friendsModalVisible: false })}
          listModalVisible={this.state.friendsModalVisible}
          setListModalVisible={() => {
            this.setFriendsModalVisible(false);
          }}
          title="Friends"
          data={this.state.friends}
          toScreen="OtherProfile"
          navigation={this.props.navigation}
        />

        <View style={styles.profDetails}>
          <Avatar
            uri={this.state.avatar}
            width={85}
            height={85}
            borderWidth={1}
            borderColor={secondColor}
            containerStyle={styles.avatarContainer}
          />
          <Text style={styles.profName}>{this.state.name}</Text>
          <Text style={styles.profBio}>{this.state.bio}</Text>
        </View>
        <TouchableOpacity
          style={styles.listBox}
          onPress={() =>
            this.setFriendsModalVisible(!this.state.comModalVisible)
          }
        >
          <View>
            <View style={styles.titleBox}>
              <Text style={styles.titleText}>Friends</Text>
            </View>
            <View style={styles.boxAvatar}>
              {this.state.friends.map((item, index) => {
                if (index < 5) {
                  return (
                    <View style={{ paddingHorizontal: 3 }}>
                      <Avatar
                        width={40}
                        height={40}
                        uri={item.avatar}
                        borderWidth={0.8}
                        borderColor={secondColor}
                      />
                    </View>
                  );
                }
              })}
              {more(this.state.friends)}
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.listBox}
          onPress={() => this.setComModalVisible(!this.state.comModalVisible)}
        >
          <View>
            <View style={styles.titleBox}>
              <Text style={styles.titleText}>Communities</Text>
            </View>
            <View style={styles.boxAvatar}>
              {this.state.communities.map((item, index) => {
                if (index < 5) {
                  return (
                    <View style={{ paddingHorizontal: 3 }}>
                      <Avatar
                        width={40}
                        height={40}
                        uri={item.avatar}
                        borderWidth={0.8}
                        borderColor={secondColor}
                      />
                    </View>
                  );
                }
              })}
              {more(this.state.communities)}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  profDetails: {
    marginTop: 20,
    marginBottom: 60,
    padding: 10,
    alignItems: "center",
  },
  profName: {
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 25,
  },
  profBio: {
    fontSize: 20,
    color: "#555",
  },
  listBox: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: $grey_2,
    width: 330,
    padding: 15,
    marginBottom: 50,
    borderRadius: 5,
  },
  boxAvatar: {
    flexDirection: "row",
    padding: 10,
  },
  boxMore: {
    width: 40,
    height: 40,
    backgroundColor: $grey_2,
    borderRadius: 48,
    borderWidth: 1,
    borderColor: secondColor,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 3,
  },
  editProfile: {
    position: "absolute",
    left: 20,
    top: 20,
  },
  logout: {
    position: "absolute",
    right: 20,
    top: 20,
  },
  titleBox: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: $grey_2,
    borderRadius: 10,
    position: "absolute",
    bottom: 70,
    width: 150,
    height: 30,
    justifyContent: "center",
  },
  titleText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: secondColor,
    position: "relative",
    bottom: 2,
  },
});
