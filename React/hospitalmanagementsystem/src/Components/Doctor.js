import { useEffect, useState } from "react";
import DoctorNavbar from "./DoctorNavBar";

export default function Doctor() {
    const [doctorInfo, setDoctorInfo] = useState(null);
    const [doctorName, setDoctorName] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
        const loginId = loggedUser?.userId;

        if (loginId) {
            fetch(`http://localhost:8080/api/doctors/byUserId?userId=${loginId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setDoctorInfo(data);
                    setDoctorName(data.firstName); // Assuming doctorName is the first name
                    // Store doctorId in local storage
                    localStorage.setItem('doctorId', data.doctorId);
                })
                .catch(error => {
                    console.error('Error:', error);
                    setError('Failed to load doctor data.');
                });
        } else {
            setError('No logged-in user found.');
        }
    }, []);

    return (
        <div style={{ height: '100vh', display: 'flex',alignItems: 'center', flexDirection: 'column' }}>
            

            <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', marginTop:'100px' }}>
                Welcome, Dr. {doctorName}
            </h1>

            {error ? (
                <p>{error}</p>
            ) : doctorInfo ? (
                <div className="doctor-info">
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
            ) : (
                <p>Loading doctor information...</p>
            )}
        </div>
    );
}
