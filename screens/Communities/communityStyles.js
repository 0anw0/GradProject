import { StyleSheet } from "react-native";
import { secondColor, $grey_2, headlineColor } from "../../shared/constants";

const styles = StyleSheet.create({
  cover: {
    backgroundColor: "#DDDfff",
    width: "100%",
    height: 166,
  },
  coverIcon: {
    position: "absolute",
    right: 10,
    marginTop: 15,
    marginRight: 5,
  },
  profilePic: {
    alignItems: "center",
    marginTop: -60,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 2,
  },
  description: {
    color: "#555",
    fontSize: 21,
    textAlign: "center",
    letterSpacing: 1,
  },
  item: {
    borderColor: $grey_2,
    borderWidth: 1,
    borderRadius: 5,
    padding: 12,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  communityName: {
    fontSize: 23,
    marginLeft: 15,
    color: headlineColor
  },
  communityDesc: {
    fontSize: 17,
    marginLeft: 15,
    marginTop: 3,
    color: "#333",
  },
  communityNameTxtInput: {
    fontSize: 20,
    textAlign: "center",
    borderBottomWidth: 1,
  },
  communityDisTxtInput: {
    fontSize: 16,
    textAlign: "center",
    borderBottomWidth: 1,
  },
  addMembers: {
    marginLeft: 5,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  addMembersTxt: {
    fontSize: 23,
    color: "#555",
    marginLeft: 5,
  },
  list: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    paddingLeft: 10,
  },
  memberList: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default styles;
