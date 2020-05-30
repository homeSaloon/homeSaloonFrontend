import * as React from 'react';

import {Overlay, ListItem, Button, CheckBox} from 'react-native-elements';
import {View, TouchableOpacity, Text,AsyncStorage, ActivityIndicator, Dimensions, ImageBackground,StyleSheet, Image} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Feather';

import UICard from '../../UIComponents/UICard';
import {ScrollView} from 'react-native-gesture-handler';
import { useDispatch, useSelector, connect } from 'react-redux';
import { PLACE_ORDER } from '../../redux/actions/actions';
import LinearGradient from 'react-native-linear-gradient';
// import {useSelector, useDispatch} from 'react-redux';
import TouchableScale from 'react-native-touchable-scale'
import Carousel from 'react-native-snap-carousel';
import TrendingHairstyles from './TrendingHairstyles';
import { Picker } from '@react-native-community/picker';
import { FileSystem } from 'react-native-unimodules';
import selectHairStyles from "./SelectHairstyles";
// import {} from "./../../assets/images/selectHairstyles"



const Loading = ()=>{
  return(
    <ActivityIndicator></ActivityIndicator>
  )
}


class SelectHairStyleScreen extends React.Component {

  

  state = {TrendingHairstyles,branch:0,checkTrimming:false,price:selectHairStyles[0].price}
    

  
  


  
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };


  componentDidMount(){
    // this.setState({price:selectHairStyles[this.state.branch].price})
  }

  changeTrimming = () => {

    this.setState({checkTrimming:!this.state.checkTrimming})
    if(this.state.checkTrimming == false){
      this.setState({price:this.state.price + 30})
    }else{
      this.setState({price:this.state.price - 30})
    }


  }
  

  render(){

    
    
          return (
            <ScrollView
              style={{
                flex: 1,
                backgroundColor: 'white',
                paddingVertical: 40,
                padding: 25
                
               
              }}>
              <View style={{marginVertical: 10}}>
                <Text
                  style={{
                    fontSize: 30,
                    fontFamily: 'Montserrat-Bold',
                  }}>
                  Select a Hairstyle
                </Text>
                <Text style={{marginVertical: 5}}>
                  Book what you love
                </Text>
              </View>

              {/* <View style={{flexDirection:"row"}}>
                    <View >

                    </View>
                    <View>

                    </View>
                  </View> */}

              <View style={{alignItems: 'center', borderRadius: 10}}>
                <ImageBackground loadingIndicatorSource={require("./../../assets/images/loading.gif")}
                  source={ {uri:selectHairStyles[this.state.branch].image+"?raw=true"} }
                  
                  borderRadius={4}
                  style={{
                    alignItems: 'stretch',
                    justifyContent: 'center',
                    width: 400,
                    height: 400,
                    borderRadius: 10,
                    flex: 1,
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      alignSelf: 'flex-end',
                      backgroundColor: 'white',
                      flex: 1,
                      alignItems: 'center',
                      opacity: 0.9,
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'TitilliumWeb-Regular',
                      }}>
                      {selectHairStyles[this.state.branch].title}
                    </Text>
                  </View>
                </ImageBackground>
              </View>
              <View style={buttonStyles2.pickerStyles}>
                <Picker
                  mode="dialog"
                  selectedValue={
                    selectHairStyles[this.state.branch].value
                  }
                  prompt="Be careful you cant change it again!"
                  onValueChange={(itemValue, itemIndex) => {
                    // setFieldValue('selectBranch',itemIndex);
                    // this.setState()
                    this.setState({
                      branch: itemIndex,
                      price: selectHairStyles[itemIndex].price,
                      checkTrimming:false
                    });
                  }}>
                  {selectHairStyles.map(item => {
                    return (
                      <Picker.Item
                        label={item.title}
                        value={item.value}
                      />
                    );
                  })}
                </Picker>
              </View>

              <View
                style={{marginHorizontal: -10, flexDirection: 'row'}}>
                <CheckBox
                  checked={this.state.checkTrimming}
                  onPress={this.changeTrimming}
                  checkedIcon={
                    <Icon
                      color="grey"
                      size={18}
                      name="check-circle"
                    />
                  }
                  uncheckedIcon={
                    <Icon color="grey" size={18} name="circle" />
                  }
                  

                  title="With Trimming + 30$"
                  textStyle={{
                    flex: 1,
                    fontWeight: 'normal',
                    textAlign: 'right',
                    fontSize: 14,
                  }}
                  containerStyle={{
                    backgroundColor: 'white',
                    flex: 1,
                    borderColor: 'rgba(48, 48, 48,0.4)',
                    borderRadius: 3,
                    padding: 10,
                  }}

                />
              </View>

              <View
                style={{
                  marginTop: 15,
                  flex: 1,
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Regular',
                    fontSize: 25,
                    alignSelf: 'flex-start',
                    flex: 1,
                  }}>
                  Price:
                </Text>
                <Text
                  style={{
                    fontSize: 25,
                    alignSelf: 'flex-end',
                    width: 80,
                    fontFamily: 'Montserrat-SemiBold',
                  }}>
                  {this.state.price}$
                  <Text style={{color: 'grey'}}>*</Text>
                </Text>
              </View>

              <Text
                style={{
                  fontFamily: 'SourceSansPro-Regular',
                  color: 'grey',
                  textAlign: 'right',
                  marginVertical: 5,
                }}>
                Price exclusive of maintainence charges
              </Text>

              <Button
                icon={
                  <Icon
                    name="shopping-bag"
                    style={{
                      marginHorizontal: 10,
                      marginVertical: 7,
                      textAlign: 'center',
                      
                    }}
                    size={20}
                    color="white"
                    />
                  }
                  buttonStyle={{marginVertical: 10,marginBottom:70}}
                  title="Order Now"
                  
                  
                  onPress={() => 
                    {
                    this.props.place_order(selectHairStyles[this.state.branch].image,this.state.checkTrimming,selectHairStyles[this.state.branch].title,this.state.price,null);
                    this.props.navigation.navigate("maps")
                    }
                  }
              />

              {/* <Button
                onPress={() => this._signOutAsync()}
                title="drone"
              /> */}
            </ScrollView>
          );
  }
  
};



const mapDispatchToProps = (dispatch) =>{
  return {
    place_order:(item,trimming,title,totalPrice,location)=>dispatch(PLACE_ORDER(item,trimming,title,totalPrice,location))
  }
}

const mapProps = (state) => {
  return {
    myState:state
  }
}

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

SelectHairStyleScreen['navigationOptions'] = (props) => {
  return {
    headerTitle: "",
    headerStyle: {
      // backgroundColor:"#3671bf",
      // backgroundColor:
    },
    headerTransparent:true,
    // headerTintColor:"white",
    
    headerRightContainerStyle: {
      marginHorizontal: 20,
      elevation: 15,
    },
  
  };
}


export default connect(mapProps,mapDispatchToProps)(SelectHairStyleScreen);
