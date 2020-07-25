import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import * as firebase from "firebase";
import Avatar from "../../../shared/Avatar";
import {
  secondColor,
  headlineColor,
  $grey_2,
  $grey_3,
} from "../../../shared/constants";

export default class RoomOverview extends React.Component {
  constructor(props) {
    super(props);
    this.navigate = this.props.navigate;
    this.room = this.props.selectedRoom.name; // Temp
    this.communityKey = this.props.communityKey; // Fill
    this.roomKey = this.props.selectedRoom.key; // Fill
  }

  componentDidMount() {}
  
  openMessages(room) {
    this.navigate("ChatScreen", {
      roomKey: room.key,
      roomName: room.name,
      roomAvatar: room.avatar,
      communityKey: this.communityKey,
    });
  }
  
  render() {
    return (
      <View style={styles.container}>
        {/* Buttons */}
        <TouchableOpacity
          style={styles.leftIcon}
          onPress={() => alert("Pressed")}
        >
          <Icon name="edit" type="feather" color={secondColor} size={25} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rightIcon}
          onPress={() => alert("Pressed")}
        >
          <Icon name="users" type="feather" color={secondColor} size={25} />
        </TouchableOpacity>

        <View style={styles.detailsContainer}>
          <Avatar
            uri="https://kidscreen.com/wp/wp-content/uploads/2020/03/spongebob-squarepants.jpg"
            width={90}
            height={90}
            borderWidth={1}
            borderColor={secondColor}
          />
          <Text style={styles.roomName}>{this.room}</Text>
          <View style={{ marginTop: 25 }}>
            <Button
              onPress={() => this.openMessages(item)}
              type="outline"
              containerStyle={{ marginBottom: 20 }}
              buttonStyle={{ paddingHorizontal: 50, paddingVertical: 15 }}
              titleStyle={{ color: secondColor, fontSize: 18, marginLeft: 10 }}
              icon={
                <Icon
                  type="font-awesome"
                  name="wechat"
                  size={18}
                  color={secondColor}
                />
              }
              title={"Chat with " + this.room}
            />
            <Button
              onPress={() =>
                this.navigate("BotStack", {
                  communityKey: this.communityKey,
                  roomKey: this.roomKey,
                })
              }
              type="outline"
              containerStyle={{ marginBottom: 20 }}
              buttonStyle={{ paddingHorizontal: 50, paddingVertical: 15 }}
              titleStyle={{ color: secondColor, fontSize: 18, marginLeft: 10 }}
              icon={
                <Icon
                  type="material-community"
                  name="robot"
                  size={18}
                  color={secondColor}
                />
              }
              title="Chatbot"
            />
            <Button
              onPress={() =>
                this.navigate("BubbleStack", {
                  communityKey: this.communityKey,
                  roomKey: this.roomKey,
                })
              }
              type="outline"
              buttonStyle={{ paddingHorizontal: 50, paddingVertical: 15 }}
              titleStyle={{ color: secondColor, fontSize: 18, marginLeft: 10 }}
              icon={
                <Icon
                  type="material-community"
                  name="thought-bubble"
                  size={18}
                  color={secondColor}
                />
              }
              title="Bubble"
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: $grey_3,
    flex: 1,
  },
  leftIcon: {
    position: "absolute",
    left: 25,
    top: 20,
  },
  rightIcon: {
    position: "absolute",
    right: 15,
    top: 20,
  },
  detailsContainer: {
    alignItems: "center",
    padding: 60,
  },
  roomName: {
    fontSize: 25,
    fontWeight: "bold",
    color: headlineColor,
    marginTop: 8,
  },
});
