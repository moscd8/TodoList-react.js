import React , {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index'
import { Redirect} from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import Backdrop from '../Backdrop/Backdrop'; 
import classes from './Auth.module.css';
import { register } from 'react-scroll/modules/mixins/scroller';
const  Auth = props => {


    // useEffect(()=> {
    //     // props.onAuth(authParams.email,authParams.password,authParams.isSignup);
    //     if(!props.loading && props.authRedirectPath !== '/')
    //         props.onSetAuthRedirectPath();
    // },[props.authRedirectPath]);

    const [email, Setemail] = useState('');
    const [password, Setpassword] = useState('');  
    const [isSignup,setIsSignup]=useState(true);
    const [errorMsg,setErrorMsg]=useState('');
    
    // useEffect(() => {
    //     if(!props.isAuthenticated)
    //         props.onSetAuthRedirectPath();
    // },[props.auth.error]);


    let authParams= {
        email: 'test123@email.com',
        password: 'password',
        isSignup: true
    }

    const SignIn= (event) => {
        event.preventDefault ();
        props.onAuth(email,password,isSignup);
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
    const register = ()=> {
        setIsSignup(!isSignup);
    }

    

    let loadingSpinner = null;
    if(props.auth)
        if(props.auth.loading){
            loadingSpinner= <Spinner /> 
            console.log('loading')       
    }
     let errorMsgRender= null;
    
    console.log('error: ')
    console.log(props.auth.error)   
    if(props.auth.error){
         errorMsgRender=props.auth.error;
       //   setErrorMsg(props.auth.error);
        //  setTimeout(() => {
        //     // setErrorMsg('');
        //     errorMsgRender=null;
        // }, 5*1000);
        // <p> {props.auth.error}</p>
    };

    // const displayMessageWithTimeout= () => {
    //     // errorMsgRender =
    //     if(props.loading) return;
    //     const msg= errorMsgRender; 
    //     setTimeout(() => {
    //         setErrorMsg(''); 
    //         errorMsgRender= '';
    //     }, 3000);
    //     return msg;
    // }

    return (
        <div className={classes.Auth}>
             <div className={classes.Container}>
                <div className={classes.Toggle}>
                    <p> {isSignup ? 'SIGNUP' : 'LOGIN'} </p>
                    <label className={classes.Switch}>
                        <input  className={isSignup ?  classes.Login : classes.Register} type="checkbox" value={isSignup ?  'Regiter' : 'Login'} onClick={() => setIsSignup(!isSignup)}/>       
                        <span className={classes.Sliderround}></span>
                    </label> 
            </div>
            <p className={classes.Header}>Auth</p>   
             </div>
            {authredirect}

            {errorMsgRender  ? ( <p> {errorMsgRender}</p>) : null}

        <form onSubmit={SignIn} className={classes.Form}>
            <label className={classes.Label}>
                Name:
            <input className={classes.Input} type="text" name="email" value={email} onChange={event => Setemail(event.target.value)}/>
            </label>
            {/* <br/> */}
            <label className={classes.Label}>
                Password:
            <input  className={classes.Input} type="text" name="password" value={password}  onChange={event => Setpassword(event.target.value)}/>
            </label>
            {/* <br/> */}
            <input  className={classes.Submit} type="submit" value="Submit" />

            
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
export default connect(mapStateToProps,mapDispatchToProps)(Auth);