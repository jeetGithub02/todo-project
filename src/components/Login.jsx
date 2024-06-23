import axios from 'axios';
import React, { useState } from 'react'
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
    // let serverURL="http:127.0.01:6060";
    let navigate=useNavigate();
    const[msg,setMsg]=useState("");
    const[msgStyle,setMsgStyle]=useState("");
    const[userDetails,setUserDetails]=useState({userid:"",password:""})
    const [cookies, setCookie,removeCookie] = useCookies("userDetails");

    function verifyUserOnLogin(e){
        axios.get(`http://127.0.0.1:6060/get-users`).then(response=>{
            for(var user of response.data){
                if(user.UserId===e.target.value){

                    setMsg("Valid UserId");
                    setMsgStyle("bi bi-check-circle-fill text-success");
                    break;
                }else{
                    setMsg("Invalid UserId");
                    setMsgStyle("bi bi-x-circle-fill text-danger");
                }
            }
        })
        .catch(res=>{
            console.log(res)
        })
    }
    function handleChange(e){
        switch(e.target.name){
            case "UserId" :
                setUserDetails({userid:e.target.value,password:userDetails.password}) ;
                break;
            case "Password" :
                setUserDetails({userid:userDetails.userid,password:e.target.value}) ;
                break;  
        }
    }

    function handleLogin(e){
        e.preventDefault();
        axios.get( `http://127.0.0.1:6060/get-users`).then(response=>{
            let flag= true;
            for(var user of response.data){
                if(user.UserId=== userDetails.userid && user.Password===userDetails.password){

                    setCookie("userDetails",userDetails)
                    navigate("/dashboard");
                   flag=false;
                }
                
            }
            if(flag){
                alert("Invalid credential")
            }
        })

    }


  return (
    <div className="border rounded-4 p-4 bg-light m-auto" style={{maxWidth:"400px"}}>
        <form action="" onSubmit={handleLogin}>
                <dl>
                    
                   <h3 align="center" className="bi bi-person-fill"> User Login <button onClick={()=>{navigate("/")}} className="btn btn-close"></button></h3> 
                   <dt className="d-flex justify-content-between align-items-center">UserId <span className={`fw-normal ${msgStyle}`}> {msg}</span></dt>
                   <dd><input type="text" onChange={handleChange}  onKeyUp={verifyUserOnLogin} name="UserId" className="form-control" /></dd>
                   <dt>Password</dt>
                   <dd><input type="password" onChange={handleChange} name="Password" className="form-control" /></dd>
                   <dd  className="text-center"><button className="btn btn-primary">Login</button></dd>
                   <dd>Don't have account? <Link to="/register">Sign up</Link></dd>
                </dl>
        </form>
    </div>
  )
}

export default Login