import * as React from 'react';

import {Overlay, Divider, Rating} from 'react-native-elements';
import {
  View,
  TouchableOpacity,
  Text,
  
  AsyncStorage,
  ActivityIndicator,
  Alert,
  ImageBackground,
  Dimensions,
  FlatList,
  Image,
  BackHandler,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Feather';
import CreateEvent from './CreateEvent';
import UIEventCard from '../../UIComponents/UIEventCard';
import {
  ScrollView,
  TouchableNativeFeedback,
} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {GET_EVENTS_FUNC} from '../../redux/actions/actions';
// import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet} from 'react-native';
import * as Permissions from 'expo-permissions';
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';

import io from 'socket.io-client';

import Snackbar from 'react-native-snackbar';
import Axios from 'axios';
import {Picker} from '@react-native-community/picker';
import MapView, {Marker} from 'react-native-maps';
import {Button} from 'react-native-elements';

import * as Location from 'expo-location';

class FacultyDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      pendingOrders: [],
      selectItem: {},
      modal: false,
      status: 'inprogress',
      initMarker: {
        latitude: 37.4219983,
        longitude: -122.084,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      },
      refreshing:false,
      mapFullScreen:false
    
    };
  }

  signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  changeSelectItem = item => {
    this.setState({selectItem: item});
    this.setState({initMarker: item.location});
  };

  getOrders = async () => {
    let token = await AsyncStorage.getItem('loginToken');
    let a = await Axios.get(
      'https://dbformongo.eu-gb.cf.appdomain.cloud/get_orders_forBarber',
      {headers: {'Auth-Token': token}},
    );

    this.setState({pendingOrders: a.data});
    this.setState({selectItem: a.data[0]});
    this.setState({initMarker: a.data[0].location});
  };


  onRefresh = async()=>{
    this.setState({refreshing:true})

    await this.getOrders().then(()=>{
      this.setState({refreshing:false})  
    });
    this.props.screenProps.zeroOrders();


  }

  askPermissionAsync = async () => {
    // let {status}  = await Permissions.askAsync(Permissions.LOCATION)

    let {status} = await Location.requestPermissionsAsync();

    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: false,
      timeout: 200000,
      maximumAge: 1000,
    });

   
   
    }
  



  componentDidMount() {

    this. getAccount = async() => {
      try{
        let token = await AsyncStorage.getItem('loginToken');
        let user = await Axios.get('https://dbformongo.eu-gb.cf.appdomain.cloud/getUser',
        {
          headers:{
            "auth-token":token
          }
        }
        
        )


        if(!user.data.isActivated && user.data.selectType=="barber"){
          Alert.alert("Account Not Activated","Please consult Doctor to get your account activated or if Locked.",[{text:"Sure",onPress:()=>{this.props.screenProps.clearAccount()}}])
        }
        // if(user.data.registeredPhoneId !== getUniqueId()){
        //   Alert.alert("Phone changed ?","Consult Management.",[{text:"Sure",onPress:()=>{props.navigation.navigate('login')}}])
        // }
    
      }
      catch(e){
        throw new Error(e);
      }
     
    }

    this.getAccount();


    this.socket = io('https://dbformongo.eu-gb.cf.appdomain.cloud');

    this.socket.on('orderToBarber', data => {
      this.getOrders();
      Snackbar.show({text: 'New Order Received', duration: 5000,action:{text:"Ok",
      onPress:()=>{Snackbar.dismiss()}
    }});
      // Snackbar.
    });

    this.askPermissionAsync();

    this.getOrders();


    this.unsubscribe = this.props.navigation.addListener('didFocus',()=>{
      this.props.screenProps.zeroOrders();
    })


    
  }

  componentWillUnmount(){
    
    // this.unsubscribe();
  }
 

  Item = ({title, total_price, date, item, changeSelectItem,delivery_status}) => {
    // let Item = JSON.parse(selectItem);
    return (
      <TouchableNativeFeedback
        onPress={() => {
          changeSelectItem(item), this.setState({modal: true,status:item.delivery_status});
        }}>
        <LinearGradient
          colors={['white', 'white']}
          start={{x: 0, y: 1}}
          end={{x: 0, y: 0}}
          style={styles.item}>
          {/* <Text style={styles.title}>{title}</Text> */}

          <View style={{flexDirection: 'row', marginVertical: 3}}>
            <Text
              style={{
                flex: 1,
                fontSize: 16,
                fontFamily: 'TitilliumWeb-Regular',
              }}>
              <Text>Order No:</Text> {title}{' '}
            </Text>
            <Text style={{fontSize: 22, fontFamily: 'TitilliumWeb-SemiBold'}}>
              {total_price}$
            </Text>
          </View>

          <View style={{flexDirection: 'row', marginVertical: 3}}>
            <View style={{flex: 1}}>
              <Text style={{fontSize: 16, fontFamily: 'TitilliumWeb-Regular'}}>
                Date:
                <Text
                  style={{color: 'black', fontFamily: 'TitilliumWeb-Regular'}}>
                  {new Date(date).getDate() +
                    '/ ' +
                    new Date(date).getMonth() +
                    '/ ' +
                    new Date(date).getFullYear()}{' '}
                </Text>
              </Text>
              <Text
                style={{
                  marginTop: 11,
                  fontSize: 16,
                  fontFamily: 'TitilliumWeb-Regular',
                }}>
                Time :
                <Text
                  style={{color: 'black', fontFamily: 'TitilliumWeb-Regular'}}>
                  {new Date(date).getHours() +
                    ' : ' +
                    new Date(date).getMinutes()}{' '}
                </Text>
              </Text>
            </View>
            <Text
              style={{
                backgroundColor: delivery_status == "inprogress" ? "orange" : delivery_status =="completed" ? "green" : delivery_status =="failed" ? "red" : "red",
                color: 'white',
                padding: 5,
                marginVertical: 15,
                borderRadius: 4,
                fontFamily: 'Montserrat-SemiBold',
              }}>
              {String(delivery_status).toUpperCase()}
            </Text>
          </View>
        </LinearGradient>
      </TouchableNativeFeedback>
    );
  };

  Compo = ({selectItem}) => {
    const names = [
      {viewValue: 'Order ID', value: selectItem._id},
      {viewValue: 'Title', value: selectItem.title},
      {viewValue: 'Phone No', value: selectItem.phone_no},
      {
        viewValue: 'Created At',
        value: `${new Date(selectItem.createdAt).getDate()} / ${new Date(
          selectItem.createdAt,
        ).getMonth()} / ${new Date(selectItem.createdAt).getFullYear()}`,
      },
    ];

    const submit = async (id, status, url) => {
      let token = await AsyncStorage.getItem('loginToken');
      await Axios.post(
        'https://dbformongo.eu-gb.cf.appdomain.cloud/post_status_order',
        {id, status},
        {
          headers: {
            'Auth-Token': token,
          },
        },
      ).then(() => {
        this.socket.emit('changedStatus', {id, status, url});
        this.socket.emit('reloadDashboard')
        this.setState({modal:false})
      });
    };

    return (
      <ScrollView
      // snapToOffsets={[3]}
        style={{padding: 10}}
        contentContainerStyle={{alignItems: 'center'}}>
        <Icon
          onPress={
           ()=>this.setState({modal:false})
          }

          style={{alignSelf: 'flex-start', position: 'absolute', top: 30}}
          size={20}
          name={'arrow-left'}
        />
        <Icon
          onPress={async () => {
            await submit(selectItem._id, this.state.status, selectItem.url);
            await this.getOrders();
            this.setState({modal: false});
          }}
          style={{
            alignSelf: 'flex-end',
            position: 'absolute',
            top: 30,
            right: 20,
          }}
          size={30}
          name={'check'}
        />

        <View style={{marginVertical: 20}}>
          <Text
            style={{
              fontSize: 30,
              fontFamily: 'Montserrat-Bold',
              marginBottom: 20,
            }}>
            Order Details
          </Text>
          <Divider />
        </View>

        {selectItem !== undefined
          ? names.map(item => {
              return (
                <View style={{flexDirection: 'row', marginTop: 10}}>
                  <Text
                    style={{
                      flex: 2,
                      fofntFamily: 'TitilliumWeb-SemiBold',
                      fontSize: 17,
                    }}>
                    {item.viewValue}{' '}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'TitilliumWeb-Regular',
                      fontSize: 17,
                      marginHorizontal: 10,
                    }}>
                    :
                  </Text>
                  <Text
                    style={{
                      flex: 3,
                      fontFamily: 'TitilliumWeb-Regular',
                      fontSize: 17,
                    }}>
                    {item.value}
                  </Text>
                </View>
              );
            })
          : null}

        
      <View>
     <MapView style={{height: this.state.mapFullScreen ? Dimensions.get('screen').height :  200,width:Dimensions.get('screen').width,marginTop:10}}
     initialRegion={selectItem.location}
     region={selectItem.location}
     showsUserLocation={true}
     
     >
        
       <Marker  coordinate={
         this.state.initMarker
       }>

      </Marker>  
    </MapView>

    <View
          style={{
            elevation: 5,
            position: 'absolute',
            top: 20,
            alignSelf: 'flex-start',
            flex: 1,
            left: 30,
          }}>
        <Button
          
            buttonStyle={{borderRadius: 100,backgroundColor:"white"}}
            onPress={() => {
              // this.map.animateToRegion(this.state.currentLocation);

              this.setState({mapFullScreen:!this.state.mapFullScreen})
            }}
            icon={<Icon color="grey" size={25} name="maximize"  />
          
          }
          />
      </View>
      </View>

        {/* <View style={{flexDirection:"row",flex:1}}>
          <Image  source={{uri:selectItem.url+'?raw=true'}} style={{width:180,height:150,marginVertical:20}} borderRadius={4} ></Image>
          <View style={{flex:1,backgroundColor:"green",margin:20}}>
           
            <Text>x:{selectItem["location"].latitude}</Text>
            <Text>Sds</Text>
          </View>
      </View> */}

        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 25}}>
          <Text
            style={{
              textAlign: 'left',
              alignSelf: 'flex-start',
              marginVertical: 10,
              fontFamily: 'TitilliumWeb-SemiBold',
              fontSize: 17,
              flex: 2,
            }}>
            Set Status
          </Text>
        
          <Picker
            style={{
              ...styles.pickerStyles,
              borderWidth: 2,
              borderStyle: 'solid',
              flex: 3,
              
              backgroundColor:
                this.state.status == 'completed'
                  ? 'green'
                  : this.state.status == 'inprogress'
                  ? 'orange'
                  : this.state.status == 'failed'
                  ? 'red'
                  : 'green',
              color:
                this.state.status == 'completed'
                  ? 'white'
                  : this.state.status == 'inprogress'
                  ? 'black'
                  : this.state.status == 'failed'
                  ? 'white'
                  : 'black',

              fontWeight: 'bold',
              
              marginBottom: 50,
              
            }}
            prompt={'Set Status'}
            mode="dropdown"
            itemStyle={{fontFamily: 'Montserrat-Regular'}}
            // selectedValue={this.state.status}
            selectedValue={this.state.status}
            onValueChange={val => {
              this.setState({status: val});
            }}>
            <Picker.Item
              key={'completed'}
              label="Completed"
              value="completed"
            />
            <Picker.Item key={'failed'} label="Failed" value="failed" />
            <Picker.Item
              key={'inprogress'}
              label="Inprogress"
              value="inprogress"
            />
          </Picker>
        </View>
      </ScrollView>
    );
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Overlay
          fullScreen
          width={Dimensions.get('screen').width - 30}
          isVisible={this.state.modal}
          onBackdropPress={() => this.setState({modal: false})}>
          <this.Compo selectItem={this.state.selectItem} />
        </Overlay>
       
        {/* <Button title={"SignOut"}onPress={this.signOutAsync}></Button> */}

        <ScrollView style={{backgroundColor: 'white', paddingVertical: 10}}
           refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh}></RefreshControl>
          }
          

        
        >
          <ImageBackground
            resizeMode="cover"
            source={require('./../../assets/images/Background.png')}
            imageStyle={{opacity: 0.5}}
            style={{opacity: 1, marginBottom: 55}}>
            <View style={{marginVertical: 20, marginLeft: 20}}>
              <Text style={{fontSize: 30, fontFamily: 'Montserrat-Bold'}}>
                Orders (Barber Dashboard)
              </Text>
              <Text style={{marginVertical: 5}}>Book what you love</Text>
            </View>

            {/* <ScrollView> */}
            {this.state.pendingOrders.length > 0 ?
            <FlatList
              
              inverted={true}
              contentContainerStyle={{marginHorizontal: 20}}
              data={this.state.pendingOrders}
              renderItem={({item}) => (
                <this.Item
                  selectItem={this.state.selectItem}
                  key={item.user_id}
                  changeSelectItem={this.changeSelectItem}
                  item={item}
                  title={item._id}
                  total_price={item.price}
                  date={item.createdAt}
                  delivery_status={item.delivery_status}
                />
              )}
            />

                : 
                
                <View  style={{flex:1,alignContent:"center",justifyContent:"center", height:Dimensions.get('screen').height /2 ,width:Dimensions.get('screen').width}}>
                <ActivityIndicator color="grey" style={{flex:1,alignSelf:"center"}} size={50}></ActivityIndicator>
                </View>
              }
            {/* </ScrollView> */}

            {/* <Text>{JSON.stringify(this.state.pendingOrders)}</Text> */}

            {/* <ActionButton
      buttonColor={'#26a1f5'}
      // elevation={10}
      renderIcon={() => <Icon name="plus" color="white" size={25} />}>
      <ActionButton.Item
      buttonColor="white"
        title="Create Event"
        onPress={() => {
          setEditItem(null);
          setState(true);
        }}>
        <Icon name="mail" color="#3671bf" size={20} />
        </ActionButton.Item>
      </ActionButton> */}
          </ImageBackground>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

// const styles = StyleSheet.create({
//   textStyles:{marginTop:20,marginHorizontal:15,fontSize:14,color:"grey"}
// })

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //   marginTop: Constants.statusBarHeight,
  },
  item: {
    backgroundColor: '#f1f3f6',
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginVertical: 8,
    marginHorizontal: 1,
    elevation: 5,
    //   borderWidth:1,
    borderRadius: 4,
  },
  title: {
    fontSize: 32,
  },
  pickerStyles: {
    // width: Dimensions.get('window').width -60,
    // height: 50,
    // backgroundColor: 'white',
    marginVertical: 5,
    // elevation:4,
    borderRadius: 5,
  },
});

FacultyDashboard['navigationOptions'] = ({navigation, props}) => {
  return {
    headerTitle: 'Windows',
    headerShown: false,
    headerStyle: {
      marginBottom: 140,
      // backgroundColor:"#3671bf",
      // backgroundColor:
    },

    // headerTintColor:"white",
    headerRight: () => {
      return (
        <View style={{flexDirection: 'row', padding: 10}}>
          {/* <Icon
          name="sync"
          onPress={() => {
            dispatch(GET_CLASSES_FUNC())
          }}
          color="rgb(184, 184, 184)"
          size={25}
          style={{marginHorizontal:20}}
        /> */}

          <Icon
            name="settings"
            onPress={() => {
              navigation.toggleDrawer();
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
};

export default FacultyDashboard;
