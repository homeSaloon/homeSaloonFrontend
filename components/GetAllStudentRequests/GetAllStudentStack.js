import * as React from 'react';
import {createAppContainer, NavigationActions} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/Feather';
import { View } from 'react-native';
import GetAllStudentRequests from './GetAllStudentRequests';


const GetAllStudentStack = createStackNavigator(
  {
    getAllRequests:{
      screen:GetAllStudentRequests
    }
  },
  {
   initialRouteName:"getAllRequests",
    defaultNavigationOptions: {
      headerTitleAlign: 'center',
    },
  },
);

export default GetAllStudentStack;
