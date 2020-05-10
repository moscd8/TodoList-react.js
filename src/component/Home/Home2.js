import React, {useEffect,useState} from 'react'; 
// import classes from './Home/Home.module.css';
// import classes from './Home.module.css';
import image1 from '../../shered/1.jpg';
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
      
    return (
             <div className={classes.Home} id={'home'}>
            {/* <p> HomePage ad</p> */}
            {/* {!token && (
            <a
            className="btn btn--loginApp-link"
            href={`${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
        >
          Login to Spotify
        </a>
      )}
      {token 
    //   && (
    //     // Spotify Player Will Go Here In the Next Step
    //   )
      } */}
            {/* <p>         {props.selectedItem ?  props.selectedItem : (<p> no item was selected</p>) } </p> */}
            {/* {props.selectedItem} */}

            {/* <div class="arrow bounce">
                <a class="fa fa-arrow-down fa-2x" href="#spot">Go To Player</a>
            </div> */}
{/* 
            <section id="section01" class="demo" onClick={clicked}>
                <h1>Scroll Down Button #1</h1>
                <a href="#spot" onClick={clicked}><span></span>Go To Player</a>
            </section>
             */} 

            <div className={classes.Scroll}>
                 <a href="#spot">Go To Player</a>    
            </div>
{/* 
            <Slider {...settings} >
            
            <span>
            <img className={classes.Slides} src={image1} alt="Logo" /> 
            {selectedItemToRender}
            
            <p id='Text'>Some Text Some Text </p>
            </span>

            <span>
            <img className={classes.Slides} src={image2} alt="Logo"/>
            {selectedItemToRender}
            </span>
            
            <span>
            <img className={classes.Slides} src={image3} alt="Logo" />    
            {selectedItemToRender}
            </span> 
            <span>
            <img className={classes.Slides} src={image4} alt="Logo" />                
            {selectedItemToRender}
            </span>
            <span>
            <img className={classes.Slides} src={image5} alt="Logo" />                
            {selectedItemToRender}
            </span>
            </Slider> */}
        
                {/* <div className={classes.Img}>
                {selectedItemToRender}
                <img className={classes.Slides} src={image1} alt="Logo" /> 
                </div>

                <div className={classes.Img}>
                {selectedItemToRender}
                <img className={classes.Slides} src={image2} alt="Logo"/>
                </div>
                
                <div className={classes.Img}>
                {selectedItemToRender}                    
                <img className={classes.Slides} src={image3} alt="Logo" />
                </div>
                
                <div className={classes.Img}>
                {selectedItemToRender}
                <img className={classes.Slides} src={image4} alt="Logo" />
                </div>

                <div className={classes.Img}>
                {selectedItemToRender}
                <img className={classes.Slides} src={image5} alt="Logo" />
                </div> */}
                
            <div className={classes.Slide_Container}>
                <div className={classes.Image_Container}>

                <span>
                <img className={classes.Slider_image} src={image1} alt="Logo" /> 
                {selectedItemToRender}
                <p id='Text'>Some Text Some Text </p>
                </span>

                <span>
                <img className={classes.Slider_image} src={image2} alt="Logo"/>
                {selectedItemToRender}
                </span>
                
                <span>
                <img className={classes.Slider_image} src={image3} alt="Logo" />    
                {selectedItemToRender}
                </span> 
                <span>
                <img className={classes.Slider_image} src={image4} alt="Logo" />                
                {selectedItemToRender}
                </span>
                <span>
                <img className={classes.Slider_image} src={image5} alt="Logo" />                
                {selectedItemToRender}
                </span>

                </div>    
            </div>
            
            <div className={classes.Spotify} id={'spot'}>
            <center>
            <iframe src="https://open.spotify.com/embed/playlist/7yZSoJAJEf3YaNO5XMIKCt" width="800px" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            </center>
            </div>


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
 