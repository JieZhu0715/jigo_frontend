import axios from 'axios';
import { getAPIPath } from '../utils/costants'
import { actionStarted, actionSuccess, actionFailure} from './shared'

// Action types 
export const LOGIN_STARTED = 'LOGIN_STARTED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIST_ITEMS_FAILURE';
export const REGISTER_STARTED = 'REGISTER_STARTED';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const FIND_USER_STARTED = 'FIND_USER_STARTED';
export const FIND_USER_SUCCESS = 'FIND_USER_SUCCESS';
export const FIND_USER_FAILURE = 'FIND_USER_FAILURE';
export const LOGOUT = 'LOGOUT';
export const CURRENT_USER = 'CURRENT_USER'


// API items 
const END_POINT = getAPIPath('users')

// Actions
export const register = (values, success_callback, error_callback) => (
    dispatch => {
        dispatch(actionStarted(REGISTER_STARTED));
        axios.post(`${END_POINT}/register`, values)
        .then(res => {
            dispatch(actionSuccess(REGISTER_SUCCESS, res.data));
            if(success_callback) success_callback();
        })
        .catch(err => {
            dispatch(actionFailure(REGISTER_FAILURE, err.message));
            if (error_callback) error_callback();
        })
    }
)
export const login = (user, callback) => (
    // (dispatch, getState)
    dispatch => {
        dispatch(actionStarted(LOGIN_STARTED));
        axios.post(`${END_POINT}/login`, user)
        .then(res => {
            // TODO try timeout
            dispatch(actionSuccess(LOGIN_SUCCESS, res.data));
            callback()
        })
        .catch(err => {
            dispatch(actionFailure(LOGIN_FAILURE, err.message));
        })
    }
)

export const findUser = (_id, callback) => (
    // (dispatch, getState)
    dispatch => {
        dispatch(actionStarted(FIND_USER_STARTED));
        axios.get(`${END_POINT}/findUser?_id=${_id}`)
        .then(res => {
            dispatch(actionSuccess(FIND_USER_SUCCESS, res.data));
            callback && callback()
        })
        .catch(err => {
            dispatch(actionFailure(FIND_USER_FAILURE, err.message));
        })
    }
)

export const logout = () => (
    {
        type: LOGOUT,
    }
)

export const currentUser = (callback) => (
    dispatch => {
        dispatch({
            type: CURRENT_USER,
            payload: {
                user: (window.sessionStorage.userInfo ? JSON.parse(window.sessionStorage.userInfo) : undefined)
            }
        })
        if (callback)
        {
            callback();
        }
    }
) 


// Reducer
export const usersReducer = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_STARTED:
            return {
                ...state, 
                loading: true
            };
        case LOGIN_SUCCESS: 
            // console.log(action)
            let userInfo = action.payload.data
            let user = {
                name: userInfo.name,
                avatar: userInfo.avatar, 
                email: userInfo.email, 
                _id: userInfo._id,
                introduce: userInfo.introduce,
                user_type: userInfo.user_type,
            }
            return {
                ...state,
                loading: false, 
                user,
                error: undefined
            }; 
        case LOGIN_FAILURE: 
            return {
                ...state, 
                loading: false, 
                error: action.payload.error,
            };
        case REGISTER_SUCCESS: 
            return {
                ...state,
                register_succes: true,
                error: undefined
            }; 
        case REGISTER_FAILURE: 
            return {
                ...state, 
                register_succes: false, 
                error: action.payload.error,
            };

        case FIND_USER_SUCCESS: 
            return {
                ...state,
                loading: false, 
                itemCreatedBy: action.payload.data,
                error: undefined
            }; 
        case FIND_USER_FAILURE: 
            return {
                ...state, 
                loading: false, 
                itemCreatedBy: 'anonymous',
                error: action.payload.error,
            };
        case LOGOUT: 
            return {
                ...state, 
                user: undefined
            }
        case CURRENT_USER: 
            return {
                ...state, 
                user: action.payload.user
            }
        default:
            return state;
    }
}
