import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, StatusBar, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import * as firebase from 'firebase'

import { firebaseConfig } from "../../services/firebaseConfig";
import { secondColor } from '../../shared/constants'
import { _launchCameraRoll, _takePhoto } from './../../services/CameraAPI'
import styles from '../../shared/postItems/editPostStyles'

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default class EditPost extends React.Component {
    state = {
        postTxt: '',
        postImages: '',
        postKey: '',
        headingFrom: '',

        imgPicked: false,
        postExist: false
    }

    componentDidMount() {
        let { postTxt, postImages, postKey, headingFrom } = this.props.navigation.state.params
        this.setState({ postTxt, postImages, postKey, headingFrom })
    }


    edit = () => {
        firebase.database().ref(`posts/${this.state.postKey}/text`).set(this.state.postTxt)

        if (this.state.headingFrom == 'NewsFeed')
            this.props.navigation.navigate('NewsFeed', {
                returnFromEditPost: true,
                postKey: this.state.postKey,
                postTxt: this.state.postTxt,
                postImages: this.state.postImages
            })

        else if (this.state.headingFrom == 'CommunityOverView') {
            this.props.navigation.navigate('CommunityOverView',
                { communityKey: this.props.navigation.getParam("communityKey") })
        }
    }

    render() {
        return (
            <View style={{ paddingHorizontal: 20, paddingVertical: 20, marginTop: StatusBar.currentHeight }}>
                <View style={styles.postContainer}>
                    <TextInput style={styles.post}
                        placeholder="Type something ... "
                        placeholderTextColor='#888'
                        autoCapitalize="none"
                        value={this.state.postTxt}
                        multiline={true}
                        numberOfLines={3}
                        onChangeText={postTxt => this.setState({ postTxt })} />

                </View>
                {this.state.imgPicked &&
                    <View>
                        <Text>pick</Text>
                        <Image source={{ uri: this.state.postImg }} />
                    </View>
                }
                <View style={styles.iconsContainer}>
                    <TouchableOpacity style={styles.icon} onPress={this.pickImage}>
                        <Icon name='picture-o' type='font-awesome' size={25} color={secondColor} />
                    </TouchableOpacity>
                    <View style={styles.iconSeparator}></View>
                    <TouchableOpacity style={styles.icon}>
                        <Icon name='camera' type='font-awesome' size={25} color={secondColor} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.submitBtn} onPress={this.edit}>
                    <Text style={styles.submitBtnTxt}>Edit</Text>
                </TouchableOpacity>
                <FlatList
                    style={{ marginTop: 20, }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={this.state.postImages}
                    //keyExtractor={(item) => item.key}
                    renderItem={({ item }) =>
                        <TouchableOpacity>
                            <Image source={{ uri: item }} style={{ marginHorizontal: 5, borderRadius: 5, width: 80, height: 80, borderWidth: 0.5, borderColor: secondColor }} />
                        </TouchableOpacity>
                    }
                />
            </View>
        );
    }
}
