import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
import Item from '../../component/Item/Item';

export const addtodoItem = (todoItem)=> { //V
console.log('addtodoItem');
console.log(todoItem); 

return dispatch => {
    axios.post('https://todolist-80427.firebaseio.com/todolist.json',todoItem)
    .then(response => {
    console.log(response.data);
    let id= response.data.name;
    todoItem.id=id; 
    dispatch(addtodoItemSuccess(todoItem));
    })
    .catch(error => {
    console.log("Fail error:")
    console.log(error)
    dispatch(addtodoItemFailed(error))
    }) ;    
}
};

export const addtodoItemSuccess = (todoItem)=> { //V
    console.log('addtodoItemSuccess');
    return{
        type: actionTypes.ADD_TODOITEM_SUCCESS,
        todoItem: todoItem
    };
}

export const addtodoItemFailed = (error)=> { //V
    console.log('addtodoItemFailed');
    return{
        type: actionTypes.ADD_TODOITEM_FAILED, 
        error: error
    };
}
 
export const deletetodoItem = (todoID)=> {  //V
    console.log('deletetodoItem');
    console.log(todoID); 
        return dispatch => {
            let url  = 'https://todolist-80427.firebaseio.com/todolist/'+todoID+'.json'; 
            axios.delete(url)
                .then(res => {
                        console.log(res.data);
                        dispatch(deletetodoItemSuccess(todoID)); 
                        })
                .catch(error => {
                    console.log("Fail error:")
                    console.log(error);
                    dispatch(deletetodoItemFailed(error));  
                });
            }
};


export const deletetodoItemSuccess = (  todoID) =>{   //V
    return{
        type:actionTypes.DELETE_TODOITEM_SUCCESS,        
        todoID: todoID
    };
};    

export const deletetodoItemFailed = (  error) =>{  //V
    return{
        type:actionTypes.DELETE_TODOITEM_FAILED,
        error: error
    };
};    

    

export const finishtodoItem = (todoID)=> { //V
    console.log('finishtodoItem');
    console.log(todoID); 
        return dispatch => {
            let url  = 'https://todolist-80427.firebaseio.com/todolist/'+todoID+'/finished.json'; 
            axios.put(url,true)
                .then(res => {
                        console.log(res.data);  
                        dispatch(finishtodoItemSuccess(todoID));          
                        }) 
                .catch(error => {
                    console.log("Fail error:")
                    console.log(error);
                    dispatch(finishtodoItemFailed(error));  
                });
            }
    };
    
export const finishtodoItemSuccess = (todoID) =>{  //V
    return{
        type:actionTypes.FINISH_TODOITEM_SUCCESS,        
        todoID: todoID
    };
};    

export const finishtodoItemFailed = (error) =>{  //V
    return{
        type:actionTypes.FINISH_TODOITEM_FAILED,
        error: error
    };
};    



export const updatetodoItem = (todo)=> { //V
    console.log('updatetodoItem');
    console.log(todo);
    return dispatch => {
    let url  = 'https://todolist-80427.firebaseio.com/todolist/'+todo.id+'.json'; 
    axios.put(url,todo)
    .then(res => {
        console.log(res.data);
        dispatch(updatetodoItemSuccess(todo));
    })
    .catch(error => {
        console.log("Fail error:");
        console.log(error);
        dispatch(updatetodoItemFailed(error));
    });
    }
};


export const updatetodoItemSuccess = (  todo) =>{  //V
    return{
        type:actionTypes.EDIT_TODOITEM_SUCCESS,        
        newtodo: todo
    };
};    

export const updatetodoItemFailed = (error) =>{  //V
    return{ 
        type:actionTypes.EDIT_TODOITEM_FAILED,        
        error: error
    };
};



 
export const fetchTodoList = ( )=> { //V
    console.log('fetchTodoList');  
    return dispatch => {
        dispatch(fetchTodoListStart()); 
    axios.get('https://todolist-80427.firebaseio.com/todolist.json')
    .then(res => {
        console.log(res.data);
        const fetchedOrders = [];
        for(let key in res.data){
            fetchedOrders.push({
                ...res.data[key],
                id:key
            });
        }
        console.log(fetchedOrders); 
        dispatch(fetchTodoListSuccess(fetchedOrders)); 
    })
    .catch(error => {
        console.log("Fail error:")
        console.log(error)
        dispatch(fetchTodoListFailed(error));
    });
}

}

export const fetchTodoListStart = () =>{  //V
    return{
        type:actionTypes.FETCH_TodoList_START
    };
};

export const fetchTodoListSuccess = (todoList) =>{  //V
    return{
        type:actionTypes.FETCH_TodoList_SUCCESS,        
        todoList: todoList
    };
};

export const fetchTodoListFailed = (error) =>{ //V
    return{
        type:actionTypes.FETCH_TodoList_FAILED,
        error: error
    };
};


export const selectedItem = (Item) => {
    return {
        type: actionTypes.FETCH_SELECTED_ITEM,
        id: Item
    }
} 