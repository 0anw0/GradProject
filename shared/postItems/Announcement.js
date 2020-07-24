import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { secondColor, $grey_3 } from "../constants";

function Announment({ text }) {
  return (
    <View
      style={{
        padding: 15,
        paddingVertical: 50,
        marginBottom: 15,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: secondColor,
        backgroundColor: '#F8F8F9',
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 16,
            textAlign: 'center',
            color: secondColor,
            letterSpacing: 0.5,
          }}
        >
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Announment;
