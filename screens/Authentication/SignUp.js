import React from "react";
import {
  View,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Text,
  Alert,
} from "react-native";
import { Icon, Button, Avatar, Divider } from "react-native-elements";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { _launchCameraRoll, _takePhoto } from "../../services/CameraAPI";
import styles from "./authStyles";
import firebase from "../../services/firebaseConfig";
import { secondColor } from "../../shared/constants";

export default class SignUp extends React.Component {
  state = {
    avatar: "",
    fullName: "",
    email: "",
    phone: "",
    password: "",
    rePassword: "",
  };

  url = "";
  pickAvatar = () => {
    let promObject = _launchCameraRoll();
    promObject.then((res) => {
      res.url.then((res) => {
        this.setState({ avatar: res });
      });
    });
  };

  handleSignUP = (avatar, fullName, email, password, rePassword) => {
    // Form Validation
    if (fullName.length == 0 || email.length == 0 || password.length == 0) {
      Alert.alert("Please complete the entire fields");
      return;
    }
    if (password !== rePassword) {
      Alert.alert(
        "Password & repassword don't match, please match both fields and try again"
      );
      return;
    }
    if (password.length < 6) {
      Alert.alert("Please enter at least 6 characters for password");
      return;
    }

    // Database Insertion & Sending E-mail Verification
    firebase
      .auth()
      .createUserWithEmailAndPassword(email.trim(), password.trim())
      .then((res) => {
        firebase.database().ref(`authenticatedUsers/${res.user.uid}`).set({
          fullName: fullName.trim(),
          email: email.trim(),
          avatar,
        });

        firebase.database().ref(`authenticatedUsers/${res.user.uid}/PersonalInfo`).set({
          fullName: fullName.trim()
        })
         
        res.user.updateProfile({ displayName: fullName, photoURL: avatar });
        res.user.sendEmailVerification();
      })
      .then(this.props.navigation.navigate("VerifyEmail"))
      .catch((error) => Alert.alert(error.toString()));
  };

  render() {
    var profileIcon =
      "https://www.searchpng.com/wp-content/uploads/2019/02/Deafult-Profile-Pitcher.png";
    return (
      <ImageBackground
        style={styles.back}
        source={require("../../assets/back.png")}
      >
        <Text style={styles.heading}>
          Hello, <Text style={styles.heading2}>Beautiful,</Text>
        </Text>
        <Divider style={styles.divider} />
        <View style={{ alignItems: "center", marginTop: 30, flex: 1 }}>
          <View style={{ marginBottom: 5 }}>
            <Avatar
              rounded
              showEditButton
              onEditPress={this.pickAvatar}
              size={"large"}
              icon={{ name: "user", type: "font-awesome" }}
              source={{
                uri: this.state.avatar ? this.state.avatar : profileIcon,
              }}
            />
          </View>
          <TextInput
            style={styles.TextInput}
            placeholder="Full Name"
            value={this.state.fullName}
            onChangeText={(fullName) => this.setState({ fullName })}
          />
          <TextInput
            autoCapitalize="none"
            style={styles.TextInput}
            placeholder="E-Mail"
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
          />
          <TextInput
            secureTextEntry
            autoCapitalize="none"
            placeholder="Password"
            style={styles.TextInput}
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
          />
          <TextInput
            secureTextEntry
            autoCapitalize="none"
            style={styles.TextInput}
            placeholder="Re-Password"
            value={this.state.rePassword}
            onChangeText={(rePassword) => this.setState({ rePassword })}
          />
          <Button
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
            title="Sign Up"
            onPress={() =>
              this.handleSignUP(
                this.state.avatar,
                this.state.fullName,
                this.state.email,
                this.state.password,
                this.state.rePassword
              )
            }
          />
          <View style={{ marginLeft: 40, flexDirection: "row", width: "100%" }}>
            <Text style={styles.already}>Already have an account ?</Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("SignIn")}
            >
              <Text style={styles.sign}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
        <KeyboardSpacer />
      </ImageBackground>
    );
  }
}