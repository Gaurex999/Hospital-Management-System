import { useEffect, useState } from "react";
import { json } from "react-router-dom"
import DoctorNavbar from "./DoctorNavBar";

export default function Doctor() {
    const [doctorInfo, setDoctorInfo] = useState(null);

    const [error, setError] = useState(null);

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
        if (loggedUser) {
            const loginId = loggedUser.userId;

            // Fetch patient information
            fetch(`http://localhost:8080/api/patients/patient?id=${loginId}`)
                .then(resp => resp.json())
                .then(obj => {
                    localStorage.setItem("loggedPatient", JSON.stringify(obj));
                })
                .catch(error => {
                    console.error('Error fetching patient data:', error);
                });

            // Fetch doctor information
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
        }
    }, []);

    return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <DoctorNavbar />
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                Doctor Home
            </h1>
            {doctorInfo ? (
                <div className="doctor-info">
                    <h1>Welcome, Dr. {doctorInfo.firstName} {doctorInfo.lastName}</h1>
                    <p><strong>First Name:</strong> {doctorInfo.firstName}</p>
                    <p><strong>Last Name:</strong> {doctorInfo.lastName}</p>
                    <p><strong>Address:</strong> {doctorInfo.address}</p>
                    <p><strong>Qualification:</strong> {doctorInfo.qualification}</p>
                    <p><strong>Contact No:</strong> {doctorInfo.contactNo}</p>
                    <p><strong>Email ID:</strong> {doctorInfo.emailId}</p>
                    <p><strong>Aadhar No:</strong> {doctorInfo.aadharNo}</p>
                    <p><strong>Department ID:</strong> {doctorInfo.departmentId}</p>
                    <p><strong>Doctor ID:</strong> {doctorInfo.doctorId}</p>
                </div>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <p>Loading doctor data...</p>
            )}
        </div>
    );

    
}

