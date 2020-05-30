
import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';




class AuthLoadingScreen extends React.Component {

  

  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('loginToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    // await Axios.get('/getUser',
    // console
    

    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };


  

  // Render any loading content that you like here
  render() {
    return (
      // <View  style={styles.container}>
        <LinearGradient style={styles.container} colors={["#7b4397",'#00dbde']}  start={{x: 0, y: 1}} end={{x: 1, y: 0}}>
          <ImageBackground source={require("./../../assets/images/Background.png")} resizeMode="contain" style={{width:Dimensions.get('screen').width,height:Dimensions.get('window').height,alignItems:"center",justifyContent:"center"}}>
        <ActivityIndicator  color="white" size={50} />
        <StatusBar barStyle="light-content" backgroundColor="black"/>
        </ImageBackground>
        </LinearGradient>
      // </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#3671bf"

    }
})

const mapStateToProps = state => {
  return {
    getAccount:state.getUser
  }
}
export default connect(mapStateToProps,null)(AuthLoadingScreen);