import * as React from 'react';
import {createAppContainer, NavigationActions} from 'react-navigation';
import BarberDashboard from './BarberDashboard';
import {createStackNavigator} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/Feather';
import { View } from 'react-native';
import AvailableDoctors from './AvailableDoctors';


const BarberStack = createStackNavigator(
  {
    events: {
      screen: BarberDashboard,
    navigationOptions:{
      cardStyle:{
        // marginBottom:50
      }
    }
    },

    availableDoctors:{
      screen:AvailableDoctors
    }
  },
  {
   
    defaultNavigationOptions: {
      headerTitleAlign: 'center',
      // cardStyle:{marginBottom:40}
    },
  },
);

export default BarberStack;
