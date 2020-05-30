import * as React from 'react';

import {Overlay, ListItem, Button} from 'react-native-elements';
import {View, TouchableOpacity, Text,AsyncStorage, ActivityIndicator, Dimensions} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Feather';
import UICard from '../../UIComponents/UICard';
import {ScrollView} from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import {GET_ALL_REQUESTS_FUNC,APPROVE_REQUEST_FUNC} from '../../redux/actions/actions';
import LinearGradient from 'react-native-linear-gradient';
// import {useSelector, useDispatch} from 'react-redux';
import TouchableScale from 'react-native-touchable-scale'

const GetAllStudentRequests = props => {
  const win = useSelector(state=>state);
  const dispatch = useDispatch();
  
 
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

  React.useEffect(()=>{
    
    const getRequests = async ()=>{
      let requests = await  dispatch(GET_ALL_REQUESTS_FUNC())
      setIsLoading(false);
   }
   getRequests();
    
 
  },[]);


  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>





  
{/* <Text>{JSON.stringify(win.getStudents,null,2)}</Text> */}

      {/* <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
    <Text>ClassName :{JSON.stringify(props.navigation.getParam('className'),null,2)}</Text>
    // 
    </ScrollView> */}



      

      {win.getRequests.length > 0 ? (


          win.getRequests.map((item,index)=>{

           
        
            return <ListItem
            Component={TouchableScale}
            friction={90} 
            tension={100} 
            activeScale={0.95} //
            linearGradientProps={{
              colors: item.isActivated ?   [ '#475ebe','#26a1f5'] : ['#cb3837','#cb3837']  ,
              start: {x:0.2,y:0},
              end: {x:0.2,y:0},
          
            }}
            ViewComponent={LinearGradient} // Only if no expo
            leftAvatar= {()=>{
              return <Icon name="user" size={21} color="white"></Icon>
            }}

            onPress={()=>{ 
              dispatch(APPROVE_REQUEST_FUNC(item,index)) //send activated/or not data  to update this user to activate and render again 
             }}

            title={()=>{
              return (
                <View>
              <View style={{flexDirection:"row"}}>
                <Text style={{color:"white",fontSize:15,fontFamily:"Montserrat-Regular",}}>Name:  </Text>
                <Text style={{color:"white",fontSize:15,fontFamily:"Montserrat-SemiBold"}}>{item.fullname}  </Text>
              </View>
              <View style={{flexDirection:"row",marginTop:5}}>
                <Text style={{color:"white",fontSize:15,fontFamily:"Montserrat-Regular"}}>Roll No:  </Text>
                <Text style={{color:"white",fontSize:15,fontFamily:"Montserrat-SemiBold"}}>{item.roll_no}  </Text>
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
          
          })


      ) : <View style={{flex:1,justifyContent:"center",alignItems:"center"}}><Text style={{fontFamily:"Montserrat-Light",fontSize:20}}>No Requests</Text></View>}

      <Button onPress={()=>_signOutAsync() } title="drone" /> 
        

    

      
    </View>
  );
};

GetAllStudentRequests['navigationOptions'] = (props) => {
  return {
    headerTitle: "Student Requests",
    
    
  
  };
}


export default GetAllStudentRequests;
