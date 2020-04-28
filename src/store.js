import axios from 'axios';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunks from 'redux-thunk';
import {createLogger} from 'redux-logger';

//Action types
const LOAD_EMPLOYEES = 'LOAD_EMPLOYEES';
const DELETE_EMPLOYEE='DELETE_EMPLOYEE';

//reducers

const employeesReducer = (state = [], action)=> {
  if(action.type===LOAD_EMPLOYEES){
    return action.employees;
  }
  if(action.type===DELETE_EMPLOYEE){
      return {
          count:state.count-1,
          rows:state.rows.filter(employee=>{
              return employee.id!==action.id
          })
      }
  }
 
  return state;
};


const reducer = combineReducers({
  employees: employeesReducer
});


const store = createStore(reducer, applyMiddleware(
  thunks,
  createLogger({collapsed: true}),
));

//Action Creators

const _loadEmployees=(employees)=>{
    return{
        type:LOAD_EMPLOYEES,
        employees
    }
}

const _deleteEmployee=(id)=>{
    return {
        type:DELETE_EMPLOYEE,
        id
    }
}

//Thunks

const loadEmployees=(pageNum)=>{
  return async(dispatch)=>{
   const employees=(await axios.get(`/api/employees/${pageNum}`)).data;
    dispatch(_loadEmployees(employees));

  }
}
const deleteEmployee=(id)=>{
    return async(dispatch)=>{
        await axios.delete(`/api/employees/${id}`);
        dispatch(_deleteEmployee(id))
    }
}

export default store;

export {
  loadEmployees,
  deleteEmployee,
};
