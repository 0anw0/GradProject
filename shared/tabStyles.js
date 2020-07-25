import React from "react";
import { StyleSheet } from "react-native";

import { secondColor, $grey_2 } from "../shared/constants";


const styles = StyleSheet.create({
    tab: {
      height: 60,
      width: "100%",
      backgroundColor: "#FFF",
      borderWidth: 1,
      borderColor: $grey_2,
      borderTopStartRadius: 15,
      borderTopEndRadius: 15,
      position: "absolute",
      bottom: 0,
    },
    iconContainer: {
      flexDirection: "row",
      paddingHorizontal: 20,
      justifyContent: "space-between",
      alignItems: "center",
      flex: 1,
    },
    newPostContainer: {
      backgroundColor: "#FFF",
      borderColor: secondColor,
      borderWidth: 2,
      borderRadius: 50,
      padding: 1,
    },
  });

  export default styles