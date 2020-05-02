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


// import { Redirect} from 'react-router-dom';
const  TodoList = props => {

    // const list = useSelector(state=>state.todoList);  
    const [editItem, setEditItem] = useState();
    const [showBackdrop,setBackdrop] = useState();
    const [bodyBackroundClicked,setbodyBackroundClicked] = useState();
    
    let tempEditIteam=null;
    useEffect(() => {
        setEditItem('');
    },[props.todoList]);

    useEffect(() => {  
        props.onFetchTodoList();
    },[]);
 
    const  deleteItem = (idToRemove) => {
        console.log('deleteItem'); 
        props.todoList.loading=true;
        props.deleteItem(idToRemove);    
    }

    const  markAsFinishItem = (idToDoDone) => {  
        
        console.log('markAsFinishItem');
        console.log(idToDoDone);
        
        props.todoList.loading=true;
        props.finishItem(idToDoDone);
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
        props.updateItem(UpdatedToDoItem); 
        // props.history.push('/'); 
        
    };
    
    const showBackdropFUnc = () => {
        return (showBackdrop || props.todoList.loading);
    }
    
  


    let finishedItems=[];
    let normalItems=[]; 
    let tempArray=[]; 
    let i=0; 
    let todoListLoading =null;
    if(props.todoList.loading){
        todoListLoading =  <Spinner />;
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
        console.log(tempArray)
       
        tempArray.map(item=>(
        item.finished ? (         
        finishedItems.push(
        <ul key={item.id} className={classes.FinisedList}>
            <h3> {item.title}</h3>
            <h4>{item.content}</h4> 
            <button  className={classes.Delete} onClick={()=> deleteItem(item.id)}>Remove</button> 
            <button   className={classes.EditItem} onClick={()=> editItemFunc(item)}>Edit</button>

          </ul>  
        )) : (
            normalItems.push(
            <ul key={item.id}>
                <h3> {item.title}</h3>
                <h4>{item.content}</h4> 
                <button  className={classes.Delete} onClick={()=> deleteItem(item.id)}>Remove</button>
                <button  className={classes.Finish} onClick={()=> markAsFinishItem(item.id)}>Done</button>
                <button  className={classes.EditItem} onClick={()=> editItemFunc(item)}>Edit</button>
            </ul> 
            ))
     ));
    };
    tempEditIteam = <EditTodoItem item={editItem} onUpdate={updateItemFunc} />

    return ( 
        <div className={classes.TodoList} >
            {/* {todoListLoading} */}
            <p>editItem</p>  
            {normalItems? <p> normalItems </p> && normalItems : null} 
            <div className={classes.DONE}>
                {finishedItems? (<p> finishedItems </p> && finishedItems) : null} 
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
      todoList: state.todoList 
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
  //    onItemAdded : (todoList) => dispatch(actions.addtodoItem(todoList)),
      deleteItem : (itemId) => dispatch(actions.deletetodoItem(itemId)), //V
      finishItem : (itemId) => dispatch(actions.finishtodoItem(itemId)), //V
      updateItem : (item) => dispatch(actions.updatetodoItem(item)), //V
      onFetchTodoList : (s) => dispatch(actions.fetchTodoList(s)) //V
  };
  };

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(TodoList,axios)));