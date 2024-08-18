import React from 'react';
import doctor from '../Components/Style/doctor.jpg';


export default function ViewAppointment() {
    const backgroundImageStyle = {
        backgroundImage: `url(${doctor})`,
        backgroundSize: 'cover',   // Ensure the image covers the entire container
        backgroundPosition: 'center', // Center the image
        backgroundRepeat: 'no-repeat', // Prevent tiling
        width: '100vw', // Full viewport width
        height: '100vh', // Full viewport height
        display: 'flex',

        flexDirection: 'column',
        alignItems: 'center',
        color: 'white', // Optional: for better text visibility
        textAlign: 'center'
    };

    return (
        <div style={backgroundImageStyle}>
           
            <h1>View Appointment page</h1>
        </div>
    );
}
