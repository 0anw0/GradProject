import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { secondColor } from "./constants";
import { Icon } from "react-native-elements";

export default class Header extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.title}</Text>
        {this.props.onPress && (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={this.props.onPress}
          >
            <Icon type="font-awesome" name="plus" size={27} color="#FFF" />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: secondColor,
  },
  iconContainer: {
    backgroundColor: secondColor,
    paddingHorizontal: 18,
    paddingVertical: 7,
    position: "absolute",
    right: 0,
    borderTopStartRadius: 20,
    borderBottomLeftRadius: 20,
  },
});
