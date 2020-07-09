import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#EEE',
        alignItems: 'center',
        paddingLeft: 25,
        paddingVertical: 15,
        marginBottom: 10
    },
    item: {
        marginLeft: 10
    },
    roomName: {
        fontSize: 21,
        fontWeight: 'bold'
    },
    option: {
        fontSize: 16,
        color: 'blue',
        marginRight: 15,
    },
    newRoomTextInput: {
        borderWidth: 1,
        borderColor: secondColor,
        padding: 5,
        marginBottom: 5,
        borderRadius: 2
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 10
    },
    addMembers: {
        marginLeft: 5,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15
    },
    addMembersTxt: {
        fontSize: 23,
        color: '#555',
        marginLeft: 5
    },
    list: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        paddingLeft: 10,
        borderWidth: 1,
        borderColor: '#BBB',
    }
})

export default styles