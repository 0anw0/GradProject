import React from 'react';
import {
    View, StatusBar, RefreshControl, FlatList, ScrollView, 
} from 'react-native'
import * as firebase from 'firebase'

import TouchableButton from '../../../../shared/TouchableButton'
import Header from '../../../../shared/Header'
import { styles } from './botStyles'
import Bot from './bot'

console.disableYellowBox = true;

export default class BotDirector extends React.Component {
    constructor(props) {
        super(props);
        this.navigate = this.props.navigation.navigate

        this.state = {
            noBot: true,
            communityKey: '',
            roomKey: '',
            currentBot: [],
            loaded: false,
            refreshing: false
        }
    }
    componentDidMount() {
        this.getRoomsBot()
    }

    async refreshScrollView() {
        this.setState({ refreshing: true })
        await this.getRoomsBot().then(() => {
            this.setState({ refreshing: false })
        })
    }

    async getRoomsBot() {
        let currentBot = []
        let { communityKey, roomKey } = this.props.navigation.state.params
        firebase.database().ref(`rooms/${communityKey}/${roomKey}/Bots`)
            .on(`value`, snap => {
                snap.forEach(child => {
                    firebase.database().ref(`Bots/${child.val().botKey}`)
                        .on('value', data => {
                            currentBot.push({
                                name: data.val().name,
                                type: data.val().Type,
                                botAvatar: data.val().botAvatar,
                                botKey: child.val().botKey
                            })
                        })
                })
            })

        this.setState({
            communityKey, roomKey,
            loaded: true, currentBot: currentBot
        })
    }

    render() {
        return (
            <View style={{ paddingTop: StatusBar.currentHeight }}>
                <Header title='Bot Lobby' />
                <ScrollView>
                    <View style={styles.MainContainer}>

                        {this.state.loaded ?
                            <FlatList
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.refreshing}
                                        onRefresh={() => this.refreshScrollView()} />}
                                data={this.state.currentBot}
                                renderItem={({ item }) =>
                                    <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>

                                        <Bot
                                            name={item.name}
                                            type={item.type}
                                            botAvatar={item.botAvatar}
                                            navigate={this.navigate}
                                            communityKey={this.state.communityKey}
                                            roomKey={this.state.roomKey}
                                            botKey={item.botKey}
                                        />
                                    </View>
                                }
                                numColumns={2}
                            />
                            : null}

                        <TouchableButton btnStyleType={{ margin: 15 }}
                            btnFunction={() => this.navigate('launchBot', {
                                communityKey: this.state.communityKey, roomKey: this.state.roomKey
                            })}
                            txt={true} icon={true} name='plus' type='font-awesome' size={30}
                            color={'blue'} txtValue={'Launch a new Bot!'}
                            txtStyleType={{ margin: 10 }} />
                    </View>
                </ScrollView>
            </View>
        )
    }
}
