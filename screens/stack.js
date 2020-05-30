import * as React from 'react';

import {Text,View,Button, ImageBackground,Image} from 'react-native';
import {createAppContainer} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';

function Home (props){
    return(
            <View style={{flex:1}}>
                 <Button title="lemon" onPress={()=>{props.navigation.navigate('seven')}}></Button>
            <Text>Droneis </Text>
            </View>
      
    )
}

const Home2 = (props)=>{
    return(
        
            <Text>Droneis 2 </Text>
      
    )
}

const Stack = createStackNavigator(
    {
        home:{
            screen:Home,
            navigationOptions:{
            headerTitle:"Windows",
            headerTitleAlign:"center",
            // headerBackground:() => <Image source={require('./../assets/th.jpg')} style={{width:500,height:60}}/>,
            // headerBackTitleStyle:() => <Image source={require('./../assets/th.jpg')} style={{width:500,height:30}}/>,
            headerTintColor:"white"
            
                // headerStatusBarHeight:25
            }
        },
        seven:Home2,
        
    
},
{
    defaultNavigationOptions:{
        // headerStatusBarHeight:25,
        // headerBackImage:() => <Image source={require('./../assets/th.jpg')} style={{width:500,height:30}}/>
        // headerBackground:() => <Image source={require('./../assets/th.jpg')} style={{width:500,height:60}}/>
    }
}



)



export default createAppContainer(Stack);