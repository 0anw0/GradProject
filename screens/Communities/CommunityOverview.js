import React from "react";
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import * as firebase from "firebase";

import SlideModal from "../../shared/Modals/SlideModal";
import MiddleFloatingIcon from "../../shared/FloatingIcons/Middle";
import listenForPosts from "../../shared/postItems/listenForPosts";
import RenderPosts from "../../shared/postItems/renderPosts";
import { secondColor } from "../../shared/constants";
import leaveCommunityAction from "./leaveCommunity";
import PopMenu from "../../shared/PopMenu";
import Avatar from "../../shared/Avatar";
import styles from "./communityStyles";
import RoomsList from "./Modals/RoomsList";
import RoomOverview from "./Modals/RoomOverview";
import RoomMembers from "./Modals/RoomMembers";

export default class CommunityOverview extends React.Component {
  constructor(props) {
    super(props);
    this.navigate = this.props.navigation.navigate;
    this.communityKey = this.props.navigation.state.params.communityKey;
    this.state = {
      communityDetails: {},
      posts: [],
      loaded: false,
      hasPosts: true,
      refreshing: false,
      communityKey: "",
      roomsModalVisible: false,
      roomOverviewModalVisible: false,
      roomMembersModalVisible: false,
      selectedRoom: {},
    };
  }

  setRoomsModalVisible(visible) {
    this.setState({ roomsModalVisible: visible });
  }

  setRoomOverviewModalVisible = (visible, room) => {
    this.setState({
      roomOverviewModalVisible: visible,
      selectedRoom: room,
    });
  };

  setRoomMembersModalVisible = (visible, room) => {
    this.setState({ roomMembersModalVisible: visible, selectedRoom: room });
  };

  setVisibilityOffRoomMembers = () => {
    this.setState({
      roomOverviewModalVisible: false,
      roomsModalVisible: false,
      roomMembersModalVisible: false,
    });
  };

  setVisibilityOffRoomOverview = () => {
    this.setState({
      roomOverviewModalVisible: false,
      roomsModalVisible: false,
    });
  };

  componentDidMount() {
    let { communityKey } = this.props.navigation.state.params;
    this.setState({ communityKey });
    listenForPosts(
      true,
      this.updatePosts,
      this.communityKey,
      "",
      this.changehasPostsState,
      this.uuid
    );
    this.getCommunityDetails();
  }

  refreshScrollView() {
    this.setState({ refreshing: true });
    listenForPosts(
      true,
      this.updatePosts,
      this.communityKey,
      "",
      this.changehasPostsState,
      this.uuid
    ).then(() => {
      this.setState({ refreshing: false });
    });
  }

  updatePosts = (value) => {
    this.setState({ posts: value, loaded: true });
    console.log("this.state.posts ", this.state.posts);
  };

  changehasPostsState = () => {
    this.setState({ hasPosts: false });
  };

  getCommunityDetails = () => {
    let communityDetails = {};
    firebase
      .database()
      .ref(`communities/${this.communityKey}/`)
      .once("value", (snap) => {
        if (snap != null) {
          communityDetails = {
            cover: snap.val().cover,
            avatar: snap.val().avatar,
            name: snap.val().name,
            description: snap.val().description,
          };
        }
      });
    this.setState({ communityDetails });
  };

  clearPosts = (postKey) => {
    const filteredPosts = this.state.posts.filter(
      (item) => item.postKey !== postKey
    );
    //console.log(" filteredPosts :-", filteredPosts);
    this.setState({ posts: filteredPosts });
  };

  navToEditCommunity = () => {
    this.navigate("EditCommunity", {
      communityDetails: this.state.communityDetails,
      communityKey: this.state.communityKey,
    });
  };

  render() {
    return (
      <View style={{ marginTop: StatusBar.currentHeight, flex: 1 }}>
        <SlideModal
          closeModal={() => this.setState({ roomsModalVisible: false })}
          modalVisible={this.state.roomsModalVisible}
          setModalVisible={() => {
            this.setRoomsModalVisible(false);
          }}
        >
          <RoomsList
            setRoomOverviewModalVisible={this.setRoomOverviewModalVisible}
            commumityName={this.state.communityDetails.name}
            communityKey={this.state.communityKey}
            onPress={() => {
              this.props.navigation.navigate("CreateRoom", {
                communityKey: this.state.communityKey,
              });
              this.setState({ roomsModalVisible: false });
            }}
          />
        </SlideModal>

        <SlideModal
          closeModal={() => this.setState({ roomOverviewModalVisible: false })}
          modalVisible={this.state.roomOverviewModalVisible}
          setModalVisible={() => {
            this.setRoomOverviewModalVisible(false);
          }}
        >
          <RoomOverview
            setRoomMembersModalVisible={this.setRoomMembersModalVisible}
            closeModals={() => this.setVisibilityOffRoomOverview()}
            navigate={this.navigate}
            communityKey={this.state.communityKey}
            selectedRoom={this.state.selectedRoom}
          />
        </SlideModal>

        <SlideModal
          closeModal={() => this.setState({ roomMembersModalVisible: false })}
          modalVisible={this.state.roomMembersModalVisible}
          setModalVisible={() => this.setRoomMembersModalVisible(false)}
        >
          <RoomMembers
            closeModal={() => this.setState({ roomMembersModalVisible: false })}
            navigate={this.navigate}
            communityKey={this.state.communityKey}
            roomKey={this.state.selectedRoom}
            selectedRoom={this.state.selectedRoom}
          />
        </SlideModal>

        <MiddleFloatingIcon
          icon="md-list"
          type="ionicon"
          onPress={
            () => this.setRoomsModalVisible(!this.state.roomsModalVisible)
            // this.navigate("CommunityRooms", { communityKey: this.communityKey })
          }
        />

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.refreshScrollView()}
            />
          }
        >
          <View style={{ marginBottom: 10 }}>
            <ImageBackground
              source={{ uri: this.state.communityDetails.cover }}
              style={styles.cover}
            >
              <View style={styles.coverIcon}>
                <PopMenu
                  item1="Members"
                  onPress1={() =>
                    this.navigate("CommunityMembers", {
                      communityKey: this.communityKey,
                    })
                  }
                  item2="Leave"
                  onPress2={() => {
                    leaveCommunityAction(this.communityKey, this.navigate);
                  }}
                />
              </View>
            </ImageBackground>

            <View style={{ flexDirection: "row" }}>
              <View style={styles.profilePic}>
                <Avatar
                  uri={this.state.communityDetails.avatar}
                  width={90}
                  height={90}
                  borderWidth={2}
                  borderColor="#FFF"
                />
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.name}>
                  {this.state.communityDetails.name}
                </Text>
                <Text style={styles.description}>
                  {this.state.communityDetails.description}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => this.navToEditCommunity()}
                style={styles.editCommunity}
              >
                <Icon
                  name="edit"
                  type="feather"
                  color={secondColor}
                  size={27}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* <Divider style={{ backgroundColor: '#AAA', marginBottom: 20 }} /> */}
          <View style={{ padding: 13 }}>
            <RenderPosts
              loaded={this.state.loaded}
              hasCommunities={true}
              hasPosts={this.state.hasPosts}
              clearPosts={this.clearPosts}
              posts={this.state.posts}
              navigation={this.props.navigation}
              secBtnRoute={""}
              headingFromCommunity={true}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
