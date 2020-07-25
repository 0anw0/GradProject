import { StyleSheet } from "react-native";
import { secondColor } from '../../shared/constants'

const styles = StyleSheet.create({
    iconsContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 20,
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
    submitBtn: {
        backgroundColor: secondColor,
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 5,
    },
    submitBtnTxt: {
        color: '#fff',
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
    post: {
        fontSize: 17,
        flex: 1,
        paddingBottom: 20
    },
});

export default styles