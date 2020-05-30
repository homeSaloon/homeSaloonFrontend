import {createBottomTabNavigator, createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';
import * as React from 'react';

import { createDrawerNavigator } from 'react-navigation-drawer';
import { Text, View, Dimensions } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';


import CustomerStack from './CustomerStack';
import SelectHairStyleScreen from './selectHairStyleScreen';
import PlacedOrders from './placed_orders';


import io from 'socket.io-client';
import { withBadge } from 'react-native-elements';
import CustomerInfo from './customerInfo';





const Tabs =  createBottomTabNavigator({
    
    student:{
        screen:CustomerStack,
        navigationOptions:{
            tabBarIcon:()=>{
                return <Icon  name="globe" size={20}> </Icon>
            },
            tabBarLabel:"Explore"
        }
        
        
    },
    placed_orders:{
        screen:PlacedOrders,
        navigationOptions:(props)=>{
            return {
                tabBarIcon:()=>{

                    const Icon2 =  withBadge(0,{value:props.screenProps.win,hidden:props.screenProps.win > 0 ? false : true,badgeStyle:{backgroundColor:"green",
                    position: 'absolute', top: -6, right: -1
                    
                    }
                    
                    
                    })(Icon)


                    return <Icon2 name="clipboard"  size={20}> </Icon2>
                },
                tabBarLabel:"Placed Orders"
            
            }
           
        }
    },
    customerInfo:{
        screen:CustomerInfo,
        navigationOptions:{
            tabBarLabel:"Info",
            tabBarIcon:()=>{return <Icon name="user" size={20}></Icon>}
        }
    }

    
    
    }
    
)





export default createAppContainer(Tabs );