import React from "react";
import {
  View,
  Text,
  Modal,
  Dimensions,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";

import Avatar from "../Avatar";
import { secondColor, headlineColor } from "../constants";

const wHeight = Dimensions.get("window").height;
const wWidth = Dimensions.get("window").width;

export default class SlideModal extends React.Component {
  render() {
    return (
      <Modal
        visible={this.props.modalVisible}
        onRequestClose={this.props.onRequestClose}
        transparent={true}
        animationType="fade"
      >
        <View
          style={{
            alignItems: "center",
            backgroundColor: "rgba(52, 52, 52, 0.8)",
            flex: 1,
          }}
        >
          <View style={styles.modalContainer}>{this.props.children}</View>

          <Button
            containerStyle={{ position: "absolute", bottom: 0, width: "100%" }}
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
            title="Back"
            onPress={() =>
              this.props.onPress ? this.props.onPress : this.props.closeModal()
            }
          />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#FFF",
    width: "100%",
    height: "100%",
    marginTop: wHeight * 0.18,
    borderRadius: 6,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: secondColor,
    margin: 12,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  name: {
    fontSize: 18,
    marginLeft: 13,
    position: "relative",
    bottom: "1%",
    color: headlineColor,
  },
  button: {
    width: "100%",
    height: wHeight * 0.07,
    backgroundColor: secondColor,
    borderRadius: 0,
  },
  buttonTitle: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 19,
  },
});
