import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import Topnavigation from './Topnavigation';
import axios from 'axios';

axios.defaults.baseURL='';

function EditProfile() {

    let nameRef=useRef();
    let ageRef=useRef();
    let idRef=useRef();
    let emailRef=useRef();
    let passwordRef=useRef();
    let profilePicRef=useRef();
    let [imgPath,setImgPath]=useState('/');

    let storeObj=useSelector((store)=>{
        return store.loginReducer;
    })

    useEffect(()=>{
        assignEmployeesInitialvalues();

    },[])

    let assignEmployeesInitialvalues=()=>{
        nameRef.current.value=storeObj.employeesLoginData.name;
        ageRef.current.value=storeObj.employeesLoginData.age;
        idRef.current.value=storeObj.employeesLoginData.id;
        emailRef.current.value=storeObj.employeesLoginData.email;
        passwordRef.current.value=storeObj.employeesLoginData.password;
        setImgPath(` /${storeObj.employeesLoginData.profilePic}`)
    }

    let updateEmployeeDetails=async()=>{

        let dataToSend=new FormData();
        dataToSend.append('name',nameRef.current.value);
        dataToSend.append('age',ageRef.current.value);
        dataToSend.append('id',idRef.current.value);
        dataToSend.append('email',emailRef.current.value);
        dataToSend.append('password',passwordRef.current.value);
        dataToSend.append('profilePic',profilePicRef.current.files[0]);

        // let requestOptions={method:'PUT',body:dataToSend}

        let response= await axios.put(' /updateEmployeeProfile',dataToSend);

        // let jsData= await jsonData.json();

        alert(response.data.message);


    }
  return (
    <div>
        <Topnavigation/>
        <form>
            <h1>Edit Profile</h1>
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
                    //profilePicRef.current.files -it returns a Filelist object which is containing list of Fileobjects all the files and their details
                    //profilePicRef.current.files[0]-it will return a File object of the 1st file ,it containing the details such as name,size,type etc
                    let newImg=URL.createObjectURL(profilePicRef.current.files[0])
                    setImgPath(newImg)
                }}></input>
                <img src={imgPath}></img>
            </div>

            <div>
                <button type='button' onClick={()=>{
                    updateEmployeeDetails();
                }}>EditProfile</button>
            </div>
        </form>
    </div>
  )
}

export default EditProfile