import update from 'immutability-helper'
const studentsRequests = [];




const getRequestsReducer = (state = studentsRequests,action) =>{


    if(action.type == "GET_ALL_REQUESTS"){
         return [...action.data]
    }

    if(action.type == "APPROVE_REQUEST"){

      
        const collection = state;
        const newCollection = update(collection,{[action.index]:{$set:action.data}})
        return newCollection;
    }

 


    return state;
}

export default getRequestsReducer;