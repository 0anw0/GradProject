import React from 'react'
import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import { SliderBox } from "react-native-image-slider-box";
import styles from './postStyles';


export function PostBody({ communities, postText, postImages,
    calledInCommunity, navigate, setCommunityModalVisible }) {
    let communityInfo = communities
    if (communityInfo) {
        return (
            <View>
                <TouchableOpacity
                    onPress={
                        !calledInCommunity ?
                            communities.length > 1 ? setCommunityModalVisible :
                                () => {
                                    navigate('CommunityOverview',
                                        { communityKey: communityInfo[0].key })
                                } : null
                    }>
                    {postText ? (
                        <Text style={styles.postText}>{postText}</Text>
                    ) : (<View style={{ marginBottom: 10 }} />)}

                    {postImages ?
                        <SliderBox
                            images={postImages}
                            parentWidth={Dimensions.get('window').width * 1}
                        /> : null}
                </TouchableOpacity>
            </View >
        )
    }
    else return null
}