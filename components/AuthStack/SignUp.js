import * as React from 'react';

import {
  View,
  Image,
  StyleSheet,
  StatusBar,
  Keyboard,
  Text,
  ScrollView,
  Alert,
  ImageBackground,
  Dimensions,
} from 'react-native';

import UIButton from './../../UIComponents/UIButton';
import UIInput from './../../UIComponents/UIInput';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Formik} from 'formik';

import {Picker} from '@react-native-community/picker';
import Axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import io from "socket.io-client";


const socket = io("https://dbformongo.eu-gb.cf.appdomain.cloud");

const SignUp = props => {
  const [state, setState] = React.useState({
    language: 'Customer',
  });

  

  let Empty = () => <Text style={{color: 'white'}} />;

  React.useEffect(()=>{

  

  
    

    
  },[])

  return (
    <ScrollView style={{backgroundColor: '#3671bf'}} contentContainerStyle={{flex:1}}>
      <LinearGradient
        colors={['#7b4397', '#00dbde']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
        style={styles.container}>
        {/* <View style={styles.container}> */}
        <TouchableWithoutFeedback>
        <ImageBackground source={require("./../../assets/images/Background.png")} resizeMode="contain" style={{width:Dimensions.get('screen').width,height:Dimensions.get('window').height,alignItems:"center",justifyContent:"center"}}>
          <StatusBar backgroundColor="black" barStyle="light-content" />
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('./../../assets/images/Logo3.png')}
              resizeMode="contain"
              style={styles.logo}
            />
          </View>
          <View style={{alignItems: 'center'}}>
            <Formik
              initialValues={{
                username: '',
                password: '',
                email: '',
                phone_no: 0,
                doctor_id: '',
                selectType: 'customer',
              }}
              onSubmit={async (data, {setSubmitting}) => {
                setSubmitting(true);
                //make async call here

                await Axios.post('https://dbformongo.eu-gb.cf.appdomain.cloud/signup', data)
                  .then(res => {
                    if(res.data.selectType == "barber"){
                      socket.emit("barberUpdated");
                    }

                    Alert.alert(
                      'Registered Successfully',
                      'Login with your details',
                      [
                        {
                          text: 'Ok',
                          onPress: () => props.navigation.navigate('login'),
                        },
                      ],
                    );
                  })

                setSubmitting(false);
              }}
              validate={values => {
                const errors = {};
                //FIXME: Validations in Signupform
                                
                  if (values.username === ''){
                    errors.username = 'Username is required'
                  }

                  if (values.password === ''){
                    errors.password = 'Password is required'
                  }

                  
                if (!values.email.includes('@gmail.com')) {
                  errors.email = 'Not a valid email';
                } else if (values.email === '') {
                  errors.email = 'email name is required';
                }


                if (values.selectType == 'doctor')
                  if (values.doctor_id === '')
                    errors.doctor_id = 'Student ID is required';

                 if (values.phone_no.length > 12) {
                  errors.phone_no = 'Cant exceed more than 12 digits';
                } else if (values.phone_no === '') {
                  errors.phone_no = 'Phone number is required';
                }



                return errors;
              }}>
              {({
                values,
                setFieldValue,
                handleChange,
                errors,
                touched,
                handleBlur,
                handleSubmit,
                isSubmitting,
                isValid,
              }) => (
                <View >
                  <Text
                    style={{
                      textAlign: 'left',
                      marginLeft: 10,
                      color: 'white',
                    }}>
                    Register as{' '}
                    <Text style={{fontStyle: 'italic'}}>
                      (longpress to select)
                    </Text>
                  </Text>
                  <View style={{alignItems: 'center', marginBottom: 50}}>
                    <View style={styles.pickerStyles}>
                      <Picker
                        mode="dialog"
                        placeholder="drone"
                        selectedValue={state.language}
                        prompt="Be careful you cant change it again!"
                        onValueChange={(itemValue, itemIndex) => {
                          setFieldValue('selectType', itemValue);
                          setState({language: itemValue});
                          // (values.staff_id = ''),
                          //   (values.student_id = ''),
                          //   (values.management_id = '');
                        }}
                        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
                        <Picker.Item label="Customer" value="customer" />
                        <Picker.Item label="Barber" value="barber" />
                        <Picker.Item label="Doctor" value="doctor" />
                      </Picker>
                    </View>

                    {values.selectType == 'doctor' ? (
                      <UIInput
                        placeholder="Doctor ID "
                        icon_name="hash"
                        onChangeText={handleChange('doctor_id')}
                        onBlur={handleBlur('doctor_id')}
                        errorMessage={
                          errors.doctor_id && touched.doctor_id
                            ? errors.doctor_id
                            : ''
                        }
                      />
                    ) : null}

                    <UIInput
                      placeholder="Username"
                      icon_name="user"
                      onChangeText={handleChange('username')}
                      onBlur={handleBlur('username')}
                      errorMessage={
                        errors.username && touched.username
                          ? errors.username
                          : ''
                      }
                    />

                    <UIInput
                      placeholder="Phone Number"
                      icon_name="phone"
                      onChangeText={handleChange('phone_no')}
                      onBlur={handleBlur('phone_no')}
                      keyboardType="number-pad"
                      // defaultValue="91"
                      errorMessage={
                        errors.phone_no && touched.phone_no
                          ? errors.phone_no
                          : ''
                      }
                    />

                    <UIInput
                      placeholder="Email"
                      icon_name="mail"
                      onChangeText={handleChange('email')}
                      // keyboardType="numeric-keyboard" //Fix It
                      onBlur={handleBlur('email')}
                      errorMessage={
                        errors.email && touched.email ? errors.email : ''
                      }
                    />

                    <UIInput
                      placeholder="Password"
                      icon_name="key"
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      errorMessage={
                        errors.password && touched.password
                          ? errors.password
                          : ''
                      }
                    />

                    <Empty />

                    <UIButton
                      disabled={!isValid || isSubmitting}
                      onPress={() => handleSubmit()}
                      title="SIGNUP"
                    />
                    <View style={{flexDirection: 'row', marginVertical: 0}}>
                      <Text style={{color: 'white'}}>
                        Already have an Account?
                      </Text>
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: 'bold',
                          width: 40,
                        }}
                        onPress={() =>
                          props.navigation.navigate({
                            routeName: 'login',
                            params: {
                              title: 'signup',
                            },
                          })
                        }>
                        Login
                      </Text>
                    </View>
                  </View>
                </View>
              )}

            </Formik>
          </View>
          </ImageBackground>
        </TouchableWithoutFeedback>
      </LinearGradient>
    </ScrollView>
  );
};

export default SignUp;

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
    width: 300,
    height: 150,
    marginTop: 20,
  },
  pickerStyles: {
    width: 330,
    height: 50,
    backgroundColor: 'white',
    marginVertical: 5,
    elevation:4,
    borderRadius:2
  },
});
