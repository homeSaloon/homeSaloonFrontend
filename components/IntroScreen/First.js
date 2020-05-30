import * as React from "react";
import { View,Text, ImageBackground, Image } from "react-native";
import { Divider, Button } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";



class First extends React.Component{
    render(){
        return (
        
        <ScrollView
            indicatorStyle="black"

            style={{flex:1}}
              contentContainerStyle={{   justifyContent: 'center'}}
            
              >
            
            <ImageBackground resizeMode="center" imageStyle={{opacity:0.4}} source={require('./../../assets/images/Background.png')}
            style={{flex:1,padding:20}}>
          
            
            <Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: 20,marginVertical:20}}>
              Why this App?
            </Text>
            <Divider></Divider>


            <Image source={require('./../../assets/images/covid.png')} 
            style={{marginVertical:20,height:200,width:200,alignSelf:"center"}}></Image>

            <Text style={{marginVertical:10,fontFamily:"SourceSansPro-Regular",fontSize:15}}>
            
                
            In the present situation due to pandemic we all know that countries locked down its states to prevent the spread of novel coronavirus. While many governments are providing essential services like giving food, shelter but not hair care services. It can be cumbersome to get a haircut during lockdown as all the shops are closed but people also feel scared that if the guy doing the haircut may have coronavirus.
                

            </Text>
    
      

                <Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: 20,marginVertical:20}}>
                How we Can Solve This
            </Text>
            <Divider></Divider>


            <Text style={{marginVertical:20,fontFamily:"SourceSansPro-Regular",fontSize:15}}>
                
            To address this issue, we  developed this application in which it contains three modules 
                    
    
            </Text>
            <Text>1. Barber</Text>
            <Text>2. Customer</Text>
            <Text>3. Doctor</Text>
           
             <Text style={{marginVertical:20,fontFamily:"SourceSansPro-Regular",fontSize:15}}>

            Barber registers an account with our app, initially his account Is in disapproved state, in order to get his account approved he has to consult doctor who also registers in our app and certified. The barber will be tested, if he`s free from coronavirus he`s account will be approved and ready to get orders (requests for haircut) from customers for the day.
            In Alternate days he`s account will be in disapproved state as he has to get tested again by the doctor and get approval by him. This approval is intimated to the customer every time he places an order whether if he`s coronavirus free or not.  Every barber is equipped with thermometer gun to check patient temperature before haircut. This process relieves both the Customer and the Barber, removes the barrier of fear of coronavirus for getting a haircut.  

            </Text>
           
            </ImageBackground>
            <View style={{alignItems:"center",paddingBottom:20}}>
                <Button containerStyle={{width:200}} title="OK" 
                onPress={this.props.closeModal}>

                </Button>
            </View>
            </ScrollView>)
        
    }
}

export default First;