import React, { useState } from 'react'
import { View, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import { Avatar } from 'react-native-elements';

import styles from "./communityStyles";

export function CommunityHeader({ pickCover, pickAvatar, setCommDescState,
    commCover,commAvatar, commDesc, commName, setCommNameState }) {

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
            <View style={styles.profilePic}>
                <TouchableOpacity onPress={pickAvatar}>
                    <Avatar
                        editButton
                        rounded
                        size={130}
                        source={{ uri: commAvatar }}
                    />
                </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>

                <TextInput
                    style={styles.communityNameTxtInput}
                    placeholder="Enter Community Name"
                    autoCapitalize="none"
                    value={commNameTxt}
                    onChangeText={(commNameTxt) => {
                        setCommName(commNameTxt)
                        setCommNameState(commNameTxt)
                    }}
                />
                <TextInput
                    style={styles.communityDisTxtInput}
                    placeholder="Enter Community Description"
                    autoCapitalize="none"
                    value={commDescTxt}
                    onChangeText={(commDescTxt) => {
                        setCommDesc(commDescTxt)
                        setCommDescState(commDescTxt)
                    }}
                />

            </View>
        </View>
    )
}
