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
import Slider from "react-slick";
import classes from './Home.module.css';
// import SpotifyPlayer from 'react-spotify-player';

import {connect } from 'react-redux'; 

// import { faHome } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import 'font-awesome/css/font-awesome.min.css';
import 'font-awesome/css/font-awesome.min.css';


const Home = (props) => {

    console.log('home');
    console.log(props.todoList.selectedItem);
    let selectedItemToRender = null;
    if(props.todoList.selectedItem){
    selectedItemToRender = props.todoList.selectedItem.map(item=>(
        <div className={classes.Selected}>
            <h3> {item.title}</h3>
            <h4>{item.content}</h4>         
        </div>
    )) 
    } 

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1 ,
        adaptiveHeight: true,
        autoplay: true,
        centerMode:true
      };

      
    return (
        <div className={classes.Home} id={'home'}>
            <div className={classes.Scroll}>
                 <a href="#spot">Go To Player</a>    
            </div>

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
                
            </Slider>
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

export default connect(mapStateToProps,null)(Home);
 