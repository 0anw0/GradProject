import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import SecondPageLaunch from './SecondPageLaunch'
import commandList from "./commandList";
import BotDirector from './botDirector'
import LaunchBot from './launchBot'
import chatBot from './ChatSimple'

const BotStack = createStackNavigator({
  botDirector: { screen: BotDirector },
  launchBot: { screen: LaunchBot },
  SecondPageLaunch: { screen: SecondPageLaunch },
  commandList: { screen: commandList },
  chatBot: { screen: chatBot },
},
  {
    headerMode: 'none',
    unmountInactiveRoutes: true
  }
)

export default createAppContainer(BotStack);