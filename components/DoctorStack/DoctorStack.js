import * as React from 'react';
import {createAppContainer, NavigationActions} from 'react-navigation';
import DoctorDashboard from './DoctorDashboard';
import {createStackNavigator} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/Feather';
import { View } from 'react-native';
import setAvailability from './setAvailability';


const DoctorStack = createStackNavigator(
  {
    dashboard: {
      screen: DoctorDashboard,
    },

    getStudents:{
      screen:setAvailability
    }
  },
  {
   
    defaultNavigationOptions: {
      headerTitleAlign: 'center',
     
    },
  },
);

export default DoctorStack;
