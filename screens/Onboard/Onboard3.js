import React from "react";
import { View, Text, Image, StatusBar, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import styles from "./styles";

export default class Onboard3 extends React.Component {
  render() {
    return (
      <View style={{ paddingTop: StatusBar.currentHeight }}>
        <View style={styles.container}>
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <View style={{ alignItems: "center" }}>
              <Text style={[styles.headline, {marginTop: 80}]}>Enjoy With us !</Text>
            </View>
            <Image
              source={require("../../assets/illustrations/3.png")}
              style={{ width: 300, height: 300 }}
            />
          </View>
          <View>
            <Button
              title="Let's Go"
              buttonStyle={styles.btn}
              containerStyle={styles.btnContainer}
              titleStyle={{ fontSize: 24 }}
              onPress={() => this.props.navigation.navigate('SignUp')}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <View style={styles.bulletsContainer}>
              <Text style={[styles.bullet, { color: "#E4E4E4" }]}>
                {"\u2B24"}
              </Text>
              <Text style={[styles.bullet, { color: "#E4E4E4" }]}>
                {"\u2B24"}
              </Text>
              <Text style={[styles.bullet, { color: "#1A004E" }]}>
                {"\u2B24"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
