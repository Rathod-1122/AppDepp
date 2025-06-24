import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'

function Topnavigation() {

  let navObj=useNavigate();

  let storeObj=useSelector((store)=>{
    return store.loginReducer;
  })

  useEffect(()=>{
    if(storeObj.employeesLoginData.email){

  }
  else{
    
    navObj('/');
  }
  },[])
  
  return (
    <nav>
        <Link to='/Dashboard'>Dashboard</Link>
        <Link to='/EditProfile'>EditProfile</Link>
        <Link to='/Tasks'>Tasks</Link>
        <Link to='/Leaves'>Leaves</Link>
        <Link to='/SignOut'>SignOut</Link>
    </nav>
  )
}

export default Topnavigation