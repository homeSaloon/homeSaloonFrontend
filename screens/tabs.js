
import * as React from 'react';
import {Text} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';



const Texts = () => {
    return     (
        <Text>Drone</Text>
    )
}


const Texts2 = () => {
    return     (
        <Text>Levels</Text>
    )
}

const Tabs = createAppContainer( createBottomTabNavigator({
    level:Texts,
    levels:Texts2

}

))

export default Tabs;