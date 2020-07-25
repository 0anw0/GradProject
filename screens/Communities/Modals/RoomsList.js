import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { Icon } from "react-native-elements";
import * as firebase from "firebase";
import Avatar from "../../../shared/Avatar";
import { secondColor, $grey_2, $grey_3 } from "../../../shared/constants";
import RoomOverview from "./RoomOverview";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.uuid = firebase.auth().currentUser.uid;
    this.communityKey = this.props.communityKey;
    this.state = {
      rooms: [],
      newRoom: "",
      existRooms: true,
      loaded: false,
    };
  }

  componentDidMount() {
    var roomsFB = [];
    firebase
      .database()
      .ref(
        `authenticatedUsers/${this.uuid}/communities/${this.communityKey}/rooms`
      )
      .on("value", (snap) => {
        snap.forEach((child) => {
          firebase
            .database()
            .ref(`rooms/${child.key}`)
            .on("value", (element) => {
              roomsFB.push({
                name: element.val().name,
                avatar: element.val().avatar,
                key: child.key,
              });
            });
        });
      });

    this.setState({
      rooms: roomsFB,
      existRooms: roomsFB.length == 0 ? false : true,
      loaded: true,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={this.props.onPress}
        >
          <Icon type="font-awesome" name="plus" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.title}>{this.props.commumityName}'s Rooms</Text>
        <FlatList
          data={this.state.rooms}
          contentContainerStyle={{ alignItems: "center", padding: 15 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                this.props.setRoomOverviewModalVisible(true , item)
              }}
            >
              <Avatar
                uri={item.avatar}
                width={60}
                height={60}
                borderWidth={1}
                borderColor={secondColor}
              />
              <Text style={styles.itemTitle}>{item.name}</Text>
            </TouchableOpacity>
          )}
          numColumns={2}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: $grey_3,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: secondColor,
    margin: 12,
  },
  item: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: $grey_2,
    paddingHorizontal: 25,
    paddingVertical: 20,
    alignItems: "center",
    marginBottom: 20,
    marginHorizontal: 10,
    maxWidth: deviceWidth * 0.3,
    maxHeight: deviceHeight * 0.2,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
  },
  iconContainer: {
    backgroundColor: secondColor,
    paddingHorizontal: 15,
    paddingVertical: 7,
    position: "absolute",
    right: 0,
    borderTopStartRadius: 20,
    borderBottomLeftRadius: 20,
  },
});
