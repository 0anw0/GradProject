import { StyleSheet } from "react-native";
import { secondColor } from '../../shared/constants'

const styles = StyleSheet.create({
    iconsContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: secondColor
    },
    iconSeparator: {
        width: 1,
        backgroundColor: secondColor
    },
    icon: {
        margin: 15
    },
    postImages: {
        marginHorizontal: 5,
        borderRadius: 5,
        width: 80,
        height: 80,
        borderWidth: 0.5,
        borderColor: secondColor
    },
    submitBtn: {
        backgroundColor: secondColor,
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignSelf: 'center',
        marginTop: 15,
        borderRadius: 5,
    },
    submitBtnTxt: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    postContainer: {
        borderWidth: 1,
        borderColor: secondColor,
        borderRadius: 5,
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
    },
    post: {
        fontSize: 17,
        flex: 1,
    },
    item: {
        padding: 12,
        flexDirection: 'column',
        alignItems: 'center',
    },
    communityName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 15
    },
    communityDesc: {
        fontSize: 17,
        marginLeft: 15,
        marginTop: 3,
        color: '#333'
    },
    communities: {
        borderColor: secondColor,
        borderWidth: 2,
        borderRadius: 3,
        marginTop: 20
    }
});

export default styles