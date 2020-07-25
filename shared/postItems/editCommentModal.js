import React , {useState } from 'react'
import { View, Modal, TouchableOpacity, Text ,TextInput} from 'react-native'
import { Icon } from 'react-native-elements'
import { editCommentFn } from './editComment'
import styles  from './postStyles';

export function EditCommentModal({ editCommentModalVisible , setEditCommentModalUnVisible 
    ,pickImage  , postKey , editCommentModalVisibleOff , editComment , editCommentKey }) {
    
    let [editCommentTxt , setEditCommentTxt] = useState(editComment)

    return (
        <Modal
            animationType="slide"
            visible={editCommentModalVisible}
            presentationStyle="formSheet "
            onRequestClose={setEditCommentModalUnVisible}
        >
            <View style={{ backgroundColor: '#000000D9', flex: 1 }}>
                <View style={styles.commentsContainer}>
                    <View style={styles.postContainer}>
                        <TextInput style={styles.post}
                            placeholderTextColor='#888'
                            autoCapitalize="none"
                            value={editCommentTxt}
                            multiline={true}
                            numberOfLines={1}
                            onChangeText={editCommentTxt => setEditCommentTxt(editCommentTxt)} />
                    </View>
                    <View style={styles.iconsContainer}>
                        <TouchableOpacity style={styles.icon} onPress={pickImage}>
                            <Icon name='picture-o' type='font-awesome' size={25} color='#555' />
                        </TouchableOpacity>
                        <View style={styles.iconSeparator}></View>
                        <TouchableOpacity style={styles.icon}>
                            <Icon name='camera' type='font-awesome' size={25} color='#555' />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.submitBtn} 
                    onPress={() => 
                        editCommentFn(postKey ,editCommentTxt, editCommentKey ,editCommentModalVisibleOff)}>
                        <Text style={styles.submitBtnTxt}>EDIT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal >
    )
}