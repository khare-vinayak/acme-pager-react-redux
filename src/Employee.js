import React, { Component } from 'react';
import axios from 'axios';

class Employee extends React.Component{
       constructor(){
        super();
        this.state={
            employees:[]
        };
    }
   async componentDidMount(){
        const employees=(await axios.get("/api/employees/0")).data;
        console.log(employees.rows)
        this.setState({employees:employees.rows});

    } 

    render(){
        const {employees} = this.state;
        return (
            <div><h1> Acme Pager</h1>
            
                <table>
                    <tr>
                        <th>Employee Name</th>
                        <th>Title</th>
                        <th>Email</th>
                    </tr>
                {employees.map(employee=>{
                    return(
                        <tr>
                            <td>{employee.firstName}  {employee.lastName}</td>
                            <td>{employee.title}</td>
                            <td>{employee.email}</td>
                        </tr>
                    )
                })}
                </table>
            </div>
        )
    }
}
export default Employee;