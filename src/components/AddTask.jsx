import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useCookies } from 'react-cookie'
import { Link, useNavigate } from 'react-router-dom'

const AddTask = () => {
    const[cookies,setCookies,removeCookies]=useCookies('userDetails');
    let navigate = useNavigate();

    const formik=useFormik({
        initialValues:{
            AppointmentId:0,
            Title:"",
            Description:"",
            Date:"",
            UserId:cookies.userDetails.userid
        },
        onSubmit:((task)=>{
            axios.post(`http://127.0.0.1:6060/add-task`,task)
            .then(()=>{
                alert("New Appointment Added Successfully");
                navigate('/dashboard')
            })
        })
    })
  return (
    <div  className="border rounded-4 p-4 bg-light m-auto" style={{maxWidth:"400px"}}>
        <h3 className="d-flex align-items-center justify-content-between"><span>Add new Appointment</span> <Link to="/dashboard" className="btn btn-close"></Link></h3>
        <hr />
        <form action="" onSubmit={formik.handleSubmit}>
            <dl>
                <dt>Appointment ID</dt>
                <dd><input type="number" onChange={formik.handleChange} name="AppointmentId" className="form-control" /></dd>
                <dt>Title</dt>
                <dd><input type="text" onChange={formik.handleChange} name="Title" className="form-control" /></dd>
                <dt>Description</dt>
                <dd><input type="text" onChange={formik.handleChange} name="Description" className="form-control"/></dd>
                <dt>Date and time</dt>
                <dd><input type="datetime-local" onChange={formik.handleChange} name="Date" className="form-control" /></dd>
                <dd className="mt-3"><button type='submit' className="btn btn-primary w-100">Add Task</button></dd>
            </dl>
        </form>
    </div>
  )
}

export default AddTask