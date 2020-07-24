import { createStackNavigator } from 'react-navigation-stack'
import RoomsList from './RoomsList'
import CreateRoom from './CreateRoom'
import RoomMembers from './RoomMembers'
import ChatScreen from './ChatScreen'
import BubbleStack from './Bubble/StackBubble'
import BotStack from './Bot/StackBot'
import UploadedMediaStack from './UploadedMedia/StackUploadedMedia'
import EditRoom from './editRoom'

const roomsStack = createStackNavigator(
    {
        ChatScreen,
        CreateRoom,
        RoomMembers,
        UploadedMediaStack,
        BubbleStack,
        BotStack,
        EditRoom,
        RoomsList,
    },
    {
        headerMode: 'none'
    }
)

export default roomsStack

