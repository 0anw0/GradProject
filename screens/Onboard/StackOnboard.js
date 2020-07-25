import { createStackNavigator } from "react-navigation-stack";
import Onboard1 from './Onboard1'
import Onboard2 from './Onboard2'
import Onboard3 from './Onboard3'

const onboardStack = createStackNavigator({
    Onboard1,
    Onboard2,
    Onboard3
}, {
    headerMode: 'none'
})

export default onboardStack