import React, { useState } from "react";
import { View, Dimensions, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Icon } from 'react-native-elements';

import styles from "./bubbleStyles";

function Reply({ name, reply, uuid, creator }) {
    return (
        <View style={{
            flexDirection: 'row', alignItems: 'center'
            , borderWidth: 1, margin: 3, borderRadius: 3, padding: 8
        }}>
            <View>
                <Text style={{ fontSize: 12 }}>{name}</Text>
                <Text style={{ fontWeight: 'bold' }}>{reply}</Text>
            </View>
            <Icon name={creator == uuid ? 'trash' : 'eye-slash'}
                type='font-awesome' size={22} color='#555' iconStyle={styles.rightCommentIcon} />

        </View>
    )
}

function RenderReplies({ replies, addReply, uuid }) {
    
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
                    addReply(Txt)
                    setTxt('')
                }}>
                    <Icon name='paper-plane'
                        type='font-awesome' size={22} color='#555' />
                </TouchableOpacity>
            </View>
            <ScrollView>
                {
                    replies.map(child =>
                        <Reply
                            name={child.name}
                            reply={child.reply}
                            uuid={uuid}
                            creator={child.created} />
                    )
                }
            </ScrollView>
        </View>
    )
}

export default RenderReplies