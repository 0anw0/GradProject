import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import * as firebase from "firebase";
import Avatar from "../../../shared/Avatar";
import { secondColor, $grey_2, $grey_3 } from "../../../shared/constants";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.communityKey = this.props.data;
    this.ref = firebase
      .database()
      .ref("rooms/" + this.communityKey)
      .orderByChild("name");
    this.state = {
      temp: [
        {
          name: "General",
          avatar:
          "https://www.refinery29.com/images/8454017.jpg",
        },
        {
          name: "Sports",
          avatar:
            "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2019/03/29/15538684259665.jpg",
        },
        { name: "Kids", avatar: 'https://kidscreen.com/wp/wp-content/uploads/2020/03/spongebob-squarepants.jpg'},
        { name: "Cooking", avatar: 'https://3u8dbs16f2emlqxkbc8tbvgf-wpengine.netdna-ssl.com/wp-content/uploads/2019/05/impossiblewhopper_bk.jpg' },
        { name: "Movies", avatar: 'https://lh3.googleusercontent.com/kBN13NT91fezjiUH2qGmM5u3Pvb5DmrQIYysi6Y5QYf99PonqiszFKS8xXE8_He9Jhoj-A=s170' },
        { name: "Gaming", avatar: 'https://saudigamer.com/wp-content/uploads/2018/11/PUBG-PS4-Image_11-05-18_002-600x338.jpg' },
      ],
      //   data: [],
    };
  }

  componentDidMount() {
    this.ref.on("value", (dataSnapshot) => {
      var roomsFB = [];
      dataSnapshot.forEach((child) => {
        roomsFB.push({
          name: child.val().name,
          avatar: child.val().avatar,
          key: child.key,
        });
      });
      this.setState({ data: roomsFB });
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
          //   data={this.state.data}
          contentContainerStyle={{ alignItems: "center", padding: 15 }}
          data={this.state.temp}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Avatar
                uri={item.avatar}
                width={60}
                height={60}
                borderWidth={1}
                borderColor={secondColor}
              />
              <Text style={styles.itemTitle}>{item.name}</Text>
            </View>
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
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
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
