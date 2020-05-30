import * as React from 'react';

import {Overlay, ListItem, Button} from 'react-native-elements';
import {View, TouchableOpacity, Text,AsyncStorage, ActivityIndicator, Dimensions, ImageBackground,StyleSheet, Image} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/AntDesign';

import UICard from '../../UIComponents/UICard';
import {ScrollView} from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { GET_STUDENTS_FUNC,ACTIVATE_USER} from '../../redux/actions/actions';
import LinearGradient from 'react-native-linear-gradient';
// import {useSelector, useDispatch} from 'react-redux';
import TouchableScale from 'react-native-touchable-scale'
import Carousel from 'react-native-snap-carousel';
import TrendingHairstyles from './TrendingHairstyles';
import { Picker } from '@react-native-community/picker';
import { FileSystem } from 'react-native-unimodules';
import selectHairStyles from "./SelectHairstyles";
import Snackbar from 'react-native-snackbar';
// import {} from "./../../assets/images/selectHairstyles"

const Loading = ()=>{
  return(
    <ActivityIndicator></ActivityIndicator>
  )
}


class ChooseGender extends React.Component {

  

  state = {TrendingHairstyles,branch:0
    

  
  }
  
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };


 
  

  render(){

    
    
          return (
            <ScrollView
              style={{
                flex: 1,
                backgroundColor: 'white',
                paddingVertical: 40,
                // padding:25
              }}>
              <View >
                <Text
                  style={{
                    fontSize: 30,
                    fontFamily: 'Montserrat-Bold',
                    paddingHorizontal:25,
                    marginVertical:30
                  }}>
                  Choose Gender
                </Text>
                {/* <Text style={{marginVertical: 5}}>
                  Book what you love
                </Text> */}
              </View>
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
              <ImageBackground  loadingIndicatorSource  resizeMode="repeat" source={require("./../../assets/images/Background.png")} imageStyle={{opacity:0.4}} style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height}}>
                  <View style={{flexDirection:"row",margin:10}}>
                      <TouchableOpacity style={{flex:1,backgroundColor:"white",height:200,marginHorizontal:5,justifyContent:"center",alignItems:"center",borderRadius:20,elevation:3}} onPress={()=>{this.props.navigation.navigate("selectHairStyleScreen")}}>
                    <View>
                            <Image source={require("./../../assets/images/male.png")} style={{width:50,height:65}}></Image>
                            <Text style={{marginTop:20,fontSize:18,color:"grey",fontFamily:"Montserrat-SemiBold"}}>Male</Text>
                    </View>
                        </TouchableOpacity>
                    <TouchableOpacity onPress={()=>Snackbar.show({text:"Still in development",duration:6001})}  style={{flex:1,backgroundColor:"white",height:200,marginHorizontal:5,justifyContent:"center",alignItems:"center",borderRadius:20,elevation:3}}>
                    <View style={{alignItems:"center"}}>
                    <Image source={require("./../../assets/images/female.png")} style={{width:50,height:65}}></Image>
                    <Text style={{marginTop:20,fontSize:18,color:"grey",fontFamily:"Montserrat-SemiBold"}}>Female</Text>
                    </View>
                    </TouchableOpacity>
                  </View>

                  
                </ImageBackground>
            </View>

                

              <Button
                onPress={() => this._signOutAsync()}
                title="drone"
              />
            </ScrollView>
          );
  }
  

 
 




 
  
};

const buttonStyles2 = {
  buttonStyle: {
    minWidth: Dimensions.get('screen').width / 3 + 30,
    height: 50,
    elevation: 1,
    backgroundColor: '#26a1f5',
  },

  titleStyle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    letterSpacing: 1,
    color: 'white',
  },

  pickerStyles: {
    width: Dimensions.get('screen').width - 50,
    height: 50,
    backgroundColor: 'white',
    marginVertical: 5,
    borderWidth: 1,
    borderColor: 'rgba(48, 48, 48,0.4)',
    borderRadius: 3,
  },
};

ChooseGender['navigationOptions'] = (props) => {
  return {
    headerTitle:"",
    headerStyle: {
      // backgroundColor:"#3671bf",
      // backgroundColor:
    },
    // headerShown:false,
    // headerTintColor:"white",
    headerTransparent:true,
   
    headerRightContainerStyle: {
      marginHorizontal: 20,
      elevation: 15,
    },
  
  };
}


export default ChooseGender;
