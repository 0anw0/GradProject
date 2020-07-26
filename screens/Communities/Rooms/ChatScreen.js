import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Alert,
  StatusBar,
  Dimensions,
} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { Icon } from "react-native-elements";
import * as firebase from "firebase";

import { _launchCameraRoll, _takePhoto } from "../../../services/CameraAPI";
import { validURL, secondColor } from "../../../shared/constants";
import { firebaseConfig } from "../../../services/firebaseConfig";
import Header from "../../../shared/Header";

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default class ChatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.currentUser = firebase.auth().currentUser;
    this.roomKey = this.props.navigation.getParam("roomKey");
    this.roomRef = firebase.database().ref(`messages/${this.roomKey}`);
    this.uploadedImages = firebase
      .database()
      .ref(`rooms/${this.roomKey}/uploadedImages`);
    this.chatLinks = firebase.database().ref(`rooms/${this.roomKey}/chatLinks`);
    this.state = {
      messages: [],
      pickedImage: null,
      pickedVideo: null,
    };
  }

  get user() {
    return {
      _id: (this.currentUser || {}).uid,
      name: this.currentUser.displayName || {},
      avatar: this.currentUser.photoURL,
    };
  }

  send = (messages) => {
    messages.forEach((item) => {
      const message = {
        reply: false,
        text: item.text,
        image: this.state.pickedImage,
        video: this.state.pickedVideo,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: item.user,
      };
      this.roomRef.push(message);

      // In Case of Links
      if (validURL(item.text)) {
        this.chatLinks.push({
          link: item.text,
        });
      }

      // Push Media to Room's Uploaded Media Path
      this.uploadedImages
        .push({
          image: this.state.pickedImage,
          //video: this.state.pickedVideo
        })
        .then(this.setState({ pickedImage: "", pickedVideo: "" }));
    });
  };

  parse = (message) => {
    const { user, text, timestamp, image, video } = message.val();
    const { key: _id } = message;
    const createdAt = new Date(timestamp);
    return {
      _id,
      createdAt,
      text,
      image,
      video,
      user,
    };
  };

  get = (callback) => {
    this.roomRef.on("child_added", (snapshot) =>
      callback(this.parse(snapshot))
    );
  };

  url = "";
  pickImage = () => {
    let promObject = _launchCameraRoll();
    promObject.then((res) => {
      res.url.then((res) => {
        this.url = res;
      });
      res.data.then((res) => {
        if (res.contentType.includes("image")) {
          this.setState({ pickedImage: this.url });
        } else {
          this.setState({ pickedVideo: this.url });
        }
      });
    });
  };

  componentDidMount() {
    this.get((message) =>
      this.setState((previous) => ({
        messages: GiftedChat.append(previous.messages, message),
      }))
    );
  }

  render() {
    const chat = (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.send}
        user={this.user}
        renderActions={() => (
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={_takePhoto} style={{ marginLeft: 10 }}>
              <Icon
                name="md-camera"
                type="ionicon"
                size={28}
                color={secondColor}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.pickImage}
              style={{ marginLeft: 10 }}
            >
              <Icon
                name="picture-o"
                type="font-awesome"
                size={25}
                color={secondColor}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    );

    return (
      <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
        <Header title={this.props.navigation.getParam("roomName")} />
        {chat}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 7,
    marginRight: 2,
  },
  headerLeft: {
    paddingLeft: 10,
  },
});
