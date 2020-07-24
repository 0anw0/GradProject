import React from "react";
import * as firebase from 'firebase'
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { secondColor, $grey_2, $grey_1 } from "./constants";
import Avatar from "./Avatar";

export default class WelcomeHeader extends React.Component {
  constructor(props) {
    super(props)
    this.uid = firebase.auth().currentUser.uid
    this.state = {
      name: ''
    }
  }
  componentDidMount() {
    firebase.database().ref(`authenticatedUsers/${this.uid}/PersonalInfo/nickName`)
      .once('value', snap => {
        this.setState({ name: snap.val() })
      })
  }

  render() {
    return (
      <View style={styles.header}>
        <View style={{
          flexDirection: 'row',
          width: Dimensions.get('window').width * 0.75,
          height: Dimensions.get('window').height * 0.05
        }}>
          <Text style={styles.headerHello}>Hello,</Text>
          <Text style={styles.headerUser}>{this.state.name}</Text>
        </View>
        <View>
          <Avatar
            width={40}
            height={40}
            uri={firebase.auth().currentUser.photoURL || 'http://placehold.it/45'}
            borderWidth={0.8}
            borderColor={secondColor}
          />
        </View>
        <Avatar />
        {/* 
          <Image  
          source={require("../assets/logo.png")}
          style={{ width: 45, height: 45, position: "relative", left: 128 }}
          />
        */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#F8F8F9",
    flexDirection: "row",
    padding: 25,
    borderColor: $grey_2,
    borderWidth: 1,
    borderBottomLeftRadius: 17,
    borderBottomRightRadius: 17,
    marginBottom: 10,
    alignItems: "center",
  },
  headerHello: {
    fontWeight: "bold",
    fontSize: 22,
    marginRight: 5,
    color: secondColor,
  },
  headerUser: {
    fontSize: 22,
    color: secondColor,
  },
});
