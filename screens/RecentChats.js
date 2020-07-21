
import React from 'react';
import { Text, View, StatusBar, FlatList, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
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
    this.currentUser = firebase.auth().currentUser.uid
    this.state = {
      recentMessages: [],
      hiddenChats: [],
      hiddenChat: false,
      ShowHiddenList: false
    }
  }

  componentDidMount() {
    this.getUserRoomsKey()
  }

  getUserRoomsKey = () => {
    let list = []
    db.ref(`authenticatedUsers/${this.currentUser}/rooms`)
      .on('value', snap => {
        snap.forEach(child => {
          list.push({ roomKey: child.key, hidden: child.val().hidden })
        })
      })
    this.setState({ list })
    this.getLastestMsgs(list)
  }

  getLastestMsgs = (list) => {
    let recentMessages = [], hiddenChats = []
    list.forEach(element => {
      db.ref(`messages/${element.roomKey}`).orderByChild('timestamp').limitToLast(1)
        .on('value', snap => {
          snap.forEach(child => {
            let obj = {
              msgKey: child.key,
              roomKey: element.roomKey,
              reply: child.val().reply,
              timestamp: child.val().timestamp,
              text: child.val().text,
              user: child.val().user,
              hidden: element.hidden
            }

            if (!element.hidden)
              recentMessages.push(obj)
            else {
              {
                hiddenChats.push(obj)
                this.setState({ hiddenChat: true })
              }
            }
          })
        })
    })

    recentMessages.sort(this.compareValues('timestamp', 'desc'))
    this.setState({ recentMessages, hiddenChats })
  }

  toggleHiddenList = () => {
    this.setState(prevState => ({
      ShowHiddenList: !prevState.ShowHiddenList
    }))
  }

  manageChat = (roomKey, show) => {
    let hiddenChatTemp = [], recentMessagesTemp = []
    if (show) {
      db.ref(`authenticatedUsers/${this.currentUser}/rooms/${roomKey}/`).update(
        { hidden: false }
      )

      this.state.hiddenChats.forEach(
        element => {
          element.hidden = false
          if (element.roomKey == roomKey) {
            this.state.recentMessages.push(element)
          } else {
            hiddenChatTemp.push(element)
          }
        }
      )

      this.setState({ hiddenChats: hiddenChatTemp })
    }
    else {
      db.ref(`authenticatedUsers/${this.currentUser}/rooms/${roomKey}/`).update(
        { hidden: true }
      )

      this.state.recentMessages.forEach(
        element => {
          if (element.roomKey == roomKey) {
            element.hidden = true
            this.state.hiddenChats.push(element)
          } else {
            recentMessagesTemp.push(element)
          }
        }
      )
      this.setState({ recentMessages: recentMessagesTemp })
    }

    this.state.recentMessages.sort(this.compareValues('timestamp', 'desc'))
    this.state.hiddenChats.sort(this.compareValues('timestamp', 'desc'))

    if (this.state.hiddenChats.length == 0) {
      this.setState({ hiddenChat: false })
    } else {
      this.setState({ hiddenChat: true })
    }
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
      <View style={{
        marginTop: StatusBar.currentHeight, flex: 1, backgroundColor: '#f0f2ff'
      }} >
        <Header
          center
          title='Recent Chat'
        />
          <ScrollView>
            <FlatList
              data={this.state.recentMessages}
              renderItem={({ item }) => (
                <ChatHeader
                  item={item}
                  manageChat={this.manageChat}
                  navigate={this.navigate}
                />
              )} />
            <View>
              {
                this.state.hiddenChat ?
                  <TouchableOpacity
                    onPress={() => this.toggleHiddenList()}
                  >
                    <Text style={{
                      fontWeight: 'bold', textAlign: 'center', color: '#0e166360', paddingTop: 3
                    }}>
                      {'hidden Chats (' + this.state.hiddenChats.length + ')'}
                    </Text>
                  </TouchableOpacity>
                  : null
              }
            </View>
            {
              this.state.ShowHiddenList ?
                <FlatList
                  data={this.state.hiddenChats}
                  renderItem={({ item }) => (
                    <ChatHeader
                      item={item}
                      manageChat={this.manageChat}
                      navigate={this.navigate}
                    />
                  )}
                />
                : null
            }
          </ScrollView>
        <Tab active="inbox" navigation={this.props.navigation} />

      </View>
    )
  }
}