import axios from 'axios';
import { getAPIPath } from '../utils/costants'
import { actionStarted, actionSuccess, actionFailure} from './shared'

export const REQUEST_STARTED = 'REQUEST_STARTED'
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS'
export const REQUEST_FAILURE = 'REQUEST_FAILURE'

// API items 
const END_POINT = getAPIPath('requests')

// Actions
export const request = (new_request, callback, error_callback) => (
    dispatch => {
        dispatch(actionStarted(REQUEST_STARTED));
        axios.post(`${END_POINT}/add`, new_request)
        .then(res => {
            dispatch(actionSuccess(REQUEST_SUCCESS, res.data))
            if (callback) 
            {
                callback()
            }
        })
        .catch(err => {
            dispatch(actionFailure(REQUEST_FAILURE, err.message))
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
        case REQUEST_STARTED:
            return {
                ...state, 
                loading: true
            };
        case REQUEST_SUCCESS: 
            return {
                ...state,
                loading: false, 
                request: action.payload.data,
                message: action.payload.message
            }; 
        case REQUEST_FAILURE: 
            return {
                ...state, 
                loading: false, 
                error: action.payload.error,
            };
        default:
            return state;
    }
}