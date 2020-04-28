import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter, Route ,Redirect} from 'react-router-dom';

import Employee from './Employee.js';
import Nav from './Nav.js';
import {loadEmployees} from './store.js';

class App extends Component{
  constructor(){
    super();
  }
  componentDidMount(){
      this.props.load();
  }
  render(){
    return (
    <div>
        <HashRouter>
            <h1> Acme Pager </h1>
            <Route path='/' render={()=><Redirect to='0' />} />
            <Route component={Nav} />
            <Route component={Employee} /> 
         
      </HashRouter>
    </div>
    );
  }
};
const mapDispatchToProps=(dispatch)=>{
 return {
        load: ()=> {
          dispatch(loadEmployees());
        }
      };
    };
    
export default connect(null, mapDispatchToProps)(App);
    