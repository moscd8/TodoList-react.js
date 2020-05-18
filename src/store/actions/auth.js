import * as actionTypes from './actionTypes';

import axios from 'axios'; 

export const authStart = () => {
    return {
        type:actionTypes.AUTH_START
    }
}

export const authSuccess = (userId,idToken) => {
    return {
        type:actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId
    }
}
export const authFail = (error) => {
    return {
        type:actionTypes.AUTH_FAIL,
        error: error
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type:actionTypes.SET_REDIRECT_PATH,
        path: path
    }
}



export const auth = (email,password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData2 = {
            email: email,
            password: password,
            returnSecureToken: false
        };
        console.log('auth: isSignup');
        console.log(isSignup);
        let url ='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCo1NYApckn2kNaej3yHcm8pYRCZyDIIRc';
        if(!isSignup){
            url='https://identitytoolkit.googleapis.com//v1/accounts:signInWithPassword?key=AIzaSyCo1NYApckn2kNaej3yHcm8pYRCZyDIIRc';
        }

        axios.post(url,authData2)
        .then(response  => {
            console.log('response:');
            console.log(response);
            console.log(response.data.expiresIn);
            let expiresIn =  response.data.expiresIn ? (new Date().getDate()+ response.data.expiresIn * 1000) :
            (new Date().getDate()+ 3600);
            const expirationDate= new Date(expiresIn); //convert from milisec to time in sec
            console.log(expirationDate);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.localId);            
            dispatch(authSuccess(response.data.localId,response.data.idToken));
            // dispatch(checkAuthTimeout(response.data.expiresIn ? response.data.expiresIn : 60 ));   
            dispatch(checkAuthTimeout(response.data.expiresIn ? response.data.expiresIn : new Date(new Date().getDate() + 3600)));   
        })
        .catch(error=> {
            console.log('error');
            console.log(error);
            dispatch(authFail(error.response.data.error.message));
        })

    }
}

export const logout = (userId, idToken)=> {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    console.log('logout')

    return{
        type: actionTypes.AUTH_LOGOUT,
        idToken: idToken,
        userId: userId
    }
    
}

export const checkAuthTimeout = (expiresInTime) => {
    return dispatch=> {
        setTimeout(() => {
           dispatch(logout()); 
        }, expiresInTime*1000);
    }
};

export const authCheckState = () => {

    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            console.log('no token');
            dispatch(logout());
        }
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date().getDate()){
                 dispatch(logout())
                console.log('expirationDate is expiared ');
            }
            else{
                const userId = localStorage.getItem('userId');
                //
                console.log('expirationDate is not expiared ');

                dispatch(authSuccess(token,userId));
                dispatch(checkAuthTimeout(( Math.abs(expirationDate.getTime()- new Date().getTime())/1000)));
            }
        }
    }

}