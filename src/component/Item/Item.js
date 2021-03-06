import React, { useState  } from 'react';
import Aux from '../../hoc/Auxility/Auxility';
import classes from './Item.module.css';
import * as actions from '../../store/actions/index'; 
import {connect } from 'react-redux';
// import {connect,useSelector} from 'react-redux';

import uuid from 'react-uuid'; 
import Spinner from '../Spinner/Spinner';
import Backdrop from '../Backdrop/Backdrop'
 
const  Item = props => {  

    // const todoListTemp = useSelector( (state) => state.todoList);
    const [newItemTitle, setNewItemTitle] = useState('');
    const [newItemContent, setNewItemContent] = useState('');  
    const [ItemAdded, setItemAdded] = useState();
     
    
    
    const showBackdropFunc = ()=> {
      return props.todoList.loading;
    }

    let todoListLoading =null;
    if(props.todoList.loading){
        todoListLoading =  <Spinner />;
        console.log('Loading...')
    }else{
        
        console.log('DONT Loading...')
    } 

     const addItem = (evt) => { 
      evt.preventDefault();
          if(newItemTitle  === "" || !newItemTitle.value.trim())
          return; 
          
          if(newItemContent  === "" || !newItemContent.trim())
          return; 
      
        const tempItem= {
          // id:newItemTitle.id,
          title: newItemTitle.value,
          content: newItemContent,
          finished: false,
          userId: props.userId
        }  
   
        setNewItemTitle({id:'' ,value: ''})
        setNewItemContent('');

        props.todoList.loading= true;
        setItemAdded((
          <div className={classes.AddedNotification}> 
              <p>Added</p>
          </div>));
        console.log("props.token: ");
        console.log(props.token);
        props.onItemAdded(tempItem, props.token);
      }
 
 
    const showAndremoveAddedAnimation =()=> {
      if(props.todoList.loading) return ;
      const msg = ItemAdded;
      setTimeout(()=> {
        setItemAdded('');
        console.log('timeout reached');
        },2000);
      return msg; 
    }


  return (
        <Aux> 
         
        <div className={classes.Items}> 
        <h1> Add an Item</h1> 
        <form className={classes.Form}>
        <input className={classes.Input}
            type="text" 
            placeholder="item title" 
            // value={newItemTitle ? newItemTitle.value : ''}
            value={newItemTitle.value}
            onChange={event => setNewItemTitle({id:uuid() ,value: event.target.value})}
        />
        {/* <input className={classes.Input_Content}
            type="text" 
            placeholder="item content" 
            // value={newItemContent ? newItemContent : ''}
            value={newItemContent}          
            onChange={event => setNewItemContent(event.target.value)}
        /> */}
         <textarea  className={classes.Input_Content}
            cols="40"
            rows="10"
            placeholder="item content" 
            // value={newItemContent ? newItemContent : ''}
            value={newItemContent}          
            onChange={event => setNewItemContent(event.target.value)}
        />
        <button className={(newItemTitle.value !== '' && newItemContent !== '')  ? classes.Add : classes.AddDisable } onClick={addItem }>  Add </button>  
        </form>
        <Backdrop show={showBackdropFunc() } >
             {todoListLoading}
        </Backdrop>  
        <div>  
        {ItemAdded ? 
        <p> {showAndremoveAddedAnimation()}</p> 
        : null}
        </div>

        {/* <button
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}>
        Hover over me!
      </button> */}

        {/* {ItemAdded2? ItemAdded2 : <p>didnt updated yet</p>} */}
         
        </div>
        </Aux>
    );
};


const mapStateToProps = state => {
  return {
    todoList: state.todoList,
    auth : state.auth,
    token: state.auth.token,
    userId: state.auth.userId
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onItemAdded : (todoItem,token) => dispatch(actions.addtodoItem(todoItem,token)),
    onAuth : (email,password,isSignup) => dispatch(actions.auth(email,password,isSignup)) 
    // ,
    // deleteItem : (itemId) => dispatch(actions.deletetodoItem(itemId)),
    // finishItem : (itemId) => dispatch(actions.finishtodoItem(itemId))
    
};
}

export default connect(mapStateToProps,mapDispatchToProps)(Item);