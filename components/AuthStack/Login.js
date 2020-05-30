import * as React from 'react';

import {
  Text,
  View,
  Image,
  StyleSheet,
  StatusBar,
  Keyboard,
  AsyncStorage,
  Alert,
  ImageBackground,
  Dimensions,
} from 'react-native';

import UIButton from './../../UIComponents/UIButton';
import UIInput from './../../UIComponents/UIInput';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Formik, isString} from 'formik';
import DeviceInfo, { getDeviceId } from 'react-native-device-info'
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { GET_USER_ACCOUNT_FUNC } from '../../redux/actions/actions';
import LinearGradient from 'react-native-linear-gradient';

const Login = props => {

  const dispatch = useDispatch();
  React.useEffect(()=>{
  })
 

  const _signOutAsync = async () => {
    await AsyncStorage.clear();
    props.navigation.navigate('Auth');
  };

  let Empty = () => <Text style={{color: 'white'}} />;

  return (
    // <LinearGradient colors={["#B24592",'#F15F79']}  start={{x: 0, y: 1}} end={{x: 1, y: 0}} style={styles.container} >
      <LinearGradient colors={["#7b4397",'#00dbde']}  start={{x: 0, y: 1}} end={{x: 1, y: 0}} style={styles.container}> 
      
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ImageBackground source={require("./../../assets/images/Background.png")} resizeMode="contain" style={{width:Dimensions.get('screen').width,height:Dimensions.get('window').height,alignItems:"center",justifyContent:"center"}}>
      <StatusBar backgroundColor="black"    barStyle="light-content" />
        <View style={{elevation:6}}>
        <ImageBackground
          // source={require('./../../assets/images/Logo-wo-background.png')}
          source={require('./../../assets/images/Logo3.png')}
          resizeMode="center"
          style={{...styles.logo}}
        />
        </View>
        <View style={{alignItems: 'center'}}>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={async (data, {setSubmitting}) => {
              setSubmitting(true);

              Axios.post('https://dbformongo.eu-gb.cf.appdomain.cloud/login', {
                
                email: data.email,
                password: data.password,
              })
                .then(res => {
                  

                 

                  const _signInAsync = async data => {
                    await AsyncStorage.setItem('loginToken', data);
                    
                 
                     props.navigation.navigate('App');
                   };

              
                  _signInAsync(res.headers['auth-token']);
                  dispatch(GET_USER_ACCOUNT_FUNC(res.data));
                  
                  
                  
                  let val = isString(res.data);
                  if (val) {
                    Empty = () => (
                      <Text style={{color: 'white'}}>{res.data}</Text>
                    );
                  }
                 //here token is coming from server
                })

             
                setSubmitting(false);
             
            }}
            validate={values => {
              const errors = {};

              if (!values.email.includes('@gmail.com')) {
                errors.email = 'Not a valid email || Currently Support Gmail';
              } else if (values.email === '') {
                errors.email = 'email name is required';
              }

              if (values.password == '') {
                errors.password = 'Password is required';
              }
              return errors;
            }}>
            {({
              values,
              handleChange,
              errors,
              touched,
              handleBlur,
              handleSubmit,
              isSubmitting,
              isValid,
            }) => (
              <View style={{alignItems: 'center'}}>
                <UIInput
                  placeholder="Email"
                  icon_name="mail"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  errorMessage={
                    errors.email && touched.email ? errors.email : ''
                  }
                />

                <UIInput
                  placeholder="Password"
                  icon_name="lock"
                  secureTextEntry={true}
                  right_icon_name="eye-off"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  errorMessage={
                    errors.password && touched.password ? errors.password : ''
                  }
                />

                <Empty />

                <UIButton
                  disabled={!isValid || isSubmitting}
                  onPress={handleSubmit}
                  title="LOGIN"
                />
                {/* <UIButton onPress={_signOutAsync} title="Remove Token" /> */}
                {/* <UIButton  onPress={()=>dispatch(removeUserToken())}title="LOGIN"  ></UIButton> */}
              </View>
            )}
          </Formik>
        </View>

        <View style={{alignItems: 'center'}}>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <Text style={{color: 'white'}}>Don`t have an Account?</Text>
            <Text
              style={{color: 'white', fontWeight: 'bold'}}
              onPress={() =>
                props.navigation.navigate({
                  routeName: 'signup',
                  params: {
                    title: 'login',
                  },
                })
              }>
              {' '}
              Signup!
            </Text>
          </View>
          <View style={{marginVertical: 0}}>
            <Text
              style={{color: 'white'}}
              onPress={() =>
                props.navigation.navigate({
                  routeName: 'forgotPassword',
                  params: {
                    title: 'login',
                  },
                })
              }>
              Forgot password?
            </Text>
          </View>
        </View>
              </ImageBackground>
      </TouchableWithoutFeedback>

    </LinearGradient>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3671bf',
  
    // backgroundColor:"red",
    // back
  },
  logo: {
    width: 350,
    height: 150
  },
});
