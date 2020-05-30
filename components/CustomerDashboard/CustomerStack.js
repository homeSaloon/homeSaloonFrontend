import * as React from 'react';
import {createAppContainer, NavigationActions} from 'react-navigation';
import CustomerDashboard from './CustomerDashboard';
import {createStackNavigator} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/Feather';
import { View } from 'react-native';
// import PlacedOrders from './placedOrders';
import ChooseGender from './ChooseGender';
import Maps from './Maps';
import Payment_Transaction_Page from './payment_transaction_page';
import SelectHairStyleScreen from './selectHairStyleScreen';

import { withBadge } from 'react-native-elements';
import selectAnythingScreen from './selectAnythingScreen';


const CustomerStack = createStackNavigator(
  {
    customer_dashboard: {
      screen: CustomerDashboard,
    },
    choose_gender:{
      screen:ChooseGender
    },

    selectHairStyleScreen:{
      screen:SelectHairStyleScreen
    },
    selectAnythingScreen:{
      screen:selectAnythingScreen
    },
    maps:Maps,
    payment_transaction_page:Payment_Transaction_Page
  },
  
  {
   
    defaultNavigationOptions: {
      headerTitleAlign: 'center',
      
    },
  },
);

export default CustomerStack;
