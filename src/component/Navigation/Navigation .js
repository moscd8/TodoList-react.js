import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../Constants/routes';
import classes from './Navigation.module.css';
 
const Navigation  = ()=> {


  
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
 
    return(
        <div className={ classes.Navigation}>
        <ul >
          {/* <li>
            <Link to={ROUTES.SIGN_IN}>Sign In</Link>
          </li> */}
          <li>
            <Link to={ROUTES.ITEMS}>Add Items</Link>
          </li>
          <li>
            <Link to={ROUTES.HOME}>Home</Link>
          </li>
         <li>
            <Link to={ROUTES.TODOLIST}>My TODOLIST</Link>
          </li>
 
        </ul>
 
      </div>
    )
};
export default Navigation ;