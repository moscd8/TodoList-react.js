import * as actionTypes from '../actions/actionTypes';
import { act } from 'react-dom/test-utils';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading : false,
    authRedirectPath: '/'
};

const authStart = (state, action) => {
    return {
        ...state,
        error: null,
        loading:true
    }
}
const authSuccess = (state, action) => {
    return {
        ...state,
        error: null,
        loading:false,
        userId: action.userId,
        token: action.idToken
    }
}

const authFail = (state, action) => {
    return {
        ...state,
        error: action.error,
        loading:false
    }
}
const setRedirectPath = (state, action) => {
    return {
        ...state,
        path: action.path
    }
}

const authlogout = (state, action)=> {
    console.log('action')
    console.log(action)
    return {
        ...state,
        userId: null,
        token: null
    }
}

const reducer = (state= initialState,action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state,action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state,action);
        case actionTypes.AUTH_FAIL:
            return authFail(state,action);
        case actionTypes.SET_REDIRECT_PATH:
            return setRedirectPath(state,action);

        case actionTypes.AUTH_LOGOUT:
            return authlogout(state,action);
                
            
        default: return state;

    }
}

export default reducer;