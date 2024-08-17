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

        const loginId = loggedUser.userId;
        fetch(`http://localhost:8080/api/doctors/byUserId?userId=${loginId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setDoctorInfo(data);
                // Store doctorId in local storage
                localStorage.setItem('doctorId', data.doctorId);
            })

            .catch(error => {
                console.error('Error:', error);
                setError('Failed to load doctor data.');
            });
    }, []);

    }
    return(


    //     <div>
    //    <div className="doctor-home-container">
    //   <DoctorNavbar />
    //   <div className="doctor-home-content" />
    //   </div>
    //   <h1>Doctor Home</h1>
    //    </div>

            <h1>Welcome, Dr. {doctorName}</h1>
            {error ? (
                <p>{error}</p>
            ) : (
                <div className="doctor-info">
                    <p><strong>First Name:</strong> {doctorInfo.firstName}</p>
                    <p><strong>Last Name:</strong> {doctorInfo.lastName}</p>
                    <p><strong>Address:</strong> {doctorInfo.address}</p>
                    <p><strong>Qualification:</strong> {doctorInfo.qualification}</p>
                    <p><strong>Contact No:</strong> {doctorInfo.contactNo}</p>
                    <p><strong>Email ID:</strong> {doctorInfo.emailId}</p>
                    <p><strong>Aadhar No:</strong> {doctorInfo.aadharNo}</p>
                    <p><strong>Department ID:</strong> {doctorInfo.departmentId}</p>
                    <p><strong>Doctor ID</strong> {doctorInfo.doctorId}</p>
                </div>
            )}
        </div>
    );

    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
    <DoctorNavbar />
    
    <h1 style={{ fontSize: '2.5rem' , marginBottom: '58.5rem'}}>
      Doctor Home
    </h1>
  </div>
  
  
    )
}

