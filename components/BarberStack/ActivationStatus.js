import * as React from "react";
import { View,Text,StyleSheet, AsyncStorage, Alert, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Axios from "axios";

 import moment from "moment"
// import CountDown from "react-native-countdown-component";
import CountDown from "./Countdown"
import { Divider } from "react-native-elements";


let padToTwo = (number) => (number <= 9 ? `0${number}`: number);

class ActivationStatus extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            min: 0,
            sec: 0,
            msec: 0,
            startDate:0,
            endDate:0,
            totalDuration:172800,
            show:false
        }
}




     getUser = async() =>{
        const token = await AsyncStorage.getItem("loginToken");
        await Axios.get('https://dbformongo.eu-gb.cf.appdomain.cloud/getUser',{headers:{"auth-token":token}}).then(res=>{
            return res.data
        }).then(({startDate,endDate})=>{

            this.setState({startDate:new Date(startDate).getTime(),endDate: new Date(endDate).getTime()});


            const timeStart = moment(Date.now());
            const timeEnd = moment(this.state.endDate);
            
            const diff = timeEnd.diff(timeStart);
            const diffDuration = moment.duration(diff);
    
            var hours = parseInt(diffDuration.asHours());
            var minutes = parseInt(diffDuration.minutes());
            var seconds = parseInt(diffDuration.seconds());
            var d = hours * 60 * 60 + minutes * 60 + seconds;
    
            // this.setState({totalDuration:parseInt(d)});
            this.setState({show:true,totalDuration:d});

            
          
          
            
            
        })
    }

    componentDidMount(){
        
        this.getUser();

      
   
    }


    

    render(){
        return(
        <ImageBackground imageStyle={{overlayColor:'green',opacity:0.6}} source={require("./../../assets/images/Background.png")} style={styles.container}>

            <View style={{marginVertical: 20,marginTop:40, marginLeft: 20}}>
              <Text style={{fontSize: 30, fontFamily: 'Montserrat-Bold',textAlign:"center"}}>
                Available Time
              </Text>
              {/* <Text style={{marginVertical: 5}}>Book what you love</Text> */}
              <Divider></Divider>
            </View>

            { this.state.show ?
            <CountDown   digitStyle={{backgroundColor:"#449fe7",elevation:3}}
             digitTxtStyle={{color:"white",fontFamily:"Montserrat-Regular"}}
                until={this.state.totalDuration} timetoShow={('D','H', 'M', 'S')} size={25}  
                        onFinish={async() =>
                        
                        { 
                            let token = await AsyncStorage.getItem("loginToken")
                            await Axios.post("https://dbformongo.eu-gb.cf.appdomain.cloud/reactivateUser",{
                                reactivate:true
                            },{headers:{"auth-token":token}})
                            
                            Alert.alert("Time Reached out","Consult Doctor,Get Tested and Activate your account.",[{text:"Sure",onPress:()=>{this.props.screenProps.clearAccount()}}])} }
                            
                            > 

            </CountDown>:null

            }




            <Text style={{marginTop:20,textAlign:"justify",paddingHorizontal:20,color:"grey"}}>
                * After timer ends you cant receive futher requests from customers. For Continuation of services consult doctor and get Tested.
            </Text>
        </ImageBackground>
          
        )
    }
}

const styles = StyleSheet.create({
    parent: {
        display: "flex",
        flexDirection: "row",
        borderWidth:1,
        borderRadius: 80,
        borderColor: "#694966",
        backgroundColor: '#694966',
        paddingLeft: "8%",
        paddingRight: "8%",
        paddingTop: ".5%",
        paddingBottom: ".5%",
    },

    child: {
      fontSize: 40,
      color: "#C89933",
    },

    buttonParent: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: "12%",
    },

    button: {
        backgroundColor: "#694966",
        paddingTop: "5%",
        paddingBottom: "5%",
        paddingLeft: "5%",
        paddingRight: "5%",
        display: "flex",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#694966",
        height: 60,
    },

    buttonText: {
        color: "#C89933",
        fontSize: 20,
        alignSelf: "center"
    },
    container:{
        justifyContent:"center",
        alignItems:"center",
        flex:1,
        padding:20
    }
});

export default ActivationStatus;
