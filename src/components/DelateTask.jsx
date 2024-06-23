import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { useCookies } from 'react-cookie';

const DelateTask = () => {

    const[appointments,setAppointments]=useState([{AppointmentId:0,Title:"",Date:"",UserId:''}]);
    const[cookies,setCookies,removeCookies]=useCookies('user-details');
    let navigate =useNavigate();

    const params=useParams();

    useEffect(()=>{
        cookies.userDetails
        ? axios.get(`http://127.0.0.1:6060/get-users`).then(res=>{
            for(var user of res.data){
                if(user.UserId===cookies.userDetails.userid && user.Password===cookies.userDetails.password){
                    axios.get(`http://127.0.0.1:6060/view-task/${params.id}`).then(response=>{
                        setAppointments(response.data)
                       
                    })
                    break;
                }
            }
        })
        : navigate("/login");

    },[]);


    function HandleRemoveTaskClick(){
      
        axios.delete(`http://127.0.0.1:6060/delete-task/${params.id}`).then(()=>{
            alert("Appointment Removed Successfully")
            navigate("/dashboard")
    })
        }
    

  return (
    <div  className="border rounded-4 p-4 bg-light m-auto" style={{maxWidth:"500px"}}>
        <h6 className="d-flex justify-content-between">
            <span>Are your sure to remove this task ?</span> 
        <Link className="btn btn-close" to="/dashboard"></Link>
        </h6>
        <hr />
        
            
            <dl className="m-0">
                <dt>Title</dt>
                <dd><h5>{appointments[0].Title}</h5></dd>
                <dt>Description</dt>
                <dd>{appointments[0].Description}</dd>
                <dt>Date and Time</dt>
                <dd>{moment(appointments[0].Date).format('ddd Do MMMM , YYYY |  h:mm:ss a')} </dd>
           
           
            <dd className="text-end">
                <button 
                onClick={HandleRemoveTaskClick}
                className="btn btn-warning"
                >Yes</button>
               
            </dd>
            </dl>

        

    </div>
  )
}

export default DelateTask