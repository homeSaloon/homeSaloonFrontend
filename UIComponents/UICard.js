import * as React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { View, Dimensions, ActivityIndicator } from 'react-native';

import {Text, Button} from 'react-native-elements';


let branches = [
    {viewValue: 'CSE', value: 'cse'},
    {viewValue: 'ECE', value: 'ece'},
    {viewValue: 'EEE', value: 'eee'},
    {viewValue: 'IT', value: 'it'},
    {viewValue: 'Mech', value: 'mech'},
    {viewValue: 'Civil', value: 'civil'},
  ];

  
  
  const UICard = (props) => {
      const colors = ["blue","green","red","violet","pink","brown","purple","black","salmon","grey"]
      const [isLoading,setIsLoading]=React.useState(true);

  
    let selectedColor = colors[Math.floor(Math.random()*10)]

    React.useEffect(()=>{
        
        setIsLoading(false)
    })


    if(isLoading){
        return <ActivityIndicator ></ActivityIndicator>
    }

    return (



        <LinearGradient
        
                    start={{x: 0.5, y: 0.25}} end={{x: 1, y: 1.0}}
                    
            // locations={[0,0.5,0.6]}
            colors={["#26a1f5",'#475ebe']}

            style={
                {
                    flex:1,
                    minHeight:200,
                    // backgroundColor:se,
                    marginHorizontal:15,
                    marginTop:20,
                    borderRadius:10,
                    elevation:2,
                    paddingTop:10,
                    paddingHorizontal:20,
                    // borderTopColor:colors[Math.floor(Math.random()*10)],
                     borderTopColor:"rgb(224, 224, 224)",
                    
                    borderTopWidth:5,
                    justifyContent:"center",
                    paddingBottom:0
                    
                

                }
            }
        >
                <View>
                    <View style={{flexDirection:"row",alignItems:"stretch",justifyContent:"space-around"}}>
                    <Text  style={
                        {
                            fontFamily:"TitilliumWeb-Bold",
                            // fontFamily:"Montserrat-SemiBold",
                            fontSize:17,
                            color:"white",
                            textTransform:"uppercase",
                            
                            
                
                        }}>
                    
                    <Text style={{fontWeight:'normal',fontSize:15}}>class: </Text>{props.className}</Text>

                    <Text style={
                        {
                            fontFamily:"TitilliumWeb-Bold",
                            // fontFamily:"Montserrat-SemiBold",
                            fontSize:17,
                            color:"white",
                            textTransform:"uppercase"
                            
                        }}>
                    
                    <Text style={{fontWeight:'normal',fontSize:15}}>Year: </Text>{`${props.year} Year`}</Text>

                   
                    {   props.selectBranch !==undefined ?
                     <Text style={
                        {
                            fontFamily:"TitilliumWeb-Bold",
                            // fontFamily:"Montserrat-SemiBold",
                            fontSize:15,
                            color:"white",
                            textTransform:"uppercase"
                            
                        }}>
                        <Text style={{fontWeight:'normal',fontSize:15}}>Branch: </Text>{` ${branches[props.selectBranch].viewValue} Year`}</Text>
                        : <Text style={{  color:"white"}}>Loading</Text>

                    }

                      
                    </View>
                    <View style={{flexDirection:"row",marginTop:15,justifyContent:"space-evenly"}}>
                        <Text style={{textAlign:"center",color:"white",
                        fontSize:14
                        }}>Students alloted : {props.no_of_students}</Text>
                        <Text style={{textAlign:"center",
                        fontSize:14,color:"white"
                        }}>Administered by : {props.facultyName}</Text>

                    </View>
                    
                    <View style={{flexDirection:"row",justifyContent:"center",alignItems:"stretch", marginTop:30,padding:0}}>
                        <Button 
                        // type="outline"
                        // icon={{
                        //   name: "edit",
                        //   size: 20,
                        //   color:"white"
                        // //   color: "white"
                        // }}
                        
                        // titleStyle={{color:"#ff3535"}}
                     titleStyle={{fontFamily:"Montserrat-Regular",color:"#26a1f5"}}
                     onPress={()=>props.edit() }
                       buttonStyle={{backgroundColor:"white"}}

                        containerStyle={styles.editAndDelete} title="View Students" ></Button>
                        {/* <Button   containerStyle={styles.editAndDelete}  title="Delete"
                         buttonStyle={{borderColor:"#ff3535",backgroundColor:"#ff3535"}}
                         titleStyle={{color:"white"}}
                         icon={{
                            name: "delete",
                            size: 20,
                            color: "white"
                          }}

                        // type="outline"
                        ></Button> */}
                    </View>
                </View>
                </LinearGradient>
    )
}

export default UICard;

const styles = {
    editAndDelete:{
         width:Dimensions.get('window').width - 80,
         
        
        
    }
}