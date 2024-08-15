import { useEffect, useState } from "react";
import DoctorNavbar from "./DoctorNavBar";

export default function Doctor() {
    const [doctorName, setDoctorName] = useState("");
    const [doctorInfo, setDoctorInfo] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
        setDoctorName(loggedUser.userName);

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
            })
            .catch(error => {
                console.error('Error:', error);
                setError('Failed to load doctor data.');
            });
    }, []);

    return (
        <div>
            <div className="doctor-home-container">
                <DoctorNavbar />
                <div className="doctor-home-content" />
            </div>

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
                </div>
            )}
        </div>
    );
}
