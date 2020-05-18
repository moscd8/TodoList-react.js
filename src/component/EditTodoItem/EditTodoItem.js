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
    console.log(props.item);
    if(props.item){
        myTodoList=  
        (
        // <div className={classes.ULClass}  key={props.item.id}>
            <ul className={classes.ULClass} key={props.item.id}> 
                <input 
                    type="text"   
                    defaultValue={props.item.title} 
                    onChange={event => setNewItemTitle(event.target.value)}
                />
                {/* <input 
                    type="text"   
                    defaultValue={props.item.content} 
                    onChange={event => setNewItemContent(event.target.value)}
                />  */}
                 <textarea  className={classes.Input_Content}
                    cols="40"
                    rows="7"
                    value={newItemContent ? newItemContent:  props.item.content}
                    onChange={event => setNewItemContent(event.target.value)}
                />
              <button  onClick={() => updateFunc()}> Update</button>
              <button  onClick={() => updateFunc()}> Cancle</button>
            </ul>

        //   </div>
          )
      };


    return (
        <div className={classes.EditItem}>
            <p> Edit Selected Item </p> 
             {myTodoList ? myTodoList : null}

        </div>
    );
}

export default EditTodoItem;