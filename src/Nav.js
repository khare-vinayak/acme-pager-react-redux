import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const Nav =({ location, employees })=>{
    const pagesArr=[];
    let prev, next, currPage;
    if (employees.count) {
        const numPages = Math.ceil( employees.count / 50);
        for (let i=0; i<numPages; i++){
            pagesArr.push(i)  
        } 
        currPage = +location.pathname.slice(1);
        prev = ( currPage !== 0 ? currPage - 1 : 0)
        next = ( currPage !== numPages - 1 ? currPage + 1 : numPages - 1)
    }
   return (
            <nav className='page-nav'>
                {prev !== undefined && <Link to={`${prev}`}>Prev</Link> }
                {pagesArr && pagesArr.map( page => {
                    return (
                        <Link to={`${page}`} className={currPage===page ? 'selected' : ''}>
                            {page + 1}
                        </Link>
                    )}
                )}
                {next && <Link to={`${next}`}>Next</Link> }
            </nav>
   )
}
 const mapStateToProps = ({ employees }) => {
    return {
        employees
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        load: (pageNum) => {
            dispatch(loadEmployees(pageNum));
        },
    };
}; 

export default connect(mapStateToProps, mapDispatchToProps)(Nav);

