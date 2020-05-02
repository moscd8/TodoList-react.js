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
    const [toggleUnDONEViewClass,settoggleUnDONEViewClass] = useState();
    const [toggleDONEViewClass2,settoggleDONEViewClass2] = useState();
    const [toggleListViewClass,settoggleListViewClass] = useState();
        
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
    
    const toggleview = () => {
        if(toggleUnDONEViewClass===classes.UnDONE)
        {   console.log('1')
            settoggleUnDONEViewClass(classes.UnDONE_List);
            settoggleDONEViewClass2(classes.DONE_List);
            settoggleListViewClass(classes.TodoList_List);
        }
        else if(toggleUnDONEViewClass===classes.UnDONE_List)
        {   console.log('2')
            settoggleUnDONEViewClass(classes.UnDONE)
            settoggleDONEViewClass2(classes.DONE)
            settoggleListViewClass(classes.TodoList);
            
        }
        else{
            settoggleUnDONEViewClass(classes.UnDONE)            
            settoggleDONEViewClass2(classes.DONE)
            settoggleListViewClass(classes.TodoList);
            console.log('Error')
        }
    };

    const selectTodoItem =(selectTodoItem) => {
        console.log('selectTodoItem');
        console.log(selectTodoItem);
        props.selectedItem(selectTodoItem);
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
        <ul key={item.id} >
            <h3> {item.title}</h3>
            <h4>{item.content}</h4> 
            <button  className={classes.Delete} onClick={()=> deleteItem(item.id)}>Remove</button> 
            <button   className={classes.EditItem} onClick={()=> editItemFunc(item)}>Edit</button>

          </ul>  
        )) : (
            normalItems.push(
            <ul key={item.id}  onClick={()=> selectTodoItem(item.id)}>
                <h3> {item.title}</h3>
                <h4>{item.content}</h4>
                <button  className={classes.Delete} onClick={()=> deleteItem(item.id)}>Remove</button>
                <button  className={classes.Finish} onClick={()=> markAsFinishItem(item.id)}>Done</button>
                <button  className={classes.EditItem} onClick={()=> editItemFunc(item)}>Edit</button>
                {/* <button  className={classes.EditItem} onClick={()=> selectTodoItem(item)}>select</button> */}
                
            </ul> 
            ))
     ));
    };

    // let selectedItemToRender = null; 
    // if(props.todoList.selectedItem){
    //     selectedItemToRender = props.todoList.selectedItem.map(item=>(
    //     <div className={classes.Selected}> 
    //         <h3> {item.title}</h3> 
    //         {        
    //         setTimeout(()=> {
    //         setSelectedItem('');
    //         selectedItemToRender=null;
    //         console.log('timeout reached');
    //         },200)}
    // </div>
    // ))

    // }

    tempEditIteam = <EditTodoItem item={editItem} onUpdate={updateItemFunc} />

    return (
        <div className={toggleUnDONEViewClass ? toggleListViewClass : classes.TodoList_List} >
            {/* {todoListLoading} */}
            {/* <p>editItem</p>   */} 
        
            <h2>Change View to {toggleUnDONEViewClass===classes.UnDONE ? 'List' : 'Table'}</h2>
            <label className={classes.Switch}>
            <input type="checkbox" onClick={() => toggleview()} value="Table" />
            <span className={classes.Sliderround}></span>
            </label>

            <div className={classes.Lists}>
         
                <div className={toggleUnDONEViewClass ? toggleUnDONEViewClass : (settoggleUnDONEViewClass(classes.UnDONE)) }> 
                    {normalItems? <p> normalItems </p> && normalItems : null} 
                </div>
            
                <div className={toggleDONEViewClass2 ? toggleDONEViewClass2 : (settoggleDONEViewClass2(classes.DONE)) }>
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
      todoList: state.todoList 
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
  //    onItemAdded : (todoList) => dispatch(actions.addtodoItem(todoList)),
      deleteItem : (itemId) => dispatch(actions.deletetodoItem(itemId)), //V
      finishItem : (itemId) => dispatch(actions.finishtodoItem(itemId)), //V
      updateItem : (item) => dispatch(actions.updatetodoItem(item)), //V
      onFetchTodoList : (s) => dispatch(actions.fetchTodoList(s)), //V
      selectedItem : (itemId) => dispatch(actions.selectedItem(itemId) )
  };
  };

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(TodoList,axios)));