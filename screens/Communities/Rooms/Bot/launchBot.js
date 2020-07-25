import React from 'react';
import {
  View, TextInput, Text, ActivityIndicator,
  FlatList, Picker, Button, ScrollView, TouchableOpacity, StatusBar
} from 'react-native'
import { Avatar } from 'react-native-elements';

import * as firebase from "firebase";

import { _launchCameraRoll, _takePhoto } from '../../../../services/CameraAPI'

console.disableYellowBox = true;

function Item({ name, desc }) {
  return (
    <View style={{
      margin: 2, borderWidth: 1, padding: 5,
      backgroundColor: '#d4ebff', borderColor: '#'
    }}>
      <Text style={{ color: 'blue' }}>{name}</Text>
      <Text style={{ color: 'grey' }}>{desc}</Text>
    </View>
  );
}

export default class LaunchBot extends React.Component {
  constructor() {
    super();
    this.state = {
      botName: '',
      Type: 'infoBot',
      emptyNameError: true,
      list: [],
      retrieved: false,
      botAvatar: 'http://placehold.it/130'
    }
  }

  componentDidMount() {
    this.listCommands()
  }

  listCommands() {
    let address = `AppPresets/InfoBot`
    let list = []
    firebase.database().ref(address).on('value', snap => {
      snap.forEach(child => {
        list.push({
          name: child.key,
          desc: child.val().desc
        })
      })
      this.setState({ list: list, retrieved: true })
    })
  }

  handleNavigating = () => {
    const { navigate } = this.props.navigation
    let { communityKey, roomKey } = this.props.navigation.state.params

    navigate('SecondPageLaunch', {
      botName: this.state.botName,
      Type: this.state.Type, communityKey:
        communityKey, roomKey: roomKey,
      avatar: this.state.botAvatar
    })
  }

  toggleErrorFlag(name) {
    if (name.length >= 3) {
      this.setState({ emptyNameError: false })
    }
    else {
      this.setState({ emptyNameError: true })
    }
  }

  pickAvatar = () => {
    let promObject = _launchCameraRoll()
    promObject.then(res => {
      res.url.then(res => {
        this.setState({ botAvatar: res })
      })
    })
  }


  handleBotName = (name) => {
    this.setState({ botName: name })
    this.toggleErrorFlag(name)
  }

  render() {
    return (
      <View style={{ paddingTop: StatusBar.currentHeight }}>
        <View>
          <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 20 }} >
            <TouchableOpacity onPress={() => this.pickAvatar()}>
              <Avatar
                editButton
                rounded
                size={100}
                source={{ uri: this.state.botAvatar }}
              />
            </TouchableOpacity>
          </View>
          <Text style={{ marginLeft: 30, marginTop: 15 }}>BOT name</Text>
          <TextInput
            style={{ borderWidth: 1, marginLeft: 30, marginRight: 30 }}
            placeholder='Enter your Bot Name'
            onChangeText={(name) => this.handleBotName(name)}
          />
        </View>
        <Text style={{ marginLeft: 30, marginRight: 30, marginTop: 15 }} >BOT Type</Text>
        <View style={{ marginLeft: 30, marginRight: 30, borderWidth: 1 }}>
          <Picker mode='dropdown'
            selectedValue={this.state.Type}
            onValueChange={(itemValue) => { this.handleBotType(itemValue) }}>

            <Picker.Item label="Info BOT" value="infoBot" />
            <Picker.Item label="Music Bot" value="musicBot" />

          </Picker>
        </View>
        <Text style={{ marginLeft: 30, marginRight: 30, marginTop: 15 }} >BOT Commands</Text>
        <ScrollView style={{
          marginLeft: 30, marginRight: 30,
          borderWidth: 1, padding: 5, height: 240
        }}>
          {this.state.retrieved ?
            <FlatList
              data={this.state.list}
              renderItem={({ item }) => (
                <Item
                  name={item.name}
                  desc={item.desc}
                />
              )}
            /> : <ActivityIndicator size='large' collor='red' style={{ padding: 100 }} />}
        </ScrollView>
        <View style={{ padding: 30, width: 200, marginLeft: 100 }}>
          <Button
            onPress={this.handleNavigating}
            disabled={this.state.emptyNameError}
            title='Next' />
        </View>
      </View>
    )
  }
}