import React, { useState } from "react";
import {
  View,
  FlatList,
  Modal,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import { Icon } from "react-native-elements";
import styles from "./postStyles";
import renderComment from "./renderComment";
import makeComment from "./makeComment";
import { commentHandler } from "./commentsHandler";

export function CommentModal({
  commentsModalVisible,
  setCommentModalVisible,
  comments,
  setEditCommentModalVisible,
  postKey,
  updateCommentsNumber,
  updateCommentersState,
}) {
  const [commentTxt, setCommentTxt] = useState("");
  return (
    <Modal
      animationType="slide"
      //transparent={true}
      visible={commentsModalVisible}
      onShow={() =>
        commentHandler(postKey, updateCommentersState, updateCommentsNumber)
      }
      presentationStyle="formSheet "
      onRequestClose={setCommentModalVisible}
    >
      <View style={{ backgroundColor: "#000000D9", flex: 1 }}>
        <View style={styles.commentsContainer}>
          <FlatList
            style={{ marginTop: 10, marginHorizontal: 10 }}
            data={comments}
            keyExtractor={(item) => item.commentKey}
            renderItem={({ item }) =>
              renderComment(
                item,
                setEditCommentModalVisible,
                updateCommentsNumber
              )
            }
          />
        </View>
        <View>
          <View
            style={{
              alignItems: "center",
              backgroundColor: "#fff",
              position: "absolute",
              flexDirection: "row",
              bottom: 10,
              left: 10,
              right: 10,
            }}
          >
            <View style={styles.commentInputContainer}>
              <TextInput
                style={styles.commentInput}
                placeholder="Type something ... "
                placeholderTextColor="#888"
                autoCapitalize="none"
                value={commentTxt}
                multiline={true}
                numberOfLines={1}
                onChangeText={(commentTxt) => setCommentTxt(commentTxt)}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                makeComment(postKey, commentTxt, updateCommentsNumber);
                setCommentTxt("");
              }}
            >
              <Icon
                name="arrow-up"
                type="font-awesome"
                size={22}
                color="#555"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
