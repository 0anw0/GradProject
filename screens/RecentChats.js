
import React from 'react';
import { Text, View, StatusBar, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import * as firebase from 'firebase'

import { firebaseConfig } from "../services/firebaseConfig";
import { ChatHeader } from "./RecentChats/chatHeader"
import Header from '../shared/Header'
import Tab from "../shared/TabBar";

console.disableYellowBox = true

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = firebase.database()

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.navigate = this.props.navigation.navigate
    this.state = {
      chats: [], //store chats messages
      Messages: [],// do nothing
      list: [], //retrieve rooms addresses from users' data
      flag1: false, //makes sure that app will retrieve only one msg from chat
      hiddenChats: false,
      hiddenList: [],
      ShowHiddenList: false
    }
  }

  HiddenListOpt = () => {
    this.setState(prevState => ({
      ShowHiddenList: !prevState.ShowHiddenList
    }))
  }

  ShowChat = (roomKey) => {//update chat in database
    if (this.state.hiddenList.length == 0) this.setState({ hiddenChats: false })
    let hiddenList = this.state.hiddenList
    hiddenList.forEach(child => {
      if (child.roomKey == roomKey) {
        db.ref(child.address).update({
          hidden: false
        })
      } else {
        db.ref(child.address).update({
          hidden: true
        })
      }
      this.getChats(this.state.list)
    })
  }

  componentDidMount() {

    let address = `Users/user1/joined/communities/community_1/joined/rooms/` //address of personal Logs of user
    let list = [] //will contain the addresses of each room chat fetched from log
    db.ref(address).on('value', snap => {
      snap.forEach(child => {
        list.push({
          room_route: child.val(), //addresses of different rooms/chats
        })
      })
      this.setState({ list })
    })
    this.getChats(list)
  }

  getChats(list) {
    let hiddenCh = []
    let chats = [] //each object will contain messages of a chat. array contains all messages
    list.forEach(element => {
      //enters each chat/room through address
      let hidden, id = ''
      db.ref('/' + element.room_route + '/hidden').on('value', snap => { hidden = snap.val() })
      db.ref('/' + element.room_route + '/id').on('value', snap => { id = snap.val() })
      db.ref('/' + element.room_route).on('value', snap => {
        let temp = element.room_route.split('/')//سباكه .. بجيب بيها اسم ال chat
        let chatName = temp[2] // index of the folder in the firebase, change it depending on database
        let timestamp = 0
        let flag1 = false
        //this.latestTimestamp(child, chatName, timestamp, flag1) // where i compare messages' timestamps. and only stores one
        snap.forEach(child => {
          if (!hidden) {
            if (timestamp <= child.val().timestamp) {
              timestamp = child.val().timestamps
              if (flag1) chats.pop()
              chats.push({ // pushing choosing message to the array.
                key: child.key,
                content: child.val().content,
                timestamp: child.val().timestamp,
                uri: child.val().uri,
                senderId: child.val().senderId,
                chatName: chatName,
                uri: child.val().uri,
                hidden: hidden,
                id: id,
                address: element.room_route
              })
              flag1 = true
            }
          }

          else {
            this.setState({ hiddenChats: true })
            if (timestamp <= child.val().timestamp) {
              timestamp = child.val().timestamps
              if (flag1) chats.pop()
              hiddenCh.push({ // pushing choosing message to the array.
                key: child.key,
                content: child.val().content,
                timestamp: child.val().timestamp,
                uri: child.val().uri,
                senderId: child.val().senderId,
                chatName: chatName,
                uri: child.val().uri,
                hidden: hidden,
                id: id,
                address: element.room_route
              })
              flag1 = true
            }
          }
        })
        this.setState({ chats: chats, hiddenList: hiddenCh })
      })
    })
    chats.sort(this.compareValues('timestamp', 'desc'))// sort arrays with messages by its timestamps
  }

  compareValues(key, order = 'asc') { //Object sorting function
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }

      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  render() {
    return (
      <View style={{ marginTop: StatusBar.currentHeight, flex: 1 }}>
        <Header
          center
          title='Recent Chat'
        />
        <ScrollView style={{
          backgroundColor: 'white',
          flex: 1, padding: 10
        }}>
          <View style={{ backgroundColor: '#d6f1ff', borderRadius: 15, margin: 5 }}>
            <FlatList
              data={this.state.chats}
              renderItem={({ item }) => (
                <ChatHeader
                  sender={item.senderId}
                  content={item.content}
                  timestamp={item.timestamp}
                  chatName={item.chatName}
                  uri={item.uri}
                  HideChat={this.HideChat}
                  id={item.id}
                  hidden={item.hidden}
                  ShowChat={this.ShowChat}
                />
              )} />
          </View>
          <View>
            <TouchableOpacity onPress={this.HiddenListOpt}>
              {
                this.state.hiddenChats ?
                  <Text style={{ paddingLeft: 10, fontWeight: 'bold', color: 'grey' }}> Hidden({this.state.hiddenList.length}) </Text>
                  : <Text></Text>
              }
            </TouchableOpacity>
          </View>
          {
            this.state.ShowHiddenList ?
              <View style={{ backgroundColor: '#d1d1d1', borderRadius: 15, margin: 5 }}>

                <FlatList
                  data={this.state.hiddenList}
                  renderItem={({ item }) => (
                    <Comp
                      sender={item.senderId}
                      content={item.content}
                      timestamp={item.timestamp}
                      chatName={item.chatName}
                      uri={item.uri}
                      HideChat={this.HideChat}
                      id={item.id}
                      hidden={item.hidden}
                      ShowChat={this.ShowChat}
                    />
                  )}
                />

              </View> : null
          }

        </ScrollView>
        <Tab active="newsfeed" navigation={this.props.navigation} />

      </View>
    )
  }
}