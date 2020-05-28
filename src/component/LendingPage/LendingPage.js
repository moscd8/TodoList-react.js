import React  from 'react';
import classes from './LendingPage.module.css';
import { faHome , faListAlt, faMoneyBillAlt, faClock, faGlobeAfrica, faTasks } from "@fortawesome/free-solid-svg-icons";
import {  faFacebook,faInstagram,faTwitter,faGoogle,faYoutube, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LendingPage = props => {
    
    return (
        <div className={classes.LendingPage}>
            <div className={classes.Main}>
                <p className={classes.Title}> MY TODO-LIST
                    <FontAwesomeIcon icon={faListAlt} size='lg' color="white" pull="center"/>
                </p> 
                <div className={classes.About}>
                 
                 <span>
                 <p>About
                     
                     </p>
                     WITH TODOLIST YOU CAN ADD YOUR TODO ITEMS <br/>
                     AND STORE IT IN THE OUR SERVERS AND ACCESS IT <br/>ANYWHERE FOR FREE. 
                 </span>
                </div>
                <a  className={classes.ReadMore} href={'#Benifits'}>Read More</a>
               
                {/* <button className={classes.ReadMore}>
                 </button> */}

            </div>                
            
            <div className={classes.Benifits_Container} id={'Benifits'}>
                <p className={classes.Benifits_Container_Header}>Benifits</p><br/>
             <div className={classes.Benifits}>
                <div className={classes.Benifit_a}>
                    {/* <FontAwesomeIcon icon={faListAlt} size='9px' color="white"/>  */}
                    <p><strong>Producative</strong></p>  you can manage your time and track after your prograss
                    {/* <br/> */}
                    <div className={classes.Icon}>
                        <FontAwesomeIcon icon={faClock} size='lg' color="black"/> 
                    </div>

                </div>

                <div className={classes.Benifit_a}>
                    <p><strong>Free</strong></p> 
                     you can use TODOLIST with no limit & without any Ads
                     <div className={classes.Icon}>
                        <FontAwesomeIcon icon={faMoneyBillAlt} size='lg' color="black"/> 
                    </div>
                </div>

                <div className={classes.Benifit_a}>
                   <p><strong>Keep Truck </strong></p> 
                   you can manage your TODOLIST anywhere online
                   <div className={classes.Icon}>
                        <FontAwesomeIcon icon={faGlobeAfrica} size='lg' color="black"/> 
                    </div>
                </div>

                <div className={classes.Benifit_a}>
                    <p><strong>Easy to Use </strong> </p>
                    you can manage your time and track after your prograss
                    <div className={classes.Icon}>
                        <FontAwesomeIcon icon={faTasks} size='lg' color="black"/> 
                    </div>
                </div>
    
              </div>
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
                <div className={classes.SocialLinks}>
                
                <a href={'#a'}>
                <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a href={'#a'}>
                <faTwitter icon={faTwitter}/>
                </a>
                <a href={'#a'}>
                <FontAwesomeIcon icon={faInstagram}/>
                </a>
                <a href={'#a'}>
                <FontAwesomeIcon icon={faGoogle} />
                </a>
                <a href={'#a'}>
                <FontAwesomeIcon icon={faYoutube} />
                </a>
                <a href={'#a'}>
                <FontAwesomeIcon icon={faWhatsapp} />
                </a> 
                </div>
            </div>
        </div>
    );
}

export default LendingPage;