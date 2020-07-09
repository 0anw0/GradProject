import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Text,
  Alert,
} from "react-native";
import { Icon, Button, Avatar, Divider } from "react-native-elements";
import KeyboardSpacer from "react-native-keyboard-spacer";
import styles from "./authStyles";
import { secondColor } from "../../shared/constants";
import firebase from "../../services/firebaseConfig";

export default class SignIn extends React.Component {
  state = {
    email: "ahmadnabilwanas@gmail.com",
    password: "123456789",
  };
  handleSignIn = (email, password) => {
    // Form Validation
    if (email.length == 0 || password.length == 0) {
      Alert.alert("Please complete the entire fields");
      return;
    }
    // Sign In
    firebase
      .auth()
      .signInWithEmailAndPassword(email.trim(), password.trim())
      .then((res) => {
        if (!res.user.emailVerified)
          Alert.alert("Your email is not verified, Please verify your email");
        this.props.navigation.navigate("NewsFeed");
      })
      .catch((error) => Alert.alert(error.toString()));
  };
  render() {
    return (
      <ImageBackground
        style={styles.back}
        source={require("../../assets/back.png")}
      >
        <Text style={styles.heading}>
          Welcome Back <Text style={styles.heading2}>:)</Text>
        </Text>
        <Divider style={styles.divider} />
        <View style={{ paddingTop: 20, alignItems: "center" }}>
          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            style={styles.TextInput}
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
          />
          <TextInput
            secureTextEntry
            placeholder="Password"
            autoCapitalize="none"
            style={styles.TextInput}
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
          />
          <Button
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
            title="Sign In"
            onPress={() =>
              this.handleSignIn(this.state.email, this.state.password)
            }
          />
          <KeyboardSpacer />
        </View>
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("ForgotPassword")}
          >
            <Text style={[styles.already, { fontWeight: "bold" }]}>
              Forgot your password?
            </Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.already}>Already have an account ?</Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("SignUp")}
            >
              <Text style={styles.sign}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footerContainer}>
          <Divider style={styles.divider} />
          <Text style={styles.footerText}>
            All Rights Reserved to <Text style={styles.footerLogo}>Zone</Text>
          </Text>
        </View>
      </ImageBackground>
    );
  }
}
