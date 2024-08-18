import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../Components/Slice'; // Ensure you import the correct logout action
import PatientNavbar from '../Components/PatientNavBar'; // Adjust the import path if necessary
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

export default function PatientHome() {
    const [patientName, setPatientName] = useState('');
    const navigate = useNavigate();
    const reduxDispatch = useDispatch();

    useEffect(() => {
        // Get the logged-in patient's data from local storage
        const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
        if (loggedUser && loggedUser.userId) {
            const userId = loggedUser.userId;

            // Fetch patient data using the patient ID
            fetch(`http://localhost:8080/api/patients/patient?id=${userId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    const contentType = response.headers.get('Content-Type');
                    if (contentType && contentType.includes('application/json')) {
                        return response.json();
                    } else {
                        throw new Error('Response is not JSON');
                    }
                })
                .then(data => {
                    setPatientName(data.patientName);
                    localStorage.setItem('loggedPatient', JSON.stringify(data)); // Save to local storage
                })
                .catch(error => {
                    console.error('Error fetching patient data:', error);
                });
        }
    }, []);

    const handleLogout = () => {
        reduxDispatch(logout());
        navigate("/login"); // Redirect to login page
    };

    return (
        <div className="container-fluid d-flex flex-column align-items-center justify-content-center min-vh-100">
            <PatientNavbar />
            
            <div className="text-center">
                <h1 style={{ fontSize: '2.5rem' }}>
                    Patient Home
                </h1>
                <h2 style={{ fontSize: '2rem' }}>
                    Welcome, {patientName}
                </h2>
                
            </div>
        </div>
    );
}
