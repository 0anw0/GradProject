import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import moment from "moment";

import styles from "./postStyles";
import { like } from "./likeFn";
import { secondColor, $grey_2, $grey_1 } from "../constants";

const renderTimestamp = (timestamp) => {
  const current = new Date().getTime();
  const createdAt = timestamp;
  if (current - createdAt <= 86400000) {
    return (
      <Text style={styles.timestamp_today}>
        {moment(createdAt).startOf("minute").fromNow()}
      </Text>
    );
  } else
    return <Text style={styles.timestamp}>{moment(createdAt).calendar()}</Text>;
};

export function PostFooter({
  setCommentModalVisible,
  communities,
  postKey,
  updateLikesNumber,
  toggleLike,
  likesNumber,
  liked,
  setLikersModalVisible,
  commentsNumber,
  timestamp,
}) {
  let communityInfo = communities;
  let [virtualLikeNumbers, setVirtualLikeNumbers] = useState(likesNumber);

  if (communityInfo) {
    return (
      <View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={setLikersModalVisible}
          ></TouchableOpacity>

          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={setCommentModalVisible}
          ></TouchableOpacity>
        </View>
        <View style={styles.postReactions}>
          <Text>{renderTimestamp(timestamp)}</Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={styles.reaction}
              onPress={() => {
                like(postKey, toggleLike, updateLikesNumber);
                if (!liked && likesNumber == 0) setVirtualLikeNumbers(1);
                else {
                  if (liked) {
                    setVirtualLikeNumbers(virtualLikeNumbers + 1);
                  } else {
                    setVirtualLikeNumbers(virtualLikeNumbers - 1);
                  }
                }
              }}
            >
              <Text
                style={[
                  styles.reactionText,
                  { color: liked ? $grey_1 : secondColor },
                ]}
              >
                {virtualLikeNumbers}
              </Text>
              <Icon
                name="heart"
                type="font-awesome"
                size={18}
                color={secondColor}
                iconStyle={{ color: liked ? $grey_2 : secondColor }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.reaction}
              onPress={setCommentModalVisible}
            >
              <Text style={styles.reactionText}>
                {commentsNumber.toString()}
              </Text>
              <Icon
                name="comment"
                type="font-awesome"
                size={18}
                color={$grey_2}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  } else return null;
}
