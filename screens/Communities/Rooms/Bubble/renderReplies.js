import React, { useState } from "react";
import { View, Dimensions, Text, TextInput, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { Icon } from 'react-native-elements';

import { deleteReply } from './del-hide-reply'
import styles from "./bubbleStyles";

function Reply({
    name, reply, creator, replyKey, uuid, updateReply,
    communityKey, roomKey, bubbleKey, decreaseReplyNum }) {

    //console.log('reply', communityKey, roomKey, bubbleKey, replyKey)

    return (
        <View style={{
            flexDirection: 'row', alignItems: 'center'
            , borderWidth: 1, margin: 3, borderRadius: 3, padding: 8
        }}>
            <View>
                <Text style={{ fontSize: 12 }}>{name}</Text>
                <Text style={{ fontWeight: 'bold' }}>{reply}</Text>
            </View>
            <TouchableOpacity onPress={creator == uuid ?
                () => {
                    deleteReply(communityKey, roomKey, bubbleKey,
                        replyKey, updateReply, decreaseReplyNum)
                }
                : () => { hideReply(bubbleKey, replyKey, uuid) }}>
                <Icon name={creator == uuid ? 'trash' : 'eye-slash'}
                    type='font-awesome' size={22} color='#555' iconStyle={styles.rightCommentIcon} />
            </TouchableOpacity>
        </View>
    )
}

function RenderReplies({
    replies, uuid, uploadReply, updateReply, bubbleKey, roomKey, communityKey, decreaseReplyNum }) {

    let [Txt, setTxt] = useState('')
    return (
        <View style={styles.replySection}>
            <View style={{
                flexDirection: 'row', alignItems: 'center'
                , borderWidth: 1, borderRadius: 4
            }}>
                <View style={{ width: Dimensions.get('window').width * 0.64 }}>
                    <TextInput
                        style={{ paddingLeft: 10 }}
                        placeholder="Type something ... "
                        placeholderTextColor='#888'
                        value={Txt}
                        onChangeText={(Txt) => { setTxt(Txt) }} />
                </View>
                <TouchableOpacity onPress={() => {
                    uploadReply(Txt)
                    setTxt('')
                }}>
                    <Icon name='paper-plane' type='font-awesome' size={22} color='#555' />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <FlatList
                    data={replies}
                    renderItem={({ item }) =>
                        <Reply
                            name={item.name}
                            reply={item.replyTxt}
                            creator={item.creator}
                            replyKey={item.replyKey}

                            uuid={uuid}

                            updateReply={updateReply}
                            decreaseReplyNum={decreaseReplyNum}
                            communityKey={communityKey}
                            bubbleKey={bubbleKey}
                            roomKey={roomKey}
                        />}
                />

            </ScrollView>
        </View>
    )
}

export default RenderReplies