import axios from 'axios';
import { getAPIPath } from '../utils/costants'
import { actionStarted, actionSuccess, actionFailure} from './shared'

// Action types 
export const LIST_ITEMS_STARTED = 'LIST_ITEMS_STARTED';
export const LIST_ITEMS_SUCCESS = 'LIST_ITEMS_SUCCESS';
export const LIST_ITEMS_FAILURE = 'LIST_ITEMS_FAILURE';
export const ADD_NEW_ITEM_STARTED = 'ADD_NEW_ITEM_STARTED';
export const ADD_NEW_ITEM_SUCCESS = 'ADD_NEW_ITEM_SUCCESS';
export const ADD_NEW_ITEM_FAILURE = 'ADD_NEW_ITEM_FAILURE';
export const GET_ITEM_STARTED = 'GET_ITEM_STARTED';
export const GET_ITEM_SUCCESS = 'GET_ITEM_SUCCESS';
export const GET_ITEM_FAILURE = 'GET_ITEM_FAILURE';

// API items 
const END_POINT = getAPIPath('items')

// Actions
export const getItem = (_id) => (
    dispatch => {
        dispatch(actionStarted(GET_ITEM_STARTED));
        axios.get(`${END_POINT}/find?_id=${_id}`)
        .then(res => {
            // TODO try timeout
            dispatch(actionSuccess(GET_ITEM_SUCCESS, res.data));
        })
        .catch(err => {
            dispatch(actionFailure(GET_ITEM_FAILURE, err.message));
        })
    } 
)

export const listItems = () => (
    // (dispatch, getState)
    dispatch => {
        dispatch(actionStarted(LIST_ITEMS_STARTED));
        axios.get(`${END_POINT}/all`)
        .then(res => {
            // TODO try timeout
            dispatch(actionSuccess(LIST_ITEMS_SUCCESS, res.data));
        })
        .catch(err => {
            dispatch(actionFailure(LIST_ITEMS_FAILURE, err.message));
        })
    }
)

export const addItem = (item, callback) => (
    dispatch => {
        dispatch(actionStarted(ADD_NEW_ITEM_STARTED))
        axios.post(`${END_POINT}/add`, item)
        .then(res => {
            dispatch(actionSuccess(ADD_NEW_ITEM_SUCCESS, res.data))
            callback()
        })
        .catch(error => {
            dispatch(actionFailure(ADD_NEW_ITEM_FAILURE, error.message))
        })
    }
)

// Reducer
export const itemsReducer = (state = {}, action) => {
    switch (action.type) {
        case LIST_ITEMS_STARTED:
            return {
                ...state, 
                loading: true
            };
        case LIST_ITEMS_SUCCESS: 
            return {
                ...state,
                loading: false, 
                items: action.payload.data,
                message: action.payload.message
            }; 
        case LIST_ITEMS_FAILURE: 
            return {
                ...state, 
                loading: false, 
                error: action.payload.error,
            };
        case GET_ITEM_STARTED:
            return {
                ...state, 
                loading: true
            };
        case GET_ITEM_SUCCESS: 
            return {
                ...state,
                loading: false, 
                displayItem: action.payload.data,
                message: action.payload.message
            }; 
        case GET_ITEM_FAILURE: 
            return {
                ...state, 
                loading: false,
                error: action.payload.error,
            }

        default:
            return state;
    }
}
