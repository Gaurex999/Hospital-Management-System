import { useEffect } from "react";
import { json } from "react-router-dom"
import DoctorNavbar from "./DoctorNavBar";

export default function Doctor()
{
    
    useEffect = () =>{
   const loginid = JSON.parse(localStorage.getItem("loggeedUser")).login_id;
    fetch("http://localhost:8080/api/patients/patient?id="+loginid)
    .then(resp => resp.json())
    .then(obj => {
        localStorage.setItem("loggedPatient",JSON.stringify(obj))

    },[] )

    }
    return(
        <div>
       
       <div className="doctor-home-container">
      <DoctorNavbar />
      <div className="doctor-home-content" />
      </div>

      <h1>Doctor Home</h1>

       </div>
    )
}