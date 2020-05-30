import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AuthLoadingScreen from './AuthLoadingScreen/AuthLoadingScreen';
import AuthStack from './AuthStack/AuthStack';
import { useSelector } from 'react-redux';
import { View,ActivityIndicator,StatusBar, AsyncStorage } from 'react-native';

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.





import React from 'react';
import BarberTabs from './BarberStack/BarberTabs';
// import StudentTabs from './CustomerDashboard/CustomerTabs';
import DoctorTabs from './DoctorStack/DoctorTabs';
import Permissions from "expo-permissions";
import CustomerTabs from './CustomerDashboard/CustomerTabs';

import io from "socket.io-client"


const TestingComponent = (props) =>{



  const selector = useSelector(state=>state.getUser); 



  React.useEffect(()=>{
 
    const clearToken = async() => {
       let course = await AsyncStorage.getItem('myaccount');
     
      props.navigation.navigate("Auth");

      if(selector.selectType == "barber" || course=="barber"){
        props.navigation.navigate('Barber')
      }
       else if(selector.selectCourse == "customer" || course=="customer"){
         props.navigation.navigate('customer',{setNum:"set num received"})
       }
       else if(selector.selectCourse == "doctor" || course == "doctor"){
         props.navigation.navigate("Doctor")
       }
       else {
         props.navigation.navigate("Auth")
       }
    

    }

    clearToken();
    

    
  })

 

    return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"white"}}>
            <StatusBar barStyle="light-content" backgroundColor="#3671bf"/>
            <ActivityIndicator  color="#3671bf" size={50} />
    </View>)
}

const handleChange = (prevState,newState,action)=>{

}



const FullStack =  createAppContainer(
  createSwitchNavigator(
   {
      AuthLoading: AuthLoadingScreen,
      App: TestingComponent,
      Auth: AuthStack,
      Barber:(props)=>{

        const signOutAsync = async () => {
          await AsyncStorage.clear();
          props.navigation.navigate('Auth');
        };

        const clearOne = async () => {
          await AsyncStorage.clear();
          props.navigation.navigate('AuthLoading');
        };
      

        
          let [notifications,setState] = React.useState({num:0})
  
         const socket = io.connect("https://dbformongo.eu-gb.cf.appdomain.cloud")
  
          
         
            socket.on("orderToBarber",()=>{
                
  
                setState({num:notifications.num + 1})
            })
  
            const zeroSum = () =>{
              setState({num:0})
            }
  
          
        
          return <BarberTabs screenProps={{barb:notifications.num,zeroOrders:zeroSum,signout:signOutAsync,clearAccount:clearOne}} onNavigationStateChange={handleChange} />
        
      },
      Doctor:DoctorTabs,
      // customer:CustomerTabs
      customer:(props)=>
      { 

        const signOutAsync = async () => {
          await AsyncStorage.clear();
          props.navigation.navigate('Auth');
        };
        let [notifications,setState] = React.useState({num:0})

       const socket = io.connect("https://dbformongo.eu-gb.cf.appdomain.cloud");

        
          socket.on("sendStatusToUser",()=>{
              
           
              setState({num:notifications.num + 1})
          })

          const zeroSum = () =>{
            setState({num:0})
          }

        
      
        return <CustomerTabs screenProps={{win:notifications.num,zero:zeroSum,signout:signOutAsync}} onNavigationStateChange={handleChange} win="drone"/>
      }
    },
    {
      initialRouteName: 'AuthLoading',
    }
  
    
  )
);

export default FullStack;