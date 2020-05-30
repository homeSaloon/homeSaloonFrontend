

const account = {
   
};




const getUserReducer = (state = account,action) =>{


    if(action.type == "GET_USER_ACCOUNT"){
        
         return action.data
    }

    
 


    return state;
}

export default getUserReducer;