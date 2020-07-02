import React from "react";
import { View, Text, Image, StatusBar, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { TouchableHighlight } from "react-native-gesture-handler";
import styles from "./styles";

export default class Onboard1 extends React.Component {
  render() {
    return (
      <View style={{ paddingTop: StatusBar.currentHeight }}>
        <View style={styles.container}>
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <Image
              source={require("../../assets/illustrations/1.png")}
              style={{ width: 300, height: 300 }}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.headline}>Create Profile</Text>
            <Text style={styles.desc}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s
            </Text>
          </View>
          <View>
            <Button
              title="Next"
              buttonStyle={styles.btn}
              containerStyle={styles.btnContainer}
              titleStyle={{ fontSize: 24 }}
              onPress={() => this.props.navigation.navigate('Onboard2')}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <View style={styles.bulletsContainer}>
              <Text style={[styles.bullet, { color: "#1A004E" }]}>
                {"\u2B24"}
              </Text>
              <Text style={[styles.bullet, { color: "#E4E4E4" }]}>
                {"\u2B24"}
              </Text>
              <Text style={[styles.bullet, { color: "#E4E4E4" }]}>
                {"\u2B24"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
