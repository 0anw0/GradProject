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

export default class ListModal extends React.Component {
  render() {
    return (
      <Modal
        visible={this.props.listModalVisible}
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
          <View style={styles.modalContainer}>
            <Text style={styles.title}>{this.props.title}</Text>
            <FlatList
              style={{ paddingHorizontal: 40, marginTop: 20 }}
              data={this.props.data}
              keyExtractor={(item) => item.key}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    this.props.navigation.navigate(this.props.toScreen, {
                      key: item.key,
                    });
                    this.props.closeModal();
                  }}
                >
                  <Avatar
                    uri={item.avatar || "http://placehold.it/100"}
                    width={52}
                    height={52}
                    borderWidth={1}
                    borderColor={secondColor}
                    // containerStyle={styles.avatarContainer}
                  />
                  <Text style={styles.name}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
            <Button
              buttonStyle={styles.button}
              titleStyle={styles.buttonTitle}
              title="Back"
              onPress={() => this.props.closeModal()}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#FFF",
    width: wWidth * 0.85,
    height: wHeight * 0.6,
    marginTop: wHeight * 0.15,
    borderRadius: 6,
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
