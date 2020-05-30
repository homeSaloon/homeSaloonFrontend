import * as React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { View, Dimensions } from 'react-native';


import {Text, Badge} from 'react-native-elements';



const UIEventCard = (props) => {
    const colors = ["blue","green","red","violet","pink","brown","purple","black","salmon","grey"]

    let selectedColor = colors[Math.floor(Math.random()*10)]

    React.useEffect(()=>{
        
    })

    const years = ["Ist","IInd","IIIrd","IVth"];

    



    let branches = [
        {viewValue:'CSE',value:'cse'},
        {viewValue:'ECE',value:'ece'},
        {viewValue:'EEE',value:'eee'},
        {viewValue:'IT',value:'it'},
        {viewValue:'Mechanical',value:'mech'},
        {viewValue:'Civil',value:'civil'},
    ]

const formatAMPM =(date) =>{
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
    }
    


    return (
      <View >
      

        <LinearGradient
          start={{x: 0.5, y: 0.25}}
          end={{x: 1, y: 1.0}}
          // locations={[0,0.5,0.6]}
          colors={['white', 'white']}
          style={{
            flex: 1,
            minHeight: 90,
            // backgroundColor:se,
            marginHorizontal: 15,
            marginTop: 10,
            borderRadius: 2,
            elevation: 1,
            // paddingTop:10,
            // paddingLeft:10,
            // borderTopColor:colors[Math.floor(Math.random()*10)],
            borderLeftColor: '#26a1f5',

            borderLeftWidth: 5,
            justifyContent: 'center',
            paddingBottom: 0,
          }}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                width: 80,
                height: '100%',
                marginRight: 20, 
                borderRightWidth: 2,
                borderRightColor: 'lightgrey',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 25,
                  fontFamily: 'TitilliumWeb-Regular',
                  color: '#4b4949',
                }}>
                {new Date(props.fromdate).getDate() }
              </Text>
              <Text style={{color: 'grey'}}>
                {formatAMPM(new Date(props.fromdate))}
                
                
              </Text>
              <Text style={{color: 'grey',fontSize:11}}>
              {new Date(props.fromdate).getMonth()} - {new Date(props.fromdate).getFullYear()}
                
                
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'column',
                // minWidth: 200
                flex:1,
                justifyContent: 'space-around',
              }}>

              <View style={{flexDirection:"row",alignItems:"center"}}>
                <Text  style={{fontWeight: 'normal',fontSize: 18,fontFamily:"TitilliumWeb-SemiBold",color:"#636363",flex:1}}>
                    {props.topicName}{' '}
                </Text>
                <Badge badgeStyle={{backgroundColor:"#26a1f5",padding:10,flex:2,marginRight:10,maxHeight:25}} value={<Text style={{fontSize:10,color:"white"}}>A Section</Text>} > </Badge>
              </View>

             

              <View style={{flexDirection: 'row',justifyContent:"space-around"}}>
                <Text style={{fontWeight: 'normal',color:"#919292", fontSize: 14}}>{`${
                  years[props.year]
                } Year`}</Text>

                {/* <Text style={{fontWeight: 'normal', color:"#919292",fontSize: 14}}>
                  {` ${branches[props.selectBranch].viewValue} Branch`}{' '}
                </Text> */}

                <Text style={{fontWeight: 'normal', color:"#919292",fontSize: 14}}>
                  {`Status :`}  <Text style={{color:"green",fontStyle:"italic"}}>Pending</Text>
                </Text>
              </View>
            </View>

               
            

            {/* <View
              style={{
                maxWidth: 70,
                flexDirection: 'row',
                height: '100%',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <Icon
                name="edit"
                style={{marginHorizontal: 5}}
                size={21}
                color={'#475ebe'}
              />
              <Icon
                name="delete"
                style={{marginHorizontal: 10}}
                size={21}
                color={'red'}
              />
            </View> */}
          </View>
        </LinearGradient>
      </View>
    );
}

export default UIEventCard;

const styles = {
    editAndDelete:{
         width:Dimensions.get('window').width - 80,
         
        
        
    },
    commonText:     {
        fontFamily:"TitilliumWeb-Bold",
        // fontFamily:"Montserrat-SemiBold",
        fontSize:17,
        color:"black",
        textTransform:"uppercase",
        
        

    }

}

// <View style={{flexDirection:"row",justifyContent:"center",alignItems:"stretch", marginTop:30,padding:0}}>
// <Button 
// // type="outline"
// // icon={{
// //   name: "edit",
// //   size: 20,
// //   color:"white"
// // //   color: "white"
// // }}

// // titleStyle={{color:"#ff3535"}}
// titleStyle={{fontFamily:"Montserrat-Regular",color:"#26a1f5"}}
// onPress={()=>props.edit() }
// buttonStyle={{backgroundColor:"white"}}

// containerStyle={styles.editAndDelete} title="View Students" ></Button>
// {/* <Button   containerStyle={styles.editAndDelete}  title="Delete"
//  buttonStyle={{borderColor:"#ff3535",backgroundColor:"#ff3535"}}
//  titleStyle={{color:"white"}}
//  icon={{
//     name: "delete",
//     size: 20,
//     color: "white"
//   }}

// // type="outline"
// ></Button> */}
// </View>