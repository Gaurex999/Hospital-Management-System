import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../Components/Slice'; // Ensure you import the correct logout action
import PatientNavbar from '../Components/PatientNavBar'; // Adjust the import path if necessary

export default function PatientHome() {
    const navigate = useNavigate();
    const reduxDispatch = useDispatch();

    const handleLogout = () => {
        reduxDispatch(logout());
        navigate("/login"); // Redirect to login page
    };

    return (
        // <div>
        //     <PatientNavbar />
        //     <h1>Patient Home</h1>
        // </div>

        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', overflow: 'hidden' }}>
    
    
    <h1 style={{ fontSize: '2.5rem', marginBottom: '58.5rem' }}>
      Patient Home
    </h1>
</div>


    );
}
