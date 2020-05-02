import React  from 'react';
import Item from './component/Item/Item';
import Home from './component/Home/Home';
import {Route, Switch ,Redirect,BrowserRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Navigation from './component/Navigation/Navigation '; 
import TodoList from './component/TodoList/TodoList';
import classes from './App.module.css';
const App = (props) => {
  let routes= (
    <Switch>
      {/* <Route path="/auth" render={(props)=> <Auth {...props}/>}/>  */}
      <Route path="/" exact render={(props)=> <Item  {...props}/>}/>      
      <Route path="/home" exact component={Home}/>
      <Route path="/todolist" exact component={TodoList}/> 
      
      {/* <Route path="/" exact component={Home}/> */}
      <Redirect to="/"/> 
  </Switch>

  );
 
  return (
    <div className={classes.App}> 
         {/* <Switch> 
            {routes}
         </Switch>    */}
         <BrowserRouter>
           <Navigation/>
           <hr />

           {routes}
         </BrowserRouter>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    item: state.item,
    todoList: state.todoList
  }
};

// const mapDispatchToProps = dispatch => {
//   return {
//     onTryAutoSignup: () => dispatch(actions.authCheckState())
//   }
// };


export default connect(mapStateToProps,null)(App); 
// export default withRouter((App)); 