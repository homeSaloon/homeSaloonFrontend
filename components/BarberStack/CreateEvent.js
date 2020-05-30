import * as React from 'react';
import {Formik} from 'formik';
import UIInput from '../../UIComponents/UIInput';

import {Input, Button, Slider, Text, Overlay, Divider} from 'react-native-elements';
import {
  View,
  AsyncStorage,
  Keyboard,
  Dimensions,
  StyleSheet,
} from 'react-native';
import UIButton from '../../UIComponents/UIButton';
import {ButtonGroup} from 'react-native-elements';
import {Picker} from '@react-native-community/picker';
import Axios from 'axios';
import {useDispatch} from 'react-redux';
import {
  PUSH_EVENT_FUNC,
  MODIFY_EVENT_FUNC,
  DELETE_EVENT_FUNC,
} from '../../redux/actions/actions';

import DateTimePicker from '@react-native-community/datetimepicker';
import MapView, {Marker} from 'react-native-maps';

import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

const CreateEvent = props => {
  const [state, setState] = React.useState(0);
  const buttons = ['Ist', 'IInd', 'IIIrd', 'IVth'];
  const dispatch = useDispatch();
  const [fromdateAndTime, setfromdateAndTime] = React.useState(new Date());
  const [todateAndTime, settodateAndTime] = React.useState(new Date());
  const [mode, setMode] = React.useState('date');
  const [mode2, setMode2] = React.useState('date');
  const [show, setShow] = React.useState(false);
  const [show2, setShow2] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);
  const postData = async data => {
    dispatch(PUSH_EVENT_FUNC(data));
  };

  const modifyData = async data => {
    dispatch(MODIFY_EVENT_FUNC(data));
  };

  const deleteItem = async data => {
    dispatch(DELETE_EVENT_FUNC(data));
  };

  let branches = [
    {viewValue: 'CSE', value: 'cse'},
    {viewValue: 'ECE', value: 'ece'},
    {viewValue: 'EEE', value: 'eee'},
    {viewValue: 'IT', value: 'it'},
    {viewValue: 'Mech', value: 'mech'},
    {viewValue: 'Civil', value: 'civil'},
  ];

  let initialValues = {
    topicName: '',
    className: '',
    selectYear: 0,
    selectBranch: 0,
    fromdateAndTime: fromdateAndTime,
    todateAndTime: todateAndTime,
  };
 

  // React.useEffect(()=>{
  //   let editedItem = props.editItem;
  //   // if(props.editItem !== null){

  //     setLoading(false)
  //   // }

  // },[])

  const [branch, setBranch] = React.useState({
    branch: 0,
  });

  const [locationModal, setLocationModal] = React.useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || fromdateAndTime;
    setShow(Platform.OS === 'ios');
    
    setfromdateAndTime(currentDate);
  };

  const onChange2 = (event, selectedDate) => {
    const currentDate = selectedDate || todateAndTime;
    setShow2(Platform.OS === 'ios');
    settodateAndTime(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showMode2 = currentMode => {
    setShow2(true);
    setMode2(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showDatepicker2 = () => {
    showMode2('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  const showTimepicker2 = () => {
    showMode2('time');
  };

  const onChangeLocationModal = () => {
    setLocationModal(!locationModal);
  };

  const [location, setLocation] = React.useState({
    latitude: 17.2245458,
    longitude: 78.5888268,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  // if(isLoading){
  //   return <Text>Loading</Text>
  // }

  if (props.editItem !== null) {
    initialValues = {
      topicName: props.editItem.topicName,
      className: props.editItem.className,
      selectYear: props.editItem.selectYear,
      selectBranch: Number(props.editItem.selectBranch),
      fromdateAndTime: props.editItem.fromdateAndTime,
      todateAndTime: props.editItem.todateAndTime,
    };

   
  }
  React.useEffect(() => {
    if (props.editItem !== null) {
      setfromdateAndTime(new Date(props.editItem.fromdateAndTime));
      settodateAndTime(new Date(props.editItem.todateAndTime));
      setBranch({branch: props.editItem.selectBranch});
    }
    
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={data => {

        props.editItem !== null
          ? modifyData({
              ...data,
              modifyID: props.editItem._id,
              fromdateAndTime: fromdateAndTime,
              todateAndTime: todateAndTime,
            })
          : postData({
              ...data,
              fromdateAndTime: fromdateAndTime,
              todateAndTime: todateAndTime,
              location: location,
            });
        props.changeNum();

        props.closeModal();
      }}
      validate={values => {
        const errors = {};
        if (values.topicName === '') {
          errors.topicName = 'Topic Name is required';
        }

        if (values.className === '') {
          errors.className = 'Class Name is required';
        } else if (values.className.includes(' ')) {
          errors.className = 'No spaces';
        }

        if (values.selectClass === '') {
          errors.selectClass = 'Class Name is required';
        }

        return errors;
      }}>
      {({
        values,
        isValid,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
        handleSubmit,
        errors,
      }) => (
        // <UIInput placeholder="ClassName" onChange={handleChange} onBlur={handleBlur}></UIInput>

        <View
          style={{
            alignItems: 'stretch',
            flex: 1,
            justifyContent: 'center',
            marginHorizontal: 10,
          }}>
          <Overlay
            isVisible={locationModal}
            onBackdropPress={onChangeLocationModal}
            fullScreen>
            {/* <Text style={{position:"absolute",top:50,right:25,zIndex:100}}>Drone</Text> */}
            <MapView
              style={styles.mapStyle}
              region={location}
              onPress={e =>
                setLocation({
                  latitude: e.nativeEvent.coordinate.latitude,
                  longitude: e.nativeEvent.coordinate.longitude,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,
                })
              }>
              <Marker
                title="windows"
                coordinate={location}
                onSelect={event => {
                }}
              />
            </MapView>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                position: 'absolute',
                zIndex: 100,
                bottom: 20,
                marginHorizontal: 20,
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              <Button
                title="Set Location"
                raised
                onPress={onChangeLocationModal}
                icon={<Icon name="check" size={20} color="white" />}
                containerStyle={{flex: 1, marginHorizontal: 20}}
                buttonStyle={{borderRadius: 5}}
              />
              <Button
                title="Cancel"
                raised
                onPress={onChangeLocationModal}
                icon={<Icon name="x" size={20} color="white" />}
                containerStyle={{flex: 1}}
                buttonStyle={{backgroundColor: 'red', borderRadius: 5}}
              />
            </View>
          </Overlay>
            <Text style={{color:"#279df1",marginTop:20,fontSize:30,fontWeight:"200",textAlign:"center",}}>{props.editItem !== null ?   "Edit Event" : "Create Event"}</Text>
            <Divider style={{backgroundColor:"rgba(48, 48, 48,0.5)",height:1,marginVertical:20}}></Divider>
          <Text
            style={{
              textAlign: 'left',
              fontSize: 16,
              fontWeight: 'bold',
              marginLeft: 10,
              color: 'rgba(48, 48, 48,0.5)',
            }}>
            Register as{' '}
            <Text style={{fontStyle: 'italic'}}>(longpress to select)</Text>
          </Text>
          <View style={{alignItems: 'center', margin: 10}}>
            
            <View style={buttonStyles2.pickerStyles}>
              <Picker
                style={{color: 'rgba(48, 48, 48,0.7)', fontSize: 23}}
                mode="dialog"
                placeholder="drone"
                selectedValue={branches[branch.branch].value}
                prompt="Be careful you cant change it again!"
                onValueChange={(itemValue, itemIndex) => {
                  setFieldValue('selectBranch',itemIndex);
                  setBranch({branch: itemIndex});
                }}
                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                onPress={event => {
                }}>
                {branches.map(item => {
                  return (
                    <Picker.Item label={item.viewValue} value={item.value} />
                  );
                })}

                {/*                                                 
                                                <Picker.Item label="ECE" value="ece" />
                                                <Picker.Item label="EEE" value="eee" />
                                                <Picker.Item label="EEE" value="eee" /> */}
              </Picker>
            </View>
          </View>

          <Input
            defaultValue={initialValues.topicName}
            label={'Topic Name'}
            placeholder="Topic Name"
            onChangeText={handleChange('topicName')}
            onBlur={handleBlur('topicName')}
            errorMessage={
              errors.topicName && touched.topicName ? errors.topicName : ''
            }
            errorStyle={{color: 'red'}}
          />
          <Text />
          <Input
          autoCapitalize="characters"
          
            defaultValue={initialValues.className}
            label={'ClassName'}
            placeholder="Class"
            onChangeText={handleChange('className')}
            onBlur={handleBlur('className')}
            errorMessage={
              errors.className && touched.className ? errors.className : ''
            }
            errorStyle={{color: 'red'}}
          />
          <View
            style={{marginTop: 20, alignItems: 'center', flexDirection: 'row'}}>
            <Text style={{marginLeft: 10, fontSize: 16}}>Year:</Text>
            <ButtonGroup
              selectedButtonStyle={{backgroundColor: '#26a1f5'}}
              selectedIndex={values.selectYear}
              buttons={buttons}
              containerStyle={{width: 300}}
              onPress={selectedIndex =>
                setFieldValue('selectYear', selectedIndex)
              }
            />
          </View>
          <View
            style={{
              marginTop: 20,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'stretch',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'stretch',
                justifyContent: 'space-evenly',
              }}>
              <Button
                title="From Date"
                onPress={showDatepicker}
                buttonStyle={{width: 100, backgroundColor: '#26a1f5'}}
                style={{flex: 1}}
              />
              <Button
                title="Time"
                onPress={showTimepicker}
                buttonStyle={{minWidth: 75, backgroundColor: '#26a1f5'}}
                style={{flex: 1}}
              />
              <Button
                title="To Date"
                onPress={showDatepicker2}
                buttonStyle={{minWidth: 75, backgroundColor: '#26a1f5'}}
                style={{flex: 1}}
              />
              <Button
                title="Time"
                onPress={showTimepicker2}
                buttonStyle={{minWidth: 75, backgroundColor: '#26a1f5'}}
                style={{flex: 1}}
              />
              {/* <Button
                title="Set Location"
                onPress={onChangeLocationModal}
                buttonStyle={{minWidth: 120, backgroundColor: '#26a1f5'}}
                style={{flex: 1}}
              /> */}
            </View>
            <Button
              title="Set Location"
              onPress={onChangeLocationModal}
              buttonStyle={{
                minWidth: 120,
                backgroundColor: '#26a1f5',
                marginTop: 10,
                marginHorizontal: 10,
              }}
              style={{flex: 1}}
            />
          </View>

          {/* <Text>{fromdateAndTime.toString()}</Text> */}

          {show ? (
            <DateTimePicker
            
              testID="dateTimePicker"
              timeZoneOffsetInMinutes={0}
              value={fromdateAndTime}
              mode={mode}

              is24Hour={false}
              display="spinner"
              onChange={onChange}
            />
          ) : null}

          {show2 ? (
            <DateTimePicker
              testID="dateTimePicker"
              timeZoneOffsetInMinutes={0}
              value={todateAndTime}
              mode={mode2}
              is24Hour={false}
              display="spinner"
              onChange={onChange2}
            />
          ) : null}

          {/* <Slider  maximumValue={50} step={1} onValueChange={(value)=>setFieldValue("no_of_students",value)}  style={{marginTop:20,marginHorizontal:10}} thumbTintColor="#3671bf" maximumTrackTintColor="#3671bf" ></Slider> */}

          {/* <Text style={{textAlign:"center"}}>No of Students in Class: {values.no_of_students}</Text> */}

          {props.editItem !== null ? (
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 30,
                alignItems: 'stretch',
                justifyContent: 'space-evenly',
              }}>
              <Button
                disabled={!isValid}
                title={props.editItem !== null ? 'Save Topic' : 'Add Topic'}
                buttonStyle={buttonStyles2.buttonStyle}
                titleStyle={buttonStyles2.titleStyle}
                linearGradientProps={{
                  colors: ['#279df1', '#465fbe'],
                  start: {x: 0, y: 0.5},
                  end: {x: 1, y: 1},
                }}
                ViewComponent={LinearGradient}
                onPress={() => {
                  handleSubmit();
                }}
              />
              <Button
                linearGradientProps={{
                  colors: ['#e3116c',"#f35a33"],
                  start: {x: 0, y: 0.5},
                  end: {x: 1, y: 1},
                }}
                ViewComponent={LinearGradient}
                disabled={!isValid}
                title={'Delete'}
                buttonStyle={{
                  ...buttonStyles2.buttonStyle,
                  backgroundColor: 'red',
                  marginVertical: 0,
                }}
                titleStyle={buttonStyles2.titleStyle}
                onPress={() => {
                  deleteItem(props.editItem);
                  props.closeModal();
                }}
              />
            </View>
          ) : (
            <Button
              disabled={!isValid}
              linearGradientProps={{
                colors: ['#279df1', '#465fbe'],
                start: {x: 0, y: 0.5},
                end: {x: 1, y: 0.5},
              }}
              ViewComponent={LinearGradient}
              title={'Add Topic'}
              buttonStyle={{...buttonStyles2.buttonStyle, marginVertical: 30,marginHorizontal:10}}
              titleStyle={buttonStyles2.titleStyle}
              onPress={() => {
                handleSubmit();
              }}
            />
          )}
        </View>
      )}
    </Formik>
  );
};

export default CreateEvent;

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
    width: Dimensions.get('screen').width - 60,
    height: 50,
    backgroundColor: 'white',
    marginVertical: 5,
    borderWidth: 1,
    borderColor: 'rgba(48, 48, 48,0.4)',
    borderRadius: 3,
  },
};

const styles = {
  mapStyle: {
    // ...StyleSheet.absoluteFill,
    width: Dimensions.get('screen').width / 1,
    height: Dimensions.get('screen').height / 1,
  },
};
