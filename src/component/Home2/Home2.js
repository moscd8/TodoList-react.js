import React, {useEffect,useState} from 'react'; 
// import classes from './Home/Home.module.css';
// import classes from './Home.module.css';
import image1 from '../../shered/6.jpg';
import image2 from '../../shered/2.jpg';
import image3 from '../../shered/3.jpg';
import image4 from '../../shered/4.jpg';
import image5 from '../../shered/5.jpg';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
import classes from './Home2.module.css';
// import SpotifyPlayer from 'react-spotify-player';

import {connect } from 'react-redux'; 

// import { faHome } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import 'font-awesome/css/font-awesome.min.css';
import 'font-awesome/css/font-awesome.min.css';


const Home2 = (props) => {
      
    console.log('home');
    console.log(props.todoList.selectedItem);
    let selectedItemToRender = null;
    if(props.todoList.selectedItem){
    selectedItemToRender = props.todoList.selectedItem.map(item=>(
        <div className={classes.Selected}> 
            {/* <ul key={item.id}   > */}
            <h3> {item.title}</h3>
            <h4>{item.content}</h4>         
    {/* </ul>  */}
    </div>
    )) 
    }
    const size = {
        width: '100%',
        height: 300,
      };
      const view = 'coverart'; // or 'coverart' list
      const theme = 'black'; // or 'white'

      /** https://www.npmjs.com/package/slick-carousel */
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1 ,
        adaptiveHeight: true,
        // autoplay: true,
        centerMode:true
      };
 
    //   export const authEndpoint = 'https://accounts.spotify.com/authorize';
    //   const clientId = "968ecb1e91bd4d78ad55c388755e8dcc";
    //   const redirectUri = "http://localhost:3000";
    //   const scopes = [
    //     "user-read-currently-playing",
    //     "user-read-playback-state",
    //   ];
      
    //   const hash = window.location.hash
    //     .substring(1)
    //     .split("&")
    //     .reduce(function(initial, item) {
    //       if (item) {
    //         var parts = item.split("=");
    //         initial[parts[0]] = decodeURIComponent(parts[1]);
    //       }
    //       return initial;
    //     }, {});
    //     window.location.hash = "";
    //     let _token = hash.access_token;
    //     if (_token) {
    //       // Set token
    //       setToken(_token); 

    //       useEffect(()=> { 

      
    //       }},[]);

    // let classesFordiv1= (classes.Slidershow,classes.Middle);
    let classesFordiv1= [classes.Slidershow,classes.Middle];
    
    let classesFordiv= [classes.Slide,classes.S1];

      
    let divS1Style = null;
    const clickedFunc= (id) => {
      // {
      //   margin: '40px',
      //   border: '5px solid pink'
      // };
      console.log('clicked');
      console.log(id);
      if(id===classes.R1){
        divS1Style= {'margin-left': '0'};

      }else if (id===classes.R2){
        divS1Style= {'margin-left': '-20%'};
      }else if(id===classes.R3){
        divS1Style= {'margin-left': '-40%'};
      }
        else if (id===classes.R4){
          divS1Style= {'margin-left': '-60%'};

        }else if (id===classes.R5){
          divS1Style= {'margin-left': '-80%'};
        }else console.log('error')

    }
    
    return (
            <div className={classes.Home}  >
       <p>home</p>
            <div className={classesFordiv1.join(' ')} style={divS1Style}>
                
              <div className={classes.Slides}> 

                  <input type="radio" name="r" id={classes.R1} className={classes.R1} checked onClick={()=> clickedFunc(classes.R1)}/>
                  <input type="radio" name="r" id={classes.R2} className={classes.R2} onClick={()=> clickedFunc(classes.R2)} onChange={(event) => console.log(event.target.checked)}/>
                  <input type="radio" name="r" id={classes.R3} className={classes.R3} onClick={()=> clickedFunc(classes.R3)} onChange={(event) => console.log(event.target.checked)}/>
                  <input type="radio" name="r" id={classes.R4} className={classes.R4} onClick={()=> clickedFunc(classes.R4)} onChange={(event) => console.log(event.target.checked)}/>
                  <input type="radio" name="r" id={classes.R5} className={classes.R5} onClick={()=> clickedFunc(classes.R5)} onChange={(event) => console.log(event.target.checked)}/>

                  <div className={classesFordiv.join(' ')}>
                    <img src={image3} alt=""></img>
                  </div>
                  <div className={classes.Slide}>
                    <img src={image1} alt=""></img>
                  </div>
                  <div className={classes.Slide}>
                    <img src={image2} alt=""></img>
                  </div>
                  <div className={classes.Slide}>
                    <img src={image4} alt=""></img>
                  </div>
                  <div className={classes.Slide}>
                    <img src={image5} alt=""></img>
                  </div>                  
  
              </div>

              <div className={classes.Navigation}>
                <label htmlFor={classes.R1} className={classes.Bar}>
                  
                </label>
                <label htmlFor={classes.R2} className={classes.Bar}></label>
                <label htmlFor={classes.R3} className={classes.Bar}></label>
                <label htmlFor={classes.R4} className={classes.Bar}></label>
                <label htmlFor={classes.r5} className={classes.Bar}></label>                
              </div>
 
            </div>
            

            {/* <div className={classes.Spotify} id={'spot'}>
            <center>
            <iframe src="https://open.spotify.com/embed/playlist/7yZSoJAJEf3YaNO5XMIKCt" width="800px" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            </center>
            </div> */}


            <div className={classes.ScrollHome}>
                <a href="#home">GO Back Home</a> 
            </div>
 
            </div>
    );
}; 
const mapStateToProps = state => {
    return {
      todoList: state.todoList ,
      selectedItem: state.todoList.selectedItem
    };
  };

export default connect(mapStateToProps,null)(Home2);
 