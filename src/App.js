import React, { useEffect }  from 'react';
import Item from './component/Item/Item';
// import Home from './component/Home/Home';
import Home from './component/Home/Home';
import {Route, Switch ,Redirect,BrowserRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Navigation from './component/Navigation/Navigation '; 
import TodoList from './component/TodoList/TodoList';
import classes from './App.module.css';
import Statistics from './component/Statistics/Statistics';
import Auth from './component/Auth/Auth';
import Logout from './component/Auth/Logout/Logout'
import * as actions from './store/actions/auth';

import Landing from './component/LendingPage/LendingPage'
const App = (props) => {
  
  useEffect(() => {
    props.onTryAutoSignup();
  }, [props.onTryAutoSignup])


  let routes= (
    <Switch>
      <Route path="/auth" exact render={(props)=> <Auth  {...props}/>}/> 
      {/* <Route path="/" exact render={(props)=> <Item  {...props}/>}/>       */}
      <Route path="/home" exact component={Home}/>
      <Route path="/"  exact render={(props)=> <Landing  {...props}/>}/>

      
      {/* <Route path="/todolist" exact component={TodoList}/>  */}
      {/* <Route path="/stas" render={(props)=> <Statistics  {...props}/>}/>  */}
  </Switch>
  );

  if(props.isAuthenticated){
  routes= (
    <Switch>
      {/* <Route path="/auth" exact render={(props)=> <Auth  {...props}/>}/>  */}
      <Route path="/add" exact render={(props)=> <Item  {...props}/>}/>
      <Route path="/home" exact component={Home}/>
      <Route path="/todolist" exact component={TodoList}/> 
      <Route path="/stas" render={(props)=> <Statistics  {...props}/>}/>
      <Route path="/logout" render={(props)=> <Logout  {...props}/>}/>       
      <Route path="/"  exact render={(props)=> <Home  {...props}/>}/>
      <Redirect to="/"/> 
  </Switch>

  );
}
 
  return (
    <div className={classes.App}> 
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
    todoList: state.todoList,
    isAuthenticated: state.auth.token!==null
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
};


export default connect(mapStateToProps,mapDispatchToProps)(App); 
// export default withRouter((App)); 