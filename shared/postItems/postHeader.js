import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";

import { deletePost, hidePost, reportPost } from "./deleteEditReport";
import {secondColor} from '../constants'
import Avatar from "../Avatar";
import Pop from "../PopMenu";
import styles from "./postStyles";

export function PostHeader({
  postMakerKey,
  postKey,
  currentUser,
  editPost,
  communities,
  timestamp,
  userAvatar,
  userName,
  clearPosts,
  headingFromCommunity,
  setCommunityModalVisible,
}) {
  let communityInfo = communities;

  if (communityInfo) {
    return (
      <View>
        <View style={{ position: "absolute", right: 20, top: 20, zIndex: 1 }}>
          {postMakerKey === currentUser ? (
            <Pop
              dark
              size={22}
              item1="Edit"
              onPress1={editPost}
              item2="Delete"
              onPress2={() => {
                deletePost(postKey, clearPosts, communities);
              }}
            />
          ) : (
            <Pop
              dark
              size={22}
              item1="Hide"
              onPress1={() => hidePost(postKey, clearPosts, currentUser)}
              item2="Report"
              onPress2={() =>
                reportPost(postKey, clearPosts, currentUser, postMakerKey)
              }
            />
          )}
        </View>
        <View style={styles.post}>
          <View style={styles.userDetails}>
            <Avatar
              uri={userAvatar}
              width={50}
              height={50}
              borderWidth={1}
              borderColor={secondColor}
            />
            <Text style={styles.userName}>{userName}</Text>
            <View style={styles.communities}>
              {!headingFromCommunity ? (
                <TouchableOpacity
                  onPress={setCommunityModalVisible}
                  style={{ flexDirection: "row" }}
                >
                  <Text style={styles.commName}>
                    {communityInfo[0].name}{" "}
                    {communityInfo.length > 1
                      ? `+${communityInfo.length - 1}`
                      : null}
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </View>
      </View>
    );
  } else {
    return null;
  }
}
