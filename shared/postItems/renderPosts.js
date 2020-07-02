import React from 'react'
import { View, ActivityIndicator, FlatList } from 'react-native'

import TouchableButton from '../TouchableButton'
import PostElements from '../PostElements'
import styles from './postStyles';

 function RenderPosts({ loaded, hasCommunities, hasPosts, 
    clearPosts, posts, navigation , secBtnRoute ,headingFromCommunity }) {
    return (
        <View>
            {
                loaded ?
                    hasCommunities ?
                        hasPosts ?
                            <FlatList
                                data={posts}
                                renderItem={({ item }) =>
                                    <PostElements
                                        item={item}
                                        navigation={navigation}
                                        keyExtractor={(item) => item.postKey}
                                        clearPosts={clearPosts}
                                        calledInCommunity={false}
                                        headingFromCommunity={headingFromCommunity}
                                    />}
                                keyExtractor={item => item.postKey}
                            />
                            : <TouchableButton btnStyleType={styles.icon}
                                btnFunction={() =>
                                    navigation.navigate('CreatePost',
                                     { headingFromCommunity: headingFromCommunity })
                                }
                                txt={true} icon={true} name='plus' type='font-awesome' size={30}
                                color={'blue'} txtValue={'Add your first Post'}
                                txtStyleType={{ margin: 10 , fontsize: 16 }} />

                        : <TouchableButton btnStyleType={styles.icon}
                            btnFunction={() => navigate.navigate(secBtnRoute)}
                            txt={true} icon={true} name='plus' type='font-awesome' size={30}
                            color={'blue'} txtValue={'Join your first Community!'}
                            txtStyleType={{ margin: 10 }} />

                    : <ActivityIndicator size="large" color="blue" style={{ paddingTop: 275 }} />
            }
        </View>
    )
}

export default RenderPosts