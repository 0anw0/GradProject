import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import BubbleHome from './start'
import createBubble from "./createBubble";


const MainNavigator = createStackNavigator({
  bubbleHome: { screen: BubbleHome },
  createBubble: {screen: createBubble},
},{
  headerMode:"none"
});

export default MainNavigator;
