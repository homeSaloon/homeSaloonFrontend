const orders  = [];

const getAllOrders = (state = orders,action) => {
    

    if(action.type="GET_ORDERS"){
        
        
        
        

        return  [{...action.data}];
    }
    return state;
}

export default getAllOrders;