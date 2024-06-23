import axios from "axios";
import { useFormik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["userDetails"]);
  const [admin, setAdmin] = useState("");
  let navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  const formik =useFormik({
    initialValues:{
      AppointmentId:"",
      Title:"",
      Description:"",
      Date:new Date(),
      UserId:""
    },
    onSubmit:(appointment)=>{
        axios.post("http://127.0.0.1:6060/add-task",appointment).then(res=>{
          console.log("Task added successfully");
          
          axios
        .get(`http://127.0.0.1:6060/tasks/${cookies.userDetails.userid}`)
        .then((response) => {
          setAppointments(response.data);
        });

        })
        
    }
  })
  
  useEffect(() => {
    cookies.userDetails
      ? axios.get("http://127.0.0.1:6060/get-users").then((response) => {
          for (var user of response.data) {
            if (
              user.UserId === cookies.userDetails.userid &&
              user.Password === cookies.userDetails.password
            ) {
              setAdmin(user.Name);
              axios
                .get(`http://127.0.0.1:6060/tasks/${user.UserId}`)
                .then((response) => setAppointments(response.data));
              break;
            }
          }
        })
      : navigate("/login");
  }, []);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <h3 className="text-white">
          Dashboard : <span>{admin}</span>
        </h3>

        <button
          className="btn btn-sm btn-warning"
          onClick={() => {
            removeCookie("userDetails", navigate("/"));
          }}
        >
          Logout
        </button>
      </div>
      <div
        className="py-4 px-3 rounded-3 "
        style={{
          backgroundColor: "rgba(255,255,255,.2)",
          backdropFilter: "blur(5px)",
        }}
      >
        <h3 className="text-center text-warning">
          Your Appointments{" "}
          <Link to="/add-task" className="btn btn-sm btn-primary"> Add new</Link>
        </h3>
        {appointments.map((appointment) => (
          <div
            key={appointment.AppointmentId}
            className="m-auto text-white p-3 mt-2 rounded d-flex align-items-center justify-content-between"
            style={{
              backgroundColor: "rgba(0,0,0,0.2)",
              backdropFilter: "blur(5px)",
              maxWidth: "800px",
            }}
          >
            <div>
              <div className="d-flex column-gap-3 align-items-center flex-wrap">
                <span className="h4">(<span className="text-warning"> {appointment.AppointmentId}</span> ) {appointment.Title}</span>{" "}
                <span>
                  {moment(appointment.Date).format('llll')}
                </span>{" "}
              </div>
              <div>{appointment.Description}</div>
            </div>

            <div className="d-flex flex-column gap-2 ">
              
              <Link to={`/edit-task/${appointment.AppointmentId}`} type="button" className="bi bi-pen btn btn-sm text-light"></Link>
              <Link to={`/delete-task/${appointment.AppointmentId}`}
                className="bi bi-trash btn btn-sm text-white"
              ></Link>
            </div>
          </div>
        ))}
      </div>

      {/* <div className="modal fade" id="addNewModal" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content" style={{maxWidth:"400px"}}>
                <div className="modal-header">
                  <h3 className="text-center">Add new appointment</h3>
                  <button className="btn-close" type="button" data-bs-dismiss="modal"></button>
                </div>
              <div className=" modal-body p-4">
              <form action="" onSubmit={formik.handleSubmit}>
                  
                  <dl>
                    <dt>Appointment ID</dt>
                    <dd><input type="text" onChange={formik.handleChange}  name="AppointmentId" className="form-control" /></dd>
                    <dt>Title</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="Title" className="form-control"  /></dd>
                    <dt>Description</dt>
                    <dd><textarea type="text" onChange={formik.handleChange} name="Description" className="form-control"></textarea></dd>
                    <dt>Date</dt>
                    <dd><input type="datetime-local" onChange={formik.handleChange} name="Date" className="form-control" id="" /></dd>
                    <dd><input type="text" onChange={formik.handleChange} name="UserId"  className="form-control" placeholder="UserID" /></dd>
                    <dd className="mt-3"><button type="submit" data-bs-dismiss="modal" className="btn btn-primary w-100">Save changes</button></dd>
                  </dl>
               </form>
            </div>
              </div>
          </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
