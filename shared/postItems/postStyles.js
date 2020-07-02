
import { StyleSheet } from "react-native";
import { secondColor } from "../constants";
const styles = StyleSheet.create({
    renderLikers: {
        flexDirection: 'row',
        alignContent:'space-around',
        borderColor: '#555',
        borderRadius: 5,
        borderWidth: 0.5,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: 10
    },
    renderComment: {
        flexDirection: 'row',
        borderColor: '#555',
        borderRadius: 5,
        borderWidth: 0.5,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: 10
    },
    post: {
        padding: 15,
        borderWidth: 1,
        borderColor: '#CCffff',
    },
    userDetails: {
        flexDirection: 'row',
        //alignItems: 'center'
    },
    userName: {
        position: 'relative',
        left: 8, top: 5,
        fontWeight: 'bold',
        fontSize: 15
    },
    communities: {
        position: 'absolute',
        left: 58, top: 28,
        flex: 1,
        flexDirection: 'row',
    },
    commName: {
        color: '#00ffff',
        marginRight: 7,
    },
    postText: {
        padding: 15,
        textAlign: 'center',
        fontSize: 20,
    },
    postReactions: {
        padding: 10,
        flexDirection: 'row',
        paddingHorizontal: 20,
        borderWidth: 1,
        //borderTopWidth: 0,
        borderColor: '#CCCfff',
        alignItems: 'center',
    },
    reaction: {
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 21
    },
    reactionText: {
        fontWeight: 'bold',
        fontSize: 13,
        marginLeft: 5
    },
    commentsContainer: {
        marginTop: 100,
        //marginHorizontal:5,
        backgroundColor: '#ffffff',
        flex: 1,
        borderWidth: 4,
        borderColor: secondColor,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 10
    },
    commentInputContainer: {
        borderWidth: 0.5,
        borderColor: '#555fff',
        borderRadius: 30,
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 5,
        alignItems: 'center',
        flex: 1,
        marginRight: 5,
    },
    commentInput: {
        fontSize: 17,
        flex: 1,
    },
    iconsContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#555fff'
    },
    iconSeparator: {
        width: 1,
        backgroundColor: '#555fff'
    },
    icon: {
        margin: 15
    },
    submitBtn: {
        backgroundColor: '#555fff',
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 5,
    },
    submitBtnTxt: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    postContainer: {
        borderWidth: 0.5,
        borderColor: '#555',
        borderRadius: 5,
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 5,
        alignItems: 'center',
    },
    timestamp_today: {
        position: 'relative',
        left: 140,
        top: 5
    },
    timestamp: {
        position: 'relative',
        left: 100,
        top: 5
    }
})

export default styles