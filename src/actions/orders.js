import axios from 'axios';
import { getAPIPath } from '../utils/costants'
import { actionStarted, actionSuccess, actionFailure} from './shared'

export const ORDER_STARTED = 'ORDER_STARTED'
export const ORDER_SUCCESS = 'ORDER_SUCCESS'
export const ORDER_FAILURE = 'ORDER_FAILURE'
export const GET_USER_ORDERS_STARTED = 'GET_USER_ORDERS_STARTED'
export const GET_USER_ORDERS_SUCCESS = 'GET_USER_ORDERS_SUCCESS'
export const GET_USER_ORDERS_FAILURE = 'GET_USER_ORDERS_FAILURE'

// API items 
const END_POINT = getAPIPath('orders')

// Actions
export const order = (new_order, callback, error_callback) => (
    dispatch => {
        dispatch(actionStarted(ORDER_STARTED));
        axios.post(`${END_POINT}/add`, new_order)
        .then(res => {
            dispatch(actionSuccess(ORDER_SUCCESS, res.data))
            if (callback) 
            {
                callback()
            }
        })
        .catch(err => {
            dispatch(actionFailure(ORDER_FAILURE, err.message))
            if (error_callback) 
            {
                error_callback() 
            }
        })
    }
)

export const getUserOrders = (user_id,  callback, error_callback) => (
    dispatch => {
        dispatch(actionStarted(GET_USER_ORDERS_STARTED));
        axios.get(`${END_POINT}/findUserOrders?user_id=${user_id}`)
        .then(res => {
            console.log(res.data.data)
            dispatch(actionSuccess(GET_USER_ORDERS_SUCCESS, res.data))
            if (callback)
            {
                callback()
            }
        })
        .catch(err => {
            dispatch(actionFailure(GET_USER_ORDERS_FAILURE, err.message))
            if (error_callback)
            {
                error_callback()
            }
        })
    }
)


// Reducer
export const ordersReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_STARTED:
            return {
                ...state, 
                loading: true
            };
        case ORDER_SUCCESS: 
            return {
                ...state,
                loading: false, 
                order: action.payload.data,
                message: action.payload.message
            }; 
        case ORDER_FAILURE: 
            return {
                ...state, 
                loading: false, 
                error: action.payload.error,
            };
        case GET_USER_ORDERS_STARTED: 
            return {
                ...state, 
                loading: true
            }
        case GET_USER_ORDERS_SUCCESS: 
            return {
                ...state, 
                loading: false, 
                user_orders: action.payload.data, 
                message: action.payload.message,
            }
        case GET_USER_ORDERS_FAILURE: 
            return {
                ...state, 
                loading: false,
                error: action.payload.error,
            }
        default:
            return state;
    }
}