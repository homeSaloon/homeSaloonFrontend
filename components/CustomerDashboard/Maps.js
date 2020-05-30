import * as React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  AsyncStorage,
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Image,
} from 'react-native';
import MapView, {
  Marker,
  AnimatedRegion,
  Geojson,
  Polyline,
} from 'react-native-maps';
import * as Permissions from 'expo-permissions';

import * as Location from 'expo-location';
import Snackbar from 'react-native-snackbar';
import {Button, CheckBox, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import UIInput from '../../UIComponents/UIInput';
import { connect } from 'react-redux';
import { PLACE_ORDER } from '../../redux/actions/actions';




class MapsComponent extends React.Component {
 


  state = {
      location: {
        latitude: 17.2245458,
        longitude: 78.5888268,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      },
      currentLocation: null,
      phone_no: 0,
      getCurrentLoc: false,
     
    };

  

  componentDidMount() {
    
    Snackbar.show({duration:6001,text:"Set Your location by placing the Red marker"});
    this.askPermissionAsync();
 

  }

  askPermissionAsync = async () => {
    // let {status}  = await Permissions.askAsync(Permissions.LOCATION)

    let {status} = await Location.requestPermissionsAsync();

    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: false,
      timeout: 200000,
      maximumAge: 1000,
    });

    if (status == 'granted') {
      this.setState({
        currentLocation: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        },
      });

      this.setState({
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        },
      });
    }
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <MapView
          style={styles.mapStyle}
          ref={ref => {
            this.map = ref;
          }}
          region={this.state.currentLocation}
          showsCompass={true}
          showsUserLocation={true}
          rotateEnabled={true}
          showsMyLocationButton={this.state.getCurrentLoc}
          provider="google"
          showsIndoor={true}
          showsBuildings={true}
          onRegionChange={reg => {
          }}
          onPress={e => {
            if (!this.state.getCurrentLoc)
              this.setState({
                location: {
                  latitude: e.nativeEvent.coordinate.latitude,
                  longitude: e.nativeEvent.coordinate.longitude,
                  latitudeDelta: 0.009,
                  longitudeDelta: 0.004,
                },
              });
          }}>
          <Marker
            draggable={true}
            title="windows"
            coordinate={this.state.location}
            onSelect={event => {
            }}
          />
        </MapView>
        {/* <Text>{JSON.stringify(this.props.mine)}</Text> */}
        <View
          style={{
            elevation: 5,
            position: 'absolute',
            top: 20,
            alignSelf: 'flex-end',
            flex: 1,
            right: 30,
          }}>
          <Button
            buttonStyle={{borderRadius: 100, backgroundColor: 'black'}}
            onPress={() => {
              this.map.animateToRegion(this.state.currentLocation);
            }}
            icon={<Icon color="white" size={25} name="my-location" />}
          />
        </View>

        <View
          style={{
            elevation: 5,
            justifyContent: 'center',
            position: 'absolute',
            height: 200,
            bottom: 0,
            width: Dimensions.get('screen').width - 100,
            alignItems: 'center',
            backgroundColor: 'white',
            flex: 1,
          }}>
          <Input
            maxLength={12}
            value={this.state.phone_no}
            keyboardType="numeric"
            onChangeText={event => {
              this.setState({phone_no: event});
            }}
            label="Enter Phone Number"
            inputStyle={{fontSize: 16}}
            placeholder="Enter with country code Eg: +91"
            labelStyle={{fontSize: 10}}
            leftIcon={<Icon color="#30719f" name="phone" size={21} />}
          />
          
          <CheckBox
            onPress={() => {
              this.setState({getCurrentLoc: !this.state.getCurrentLoc});
              if (!this.state.getCurrentLoc) {
                this.setState({location: this.state.currentLocation});
              }
            }}
            checked={this.state.getCurrentLoc}
            containerStyle={{marginVertical: 10, backgroundColor: 'white'}}
            title="Use my current Location"
          />
          <Button
            disabled={!this.state.phone_no || this.state.phone_no.length < 12}
            buttonStyle={{backgroundColor: 'black', minWidth: 200}}
            titleStyle={{fontFamily: 'Montserrat-SemiBold'}}
            title="PROCEED"
            onPress={()=>{
              let position = this.state.getCurrentLoc ? this.state.currentLocation : this.state.location
              
              this.props.push_location(this.props.mine.chosen_hairstyle,this.props.mine.trimming,this.props.mine.title,this.props.mine.totalPrice,position,this.state.phone_no);
              // this.props.add_to_orders(this.props.mine.chosen_hairstyle,this.props.mine.trimming,this.props.mine.title,this.props.mine.totalPrice,position,this.state.phone_no);
              this.props.navigation.navigate("payment_transaction_page")}}
          />
        </View>
      </View>
    );
  }
}


// this.props.place_order(selectHairStyles[this.state.branch].image,this.state.checkTrimming,selectHairStyles[this.state.branch].title,this.state.price);
// chosen_hairstyle:action.url,
// trimming:action.trimming,
// title:action.title,
// totalPrice:action.price


const mapDispatch = (dispatch)=>{

  return{
    push_location:(item,trimming,title,totalPrice,location,phone_no,user_id)=>dispatch(PLACE_ORDER(item,trimming,title,totalPrice,location,phone_no)),
    // add_to_orders:(item,trimming,title,totalPrice,location,phone_no,user_id)=>dispatch(ADD_TO_ORDERS(item,trimming,title,totalPrice,location,phone_no))
  }
}

const mapProps = (state)=>{
  return {
    mine:state.order,
    user:state.getUser
  }
}
const styles = StyleSheet.create({
  mapStyle: {
    // ...StyleSheet.absoluteFill,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height - 100,
  },
});

MapsComponent['navigationOptions'] = () => {
  return {
    headerTransparent: true,
    headerTitle:""
  };
};
export default connect(mapProps,mapDispatch)(MapsComponent);
