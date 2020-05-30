const order  = {
    chosen_hairstyle:"windows",
    trimming:false,
    location:null,
    totalPrice:0,
    phone_no:0
    
}





const order_reducer = (state = order,action) => {
    

    if(action.type="PLACE_ORDER"){

        
    
        return {
            chosen_hairstyle:action.url,
            trimming:action.trimming,
            title:action.title,
            totalPrice:action.price,
            location:action.location,
            phone_no:action.phone_no,
        }
    }
    return state;
}

export default order_reducer;