import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../Constants/routes';
import classes from './Navigation.module.css';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';  

const Navigation  = (props)=> {

//   useEffect(() => {
//     props.getUserName(props.userId);
// },[]);
  
  // const [toggelToDarkMode,settoggelToDarkMode] = useState();

  // const toggleview = ( ) => {  
  //   if(toggelToDarkMode===classes.Navigation)
  //   {   console.log('1')
  //       settoggelToDarkMode(classes.NavigationDark);
        
  //   }
  //    else if(toggelToDarkMode===classes.NavigationDark)
  //    {   console.log('1')
  //        settoggelToDarkMode(classes.Navigation);         
  //    }
  //   else{
   
  //       console.log('Error');
  //       settoggelToDarkMode(classes.Navigation);  
  //   }
  // };
    console.log('props.isAuthenticated');
    console.log(props.isAuthenticated);
    let authLinks= (
      <ul >
          <li>
            <Link to={ROUTES.HOME}>Home</Link>
          </li> 
          <li>
            <Link to={ROUTES.ITEMS}>Add Items</Link>
          </li>
          <li>
            <Link to={ROUTES.TODOLIST}>My TODOLIST</Link>
          </li>
          <li>
            <Link to={ROUTES.STAS}>Statistics</Link>
          </li>
          <li>
        <Link to={ROUTES.LOGOUT}>LOGOUT</Link>
        </li>         
      </ul>
    );

    let unAuthLinks= (
    <ul >
        <li>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>
        <li>
        <Link to={ROUTES.HOME}>Home</Link>
        </li> 
    </ul>

    );

    let userDetail= props.userName ? (
      <div className={classes.UserName}>         
        Hello {props.userName}          
      </div>
    ): null;
    
    return(
        <div className={ classes.Navigation}>
        {/* <ul >
          <li>
            <Link to={ROUTES.SIGN_IN}>Sign In</Link>
          </li>
          {props.isAuthenticated ? ( 
          <li>
            <Link to={ROUTES.ITEMS}>Add Items</Link>
          </li>) : null }
          <li>
            <Link to={ROUTES.HOME}>Home</Link>
          </li>
       
        </ul> */}        
        {props.isAuthenticated ? authLinks: unAuthLinks}
        {userDetail}
      </div>
    )
};
const mapStateToProps = state =>{
  return {
      isAuthenticated: state.auth.token !== null,
      userName: state.auth.userName,
      userId: state.auth.userId 
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//       getUserName : (userId) => dispatch(actions.getUserName(userId))
//     };
// };

export default connect(mapStateToProps)(Navigation) ;