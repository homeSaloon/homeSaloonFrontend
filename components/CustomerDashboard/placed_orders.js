import * as React from "react";
import { View, StyleSheet, AsyncStorage, ActivityIndicator, RefreshControl, ImageBackground, SafeAreaView } from "react-native";
import { FlatList, ScrollView, TouchableNativeFeedback } from "react-native-gesture-handler";
import { Text } from "react-native-elements";
import { useDispatch,useSelector } from "react-redux";
import { GET_ORDERS } from "../../redux/actions/actions";
import Axios from 'axios';
import LinearGradient from "react-native-linear-gradient";

import io from "socket.io-client"
import { Dimensions } from "react-native";



const PlacedOrders = (props) => {

    //getList items of placed orders by user_id


    

    const socket = io.connect("https://dbformongo.eu-gb.cf.appdomain.cloud");
    

    const [orders,setOrders] = React.useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    let [count,setCount] = React.useState({num:0});
    // React.useEffect(()=>{

    //   let numb = count+1;
    //   const unsubscribe =   props.navigation.addListener('didFocus',(event)=>{
    //     props.screenProps.zero();
    //     setCount({num:count.num++});
    //     const getToken  =async()=>{
    //       let token = await AsyncStorage.getItem("loginToken");
    //     //  await dispatch(GET_ORDERS());
      
    //    let a = await Axios.get("https://dbformongo.eu-gb.cf.appdomain.cloud/get_orders",{
    //       headers:{"Auth-Token":token}
    //   })
  
    //   setOrders(a.data)

    //   }

    //   getToken();

    //   })
      
      
    // },[props.navigation])


    React.useEffect(()=>{
      
        

        
        
        const getToken  =async()=>{
          let token = await AsyncStorage.getItem("loginToken");
          //  await dispatch(GET_ORDERS());

      
          let a = await Axios.get("https://dbformongo.eu-gb.cf.appdomain.cloud/get_orders",{
          headers:{"Auth-Token":token}
        })
        
        setOrders(a.data)

      }
      
      getToken();

      socket.on("heplaced",()=>{
        getToken();
      })

      
    
      
      // if(orders.length > 0){
        // }

                // const callIt = ()=>{
                //   getToken();
                // }

                // setInterval(callIt,5000)


          // return clearInterval(callIt)
    },[])

   
    
const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];


  function Item({ title,total_price,date,delivery_status }) {
    return (
        <TouchableNativeFeedback>
      
      <LinearGradient colors={["white","white"]} start={{x:0,y:1}} end={{x:0,y:0}} style={styles.item}>
        {/* <Text style={styles.title}>{title}</Text> */}

        <View style={{flexDirection:"row",marginVertical:3}}>
            <Text style={{flex:1,fontSize:16,fontFamily:"TitilliumWeb-Regular"}}><Text >Order No:</Text> {title} </Text>
            <Text style={{fontSize:22,fontFamily:"TitilliumWeb-SemiBold"}}>{total_price}$</Text>
        </View>

          <View style={{flexDirection:"row",marginVertical:3}}>
            <View style={{flex:1}}>
            <Text style={{fontSize:16,fontFamily:"TitilliumWeb-Regular"}}>Date:<Text style={{color:"black",fontFamily:"TitilliumWeb-Regular"}}>{new Date(date).getDate() + '/ ' + new Date(date).getMonth() + '/ ' + new Date(date).getFullYear() } </Text></Text>
            <Text style={{marginTop:11,fontSize:16,fontFamily:"TitilliumWeb-Regular"}}>Time :<Text style={{color:"black",fontFamily:"TitilliumWeb-Regular"}}>{new Date(date).getHours() + ' : ' + new Date(date).getMinutes()} </Text></Text>
            </View>
            <Text style={{backgroundColor:
              delivery_status == "inprogress" ? "orange" : delivery_status =="completed" ? "green" : delivery_status =="failed" ? "red" : "red"
              
              ,color:"white",padding:5,marginVertical:15, borderRadius:4,fontFamily:"Montserrat-SemiBold"}}>{String(delivery_status).toUpperCase()}</Text>
        </View>


      </LinearGradient>
      </TouchableNativeFeedback>
    );
  }

  const onRefresh = React.useCallback(async() => {
    setRefreshing(true);
    let token = await AsyncStorage.getItem("loginToken");
     await Axios.get("https://dbformongo.eu-gb.cf.appdomain.cloud/get_orders",{
          headers:{"Auth-Token":token}
      }).then((res)=>{
        setOrders(res.data);
        props.screenProps.zero();
        setRefreshing(false)
      })

   
  }, [refreshing]);



    return(
      <SafeAreaView style={{flex:1}}>
           <ImageBackground
            resizeMode="cover"
            source={require('./../../assets/images/Background.png')}
            imageStyle={{opacity: 0.4,flex:1}}
            style={{opacity: 1, marginBottom: 55,flex:1}}>
        <ScrollView
              style={{
                // backgroundColor: 'white',
                paddingVertical: 20,
                padding: 25,
                flex: 1,
                
                
               
              }}
              
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}></RefreshControl>
              }
              >

     
            <View style={{marginVertical: 10}}>
                <Text
                  style={{
                    fontSize: 30,
                    fontFamily: 'Montserrat-Bold',
                  }}>
                Placed Orders
                </Text>
                {/* <Text>{count.num}</Text>  */}
                
              </View>


                { orders.length > 0 ?

                    <FlatList



                    data={orders}
                    renderItem={({ item }) => <Item title={item.user_id} total_price={item.price} date={item.createdAt} delivery_status={item.delivery_status}/>}
                    keyExtractor={item => item._id}
                    initialNumToRender={5}
                    inverted={true}
                    
                  /> : <View style={{justifyContent:"center",flexDirection:"column",alignItems:"center",flex:1,height:Dimensions.get('screen').height /2 + 60}}><Text style={{alignSelf:"center",fontSize:21}}>You have not placed any orders</Text></View>
                 
                }
            
                
                {/* : <ActivityIndicator></ActivityIndicator> */}
            
            

              </ScrollView>
</ImageBackground>

              </SafeAreaView>
    )


}

const styles = StyleSheet.create({
    container: {
      flex: 1
    //   marginTop: Constants.statusBarHeight,
    },
    item: {
      backgroundColor: '#f1f3f6',
      paddingHorizontal: 10,
      paddingVertical: 20,
      marginVertical: 8,
      marginHorizontal: 1,
      elevation:5,
    //   borderWidth:1,
      borderRadius:4,
      
    },
    title: {
      fontSize: 32,
    },
  });
  

export default PlacedOrders;