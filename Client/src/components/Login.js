import React, { useEffect, useRef  } from 'react'
import { useDispatch } from 'react-redux';
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';



function Login() {

  let emailRef=useRef();
  let passwordRef=useRef();

  let dispatchObj=useDispatch();
  let navigateObj=useNavigate();

  axios.defaults.baseURL='';
  //it simplifies the task of 
  useEffect(()=>{
    if(localStorage.getItem('token')){
    // axios.defaults.headers.common['Authorization']=localStorage.getItem('token');
    sendDataToVerify();}
  },[])

  let sendDataToVerify=async()=>{

    let dataToValidate=new FormData();
    dataToValidate.append('token',localStorage.getItem('token'));

    let response=await axios.post(' /validateTokenForAutologin',dataToValidate);
    console.log('response recieved from the server due to autologin is:',response);
    alert(response.data.message)
    if(response.data.status=='success'){
     dispatchObj({type:'employeesLogData',data:response.data.data});
      navigateObj('Dashboard')
    }
  }


  let onLogin=()=>
    {

      return async()=>{

      let dataToSend=new FormData();
      dataToSend.append('email',emailRef.current.value)
      dataToSend.append('password',passwordRef.current.value)

      let response= await axios.post('/login',dataToSend)
      //the response will be an axios response ,inside to it in data key server response will be there
      console.log('the responce recieved from the server due to manual login:',response)
      if(response.data.status=='success'){
        alert(response.data.message)
        localStorage.setItem('token',response.data.encryptedData)
        dispatchObj({type:'employeesLogData',data:response.data.data});
        navigateObj('DashBoard');
      }
      else{
        alert(response.data.message)
      }
      
      }
    }
  return (
    <div>
      <form>
        <h1>Login</h1>
        <div>
          <label>Email</label>
          <input ref={emailRef}></input>
        </div>
        <div>
          <label>Password</label>
          <input ref={passwordRef}></input>
        </div>
        <div>
          <button type='button' onClick={()=>{
            dispatchObj(onLogin());
          }}>Login</button>
        </div>
      </form>
      <br/>
      <br/>
      <p>If you don't have an acccount please signup here</p>
      <Link to='SignUp'>SignUp</Link><br/>
      {/* <Link to='Dashboard'>DashBoard</Link> */}
    </div>
  )
}

export default Login