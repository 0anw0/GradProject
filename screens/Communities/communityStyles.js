import { StyleSheet } from "react-native";
import { secondColor, $grey_2, headlineColor } from "../../shared/constants";

const styles = StyleSheet.create({
  cover: {
    backgroundColor: "#DDDfff",
    width: "100%",
    height: 110,
  },
  coverIcon: {
    position: "absolute",
    right: 10,
    marginTop: 15,
    marginRight: 5,
  },
  profilePic: {
    marginLeft: 10,
    marginTop: -20,
  },
  editCommunity: {
    position: 'relative',
    top: 10,
    right: 10
  },
  textContainer: {
    marginLeft: 5,
    marginTop: 4,
    flex: 1
  },
  name: {
    fontSize: 21,
    fontWeight: "bold",
  },
  description: {
    color: "#555",
    fontSize: 16,
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
    color: headlineColor,
  },
  communityDesc: {
    fontSize: 17,
    marginLeft: 15,
    marginTop: 3,
    color: "#333",
  },
  communityNameTxtInput: {
    marginTop: 5,
    paddingLeft: 3,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: secondColor
  },
  communityDisTxtInput: {
    marginTop:5,
    paddingLeft: 3,
    fontSize: 12,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: secondColor
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
