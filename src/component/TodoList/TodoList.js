import React, {useState, useEffect} from 'react'; 
import classes from './TodoList.module.css';
import {connect } from 'react-redux';
import * as actions from '../../store/actions/index';   
import EditTodoItem from '../EditTodoItem/EditTodoItem';
import Backdrop from  '../Backdrop/Backdrop';
import {withRouter} from 'react-router-dom';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../Spinner/Spinner';

const  TodoList = props => {

    const [editItem, setEditItem] = useState();
    const [showBackdrop,setBackdrop] = useState();
    const [toggleViewClass,settoggleViewClass] = useState({
        list:0,
        done:0,
        undone:0
    }); 
        
    let tempEditIteam=null;
    useEffect(() => {
        setEditItem('');
    },[props.todoList]);

    useEffect(() => {  
        props.onFetchTodoList(props.token, props.userId); 
    },[]); 

    const  deleteItem = (idToRemove) => {
        console.log('deleteItem'); 
        props.todoList.loading=true;
        props.deleteItem(idToRemove, props.token, props.userId);    
    }

    const  markAsFinishItem = (idToDoDone) => {  
        
        console.log('markAsFinishItem');
        console.log(idToDoDone);
        
        props.todoList.loading=true;
        props.finishItem(idToDoDone,props.token, props.userId);
    }

    const  editItemFunc = (ToDoEdit) => {    
        console.log('EditItem');
        console.log(ToDoEdit); 
        setEditItem(ToDoEdit);
        setBackdrop(true); 
    };

    const  updateItemFunc = (UpdatedToDoItem) => { 
        console.log('updateItemFunc');
        console.log(UpdatedToDoItem);
        if(!UpdatedToDoItem)  {
            setEditItem('');
            setBackdrop(false); 
            return;
        }
        setBackdrop(false); 
        setEditItem(UpdatedToDoItem);
        props.updateItem(UpdatedToDoItem, props.token, props.userId); 
        
    };
    
    const showBackdropFUnc = () => {
        return (showBackdrop || props.todoList.loading);
    }
    
    const toggleview = () => {
        if(!toggleViewClass){
            console.log('undifine')
            settoggleViewClass({
                list:0,
                done:0,
                undone:0
            });
            return;
        }else if (toggleViewClass.list===0){
            console.log('0')
            settoggleViewClass({
                list:1,
                done:1,
                undone:1
            });

        }else if (toggleViewClass.list===1){
            console.log('1');
            settoggleViewClass({
                list:0,
                done:0,
                undone:0
            });
        }else{
            console.log('error');            
            settoggleViewClass({
                list:0,
                done:0,
                undone:0
            });
        }
    };      

    const selectTodoItem =(selectTodoItem) => {
        // console.log('selectTodoItem');
        // console.log(selectTodoItem);
        // props.selectedItem(selectTodoItem);
    }
    
    let finishedItems=[];
    let normalItems=[]; 
    let tempArray=[]; 
    let i=0; 
    let todoListLoading =null;
    if(props.todoList.loading){
        todoListLoading =  (<p> Loading ...<Spinner /> </p>);
        console.log('Loading...')
    }else{
        
        console.log('DONT Loading...')
    } 

    if( props.todoList.todoList){ 
        console.log(props.todoList.todoList);
        for(let k in props.todoList.todoList){
            tempArray[i]=props.todoList.todoList[k];
            i++;
        }
        if(tempArray[0]) {


        console.log(tempArray)  
        tempArray.map(item=>(
        (typeof item.finished !== 'undefined' && item.finished) ? 
        (      
        finishedItems.push(
        <ul  className={classes.ULClass} key={item.id} >
            <h3> {item.title}</h3>
            <h4>{item.content}</h4> 
            <button  className={classes.Delete} onClick={()=> deleteItem(item.id)}>Remove</button> 
            <button   className={classes.EditItem} onClick={()=> editItemFunc(item)}>Edit</button>
          </ul>  
        )) : (
            normalItems.push(
            <ul  className={classes.ULClass} key={item.id}  onClick={()=> selectTodoItem(item.id)}>
                <h3> {item.title}</h3>
                <h4>{item.content}</h4>
                <button  className={classes.Delete} onClick={()=> deleteItem(item.id)}>Remove</button>
                <button  className={classes.Finish} onClick={()=> markAsFinishItem(item.id)}>Done</button>
                <button  className={classes.EditItem} onClick={()=> editItemFunc(item)}>Edit</button>               
            </ul>
            ))
            ));
        }
    };

    tempEditIteam = editItem ? (<EditTodoItem item={editItem} onUpdate={updateItemFunc} />) :null;
    console.log("The value of tempEditIteam is "); 

    console.log(editItem); 
    return (
        <div className={classes.TodoList} > 
            <p>Change View to {toggleViewClass.list===0 ? 'List' : 'Table'} </p>
            <label className={classes.Switch}>
            <input type="checkbox" onClick={() => toggleview()} value="Table" />
            <span className={classes.Sliderround}></span>
            </label> 
 
            <div className={ toggleViewClass.list ? classes.Lists_Lists : classes.Lists}>
                <div className={toggleViewClass.undone ? classes.UnDONE_List : classes.UnDONE }>
                    {normalItems? <p> normalItems </p> && normalItems : null} 
                </div>
            
                <div className={toggleViewClass.done ? classes.DONE_List : classes.DONE}>            
                    {finishedItems? (<p> finishedItems </p> && finishedItems) : null} 
                </div> 
            </div>

            <Backdrop show={showBackdropFUnc()}>
             {todoListLoading}
             {tempEditIteam}
            </Backdrop>  

        </div>
        );
  }


  const mapStateToProps = state => {
    return {
      todoList: state.todoList ,
      token: state.auth.token,
      userId: state.auth.userId
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      deleteItem : (itemId , token, userId) => dispatch(actions.deletetodoItem(itemId, token, userId)), 
      finishItem : (itemId, token, userId) => dispatch(actions.finishtodoItem(itemId, token, userId)), 
      updateItem : (item, token, userId) => dispatch(actions.updatetodoItem(item, token, userId)), 
      onFetchTodoList : (token,userId) => dispatch(actions.fetchTodoList(token,userId)),
      selectedItem : (itemId) => dispatch(actions.selectedItem(itemId) )
  };
  };

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(TodoList,axios)));