import React from "react";
import { StyleSheet ,Dimensions } from 'react-native'

const styles = StyleSheet.create({
    bubbleContainer: {
        flex: 1 , 
        borderWidth:1 ,
        borderRadius: 25,
        height: Dimensions.get('window').height * 0.75,
        width: Dimensions.get('window').width * 0.8,
        margin:Dimensions.get('window').width * 0.05 
    },
    headerContainer: {
        borderRadius: 25,
        flexDirection:'row',
        alignItems:'center',
        height: Dimensions.get('window').height * 0.1,
        borderBottomWidth: 1,
    }, 
    userInfo: {
        flexDirection:'row',
        alignItems:'center',
        borderRadius: 25,
        paddingTop: Dimensions.get('window').width * 0.003, 
        paddingLeft:Dimensions.get('window').width * 0.03,
    },
    nameStyle: {
        fontSize: 16, 
        fontWeight:'bold', 
        letterSpacing: 1, 
        paddingLeft: Dimensions.get('window').width * 0.03
    }, 
    timeStyle:{
        paddingLeft: Dimensions.get('window').width * 0.03
    },
    rightIcon: {
        paddingTop: Dimensions.get('window').width * 0.003,
        paddingLeft:Dimensions.get('window').width * 0.28,
    },
    rightCommentIcon: {
        paddingTop: Dimensions.get('window').width * 0.003,
        paddingLeft:Dimensions.get('window').width * 0.29,
    },
    bubbleBody:{
        borderRadius: 25,
        paddingTop: Dimensions.get('window').width * 0.03, 
        borderBottomWidth:1,
        paddingBottom:Dimensions.get('window').width * 0.03, 
    }, 
    bodyText:{
        fontSize: 16,
        textAlign:'center', 
        fontWeight:'bold', 
        letterSpacing:1, 
    }, 
    bubbleInfo:{
        flexDirection: 'row',
        justifyContent:'space-around'
    },
    bubbleFooter:{
        paddingTop: Dimensions.get('window').width * 0.01, 
        paddingBottom:Dimensions.get('window').width * 0.03,
        flexDirection: 'row',
        justifyContent:'space-around'
    }, 
    replySection:{
        height: Dimensions.get('window').height * 0.42,
        margin:15,
        borderRadius:5,
    }
})

export default styles