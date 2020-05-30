import Axios from "axios";
import { AsyncStorage } from "react-native";

export const GET_CLASSES = "GET_CLASSES";
export const PUSH_CLASS = "PUSH_CLASS";
export const GET_STUDENTS = "GET_STUDENTS";
export const ACTIVATE_USER_STRING = "ACTIVATE_USER_STRING";
import io from "socket.io-client";



export const PUSH_CLASS_FUNC = (data) => ({
    type:PUSH_CLASS,
    data:data
})

// const token = async() => await AsyncStorage.getItem('loginToken')

export const GET_CLASSES_FUNC = () => {
    
    return async dispatch => {
       let token = await AsyncStorage.getItem('loginToken');
        await Axios.get('https://dbformongo.eu-gb.cf.appdomain.cloud/getClasses',{headers:{
            "Auth-Token":token
        }}).then(
          (data)=>dispatch({
              type:GET_CLASSES,
              data:data.data
          })
        )
    }
} 

export const PLACE_ORDER = (url,trimming,title,price,location,phone_no) => {


    const socket = io.connect("https://dbformongo.eu-gb.cf.appdomain.cloud");

    
    
    return async(dispatch) => {

        if(location === null){
            return dispatch({type:"PLACE_ORDER",url:url,trimming,title,price,location,phone_no});
        }

        let token = await AsyncStorage.getItem("loginToken")
        await Axios.post("https://dbformongo.eu-gb.cf.appdomain.cloud/place_order",{
            url,trimming,title,price,location,phone_no

        },{
            headers:{
                "Auth-Token":token
            }
        }).then(
            
           ()=>{
            dispatch({type:"PLACE_ORDER",url:url,trimming,title,price,location,phone_no});
            socket.emit("PlacedAnOrder")
           }
        )
  
      
    }
  }

  export const GET_ORDERS = () => {
    return async(dispatch)=>{
        let token = await AsyncStorage.getItem("loginToken")
        // await Axios.get("https://dbformongo.eu-gb.cf.appdomain.cloud/get_orders",{
        //     headers:{"Auth-Token":token}
        // }).then((data)=>{
        //     var k= [];

        //     for(let i = 0;i<data.data.length;i++){
        //         let j = JSON.parse(JSON.stringify(data.data[i]));
        //         k.push(j);

        //     }


        //     return k;

        //     // data.data.forEach(item=>{

               
        //     //    k.push(i);
        //     // })
        
           
        // }).then((k)=> dispatch({type:"GET_ORDERS",data:k }))

        let a = await Axios.get("https://dbformongo.eu-gb.cf.appdomain.cloud/get_orders",{
            headers:{"Auth-Token":token}
        })
        let b = await a.data;
        dispatch({type:"GET_ORDERS",data:b})
    }
  }



export const GET_STUDENTS_FUNC = (className,selectBranch) => {
    return async dispatch => {
       let token = await AsyncStorage.getItem('loginToken');
        await Axios.get('https://dbformongo.eu-gb.cf.appdomain.cloud/getStudents',{headers:{
            "Auth-Token":token,
            "className":className,
            "branch":selectBranch
        }
    
    
    }).then(
          (data)=>dispatch({
              type:GET_STUDENTS,
              data:data.data
          })
        )
    }
} 

export const ACTIVATE_USER = (item,index) => {
    

    return async dispatch => {
        let token = await AsyncStorage.getItem('loginToken');
        await Axios.post('https://dbformongo.eu-gb.cf.appdomain.cloud/activateStudent',{

            activate_id:item._id,
            isActivated:item.isActivated
            
        },{
            headers:{
                "Auth-Token":token,
                // "activate_id":item._id,
                // "isActivated":item.isActivated
            },

        }).then(res=>{
            dispatch({
                type:ACTIVATE_USER_STRING,
                index:index,
                data:res.data
            })
        })
      
       
    }
}

export const GET_ALL_REQUESTS_FUNC = () => {
    
   
    return async dispatch => {
       let token = await AsyncStorage.getItem('loginToken');
        await Axios.get('https://dbformongo.eu-gb.cf.appdomain.cloud/getAllRequests',{headers:{
            "Auth-Token":token
            
        }
    
    
    }).then(
          (data)=>dispatch({
              type:"GET_ALL_REQUESTS",
              data:data.data
          })
        )
    }
} 

export const APPROVE_REQUEST_FUNC = (item,index) => {
    
   
    return async dispatch => {
       let token = await AsyncStorage.getItem('loginToken');
        await Axios.post('https://dbformongo.eu-gb.cf.appdomain.cloud/approveRequest',{
            activate_id:item._id
        },{headers:{
            "Auth-Token":token
            
        }
    
    
    }).then(
          (data)=>dispatch({
              type:"APPROVE_REQUEST",
              data:data.data,
              index:index
          })
        )
    }
} 

export const PUSH_EVENT_FUNC = (body) => {
    return async dispatch => {
        let token = await AsyncStorage.getItem('loginToken');
        await Axios.post('https://dbformongo.eu-gb.cf.appdomain.cloud/createEvent',{
            ...body
        },{headers:{"Auth-Token":token}}).then(
            (data)=>
            dispatch({
                type:"PUSH_EVENT",
                data:data.data
            })
        )
    }
}


export const MODIFY_EVENT_FUNC = (body) => {
    return async dispatch => {
        let token = await AsyncStorage.getItem('loginToken');
        await Axios.post('https://dbformongo.eu-gb.cf.appdomain.cloud/modifyEvent',{
            ...body
        },{headers:{"Auth-Token":token}}).then(
            (data)=>
            dispatch({
                type:"MODIFY_EVENT",
                data:data.data,
                
            })
        )
    }
}

export const DELETE_EVENT_FUNC = (body) => {
    return async dispatch=>{
        let token = await AsyncStorage.getItem('loginToken');
        await Axios.post('https://dbformongo.eu-gb.cf.appdomain.cloud/deleteEvent',{
            ...body
        },{headers:{"Auth-Token":token}}).then(data=>{
            dispatch({
                type:"DELETE_EVENT",
                data:data.data
            })
        })
    }
}

export const GET_USER_ACCOUNT_FUNC = (body)=>{
    return async dispatch => {
        await AsyncStorage.setItem('myaccount',body.selectType);
        
        dispatch(
            {type:"GET_USER_ACCOUNT",data:body}
        )
    }
}


export const GET_EVENTS_FUNC = () => {
    
    return async dispatch => {
       let token = await AsyncStorage.getItem('loginToken');
        await Axios.get('https://dbformongo.eu-gb.cf.appdomain.cloud/getEvents',{headers:{
            "Auth-Token":token
        }}).then(
          (data)=>dispatch({
              type:"GET_EVENTS",
              data:data.data
          })
        )
    }
} 

export const GET_EVENTS_STUDENTS_FUNC = () => {
    
    return async dispatch => {
       let token = await AsyncStorage.getItem('loginToken');
        await Axios.get('https://dbformongo.eu-gb.cf.appdomain.cloud/studentGetEvents',{headers:{
            "Auth-Token":token
        }}).then(
          (data)=>dispatch({
              type:"GET_EVENTS",
              data:data.data
          })
        )
    }
} 




