import {createBottomTabNavigator, createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';
import * as React from 'react';

import { createDrawerNavigator } from 'react-navigation-drawer';
import { Text, View, Dimensions } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import DoctorStack from './DoctorStack';
import GetAllStudentStack from '../GetAllStudentRequests/GetAllStudentStack';

import setAvailability from "./setAvailability"
import DoctorInfo from './doctorInfo';

const Tabs = createBottomTabNavigator({
    
    doctorStack:{
        screen:DoctorStack,
        navigationOptions:{
            tabBarIcon:()=>{
                return <Icon name="list" size={20}> </Icon>
            },
            tabBarLabel:"Account Requests"
        }
    },
    requests:{
        screen:setAvailability,
        navigationOptions:{
            tabBarIcon:()=>{
                return <Icon name="git-pull-request" size={20}> </Icon>
            },
            tabBarLabel:"Availability"
        }
       
    },
    doctorInfo:{
        screen:DoctorInfo,
        navigationOptions:{
            tabBarLabel:"Info",
            tabBarIcon:()=>{return <Icon name="user" size={20}></Icon>}
        }
    }
    
    
    },
    {
        tabBarOptions:{
            // inactiveBackgroundColor:"#3671bf",
            // activeTintColor:"black"
    }
    }
)






export default createAppContainer(Tabs);