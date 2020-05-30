import * as React from 'react';

import {Overlay, ListItem,SearchBar, ButtonGroup} from 'react-native-elements';
import {View, TouchableOpacity, Text, Button, AsyncStorage, ActivityIndicator, ImageBackground} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Feather';
import CreateClass from './CreateClass';
import UICard from '../../UIComponents/UICard';
import {ScrollView, FlatList} from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import TouchableScale from 'react-native-touchable-scale'

import Axios from "axios";
import LinearGradient from 'react-native-linear-gradient';
import Snackbar from 'react-native-snackbar';
import io from 'socket.io-client';



const DoctorDashboard = props => {
  const[requests,setRequests] = React.useState([]);
  // const dispatch = useDispatch();
  
  
 let ignore = false;
  const _signOutAsync = async () => {
    await AsyncStorage.clear();
   props.navigation.navigate('Auth');
  };

  const Loading = ()=>{
    return(
      <ActivityIndicator></ActivityIndicator>
    )
  }





  const [state, setState] = React.useState(false); //set to false

  const [values, setValues] = React.useState([]);

  const [isLoading,setIsLoading] = React.useState(true);

  const [searchItem,setSearchItem] = React.useState({
    data:[],
    value:'',
  });

  const [filter,setFilter] = React.useState({selectedIndex:0});
  const ButtonGroupArray = ["All","Locked","Unlocked"];
  const changeState = () => {
    setState(!state);
  };

  const updateIndex = (index) =>{

    
    


    if(index==1){
      setSearchItem({
        data:requests.filter(item=>item.isActivated == false)
      })
    }
    else if(index==2){
      setSearchItem({data:requests.filter(item=>item.isActivated == true)})
    }

    else{
      setSearchItem({data:requests})
    }
    

    setFilter({selectedIndex:index});

  }


  const getOrders = async() => {
    let token = await AsyncStorage.getItem('loginToken');
    let a = await Axios.get(
      'https://dbformongo.eu-gb.cf.appdomain.cloud/get_accountRequestsFromBarbers',
      {headers: {'Auth-Token': token}},
    ).then(res=>{
      setRequests(res.data);
      setSearchItem({data:res.data})
    
    })
   
    
    

    
  }

  const socket = io("https://dbformongo.eu-gb.cf.appdomain.cloud");

  React.useEffect(()=>{
   
    
    
    socket.on("reloadDashboard",()=>{
     
      getOrders();
    })

    
    getOrders();
    
 
  },[]);




  const ACTIVATE_USER = async(item,index) => {
    

   
        let token = await AsyncStorage.getItem('loginToken');
        await Axios.post('https://dbformongo.eu-gb.cf.appdomain.cloud/activateUser',{

            activate_id:item._id,
            isActivated:item.isActivated
            
        },{
            headers:{
                "Auth-Token":token,
                // "activate_id":item._id,
                // "isActivated":item.isActivated
            },

        }).then(()=>{
          // getOrders();
          Snackbar.show({text:"Account Updated",duration:5000})
          socket.emit("barberUpdated");
        })
      
       
    
}

const setSearchItemFunc = (text) => {
  let newData = requests.filter(item=>{
    const itemData = `${item.username.toUpperCase()}` ;
    const textData = text.toUpperCase();
    if(text.length>0){
      return itemData.indexOf(textData) > -1;
    }
    else {

      return itemData
    }
  });

  setSearchItem({
    data: newData,
    value:text
  })
}


const showData = (item,index)=>{
  return <ListItem
  
  Component={TouchableScale}
  friction={90} 
  tension={100} 
  activeScale={0.95} //
  linearGradientProps={{
    colors: item.isActivated ?    [ '#475ebe','#26a1f5']  : ['#f45c43','#eb3349']  ,
    start: { x: 1, y: 0 },
    end: { x: 0.2, y: 0 },

  }}
  ViewComponent={LinearGradient} // Only if no expo
  leftAvatar= {()=>{
    return <Icon name="user" size={21} color="white"></Icon>
  }}

  onPress={()=>{ 
      ACTIVATE_USER(item,index) //send activated/or not data  to update this user to activate and render again 
   }}
  title={()=>{
    return (
      <View>
    <View style={{flexDirection:"row"}}>
      <Text style={{color:"white",fontSize:15,fontFamily:"Montserrat-Regular",}}>Name:  </Text>
      <Text style={{color:"white",fontSize:15,fontFamily:"Montserrat-SemiBold"}}>{item.username}  </Text>
    </View>
    <View style={{flexDirection:"row",marginTop:5}}>
      <Text style={{color:"white",fontSize:15,fontFamily:"Montserrat-Regular"}}>Phone No:  </Text>
      <Text style={{color:"white",fontSize:15,fontFamily:"Montserrat-SemiBold"}}>{item.phone_no}  </Text>
    </View>

    <View style={{flexDirection:"row",marginVertical:5}}>
      <Text style={{color:"white",fontSize:15,fontFamily:"Montserrat-Regular"}}>Activate:  </Text>
      <Text style={{color:"white",fontSize:15,fontFamily:"Montserrat-SemiBold"}}>{item.isActivated ?"Unlocked" : "Locked"}  </Text>
    </View>
      
      {/* <Button title="Activate" color="white" ></Button> */}
    </View>
    )
  }}
  // titleStyle={{ color: 'white', fontWeight: 'bold' }}
  subtitleStyle={{ color: 'white' }}
  // subtitle={item.roll_no}
  chevron= {()=>{
    
      
      {return item.isActivated ? 
      
      <Icon name="unlock" size={20} color="white"></Icon>

        :
        <Icon name="lock" size={20} color="white"></Icon>
      }
        
      
    
  }}
></ListItem>
}


  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <ImageBackground source={require("./../../assets/images/Background.png")} imageStyle={{opacity:0.3,flex:1}} style={{flex:1}}>
      <Overlay isVisible={state} onBackdropPress={changeState} height={530}>
        <CreateClass closeModal={changeState} />
      </Overlay>

      {/* <Text>Doctor</Text> */}
      <View>
      <SearchBar lightTheme={true}
      placeholder={"Search account"}
      inputContainerStyle={{backgroundColor:"white"}}
      value={searchItem.value}
      onChangeText={(text)=>{
        setSearchItemFunc(text);
      }}
      containerStyle={{backgroundColor:"#f1f3f6"}}
      ></SearchBar>
      <ButtonGroup textStyle={{fontFamily:"Montserrat-Regular"}} selectedTextStyle={{color:"grey",fontFamily:"Montserrat-SemiBold"}} selectedButtonStyle={{backgroundColor:"#f1f3f6"}} underlayColor={{backgroundColor:"#f1f3f6"}}  onPress={updateIndex} selectedIndex={filter.selectedIndex} buttons={ButtonGroupArray}></ButtonGroup>
      </View>

      {/* <Button onPress={()=>_signOutAsync() } title="drone" /> */}
        
       
    
    {requests.length > 0 ? (

      <FlatList inverted data={searchItem.data} renderItem={({item},index)=>showData(item,index)}>
        
      </FlatList>

 




) : <Loading></Loading>}

      {/* <ActionButton
        buttonColor={'white'}
        renderIcon={() => <Icon name="plus" color="#3671bf" size={25} />}>
        <ActionButton.Item
          buttonColor="white"
          title="Create Class"
          onPress={() => setState(true)}>
          <Icon name="mail" color="#3671bf" size={20} />
        </ActionButton.Item>
      </ActionButton> */}
      </ImageBackground>
    </ScrollView>
  );
};

DoctorDashboard['navigationOptions'] = ({navigation,props}) => {
  return {
    headerTitle: 'Doctor Dashboard',
    headerStyle: {
      // backgroundColor:"#3671bf",
      // backgroundColor:
    },
    // headerTintColor:"white",
   
    headerRightContainerStyle: {
      marginHorizontal: 20,
      elevation: 15,
    },
  };
}


export default DoctorDashboard;
