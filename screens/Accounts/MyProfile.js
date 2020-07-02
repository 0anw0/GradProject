import React from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Icon } from "react-native-elements";
import { secondColor, $grey_2, $grey_1, $grey_3 } from "../../shared/constants";
import Avatar from "../../shared/Avatar";
import Tab from "../../shared/TabBar";
import firebase from "../../services/firebaseConfig";

export default class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.currentUser = firebase.auth().currentUser;
    this.navigate = this.props.navigation.navigate;
    this.communities = this.props.navigation.getParam("communities");
    this.state = {
      avatar: "",
      profName: "",
      profBio: "Hello from the other side",
      friends: [],
    };
  }
  z;

  componentDidMount() {
    firebase
      .database()
      .ref(`authenticatedUsers/${this.currentUser.uid}`)
      .on("value", (child) => {
        this.setState({
          avatar: child.val().avatar,
          profName: child.val().fullName,
          profBio: child.val().bio,
        });
      });
    firebase
      .database()
      .ref("authenticatedUsers")
      .on("value", (snap) => {
        var friends = [];
        snap.forEach((child) => {
          if (child.key != firebase.auth().currentUser.uid) {
            friends.push({
              key: child.key,
              name: child.val().fullName,
              avatar: child.val().avatar,
            });
          }
        });
        this.setState({ friends });
      });
  }

  logout = async () => {
    try {
      await firebase.auth().signOut();
      this.props.navigation.navigate("SignIn");
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const more = (list) => {
      if (list.length > 4) {
        return (
          <View style={styles.boxMore}>
            <Text style={{ fontWeight: "bold", fontSize: 25, flex: 1 }}>
              ...
            </Text>
          </View>
        );
      }
    };
    return (
      <View
        style={{
          marginTop: StatusBar.currentHeight,
          alignItems: "center",
          flex: 1,
          backgroundColor: $grey_3,
        }}
      >
        {/* Buttons */}
        <TouchableOpacity
          style={styles.editProfile}
          onPress={() => this.navigate("EditProfile")}
        >
          <Icon name="edit" type="feather" color={secondColor} size={30} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.logout} onPress={this.logout}>
          <Icon name="log-out" type="feather" color={secondColor} size={30} />
        </TouchableOpacity>

        {/* Details */}
        <View style={{ marginTop: 40 }}>
          <View style={styles.profDetails}>
            <Avatar
              uri={this.state.avatar}
              width={85}
              height={85}
              borderWidth={1}
              borderColor={secondColor}
              containerStyle={styles.avatarContainer}
            />
            <Text style={styles.profName}>{this.state.profName}</Text>
            <Text style={styles.profBio}>
              {this.state.profBio || "This is my bio"}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.listBox}
            onPress={() =>
              this.navigate("FriendsList", { friends: this.state.friends })
            }
          >
            <View>
              <View style={styles.titleBox}>
                <Text style={styles.titleText}>Your Friends</Text>
              </View>
              <View style={styles.boxAvatar}>
                {this.state.friends.map((item) => (
                  <View style={{ paddingHorizontal: 5 }}>
                    <Avatar
                      width={40}
                      height={40}
                      uri={item.avatar}
                      borderWidth={0.8}
                      borderColor={secondColor}
                    />
                    {more(this.state.friends)}
                  </View>
                ))}
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.listBox}
            onPress={() => this.props.navigation.goBack(null)}
          >
            <View>
              <View style={styles.titleBox}>
                <Text style={styles.titleText}>Your communities</Text>
              </View>
              <View style={styles.boxAvatar}>
                {this.communities.map((item) => (
                  <View style={{ paddingHorizontal: 5 }}>
                    <Avatar
                      width={40}
                      height={40}
                      uri={item.image}
                      borderWidth={0.8}
                      borderColor={secondColor}
                    />
                    {more(this.communities)}
                  </View>
                ))}
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <Tab active="profile" navigation={this.props.navigation} />
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
    width: 45,
    height: 45,
    backgroundColor: "#FFF",
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center",
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
