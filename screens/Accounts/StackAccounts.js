import { createStackNavigator } from 'react-navigation-stack'
import MyProfile from './MyProfile'
import OtherProfile from './OtherProfile'
import OtherCommunities from './OtherCommunities'
import FriendsList from './FriendsList'
import FriendsRequests from './FriendsRequests'

const stackAccounts = createStackNavigator(
    {
        MyProfile,
        OtherProfile,
        OtherCommunities,
        FriendsList,
        FriendsRequests
    },
    {
        headerMode: 'none'
    }
)

export default stackAccounts