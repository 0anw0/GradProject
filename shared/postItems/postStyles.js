import { StyleSheet } from "react-native";
import { secondColor, $grey_2, headlineColor, $grey_1 } from "../constants";
const styles = StyleSheet.create({
  renderLikers: {
    flexDirection: "row",
    alignContent: "space-around",
    borderColor: "#555",
    borderRadius: 5,
    borderWidth: 0.5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  renderComment: {
    flexDirection: "row",
    borderColor: "#555",
    borderRadius: 5,
    borderWidth: 0.5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  post: {
    padding: 10,
    borderWidth: 1,
    borderColor: $grey_2,
  },
  userDetails: {
    flexDirection: "row",
    //alignItems: 'center'
  },
  userName: {
    position: "relative",
    left: 8,
    top: 5,
    fontWeight: "bold",
    fontSize: 15,
    color: headlineColor,
  },
  communities: {
    position: "absolute",
    left: 58,
    top: 24,
    flex: 1,
    flexDirection: "row",
  },
  commName: {
    color: secondColor,
    marginRight: 7,
  },
  postText: {
    padding: 15,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  postReactions: {
    padding: 14,
    flexDirection: "row",
    borderWidth: 1,
    //borderTopWidth: 0,
    borderColor: $grey_2,
    justifyContent: "space-between",
    alignItems: 'center',
  },
  reaction: {
    flexDirection: "row",
    marginLeft: 12,
  },
  reactionText: {
    color: $grey_1,
    fontWeight: "bold",
    fontSize: 14,
    marginRight: 5,
    position: "relative",
    bottom: 2,
  },
  commentsContainer: {
    marginTop: 100,
    //marginHorizontal:5,
    backgroundColor: "#ffffff",
    flex: 1,
    borderWidth: 4,
    borderColor: secondColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
  },
  commentInputContainer: {
    borderWidth: 0.5,
    borderColor: "#555fff",
    borderRadius: 30,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 5,
    alignItems: "center",
    flex: 1,
    marginRight: 5,
  },
  commentInput: {
    fontSize: 17,
    flex: 1,
  },
  iconsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#555fff",
  },
  iconSeparator: {
    width: 1,
    backgroundColor: "#555fff",
  },
  icon: {
    margin: 15,
  },
  submitBtn: {
    backgroundColor: "#555fff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 5,
  },
  submitBtnTxt: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  postContainer: {
    borderWidth: 0.5,
    borderColor: "#555",
    borderRadius: 5,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 5,
    alignItems: "center",
  },
  timestamp_today: {
    position: "relative",
    left: 140,
    top: 5,
  },
  timestamp: {
    position: "relative",
    left: 30,
    top: -15,
    fontSize: 12,
  },
});

export default styles;
