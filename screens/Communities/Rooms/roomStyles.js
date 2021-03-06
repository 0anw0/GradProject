import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { secondColor } from "../../../shared/constants";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#e4e4f2',
        alignItems: 'center',
        paddingLeft: 25,
        paddingVertical: 15,
        marginBottom: 10,
        borderRadius: 15,
        margin: 5
    },
    item: {
        marginLeft: 10,
        width: Dimensions.get('window').width * 0.6
    },
    roomName: {
        fontSize: 18,
        color:secondColor,
        fontWeight:'bold'
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