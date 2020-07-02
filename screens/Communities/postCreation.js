import React, { useState } from 'react'
import { View, Dimensions, TextInput } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";

import styles from '../../shared/postItems/createPostStyles'
import Header from '../../shared/Header'
import { secondColor } from '../../shared/constants'
import ChooseCommunities from './chooseCommunities'
import TouchableButton from '../../shared/TouchableButton'


export function PostCreation({
    postTxt, setPostTxtState, pickImage, takePhoto,
    submit, postImg, headingFromCommunity, setPickedCommunitiesState }) {

    let [ postText, setPostText ] = useState(postTxt)

    return (
        <View>
            <Header title="New Post .." />
            <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>

                <View style={styles.postContainer}>
                    <TextInput style={styles.post}
                        placeholder="Type something ... "
                        placeholderTextColor='#888'
                        autoCapitalize="none"
                        value={postText}
                        multiline={true}
                        numberOfLines={3}
                        onChangeText={(postText) => {
                            setPostTxtState(postText)
                            setPostText(postText)
                        }} />
                </View>

                <View style={[styles.iconsContainer,{marginBottom:10}]}>
                    <TouchableButton btnStyleType={styles.icon} btnFunction={takePhoto} icon={true}
                        name={'camera'} type={'font-awesome'} size={25} color={secondColor} />
                    <View style={styles.iconSeparator}></View>

                    <TouchableButton btnStyleType={styles.icon} btnFunction={pickImage}
                        txt={false} icon={true} name='plus' type='font-awesome' size={30}
                        color={secondColor} />
                </View>

                {postImg ?
                    <SliderBox
                        images={postImg}
                        parentWidth={Dimensions.get('window').width * .90}
                    /> : null}

                {!headingFromCommunity ?
                    <ChooseCommunities
                        headingFromCommunity={headingFromCommunity}
                        setPickedCommunitiesState={setPickedCommunitiesState} />
                    :
                    null}

                <TouchableButton btnStyleType={styles.submitBtn} btnFunction={submit}
                    txt={true} txtStyleType={styles.submitBtnTxt} txtValue={'SUBMIT'} />
            </View>
        </View>

    )
}
