import * as Redux from 'redux';
// import classesReducer from './reducers/classesReducer';
import thunk from 'redux-thunk';

import getRequestsReducer from './reducers/getRequestsReducer';
import getUserReducer from './reducers/getUserReducer';
import order_reducer from './reducers/order';
import getAllOrders from './reducers/getAllOrders';




let cr = Redux.combineReducers({getUser:getUserReducer,order:order_reducer,getallorders:getAllOrders});


const store = Redux.createStore(cr,Redux.applyMiddleware(thunk));

export default store;