import React from "react";
import { View, Text, TouchableOpacity, Alert, Dimensions } from "react-native";
import { Avatar } from 'react-native-elements'

import { deletePost, hidePost, reportPost } from "./deleteEditReport";
import { secondColor } from '../constants'
import styles from "./postStyles";
import Pop from "../PopMenu";

export function PostHeader({
  postMakerKey,
  postKey,
  currentUser,
  editPost,
  communities,
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
        <View style={styles.post}>
          <View style={[styles.userDetails, {}]}>
            <Avatar rounded size={headingFromCommunity ? 35 : 50} source={{ uri: userAvatar }} />
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
        <View style={
          headingFromCommunity ? {
            position: "absolute",
            right: Dimensions.get('window').width * 0.038,
            top: Dimensions.get('window').height * 0.025,
            zIndex: 1
          } : {
              position: "absolute",
              right: Dimensions.get('window').width * 0.038,
              top: Dimensions.get('window').height * 0.036,
              zIndex: 1
            }
        }>
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
      </View>
    );
  } else {
    return null;
  }
}
