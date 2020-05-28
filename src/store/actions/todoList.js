import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
import Item from '../../component/Item/Item';

export const addtodoItem = (todoItem,token)=> { //V
console.log('addtodoItem');
console.log(todoItem);
console.log('token');
console.log(token); 

//ADD: ?auth=' + token
return dispatch => {
    let url= 'https://todolist-80427.firebaseio.com/Items.json?auth='+ token;
    axios.post(url,todoItem)
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
 
export const deletetodoItem = (todoID,token, userId)=> {  //V
    console.log('deletetodoItem');
    console.log(todoID); 
        return dispatch => {
            const queryParams= '?auth=' + token ;
            let url  = 'https://todolist-80427.firebaseio.com/Items/'+todoID+'.json'+queryParams; 
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

    

export const finishtodoItem = (todoID, token, userId)=> { //V
    console.log('finishtodoItem');
    console.log(todoID); 
        return dispatch => {

            const queryParams= '?auth=' + token ;
            let url  = 'https://todolist-80427.firebaseio.com/Items/'+todoID+'/finished.json' + queryParams; 
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



export const updatetodoItem = (todo, token, userId)=> { //V
    console.log('updatetodoItem');
    console.log(todo);
    return dispatch => {
    const queryParams= '?auth=' + token ;
    let url  = 'https://todolist-80427.firebaseio.com/Items/'+todo.id+'.json' + queryParams; 
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



 
export const fetchTodoList = (token,userId )=> { //V
    console.log('fetchTodoList');  
    return dispatch => {
        dispatch(fetchTodoListStart());
        console.log("token")        
        console.log(token)
        const queryParams= '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('https://todolist-80427.firebaseio.com/Items.json'+ queryParams)
    .then(res => {
        console.log(res.data);
        const fetchedtodoList = [];
        for(let key in res.data){
            fetchedtodoList.push({
                ...res.data[key],
                id:key
            });
        }
        console.log(fetchedtodoList); 
        dispatch(fetchTodoListSuccess(fetchedtodoList)); 
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