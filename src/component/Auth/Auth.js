import React , {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index'
import { Redirect} from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import Backdrop from '../Backdrop/Backdrop'; 
const  Auth = props => {


    let authParams= {
        email: 'test123@email.com',
        password: 'password',
        isSignup: true
    }
    // useEffect(()=> {
    //     // props.onAuth(authParams.email,authParams.password,authParams.isSignup);
    //     if(!props.loading && props.authRedirectPath !== '/')
    //         props.onSetAuthRedirectPath();
    // },[props.authRedirectPath]);

    const [email, Setemail] = useState('');
    const [password, Setpassword] = useState('');  
    const SignIn= (event) => {
        event.preventDefault ();
        props.onAuth(email,password,authParams.isSignup);
    }


    let authredirect= null;
    if(props.isAuthenticated){
        console.log("isAuthenticated")
        authredirect= <Redirect to={props.authRedirectPath}/>
    }

    const showBackdropFunc = ()=> {
        if(props.auth)
            return (props.auth.loading);

        return false;
    }

    let loadingSpinner = null;
    if(props.auth)
        if(props.auth.loading){
            loadingSpinner= <Spinner /> 
            console.log('loading')       
    }

    return (
        <div className="Auth">
            <p>Auth</p>
            {authredirect}

        <form onSubmit={SignIn}>
            <label>
                Name:
            <input type="text" name="email" value={email} onChange={event => Setemail(event.target.value)}/>
            </label>
            <label>
                Password:
            <input type="text" name="password" value={password}  onChange={event => Setpassword(event.target.value)}/>
            </label>
            <input type="submit" value="Submit" />
            {/* <button >Login</button> */}
            <Backdrop show={showBackdropFunc() } >
            {loadingSpinner}
            </Backdrop>  
        </form>
        </div>
      );
}



const mapStateToProps = state => {
    return {
         auth: state.auth,
         loading: state.auth.loading,
         error: state.auth.error,
         isAuthenticated: state.auth.token !== null,
         authRedirectPath: state.auth.authRedirectPath         
    }
};


const mapDispatchToProps = dispatch => {
    return{
        onAuth: (email,password,isSignup) => dispatch(actions.auth(email,password,isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};
export default connect(null,mapDispatchToProps)(Auth);