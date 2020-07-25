import React from 'react';
import {
    View, KeyboardAvoidingView, Text, FlatList, TouchableOpacity,
    Button, ScrollView, ActivityIndicator
} from 'react-native'
import * as firebase from 'firebase'

console.disableYellowBox = true;

export default class SecondPageLaunch extends React.Component {
    constructor() {
        super();
        this.state = {
            botName: '',
            Type: '',
            premissions: [],
            userPremissions: [],
            counter: 0,
            MiniPremissions: true,
            retrieved: false
        }
    }

    componentDidMount() {
        let address = `AppPresets/InfoBot`
        let premissions = []
        firebase.database().ref(address).on('value', snap => {
            snap.forEach(child => {
                premissions.push({
                    key: child.key,
                    selected: false,
                    id: child.val().id,
                    title: child.val().title
                })
            })
            this.setState({ premissions: premissions, retrieved: true })
        })
    }

    toggleErrorFlag() {
        if (this.state.counter >= 3) {
            this.setState({ MiniPremissions: false })
        }
        else {
            this.setState({ MiniPremissions: true })
        }
    }

    choosePremission(premItem, selected) {
        if (selected) {
            this.setState(prevState => ({
                counter: prevState.counter + 1
            }))
        } else {
            this.setState(prevState => ({
                counter: prevState.counter - 1
            }))
        }
        this.toggleErrorFlag()

        let prem = this.state.premissions, filteredPrem = []
        for (const child in prem) {
            if (premItem.key == prem[child].key) {
                filteredPrem.push({
                    id: premItem.id,
                    key: premItem.key,
                    selected: selected,
                    title: premItem.title
                })
            }
            else filteredPrem.push(prem[child])
        }
        this.setState({
            premissions: filteredPrem
        })
    }

    handleBotLaunching = () => {
        let guaranteedPremissions = []
        this.state.premissions.forEach(
            child => {
                if (child.selected == true) {
                    guaranteedPremissions.push({ [child.title]: true })
                }
            }
        )

        let { botName, Type, communityKey, roomKey, avatar } = this.props.navigation.state.params

        this.establishBot(botName, Type, guaranteedPremissions, communityKey, roomKey, avatar)
        const { navigate } = this.props.navigation;
        navigate('botDirector')
    }

    establishBot(name, Type, guaranteedPremissions, communityKey, roomKey, avatar) {
        firebase.database().ref(`Bots/`).push({
            name, Type, guaranteedPremissions, botAvatar: avatar
        }).then((res)=> {
        firebase.database().ref(`rooms/${communityKey}/${roomKey}/Bots/`).push({
            botKey:res.key
            })
        }).catch((error) => {
            console.log('error ', error)
        })
    }

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' enabled>
                <Text style={{
                    marginLeft: 30, marginRight: 30, marginTop: 30
                }} >BOT Premissions</Text>
                <ScrollView style={{
                    marginLeft: 30, marginRight: 30,
                    borderWidth: 1, padding: 5, height: 250
                }}>
                    {this.state.retrieved ?
                        <FlatList
                            data={this.state.premissions}
                            keyExtractor={(item) => item.key}
                            renderItem={({ item }) =>
                                <View style={{
                                    backgroundColor: item.selected ? '#add8e6' : '#FFFF99', margin: 3
                                }}>
                                    <TouchableOpacity onPress={() => {
                                        item.selected ? this.choosePremission(item, false)
                                            : this.choosePremission(item, true)
                                    }}>
                                        <Text style={{ fontSize: 16, letterSpacing: 1 }}>
                                            {item.key}</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        />
                        :
                        <ActivityIndicator size='large' collor='red' style={{ padding: 100 }} />}
                </ScrollView>

                <View style={{ padding: 60, width: 200, marginLeft: 100 }}>
                    <Button
                        onPress={this.handleBotLaunching}
                        disabled={this.state.MiniPremissions}
                        title='Launch' />
                </View>

            </KeyboardAvoidingView>
        )
    }
}

