import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { itemsReducer } from '../actions/items'
import { usersReducer } from '../actions/users'
import { ordersReducer } from '../actions/orders'
// import { requestsReducer } from '../actions/requests'

const defaultReducer = (state = 0, action) => state;

const combined = combineReducers({
    default: defaultReducer,
    items: itemsReducer,
    users: usersReducer, 
    orders: ordersReducer
})

const loggerMiddleware = createLogger();

const reducerInitializedStore = 
    createStore(
        combined,
        applyMiddleware(thunk, loggerMiddleware))
// console.log(reducerInitializedStore.getState())

export default reducerInitializedStore