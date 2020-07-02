import React from 'react'
import { View, FlatList, Modal, TouchableOpacity, Text } from 'react-native'
import styles from './postStyles';

export function CommunityModal({ communityModalVisible, setCommunityModalUnVisible,
    communities }) {
    return (
        <Modal
            animationType="slide"
            visible={communityModalVisible}
            presentationStyle="formSheet "
            onRequestClose={()=>setCommunityModalUnVisible(false, false, '')}
        >

            <View style={{ backgroundColor: '#000000D9', flex: 1 }}>
                <View style={styles.commentsContainer}>
                    {communities.map(item =>
                        <TouchableOpacity onPress={
                            ()=> setCommunityModalUnVisible(false, true, item.key)
                        }
                            style={{
                                padding: 5, margin: 5, borderWidth: 2,
                                borderRadius: 5, fontSize: 12, fontWeight: 'bold'
                            }}>
                            <Text >
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>

        </Modal>
    )
}
