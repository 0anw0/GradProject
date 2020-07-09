import { StyleSheet, StatusBar } from "react-native";
import { secondColor, $grey_3 } from "../../shared/constants";

const styles = StyleSheet.create({
  heading: {
    color: "#FFF",
    marginBottom: 20,
    marginLeft: 20,
    fontSize: 30,
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
    backgroundColor: '#FFF'
  },
  TextInput: {
    width: 322,
    height: 39,
    fontSize: 20,
    borderBottomWidth: 0.5,
    borderColor: "#FFF",
    marginBottom: 12,
    opacity: 1,
    color: '#FFF'
  },
  button: {
    marginTop: 15,
    marginBottom: 15,
    color: secondColor,
    width: 322,
    height: 42,
    backgroundColor: "#FFFF",
  },
  buttonTitle: {
    color: secondColor,
    fontWeight: "bold",
    fontSize: 18,
  },
  already: {
    fontSize: 17,
    color: "#FFF",
    marginRight: 5
  },
  sign: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#FFF",
  },
  back: {
    flex: 1,
    resizeMode: "cover", // or 'stretch',
    paddingTop: StatusBar.currentHeight,
    backgroundColor: secondColor,
  },
  footerContainer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      paddingVertical: 20,
  },
  footerText: {
      textAlign: 'center',
      color: '#FFF',
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
