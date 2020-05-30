import * as React from 'react';

import {Overlay, ListItem, Button, SearchBar, ButtonGroup, Divider} from 'react-native-elements';
import {View, TouchableOpacity, Text,AsyncStorage, ActivityIndicator, Dimensions, FlatList, RefreshControl} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Feather';

import UICard from '../../UIComponents/UICard';
import {ScrollView} from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { GET_STUDENTS_FUNC,ACTIVATE_USER} from '../../redux/actions/actions';
import LinearGradient from 'react-native-linear-gradient';
// import {useSelector, useDispatch} from 'react-redux';
import TouchableScale from 'react-native-touchable-scale'
import Axios from 'axios';

const AvailableDoctors = props => {
  // const win = useSelector(state=>state);
  // const dispatch = useDispatch();
  
 
  const _signOutAsync = async () => {
    await AsyncStorage.clear();
   props.navigation.navigate('Auth');
  };

  const Loading = ()=>{
    return(
      <ActivityIndicator></ActivityIndicator>
    )
  }

  const [searchItem,setSearchItem] = React.useState({
    data:[],
    value:'',
  });
  const [filter,setFilter] = React.useState({selectedIndex:0});
  const ButtonGroupArray  =["all","available","not-available"]



  const [state, setState] = React.useState(false); //set to false
  
  const [values, setValues] = React.useState([]);

  const [isLoading,setIsLoading] = React.useState(true);
  const [data,setData] = React.useState([]);

  const [refreshing,setRefreshing] = React.useState(false);

  const [selectedItem,setSelectedItem] = React.useState({});
  const [modalOpen,setModalOpen] = React.useState(false);
  const changeState = () => {
    setState(!state);
  };


  const DisplayData = ({item})=>{
   return <ListItem
    linearGradientProps={{
      colors: item.availability == "available" ?    [ '#475ebe','#26a1f5']  :   ['#f45c43','#eb3349']  ,
      start: { x: 1, y: 0 },
      end: { x: 0.2, y: 0 },
      
    }}
    ViewComponent={LinearGradient}
    leftAvatar= {()=>{
      return <Icon name="user" size={21} color="white"></Icon>
    }}  
    onPress={()=>{
      setSelectedItem(item);
      setModalOpen(true)
      console.log(selectedItem)

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
          <Text style={{color:"white",fontSize:15,fontFamily:"Montserrat-Regular"}}>Availability  </Text>
          <Text style={{color:"white",fontSize:15,fontFamily:"Montserrat-SemiBold"}}>{String(item.availability).toUpperCase()}  </Text>
        </View>
          
        </View>
      )
    }}
      >

    </ListItem>
  }

  // const getDoctors = async() =>
  // {await Axios.get('https://dbformongo.eu-gb.cf.appdomain.cloud/availableDoctors')
  // .then(res=>setData(res.data))}

  
  const onRefresh = async()=>{
    
    setRefreshing(true)

    await getDoctors().then(()=>{
      console.log("called")
      setRefreshing(false)  
    });


  }

  const   getDoctors = async() =>
  {
    
    await Axios.get('https://dbformongo.eu-gb.cf.appdomain.cloud/availableDoctors')
  .then(res=>{
    
    setData(res.data);setSearchItem({data:res.data})}
    
  
  )}

  React.useEffect(()=>{

  //   const getClasses = async ()=>{
  //     await  dispatch(GET_STUDENTS_FUNC(props.navigation.getParam('className'),props.navigation.getParam('selectBranch')))
  //     setIsLoading(false);
  //  }
  //   getClasses();

  
  
    
    getDoctors();
    
   
  },[]);



  const setSearchItemFunc = (text) => {
    let newData = data.filter(item=>{
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

  const updateIndex = index => {
    if (index == 1) {
      setSearchItem({
        data: data.filter(item => item.availability == 'available'),
      });
    } else if (index == 2) {
      setSearchItem({
        data: data.filter(item => item.availability == 'not-available'),
      });
    } else {
      setSearchItem({data: data});
    }

    setFilter({selectedIndex: index});
  };


  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}
      refreshControl={
        <RefreshControl refreshing={refreshing} 
        onRefresh={onRefresh}
        > </RefreshControl>
      }
    >

    <Overlay isVisible={modalOpen} height={200} overlayStyle={{padding:0,borderTopWidth:3,borderTopColor:"white"}} borderRadius={3}>
        <Divider></Divider>
        <LinearGradient   colors={[ '#475ebe','#26a1f5']} start={{ x: 1, y: 0 }}
      end={{ x: 0.2, y: 0 }}   style={{flex:1,padding:30,justifyContent:"center"}} >  
          <TouchableOpacity style={{position:"absolute",right:20,top:20,width:30,height:30}} onPress={()=>setModalOpen(false)}>
            <Icon name="x" size={20} color="white"></Icon>
          </TouchableOpacity>
          {/* <Text>{JSON.stringify(selectedItem)}</Text> */}

          <View>
            <View style={{flexDirection:"row"}}>
              <Text style={{color:"white",fontSize:15,fontFamily:"Montserrat-Regular",}}>Name:  </Text>
              <Text style={{color:"white",fontSize:15,fontFamily:"Montserrat-SemiBold"}}>{selectedItem.username}  </Text>
            </View>
            <View style={{flexDirection:"row",marginTop:5}}>
              <Text style={{color:"white",fontSize:15,fontFamily:"Montserrat-Regular"}}>Phone No:  </Text>
              <Text style={{color:"white",fontSize:15,fontFamily:"Montserrat-SemiBold"}}>{selectedItem.phone_no}  </Text>
            </View>
        
            <View style={{flexDirection:"row",marginVertical:5}}>
              <Text style={{color:"white",fontSize:15,fontFamily:"Montserrat-Regular"}}>Availability:  </Text>
              <Text style={{color:"white",fontSize:15,fontFamily:"Montserrat-SemiBold"}}>{String(selectedItem.availability).toUpperCase()}  </Text>
            </View>

            <View style={{flexDirection:"row"}}>
              <Text style={{color:"white",fontSize:15,fontFamily:"Montserrat-Regular"}}>Email:  </Text>
              <Text style={{color:"white",fontSize:15,fontFamily:"Montserrat-SemiBold"}}>{selectedItem.email}  </Text>
            </View>
              
        </View>
        </LinearGradient>
    </Overlay>
      


    <View>


    <View style={{marginVertical: 20,marginTop:40, marginLeft: 20}}>
              <Text style={{fontSize: 30, fontFamily: 'Montserrat-Bold'}}>
                Available Doctors
              </Text>
              <Text style={{marginVertical: 5}}>Book what you love</Text>
            </View>
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


      {/* <Button onPress={()=>props.screenProps.signout() } title="drone" />  */}

      {data.length > 0 ?
      <FlatList 
      
      data={searchItem.data}
      renderItem={({item})=><DisplayData item={item}></DisplayData>}
    > 

    </FlatList>:<ActivityIndicator></ActivityIndicator>}
 
        

    

      
    </ScrollView>
  );
};

AvailableDoctors['navigationOptions'] = (props) => {
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


export default AvailableDoctors;
