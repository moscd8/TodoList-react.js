import React,{useState, useEffect} from 'react';
import classes from './EditTodoItem.module.css';
const EditTodoItem = props => {
    
    const [newItemTitle, setNewItemTitle] = useState('');
    const [newItemContent, setNewItemContent] = useState('');
 
    useEffect(()=> {
        setNewItemTitle(props.item.title);
        setNewItemContent(props.item.content); 

    },[props.item]);

    const updateFunc = () => { 
        
        console.log('updateding  tempItem..');
        // if(newItemTitle ==="" || !newItemTitle.trim() || newItemContent ==="" || !newItemContent.trim()) 
        // return; 

        const tempItem= {
            id: props.item.id,
            title: newItemTitle,
            content:  newItemContent,
            finished: props.item.finished
          };

        setNewItemTitle('');
        setNewItemContent(''); 
        console.log('updateding  tempItem..');
        console.log(tempItem); 
        props.onUpdate(tempItem)
    } 
    
    let myTodoList =null
    if(props.item){
        myTodoList=  
        (<div className={classes.EditItem} key={props.item.id}>
            <ul> 
                <input 
                    type="text"   
                    defaultValue={props.item.title} 
                    onChange={event => setNewItemTitle(event.target.value)}
                />
                <input 
                    type="text"   
                    defaultValue={props.item.content} 
                    onChange={event => setNewItemContent(event.target.value)}
                /> 
              <button  onClick={() => updateFunc()}> Update</button>
              <button  onClick={() => updateFunc()}> Cancle</button>
            </ul>

          </div>
          )
      };


    return (
        <div>
            <p> EditTodoItem </p> 
             {myTodoList ? myTodoList : null}

        </div>
    );
}

export default EditTodoItem;