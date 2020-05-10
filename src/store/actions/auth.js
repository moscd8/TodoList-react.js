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



export const auth = (email,password, isSightup) => {
    return dispatch => {
        dispatch(authStart());
        const authData2 = {
            email: email,
            password: password,
            returnSecureToken: false
        };
        let url ='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCo1NYApckn2kNaej3yHcm8pYRCZyDIIRc';
        if(!isSightup){
            url='https://identitytoolkit.googleapis.com//v1/accounts:signInWithPassword?key=AIzaSyCo1NYApckn2kNaej3yHcm8pYRCZyDIIRc';
        }

        axios.post(url,authData2)
        .then(response  => {
            console.log('response:');
            console.log(response);
            const expirationDate= new Date(new Date().getDate()+ response.data.expiresIn * 1000); //convert from milisec to time in sec
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.localId);            
            dispatch(authSuccess(response.data.localId,response.data.idToken));
            dispatch(checkAuthTimeout(response.data.expiresIn));            
        })
        .catch(error=> {
            console.log('error');
            console.log(error);
            dispatch(authFail(error.response.data.error));
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
        }, expiresInTime * 1000);
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

                dispatch(authSuccess(token,userId));
                dispatch(checkAuthTimeout((expirationDate.getTime()- new Date().getTime())/1000) );
            }
        }
    }

}