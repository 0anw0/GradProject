import React from "react";
import { View, FlatList, Modal, ActivityIndicator } from "react-native";
import { likersHandler } from "./likesHandler";
import renderLikers from "./renderLikers";
import styles from "./postStyles";

export function LikeModal({
  likersModalVisible,
  postKey,
  setLikersModalVisible,
  likers,
  updateLikersState,
  loadLikes,
  loadLikesBoolean,
}) {
  return (
    <Modal
      animationType="slide"
      visible={likersModalVisible}
      onShow={async () =>
        likersHandler(postKey, updateLikersState, loadLikesBoolean)
      }
      presentationStyle="formSheet "
      onRequestClose={setLikersModalVisible}
    >
      <View style={{ backgroundColor: "#000000D9", flex: 1 }}>
        <View style={styles.commentsContainer}>
          {!loadLikes ? (
            <ActivityIndicator size="large" color="blue" />
          ) : (
            <FlatList
              style={{ marginTop: 10, marginHorizontal: 10 }}
              data={likers}
              keyExtractor={(item) => item.userKey}
              renderItem={({ item }) => renderLikers(item)}
            />
          )}
        </View>
      </View>
    </Modal>
  );
}
