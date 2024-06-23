import axios from 'axios';
import { useFormik } from 'formik';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const EditTask = () => {

    const[appointment,setAppointment]=useState({});
    const params= useParams();
    let navigate =useNavigate();

    useEffect(()=>{
        axios.get(`http://127.0.0.1:6060/view-task/${params.id}`)
        .then(response=>{
            
            if(response.data.length>0){
                const data = response.data[0];
                const dateTimeString = data.Date;
            
                // Use Moment.js to parse and format the date-time string
                const formattedDate = moment(dateTimeString).format('YYYY-MM-DDTHH:mm');
                
                    data.Date=formattedDate;
                    setAppointment(data)
                }
        })
        
    },[])

  

    const formik =useFormik({
        initialValues:{
            AppointmentId:params.id,
            Title:appointment.Title,
            Description:appointment.Description,
            Date:appointment.Date,
            UserId:appointment.UserId
        },
        onSubmit:((task)=>{
                axios.put(`http://127.0.0.1:6060/edit-task/${params.id}`,task)
                .then(()=>{
                    alert("Appointment Updated");
                    navigate("/dashboard")
                })
        }),
        enableReinitialize:true
    })
    
  return (
    <div  className="border rounded-4 p-4 bg-light m-auto" style={{maxWidth:"400px"}}>
        <h3 className='d-flex align-items-center justify-content-between'> Edit Appointment <Link to="/dashboard" className="btn btn-close"></Link></h3>
      <hr />
        <form action="" onSubmit={formik.handleSubmit}>
            <dl> 
                
                <div className="d-flex gap-2">
                     <div>
                        <dt><span>Appointment Id</span></dt>
                        <dd><input readOnly defaultValue={appointment.AppointmentId} type="text" name="AppointmentId" className="form-control" /></dd>
                     </div>
                   <div>
                        <dt>UserId</dt>
                        <dd> <input readOnly defaultValue={appointment.UserId} type="text" className="form-control" name="UserId" /></dd>
                   </div>
                </div>
                <dt>Title</dt>
                <dd><input type="text" value={formik.values.Title} onChange={formik.handleChange}   className="form-control" name="Title"/></dd>
                <dt>Description</dt>
                <dd><textarea type="text" value={formik.values.Description} onChange={formik.handleChange}  name="Description" className="form-control" ></textarea></dd>
                <dt>Date</dt>
                <dd><input type="datetime-local" value={formik.values.Date} onChange={formik.handleChange}  className="form-control" name="Date" /></dd>
                <dd className="mt-3"><button type="submit" className="btn btn-warning w-100">Save changes</button></dd>
            </dl>
        </form>
    </div>
  )
}

export default EditTask