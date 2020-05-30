import * as React from 'react';
import {View,Text, AsyncStorage, ActivityIndicator, ImageBackground} from 'react-native'
import { StyleSheet } from 'react-native';
import Axios from 'axios';
import { ListItem, Divider,Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';


class BarberInfo extends React.Component {


    state={
        data:[]
    }

 getUser=async()=>{
    let token = await AsyncStorage.getItem('loginToken')
    await Axios.get('https://dbformongo.eu-gb.cf.appdomain.cloud/getUser',{headers:{"auth-token":token}}).then(res=>{
        let k = [];
         for(let key in res.data){
            k.push({item:key,value:res.data[key]})
        }

        
        this.setState({data:k});
    })
 }

    componentDidMount(){
        this.getUser();
        
    }

    
// [Fri May 22 2020 11:59:44.750]  LOG      [{"item": "_id", "value": "5eb95ea421fb540e3441fdf8"}, {"item": "username", "value": "pkc"}, {"item": "selectType", "value": "customer"}, {"item": "phone_no", "value": 67948484}, {"item": "email", "value": "pkc"}, {"item": "password", "value": "$2a$10$32tWALuB.LG7nNgu2C.2xO6ZzdDanbDCOVyE9kDszH1fDnBIYgQbW"}, {"item": "createdAt", "value": "2020-05-11T14:18:12.159Z"}, {"item": "updatedAt", "value": "2020-05-11T14:18:12.159Z"}, {"item": "__v", "value": 0}]
    render(){
        return(
            <ScrollView style={styles.container}>
                <ImageBackground source={require("./../../assets/images/Background.png")} imageStyle={{opacity:0.5,flex:1}} style={{flex:1}}>
                  <View style={{marginTop: 40, marginLeft: 20}}>
                    <Text style={{fontSize: 30, fontFamily: 'Montserrat-Bold'}}>
                        Customer Info
                    </Text>
                    </View>

                <View style={{marginTop:27,padding:10}}>
                {this.state.data.map((item)=>
                    {
                    return (
                    
                        <View style={{flexDirection:"row",padding:10}}>
                        <Text style={{...styles.fontA,fontWeight:"bold"}}>{String(item.item).toLocaleUpperCase()}</Text>
                        <Text  style={styles.fontB}>{item.value}</Text>
                        <Divider></Divider>
                        </View>
                   
                    )

                    }
                )}
                </View>    

                <View style={{marginTop:20,padding:10}}>
                    <Button title={"Logout"} onPress={()=>this.props.screenProps.signout()}></Button>
                </View> 
                </ImageBackground>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        // padding:20
    },
    fontA:{
            flex:1,
            color:"grey",
            fontFamily:"Montserrat-Regular"
         },

         fontB:{
            flex:1,
            color:"grey",
            fontFamily:"Montserrat-SemiBold"
         }

})

export default BarberInfo;

