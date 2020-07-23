import { StyleSheet, StatusBar } from "react-native";
import { secondColor, headlineColor, $grey_3, $grey_1, $grey_2 } from "../../shared/constants";

const styles = StyleSheet.create({
  heading: {
    color: secondColor,
    marginBottom: 22,
    marginLeft: 20,
    fontSize: 27,
    fontStyle: 'italic',
    marginTop: 15,
  },
  heading2: {
    fontWeight: 'bold'  
  },
  divider: {
    opacity: 0.2,
    position: 'relative',
    bottom: 5,
    backgroundColor: '#222'
  },
  TextInput: {
    width: 322,
    height: 39,
    fontSize: 20,
    borderBottomWidth: 0.5,
    borderColor: $grey_1,
    marginBottom: 15,
    opacity: 1,
    color: headlineColor
  },
  button: {
    marginTop: 15,
    marginBottom: 20,
    backgroundColor: secondColor,
    width: 322,
    height: 45,
  },
  buttonTitle: {
    color: '#FFF',
    fontWeight: "bold",
    fontSize: 18,
  },
  already: {
    fontSize: 17,
    color: $grey_1,
    marginRight: 5
  },
  sign: {
    fontSize: 17,
    fontWeight: "bold",
    color: secondColor,
  },
  back: {
    flex: 1,
    resizeMode: "cover", // or 'stretch',
    paddingTop: StatusBar.currentHeight,
    backgroundColor: secondColor,
  },
  footerContainer: {
      alignSelf: 'flex-end',
      width: '100%',
      paddingVertical: 20,
  },
  footerText: {
      textAlign: 'center',
      color: secondColor,
      opacity: 0.6,
      fontSize: 14,
      fontStyle: 'italic',
      position: 'relative',
      top: 6
  },
  footerLogo: {
      fontWeight: 'bold'
  }
});

export default styles;
