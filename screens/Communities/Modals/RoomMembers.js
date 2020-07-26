import React from "react";
import {
  View,
  Button,
  Text,
  StatusBar,
  FlatList,
  StyleSheet,
  Alert,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Avatar from "../../../shared/Avatar";
import firebase from "../../../services/firebaseConfig";
import { secondColor, headlineColor } from "../../../shared/constants";

const wHeight = Dimensions.get("window").height;
const wWidth = Dimensions.get("window").width;

export default class RoomMembers extends React.Component {
  constructor(props) {
    super(props);
    this.currentUser = firebase.auth().currentUser;
    this.navigate = this.props.navigate;
    this.communityKey = this.props.communityKey;
    this.roomKey = this.props.selectedRoom;
    this.db = firebase.database();
    this.state = {
      roomMembers: [],
    };
  }

  componentDidMount() {
    this.db.ref(`rooms/${this.roomKey}/members`).on("value", (snap) => {
      var roomMembers = [];
      snap.forEach((child) => {
        this.db.ref(`authenticatedUsers/${child.key}`).on("value", (ele) => {
          roomMembers.push({
            key: child.key,
            name: ele.val().fullName,
            avatar: ele.val().avatar,
          });
        });
        this.setState({ roomMembers });
      });
    });
  }

  render() {
    return (
      <View style={styles.modalContainer}>
        <Text style={styles.title}>Members</Text>
        <FlatList
          style={{ paddingHorizontal: 40, marginTop: 20 }}
          data={this.state.roomMembers}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                if (item.key === this.currentUser.uid) {
                  this.navigate("MyProfile");
                } else {
                  this.navigate("OtherProfile", { key: item.key });
                }
              }}
            >
              <Avatar
                uri={item.avatar || "http://placehold.it/100"}
                width={55}
                height={55}
                borderWidth={1}
                borderColor={secondColor}
              />
              <Text style={styles.name}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#FFF",
    width: wWidth * 0.85,
    height: wHeight * 0.6,
    borderRadius: 6,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: secondColor,
    margin: 12,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    marginLeft: 13,
    position: "relative",
    bottom: "1%",
    color: headlineColor,
  },
});
