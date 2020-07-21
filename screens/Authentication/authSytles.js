import React from 'react'
import { StyleSheet } from "react-native";

import { secondColor, firstColor } from '../../shared/constants'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight,
        padding: 8,
        paddingBottom: 50,
    },
    paragraph: {
        margin: 12,
        fontSize: 24,
        // fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Menlo',
        color: 'white',
    },
    button: {
        height: 100,
        width: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        backgroundColor: 'turquoise',
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    screenContainer: {
        flex: 1,
        padding: 20,
    },
    forgetContainer: {
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    acountExistQuestionContainer: {
        flex: 0.3,
        alignItems: 'center',
        //justifyContent:'center',
    },
    enterEmailContainer: {
        flex: 0.4
    },
    header: {
        fontWeight: "bold",
        fontSize: 22,
        color: secondColor
    },
    paragraph: {
        fontSize: 18,
        color: '#888888',
        textAlign: 'center',
        marginTop: 8,
    },
    textInput: {
        width: 285, height: 39,
        fontSize: 20,
        borderBottomWidth: 1,
        borderColor: '#9b9b9b',
        marginBottom: 12
    },
    regester: {
        fontSize: 20,
        fontWeight: "bold",
        color: secondColor
    },
    error: {
        color: 'red',
        fontSize: 13
    },
    button: {
        marginTop: 12,
        marginBottom: 30,
        color: secondColor,
        width: 285, height: 39,
        backgroundColor: secondColor
    },
}) 

export default styles