


import React, {useEffect} from 'react';
import {StyleSheet, View, StatusBar, Text, Dimensions, Alert, AsyncStorage} from 'react-native';

import {Provider} from 'react-redux';
import FullStack from './components/FullStack';
import Store from './redux/store';
import { Overlay, Divider, Button } from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import First from './components/IntroScreen/First';
import Second from './components/IntroScreen/Second';





// const introStack = createAppContainer(


// )



const App = props => {

  const [isOpen,setModal] = React.useState(true);
  const [sfirst,setFirst] = React.useState("no")
  const getIt = async()=>{
    // await AsyncStorage.clear();
    let g  = await AsyncStorage.getItem("firstTimeOpen")
      setFirst(g);
  }
  React.useEffect(()=>{

    console.disableYellowBox = true
    
    getIt();

    
 
  })


  const modalClose = async () => {
    console.log('windows')
    setModal(false);
    await AsyncStorage.setItem("firstTimeOpen","yes");
    setFirst("yes")
  }

  return (
    <Provider store={Store}>
      <View style={styles.container}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />

        {sfirst == null ?

        <Overlay  isVisible={isOpen}  overlayStyle={{padding:0}} transparent={true}>
          <First closeModal={modalClose}></First>
          {/* <Button title={"Ok"} onPress={()=>setModal(false)} ></Button> */}
        </Overlay>
        : null
        }
        <FullStack />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:"green"

    // marginVertical:40
    
  },
  postSection: {
    color: 'purple',
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 20,
    lineHeight: 30,
    textAlign: 'justify',
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },



});

export default App;
