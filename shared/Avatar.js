import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { $grey_2 } from "./constants";

export default class Avatar extends React.Component {
  render() {
    return (
      <View style={this.props.containerStyle}>
        <Image
          source={{ uri: this.props.uri }}
          style={{
            width: this.props.width,
            height: this.props.height,
            borderRadius: 50,
            borderWidth: this.props.borderWidth? this.props.borderWidth : 1,
            borderColor: this.props.borderColor? this.props.borderColor : $grey_2,
          }}
        />
      </View>
    );
  }
}
