import React  from 'react';
import classes from './LendingPage.module.css';
const LendingPage = props => {
    
    return (
        <div className={classes.LendingPage}>
            <p> MY TODO-LIST  </p> 
            <div className={classes.About}>
                 <p>About</p>
                 <span>
                     WITH TODOLIST YOU CAN ADD YOUR TODO ITEMS <br/>
                     AND STORE IT IN THE OUR SERVERS AND ACCESS IT <br/>ANYWHERE FOR FREE. 
                 </span>
            </div>
            <div className={classes.Benifits}>
                <p>Benifits</p>
                <li> <strong>Producative:</strong>  you can manage your time and track after your prograss
                </li>
                <li> <strong>Free:</strong>  you can use TODOLIST with no limit & without any Ads
                </li>
                <li>  <strong>Keep Truck :</strong> you can manage your TODOLIST anywhere online
                </li>
                <li>  <strong>Easy to Use: </strong> you can manage your time and track after your prograss
                </li>

            </div>

            <div className={classes.Recommndetion}>
               <p>Our Customers</p>
               <li> <strong>John M</strong> : " you can manage your time and track after your prograss" 
                </li>
                <li> <strong> Rebeka L.</strong> : "since i started using TODOLIST it saved alot of time !" 
                </li>
                <li> <strong>Michel k. </strong> : " you can manage your time and track after your prograss" 
                </li>
                <li> <strong> Rechel A.</strong> : " you can manage your time and track after your prograss" 
                </li>

            </div>

            <div className={classes.SocialNetwork}>
                <p>SocialNetwork</p>
            </div>
        </div>
    );
}

export default LendingPage;