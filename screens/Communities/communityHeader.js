import React, { useState } from 'react'
import { View, TouchableOpacity, ImageBackground, TextInput, Dimensions } from 'react-native';
import { Avatar } from 'react-native-elements';

import styles from "./communityStyles";

export function CommunityHeader({ pickCover, pickAvatar, setCommDescState,
    commCover, commAvatar, commDesc, commName, setCommNameState }) {

    let [commNameTxt, setCommName] = useState(commName)
    let [commDescTxt, setCommDesc] = useState(commDesc)

    return (
        <View>
            <TouchableOpacity onPress={pickCover}>
                <ImageBackground
                    source={{ uri: commCover }}
                    style={styles.cover}>
                </ImageBackground>
            </TouchableOpacity>
            <View style={{ flexDirection:'row'}}>
                <View style={styles.profilePic}>
                    <TouchableOpacity onPress={pickAvatar}>
                        <Avatar
                            showEditButton
                            rounded
                            size={100}
                            source={{ uri: commAvatar }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ paddingHorizontal: 10, paddingVertical: 5 ,
                width: Dimensions.get('window').width * 0.72}}>

                    <TextInput
                        style={styles.communityNameTxtInput}
                        placeholder="Community Name"
                        autoCapitalize="none"
                        value={commNameTxt}
                        onChangeText={(commNameTxt) => {
                            setCommName(commNameTxt)
                            setCommNameState(commNameTxt)
                        }}
                    />
                    <TextInput
                        style={styles.communityDisTxtInput}
                        placeholder="Community Description"
                        autoCapitalize="none"
                        multiline={true}
                        value={commDescTxt}
                        onChangeText={(commDescTxt) => {
                            setCommDesc(commDescTxt)
                            setCommDescState(commDescTxt)
                        }}
                    />
                </View>
            </View>
        </View>
    )
}
