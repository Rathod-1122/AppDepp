import React from 'react'
import { useSelector } from 'react-redux'
import Topnavigation from './Topnavigation';
import axios from 'axios';
function Dashboard() {

    // axios.defaults.baseURL='http://localhost:5544';

    let storeObj=useSelector((store)=>{
        return store.loginReducer;
    });
    console.log('the data in store inside the dashboard is:',storeObj)

    let deleteEmployeesProfile= async()=>{

        let response= await axios.delete(`/deleteEmployeesProfile?email=${storeObj.employeesLoginData.email}`);
        alert(response.data.message)
        
    }
  return (
    <div>
        <Topnavigation/>
        <h1>Dashboard</h1>
        <h3>Welcome {storeObj.employeesLoginData.name}</h3>
        <img src={`/${storeObj.employeesLoginData.profilePic}`}></img>
        <button type='button' onClick={()=>{
          deleteEmployeesProfile();
        }}>Delete Account</button>
    </div>
  )
}

export default Dashboard