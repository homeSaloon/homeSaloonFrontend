import {createBottomTabNavigator, createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';
import * as React from 'react';

import { createDrawerNavigator } from 'react-navigation-drawer';
import { Text, View, Dimensions } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

import GetAllStudentStack from '../GetAllStudentRequests/GetAllStudentStack';
import BarberStack from "./BarberStack"
import AvailableDoctors from './AvailableDoctors';
import { withBadge } from 'react-native-elements';
import ActivationStatus from './ActivationStatus';
import BarberInfo from './barberInfo';




const Tabs = createBottomTabNavigator({
    
    faculty:{
        screen:BarberStack,
        navigationOptions: props => {
          return {
            tabBarIcon: () => {

              const Icon2 = withBadge(0, {
                value: props.screenProps.barb,
                hidden: props.screenProps.barb > 0 ? false : true,
                badgeStyle: {
                  backgroundColor: 'red',
                  position: 'absolute',
                  top: -6,
                  right: -1,
                },
              })(Icon);

              return (
                <Icon2 name="shopping-bag" size={20}>
                    
                </Icon2>
              );
            },
            tabBarLabel: 'Dashboard',
          };
        }
    },
    requests2:{
        screen:AvailableDoctors,
        navigationOptions:{
            tabBarIcon:()=>{
                return <Icon name="clipboard" size={20}> </Icon>
            },
            tabBarLabel:"Available Doctors",
            
        }
    
       
    },
    activation_status:{
      screen:ActivationStatus,
      navigationOptions:{
        tabBarLabel:"Activation Status",
        tabBarIcon:()=>{
          return <Icon name={"clock"} size={20}></Icon>
        }
      }
    },
    barberInfo:{
      screen:BarberInfo,
      navigationOptions:{
          tabBarLabel:"Info",
          tabBarIcon:()=>{return <Icon name="user" size={20}></Icon>}
      }
  }
    
    
    },
   
)






export default createAppContainer(Tabs);