import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import Login from './Login';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';




const AuthStack = createStackNavigator({
    login:{
        screen:Login,
        navigationOptions:{
            headerShown:false
        }
    },
    signup:SignUp,
    forgotPassword:ForgotPassword,
    
},{

    defaultNavigationOptions:{
        headerTransparent:true,
        headerBackTitleStyle:{
            color:"white",
            backgroundColor:"white"
        },
        headerTintColor:"white",
        headerTitle:''
    }
})

export default createAppContainer(AuthStack);