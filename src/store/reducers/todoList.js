import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-orders';

const initialState = {
    // todoList:[],
    todoList:[],
    loading:false
}

/** FUNCTIONS */
// const AddTodoItemFunc = (state,action) => { 
//     console.log('AddTodoItemFunc');
//     const newList= [...state.todoList,action.todoList];
//     return {
//         ...state,
//         todoList:newList
//     };
// };


const AddTodoItemSuccessFunc = (state,action) => {  //V
    console.log('AddTodoItemSuccessFunc');
    const newList= [...state.todoList,action.todoItem];
    return {
        ...state,
        todoList:newList,
        loading:false
    };
};
const AddTodoItemFailedFunc = (state,action) => {  //V
    console.log('AddTodoItemFailedFunc');
    // const newList= [...state.todoList,action.todoItem];
    return {
        ...state,
        todoList:[...state.todoList],
        error: action.error,
        loading:false
    };
};



// const DeleteTodoItemFunc = (state,action) => {
//     console.log('DeleteTodoItemFunc');
//      const copyList = [...state.todoList];
//     const updateList = copyList.filter( item=> item.id !== action.idToDelete); 
//     return {
//         ...state,
//         todoList: updateList
//     };
// };

const DeleteTodoItemSuccessFunc = (state,action) => { //V
    console.log('DeleteTodoItemSuccessFunc');
     const copyList = [...state.todoList];
    const updateList = copyList.filter( item=> item.id !== action.todoID); 
    return {
        ...state,
        todoList: updateList,
        loading:false
    };
};

const DeleteTodoItemFailedFunc = (state,action) => { //V
    console.log('DeleteTodoItemSuccessFunc');
    return {
        ...state,
        todoList: [...state.todoList],
        loading:false
    };
};



const FinishTodoItemSuccessFunc = (state,action) => {  //V
    console.log('FinishTodoItemSuccessFunc'); 
    const temp= [...state.todoList];
    console.log(temp);
    for(let key in temp){
        if(temp[key].id === action.todoID){
            temp[key].finished=true;
        }
    }
    
    return {
        ...state,
        todoList: temp,
        loading:false
    };
};

const FinishTodoItemFailedFunc = (state,action) => {  //V
    console.log('FinishTodoItemFailedFunc'); 
    return {
        ...state,
        todoList: [...state.todoList],
        loading:false
    };
};

// const FinishTodoItemFunc = (state,action) => { 
//     console.log('FinishTodoItemFunc');
//     console.log(action.finishedId);
//     return dispatch => {
//     let url  = 'https://todolist-80427.firebaseio.com/todolist/'+action.finishedId+'/finished.json'; 
//     axios.put(url,true)
//         .then(res => {
//                 console.log(res.data);  
//                 dispatch(FinishTodoItemSuccessFunc(action.finishedId));
//                 })
//         .catch(error => {
//             console.log("Fail error:")
//             console.log(error); 
//         });
//     }
// };
  
const EditTodoItemSuccessFunc = (state,action) => { //V
    console.log('EditTodoItemSuccessFunc');
    console.log(action.newtodo); 
    const temp = [...state.todoList];
    const updateList = temp.filter(item=> item.id !== action.newtodo.id); 
    updateList.push(action.newtodo); 
       return {
           ...state,
           todoList: updateList
       };
 };

 const EditTodoItemFailedFunc = (state,action) => { //V
    console.log('EditTodoItemFailedFunc'); 
    return { 
        ...state, 
        loading:false,
        error: action.error
    };
};



//  const FetchTodoListFunc = (state,action) => { 
//     console.log('FetchTodoListFunc'); 
     
//     const copyList = [...state.todoList];
//     const listWithoutOldItem = copyList.filter( item=> item.id !== action.idToDelete); 
//     console.log(listWithoutOldItem);
//     listWithoutOldItem.push(action.updatedtodo);
    
//     //axios.update('https://todolist-80427.firebaseio.com/todolist.json/-M4xgNp1EuSrFSFGcePS',action.updatedtodo)

 
//      return {
//              ...state,
//              loading:true,
//              todoList: listWithoutOldItem
//          };
//  };
 
const FetchTodoListStartFunc = (state,action) => { //V
    console.log('FetchTodoListStartFunc'); 
    return { 
        ...state,
        loading:true
    };
};

const FetchTodoListSuccessFunc = (state,action) => { //V
    console.log('FetchTodoListSuccessFunc'); 
    return { 
        ...state,
        todoList: action.todoList,
        loading:false
    };
};


const FetchTodoListFailedFunc = (state,action) => {  //V
    console.log('FetchTodoListFailedFunc'); 
    return { 
        ...state,
        todoList: [...state.todoList,action.todoList],
        loading:false,
        error: action.error
    };
};

const FetchSelectedTodoItemFunc = (state,action) => {  //V
    console.log('FetchSelectedTodoItemFunc'); 
    const tempList= [...state.todoList];
    const itemFromList = tempList.filter(item=> item.id === action.id);

    return { 
        ...state, 
        loading:false,
        selectedItem: itemFromList
    };
};
  
const reducer = (state= initialState,action) => {
    switch (action.type) {
        /* ADD */  
        case actionTypes.ADD_TODOITEM_SUCCESS: return AddTodoItemSuccessFunc(state,action);  //V
        case actionTypes.ADD_TODOITEM_FAILED: return AddTodoItemFailedFunc(state,action);  //V

        /* DELETE */            
        case actionTypes.DELETE_TODOITEM_SUCCESS: return DeleteTodoItemSuccessFunc(state,action);  //V
        case actionTypes.DELETE_TODOITEM_FAILED: return DeleteTodoItemFailedFunc(state,action);   //V


        /* EDIT */  
        case actionTypes.EDIT_TODOITEM_SUCCESS: return EditTodoItemSuccessFunc(state,action);    //V
        case actionTypes.EDIT_TODOITEM_FAILED: return EditTodoItemFailedFunc(state,action);   //V

        /* FETCH */
        case actionTypes.FETCH_TodoList_START: return FetchTodoListStartFunc(state,action);   //V
        case actionTypes.FETCH_TodoList_SUCCESS: return FetchTodoListSuccessFunc(state,action);   //V
        case actionTypes.FETCH_TodoList_FAILED: return FetchTodoListFailedFunc(state,action);  //V

        /* Complete */
        case actionTypes.FINISH_TODOITEM_SUCCESS: return FinishTodoItemSuccessFunc(state,action);    //V
        case actionTypes.FINISH_TODOITEM_FAILED: return FinishTodoItemFailedFunc(state,action);    //V       
        
        case actionTypes.FETCH_SELECTED_ITEM : return FetchSelectedTodoItemFunc (state,action);

//      case actionTypes.FETCH_TODOLIST: return FetchTodoListFunc(state,action);   
//      case actionTypes.DELETE_TODOITEM: return DeleteTodoItemFunc(state,action);          
//      case actionTypes.MARK_AS_DONE_TODOITEM: return FinishTodoItemFunc(state,action); 
//      case actionTypes.ADD_TODOITEM: return AddTodoItemFunc(state,action);  
        
        default: return state;

    }
}

export default reducer;