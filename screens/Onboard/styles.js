import { StyleSheet } from "react-native";
import { secondColor, headlineColor, $grey_1 } from "../../shared/constants";

const styles = StyleSheet.create({
  container: {paddingTop: 20},
  headline: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    color: headlineColor
  },
  desc: {
    maxWidth: 290,
    minHeight: 120,
    fontSize: 20,
    textAlign: "center",
    color: $grey_1,
  },
  btn: {
    width: 280,
    height: 50,
    backgroundColor: secondColor,
  },
  btnContainer: {
    marginVertical: 40,
    alignItems: "center",
  },
  bullet: {
    fontSize: 17,
  },
  bulletsContainer: {
    marginTop: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    width: 100,
  },
});

export default styles;
