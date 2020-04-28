import React, { Component } from 'react';
import { connect } from 'react-redux';
import {loadEmployees,deleteEmployee} from './store.js';

class Employee extends Component{
       constructor(){
        super();
     
    }
   async componentDidUpdate(prevProps){
        if (this.props.location.pathname !== prevProps.location.pathname) {
            const pageNum = this.props.location.pathname.slice(1)
            console.log(pageNum)
            this.props.load(pageNum);
        }
   } 
    render(){
        const {employees,destroy} = this.props;
   
        return (
            <div>
                <table>
                    <tr>
                        <th>Employee Name</th>
                        <th>Title</th>
                        <th>Email</th>
                    </tr>
                {employees ?employees.map(employee=>{
                    return(
                        <tr>
                            <td>{employee.firstName}  {employee.lastName}</td>
                            <td>{employee.title}</td>
                            <td>{employee.email}</td>
                            <td> <button value={employee.id} onClick={(ev)=>destroy(ev.target.value)}>X</button></td>
                        </tr>
                    )
                }):''}
                </table>
            </div>
        )
    }
}
const mapStateToProps = ({ employees }) => {
    return {
        employees: employees.rows
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        load: (pageNum) => {
            dispatch(loadEmployees(pageNum));
        },
        destroy: (id) =>{
            dispatch(deleteEmployee(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (Employee);