import React , {useState , useEffect} from 'react';
import * as V from 'victory';
import { VictoryBar ,VictoryPie, VictoryTheme, VictoryLabel} from 'victory';
import {connect } from 'react-redux';
import classes from './Statistics.module.css';
import * as actions from '../../store/actions/index';   

const Statistics = (props) => {


    const [completedItem, setCompletedItem] = useState(0);
    const [uncompletedItem, setUncompletedItem] = useState(0);
    useEffect (() => {
        calcItem();
    
        return()  => {
            setCompletedItem(0);
            setUncompletedItem(0);
        };
    }
    , []);
    useEffect(() => {  
        props.onFetchTodoList(props.token, props.userId); 
    },[]); 

    const calcItem = () => {        
    let todoList = null;
    let tempArray=[]; 
    let i=0; 
    console.log('Statistics')
     let co=0;
        let unco=0;
    if(props.todoList.todoList){
        //let tempList= props.todoList.todoList;
        //console.log(tempList)
        for(let k in props.todoList.todoList){
            tempArray[i]=props.todoList.todoList[k];
            i++;
        }
        
        console.log(tempArray)
               
        tempArray.map(item => {
            if(item.finished){
                co++;
            }
            else{
                unco++;            
            }
        })
        setCompletedItem(co);
        setUncompletedItem(unco);

                
    }
    }
    let totalItem= completedItem+uncompletedItem;
    let percentageOfCompleted= (completedItem/totalItem)*100 ;
    let roundedCo= Math.round(percentageOfCompleted);
    console.log(roundedCo);
    return(<div>
        <p>Statistics </p>
        
        {completedItem}
        <br/>
        {uncompletedItem}
        <div className={classes.PieChart}> 
        <svg viewBox="0 0 400 400">
        <VictoryPie
          standalone={false}
          width={400} height={400}
          data={[
            { x: completedItem, y: completedItem }, { x: uncompletedItem, y: uncompletedItem }
          ]}
        //   data={[{'key': "UnDone", 'y': completedItem}, {'key': "Done", uncompletedItem: (totalItem-completedItem)} ]}
          innerRadius={68} labelRadius={100}
          style={{ labels: { fontSize: 20, fill: "white" } }}
        /> 

        <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 20 }}
          x={200} y={200}
          text={roundedCo + '%'} 
        />
      </svg>
      </div>
 
         </div>);
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
      onFetchTodoList : (token,userId) => dispatch(actions.fetchTodoList(token,userId)) 
  };
  };

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
   