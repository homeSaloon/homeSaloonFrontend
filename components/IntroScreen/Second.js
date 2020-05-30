import * as React from "react";
import { View,Text } from "react-native";
import { Divider } from "react-native-elements";





class Second extends React.Component{
    render(){
        return (
            <View
            style={{
              flex: 1,
              padding: 20,
              justifyContent: 'center',
              // alignItems:"center"
            }}>
            <Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: 25,marginVertical:20}}>
              Why this App Second?
            </Text>
            <Divider></Divider>
          
          </View>
        )
    }
}

export default Second;