import * as React from 'react';

import {Button,Text, Divider} from "react-native-elements"
import {View,StyleSheet, ActivityIndicator,BackHandler, Image, Alert} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

// import {Dispatch} from "redux"
import { connect } from 'react-redux';
import Snackbar from 'react-native-snackbar';
import io from "socket.io-client";

class Payment_Transaction_Page extends React.Component{

    constructor(props){
        super(props);

   
    }
     
    giveIt = () =>{
        //  this.props.navigation.navigate("events");
        Alert.alert("Invalid Operation","You will Be Reddirected to Home !",[{text:"Ok",onPress:()=>{this.props.navigation.navigate("customer_dashboard")}},{text:"cancel"}]);
        return true;
    }

    componentDidMount(){

             
        this.socket = io("https://dbformongo.eu-gb.cf.appdomain.cloud");

        this.socket.emit("orderDetails",this.props.mine)    
        // this.socket.on("orderDetails", data => {
            
        // });

        
        Snackbar.show({duration:5000,text:"Order Successfully placed",action:{text:"Back to Home",onPress:()=>this.props.navigation.navigate("customer_dashboard")}})
        
         this.backHandler = BackHandler.addEventListener("hardwareBackPress",this.giveIt)

    }

    componentWillUnmount(){
        this.backHandler.remove();
    }

 

    // componentWillUnmount(){
    //     BackHandler.removeEventListener("hardwareBackPress",this.giveIt)
        
    // }
  

    
   render(){
       let text = this.props.mine.title;
       return(
           <View style={{flex:1,backgroundColor:"white",paddingVertical:40,paddingHorizontal:20}}>
                <View style={{marginVertical:20}}>
                <Text style={{fontSize: 30,fontFamily:"Montserrat-Bold"}}>Order Details</Text>
                <Text style={{marginVertical:5}}>Order has been successfully placed</Text>
                {/* {
                    this.props.mine.location.latitude !== undefined && this.props.mine.location.longitude !== undefined?
                <Text style={{marginVertical:5}}>{"Location:   " + `{x:${this.props.mine.location.latitude} y: ${this.props.mine.location.longitude} }`}</Text> : null
                } */}
                </View>


             
                    <View style={{marginTop:20}}>
                         <Text style={{letterSpacing:2,fontFamily:"Montserrat-SemiBold"}}>YOUR ORDERS</Text>
                         
                         <View style={{marginTop:20,flexDirection:"row"}}>
                                <Image source={{uri:this.props.mine.chosen_hairstyle+"?raw=true"}} style={{width:150,height:150,borderRadius:10,marginRight:20,marginTop:5}}></Image>
                                <View style={{flex:1}}>
                                    <Text style={{fontSize:16,fontFamily:"Montserrat-SemiBold",textTransform:"uppercase"}}>Selected Hair Style :
                                        
                                        
                                    </Text>
                                    <Text style={{marginVertical:5}}>{String(text).replace("-"," ")}</Text>

                                    <Text style={{fontSize:16,fontFamily:"Montserrat-SemiBold",textTransform:"uppercase",marginTop:5}}>TRIMMING :
                                        
                                        
                                        </Text>
                                        <Text style={{marginTop:0}}>{this.props.mine.trimming ? "Yes" : "No"}</Text>


                                        <Text style={{fontSize:16,fontFamily:"Montserrat-SemiBold",textTransform:"uppercase",marginTop:10}}>PHONE NO :
                                        
                                        
                                        </Text>
                                        <Text style={{marginTop:0}}>{this.props.mine.phone_no}</Text>
                                </View>
                            
                         </View>

                        <Divider style={{marginVertical:20}}></Divider>

                        {/* <Image  source={require("./../../assets/images/loading.gif")} style={{width:60,height:60}}></Image> */}
                        {/* <Text> {JSON.stringify(this.props.mine)}</Text> */}

                         <View>
                             <Text style={{letterSpacing:2,fontFamily:"Montserrat-SemiBold",marginBottom:20}}>Invoice</Text>

                                <View style={{flexDirection:"row",marginVertical:5}}>
                                    <Text style={{fontSize:16,flex:1}} >Haircut</Text>
                                    <Text style={{fontSize:16,fontWeight:"bold"}}>{ this.props.mine.trimming ? (this.props.mine.totalPrice-30)+"$" : (this.props.mine.totalPrice)+"$"  }</Text>
                                </View>
                            
                                <View style={{flexDirection:"row",marginVertical:5}}>
                                    <Text style={{fontSize:16,flex:1}} >Trimming</Text>
                                    <Text style={{fontSize:16,fontWeight:"bold"}}>{this.props.mine.trimming ? 30+"$" : 0+"$" }</Text>
                                </View>

                                <Divider style={{marginVertical:15}}></Divider>
                                <View style={{flexDirection:"row",marginVertical:5}}>
                                    <Text style={{fontSize:17,flex:1,fontWeight:"bold"}} >Total Price</Text>
                                    <Text style={{fontSize:17,fontWeight:"bold"}}>{this.props.mine.totalPrice +"$" }</Text>
                                </View>

                         </View>

                         
                    </View>
               
           </View>
        
       )
   }
}

const mapStateToProps = (state) => {
    return {
        mine:state.order
        
    }
}


Payment_Transaction_Page["navigationOptions"] = ()=>{
    return{
        headerTransparent: true,
        headerTitle:""
        
    }
}

export default connect(mapStateToProps,null)(Payment_Transaction_Page);