import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import AuthStack from "./screens/Authentication/StackAuthentication";
import CommunitiesStack from "./screens/Communities/StackCommunities";
import AccountsStack from "./screens/Accounts/StackAccounts";
import NewsFeed from "./screens/NewsFeed";
import Welcome from "./screens/Welcome";
import Play from "./screens/PlayScreen";
import RecentChats from "./screens/RecentChats";
import OnboardStack from "./screens/Onboard/StackOnboard";
import TabBar from "./shared/TabBar";
import * as firebase from 'firebase'

const appStack = createStackNavigator(
  {
    // Welcome,
    // Play,
    OnboardStack,
    AuthStack,
    AccountsStack,
    CommunitiesStack,
    NewsFeed,
    RecentChats,
    TabBar,
  },
  {
    headerMode: "none",
  }
);

export default createAppContainer(appStack);
