import React from 'react';
import {
    View, Text, StatusBar, ImageBackground, ScrollView, RefreshControl
} from 'react-native'
import * as firebase from "firebase";
import { Avatar } from 'react-native-elements'

import RightFloatingIcon from '../../shared/FloatingIcons/Right'
import LeftFloatingIcon from '../../shared/FloatingIcons/Left'
import listenForPosts from "../../shared/postItems/listenForPosts";
import RenderPosts from '../../shared/postItems/renderPosts'
import leaveCommunityAction from './leaveCommunity'
import PopMenu from '../../shared/PopMenu'
import styles from "./communityStyles";

export default class CommunityOverview extends React.Component {
    constructor(props) {
        super(props);
        this.navigate = this.props.navigation.navigate
        this.communityKey = this.props.navigation.getParam("communityKey")
        this.state = {
            communityDetails: {},
            posts: [],
            loaded: false,
            hasPosts: true,
            refreshing: false,
            communityKey:''
        }
    }

    componentDidMount() {
        let communityKey = this.props.navigation.getParam("communityKey")
        this.setState({communityKey})
        listenForPosts(
            true, this.updatePosts, this.communityKey, '', this.changehasPostsState)
        this.getCommunityDetails()
    }

    refreshScrollView() {
        this.setState({ refreshing: true })
        listenForPosts(
            true, this.updatePosts, this.communityKey, '', this.changehasPostsState)
            .then(() => {
                this.setState({ refreshing: false })
            })
    }

    updatePosts = (value) => {
        this.setState({ posts: value, loaded: true })
        //console.log('this.state.posts ', this.state.posts)
    }

    changehasPostsState = () => {
        this.setState({ hasPosts: false })
    }

    getCommunityDetails = () => {
        let communityDetails = {}
        firebase.database().ref(`communities/${this.communityKey}/`).once('value', snap => {
            communityDetails = {
                cover: snap.val().cover, avatar: snap.val().avatar,
                name: snap.val().name, description: snap.val().description
            }
        })
        this.setState({ communityDetails })
    }

    clearPosts = (postKey) => {
        const filteredPosts = this.state.posts.filter(item => item.postKey !== postKey)
        console.log(" filteredPosts :-", filteredPosts)
        this.setState({ posts: filteredPosts })
    }

    render() {
        return (
            <View style={{ marginTop: StatusBar.currentHeight, flex: 1 }}>
                <RightFloatingIcon
                    icon='md-list' type='ionicon' onPress={
                        () => this.navigate('CommunityRooms', { communityKey: this.communityKey })}
                />

                <LeftFloatingIcon
                    icon='plus' type='entypo'
                    onPress={() => this.navigate('CreatePost',
                        {
                            communityKey: this.communityKey,
                            headingFromCommunity: true,
                            communityName: this.state.communityDetails.name
                        })}
                />

                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => this.refreshScrollView()} />}>
                    <View style={{ marginBottom: 10 }}>

                        <ImageBackground
                            source={{ uri: this.state.communityDetails.cover }} style={styles.cover}>

                            <View style={styles.coverIcon}>
                                <PopMenu
                                    item1='Members' onPress1={() =>
                                        this.navigate('CommunityMembers',
                                            { communityKey: this.communityKey })}
                                    item2='Leave' onPress2={() => {
                                        leaveCommunityAction(this.communityKey, this.navigate)
                                    }}
                                />
                            </View>

                        </ImageBackground>

                        <View style={styles.profilePic}>
                            <Avatar
                                rounded size={130}
                                source={{ uri: this.state.communityDetails.avatar }}
                            />
                        </View>

                        <View style={{ paddingHorizontal: 10, marginTop: 5, marginBottom: 20 }}>
                            <Text style={styles.name}>{this.state.communityDetails.name}</Text>
                            <Text style={styles.description}>
                                {this.state.communityDetails.description}</Text>
                        </View>
                    </View>

                    {/* <Divider style={{ backgroundColor: '#AAA', marginBottom: 20 }} /> */}
                    <RenderPosts
                        loaded={this.state.loaded}
                        hasCommunities={true}
                        hasPosts={this.state.hasPosts}
                        clearPosts={this.clearPosts}
                        posts={this.state.posts}
                        navigation={this.props.navigation}
                        secBtnRoute={''}
                        headingFromCommunity={true}
                    />
                </ScrollView>
            </View>
        );
    }
}
