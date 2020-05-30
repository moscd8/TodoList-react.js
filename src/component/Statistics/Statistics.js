import React , {useState , useEffect} from 'react';
import * as V from 'victory';
import { VictoryBar ,VictoryPie, VictoryTheme, VictoryLabel} from 'victory';
import {connect } from 'react-redux';
import classes from './Statistics.module.css';
import * as actions from '../../store/actions/index';   

import Spinner from '../Spinner/Spinner';
import Backdrop from  '../Backdrop/Backdrop';

const Statistics = (props) => {


    const [completedItem, setCompletedItem] = useState(0);
    const [uncompletedItem, setUncompletedItem] = useState(0);
    
    const [showBackdrop,setBackdrop] = useState();
    const [TotalItem, setTotalItem] = useState(0);
    
    useEffect(() => {  
        props.onFetchTodoList(props.token, props.userId); 
        Calc(); 
    },[]);

    
    // useEffect (() => {
    //     //calcItem();
    
    //     // return()  => {
    //     //     setCompletedItem(0);
    //     //     setUncompletedItem(0);
    //     // };
    // }
    // , []);
    let roundedCo=0;
   //const calcItem = () => {    
         
    let todoListLoading =null;
    if(props.todoList.loading){
        todoListLoading =  (<p> Loading ...<Spinner /> </p>);
        console.log('Loading...')
    }else{
        
        console.log('DONT Loading...')
    } 

 

    const Calc= () => {
      
    console.log('Statistics')    
    let todoList = null;
    let tempArray=[]; 
    let i=0; 
    
    let co=0;
    let unco=0;    
    console.log("props");
    if(props.todoList.todoList){ 
        //console.log(tempList)
         for(let k in props.todoList.todoList){ 
          tempArray[i]= props.todoList.todoList[k];
            i++;
        }
        console.log("after if ");
        if(tempArray[0]) {
         
        console.log(tempArray);
        tempArray.map(item => (
          (typeof item.finished !== 'undefined' && item.finished) ? co++: unco++
        ))
      }
        setCompletedItem(co);
        setUncompletedItem(unco);        
    } 
    

    console.log('completedItem');

    console.log(completedItem);
    
    let totalItem= completedItem+uncompletedItem;
    console.log(totalItem);
    //if(totalItem>0){
      let percentageOfCompleted= (completedItem/totalItem) *100;;
      //roundedCo=percentageOfCompleted
      roundedCo= Math.round(percentageOfCompleted);      
      console.log(roundedCo);

    }

    // if(props.todoList){
    //  return () => Calc();
    // }

    const showBackdropFUnc = () => {
        return (showBackdrop || props.todoList.loading);
    }
    
    


    let pieChartToRender = (
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
        style={{ labels: { fontSize: 20, fill: "white" }} }
      /> 

      <VictoryLabel
        textAnchor="middle"
        style={{ fontSize: 20 }}
        x={200} y={200}
        text={roundedCo + '%'} 
      />
    </svg>
    </div>
    )
 
    
    return(
    <div className={classes.PieChart}>
        <p>Statistics </p> 
        {completedItem ?  <h2> Completed Item : {completedItem}</h2>: null} 
        
        {uncompletedItem ?  <h2> UnCompleted Item : {uncompletedItem}</h2>: null} 
        
        {pieChartToRender? pieChartToRender: null}

        <Backdrop show={showBackdropFUnc()}>
             {todoListLoading}
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
      onFetchTodoList : (token,userId) => dispatch(actions.fetchTodoList(token,userId)) 
  };
  };

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
   