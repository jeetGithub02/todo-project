import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {
    
    let navigate=useNavigate();
    const[msg,setMsg]=useState("");
    const[msgStyle,setMsgStyle]=useState("");

    const formik = useFormik({
        initialValues:{
            Name:"",
            Mobile:"",
            Email:"",
            UserId:"",
            Password:""
        },
        onSubmit:(user)=>{
            axios.post(`http://127.0.0.1:6060/register-user`,user)
            .then(()=>{
                alert(`User registered successfully`);
                navigate("/login")
            })
        }
    })

    function verifyUserId(e){
        axios.get("http://127.0.0.1:6060/get-users")
        .then(response=>{
            for(var user of response.data){
                if(user.UserId===e.target.value){
                    setMsg("Not available");
                    setMsgStyle("bi bi-x-circle-fill  text-danger ")
                    break;
                }else{
                    setMsg("Available");
                    setMsgStyle("bi bi-check-circle-fill  text-success");
                }
            }
        })
    }

  return (
    <div className="border rounded-4 p-4 bg-light m-auto" style={{maxWidth:"400px"}}>
            <form onSubmit={formik.handleSubmit} action="">
                <dl>
                   <h3 align="center" className="bi bi-person-fill"> User Registration <button onClick={()=>{navigate("/")}} className="btn btn-close"></button></h3>
                   <dt>Name</dt> 
                   <dd><input type="text" name="Name" onChange={formik.handleChange} className="form-control" /></dd>
                   <dt>Email</dt> 
                   <dd><input type="text" name="Email" onChange={formik.handleChange} className="form-control" /></dd>
                   <dt>Mobile</dt> 
                   <dd><input type="text" name="Mobile" onChange={formik.handleChange} className="form-control" /></dd>
                   <dt className="d-flex justify-content-between">Create UserId <span className={`fw-normal ${msgStyle}`}> {msg}</span></dt>
                   <dd><input type="text" name="UserId" onKeyUp={verifyUserId}  onChange={formik.handleChange} className="form-control" /></dd>
                   <dt>Create Password</dt>
                   <dd><input type="password" name="Password" onChange={formik.handleChange} className="form-control" /></dd>
                   <dd className="text-center"><button type="submit" className="btn btn-primary">Login</button></dd>
                   <dd>Already have account? <Link to="/login">Login</Link></dd>
                </dl>
        </form>
    </div>
  )
}

export default Register