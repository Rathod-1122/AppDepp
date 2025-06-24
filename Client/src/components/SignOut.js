import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function SignOut() {

    let navObj=useNavigate();
    useEffect(()=>{
        navObj('/')
    })
     
  return (
    <div>
        <h1>SignOut</h1>
    </div>
  )
}

export default SignOut