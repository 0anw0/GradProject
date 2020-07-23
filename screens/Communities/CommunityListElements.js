import React from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import Avatar from "../../shared/Avatar";
import TouchableButton from "../../shared/TouchableButton";
import { secondColor } from "../../shared/constants";
import styles from "./communityStyles";

export function CommunityListElements({
  loaded,
  hasCommunities,
  communities,
  navigate,
}) {
  return (
    <View style={{ padding: 25 }}>
      {loaded ? (
        hasCommunities ? (
          communities.map((item) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigate("CommunityOverview", { key: item.key });
                }}
              >
                <View style={styles.item}>
                  <Avatar
                    uri={item.image}
                    width={60}
                    height={60}
                    borderColor={secondColor}
                    borderWidth={0.5}
                  />
                  <View>
                    <Text style={styles.communityName}>{item.name}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <TouchableButton
            btnStyleType={styles.icon}
            btnFunction={() => navigate("CreateCommunity")}
            txt={true}
            icon={true}
            name="plus"
            type="font-awesome"
            size={30}
            color={"blue"}
            txtValue={"Join your first Community!"}
            txtStyleType={{ margin: 10 }}
          />
        )
      ) : (
        <ActivityIndicator
          size="large"
          color="blue"
          style={{ paddingTop: 275 }}
        />
      )}
    </View>
  );
}
