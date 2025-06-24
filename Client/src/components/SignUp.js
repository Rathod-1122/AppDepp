import React, { useRef, useState } from 'react'
import axios from 'axios';

function SignUp() {

    // axios.defaults.baseURL='http://localhost:5544';
    let nameRef=useRef();
    let ageRef=useRef();
    let idRef=useRef();
    let emailRef=useRef();
    let passwordRef=useRef();
    let profilePicRef=useRef();

    let [imgPath,setImgPath]=useState('/');

    let insertingDataToDB=async()=>{

        let dataToSend=new FormData();
        dataToSend.append('name',nameRef.current.value);
        dataToSend.append('age',ageRef.current.value);
        dataToSend.append('id',idRef.current.value);
        dataToSend.append('email',emailRef.current.value);
        dataToSend.append('password',passwordRef.current.value);
        dataToSend.append('profilePic',profilePicRef.current.files[0]);

        let response= await axios.post('/insertingDataToDB',dataToSend)
        console.log('response from the server :',response)
        alert(response.data.message)
    }
  return (
    <div>
        
        <form>
            <h1>SignUp</h1>
            <div>
                <label>Name</label>
                <input ref={nameRef}></input>
            </div>

            <div>
                <label>Age</label>
                <input ref={ageRef}></input>
            </div>

            <div>
                <label>ID</label>
                <input ref={idRef}></input>
            </div>

            <div>
                <label>Email</label>
                <input ref={emailRef}></input>
            </div>

            <div>
                <label>Password</label>
                <input ref={passwordRef}></input>
            </div>

            <div>
                <label>Profile Pic</label>
                <input type='file' ref={profilePicRef} multiple onChange={()=>{
                    console.log('details of files:',profilePicRef.current.files)
                    let newImg=URL.createObjectURL(profilePicRef.current.files[0])
                    setImgPath(newImg)
                }}></input>
                <img src={imgPath}></img>
            </div>

            <div>
                <button type='button' onClick={()=>{
                    insertingDataToDB();
                }}>SignUp</button>
            </div>
        </form>
    </div>
  )
}

export default SignUp