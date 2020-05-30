import * as React from 'react';

import {Overlay, ListItem, Button} from 'react-native-elements';
import {View, TouchableOpacity, Text,AsyncStorage, ActivityIndicator, Dimensions, ImageBackground} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Feather';
import CreateClass from './CreateClass';
import UICard from '../../UIComponents/UICard';
import {ScrollView} from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { GET_STUDENTS_FUNC,ACTIVATE_USER} from '../../redux/actions/actions';
import LinearGradient from 'react-native-linear-gradient';
// import {useSelector, useDispatch} from 'react-redux';
import TouchableScale from 'react-native-touchable-scale'
import { Picker } from '@react-native-community/picker';
import Axios from 'axios';
import Snackbar from 'react-native-snackbar';

const setAvailability = props => {
  

  const [availability,setAvailability] =  React.useState("available")
  
 
  const _signOutAsync = async () => {
    await AsyncStorage.clear();
   props.navigation.navigate('Auth');
  };

  const Loading = ()=>{
    return(
      <ActivityIndicator></ActivityIndicator>
    )
  }


  const win = useSelector(state=>state);

  const [state, setState] = React.useState(false); //set to false

  const [values, setValues] = React.useState([]);

  const [isLoading,setIsLoading] = React.useState(true);


  const changeState = () => {
    setState(!state);
  };

  React.useEffect(()=>{
    const ac = async()=>{
      let token = await AsyncStorage.getItem('loginToken')
      try{
      let user = await Axios.get('https://dbformongo.eu-gb.cf.appdomain.cloud/getUser',{headers:{"auth-token":token}});

      setAvailability(user.data.availability);
      }
      catch(e){
        Snackbar.show({text:"No Network"})
      }
      
    }
    ac();
    
    
      
    // await Axios.get('/getUser',async (req,res)=>)


    
 
  },[]);

  const saveData = async() =>{
    let token = await AsyncStorage.getItem("loginToken");
    await Axios.post("https://dbformongo.eu-gb.cf.appdomain.cloud/updateAvailability",{
      availability:availability
    },{headers:{"auth-token":token}}).then(()=>{
      Snackbar.show({text:"Successfully updated",duration:6001})

    }).catch((e)=>{
      Snackbar.show({text:"Network Error ",duration:6001})
    })
  }


  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ImageBackground
        source={require('./../../assets/images/Background.png')}
        imageStyle={{opacity:0.5}}
        style={{
          width: Dimensions.get('screen').width,
          height: Dimensions.get('screen').height,
          justifyContent:"center",
          alignItems:"center",
          flex:1,
          padding:20
        }}>
        
        <View style={{borderRadius:5,flexDirection:"row",alignItems:"center",padding:20,minHeight:100,backgroundColor:"white",elevation:5}}>
        <Picker style={{flex:1}} selectedValue={availability} onValueChange={(itemValue)=>{setAvailability(itemValue)}}>
          <Picker.Item label="Available"  value="available"></Picker.Item>
          <Picker.Item label="Not Available " value="not-available"></Picker.Item>
          {/* <Picker.Item label="Busy" value="busy"></Picker.Item> */}
        </Picker>

        

        <Button onPress={()=>saveData()}  title={"Save"} icon={<Icon name="save" color="white" size={20} style={{marginRight:10}}></Icon>} ViewComponent={LinearGradient} linearGradientProps={{colors:[ '#475ebe','#26a1f5'],start:{x:0,y:0.5},end:{x:1,y:0.5}} } ></Button>
        </View>
      </ImageBackground>
    </View>
  );
};

setAvailability['navigationOptions'] = (props) => {
  return {
    headerTitle: `Class - ${props.navigation.getParam('className')} Students`,
    headerStyle: {
      // backgroundColor:"#3671bf",
      // backgroundColor:
    },
    // headerTintColor:"white",
    headerRight: () => {
      return (
        <View style={{flexDirection:"row",padding:10}}>
           <Icon
          name="sync"
          onPress={() => {
            // useDispatch(GET_CLASSES_FUNC())
          }}
          color="rgb(184, 184, 184)"
          size={25}
          style={{marginHorizontal:20}}
        />


        <Icon
          name="settings"
          onPress={() => {
            // navigation.toggleDrawer();
          }}
          color="rgb(184, 184, 184)"
          size={25}
         
        />
         

        </View>
      );
    },
    headerRightContainerStyle: {
      marginHorizontal: 20,
      elevation: 15,
    },
  
  };
}


export default setAvailability;
