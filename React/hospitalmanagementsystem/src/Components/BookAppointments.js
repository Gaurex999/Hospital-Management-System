// BookAppointments.js
import React, { useState } from 'react';
import DepartmentSelect from './DepartmentSelect';
import DoctorSelect from './DoctorSelect';
import SlotSelect from './SlotSelect';

const BookAppointments = () => {
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    const containerStyle = {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#ffffff',
    };

    const headingStyle = {
        textAlign: 'center',
        color: '#333',
        fontSize: '24px',
        marginBottom: '20px',
    };

    const selectStyle = {
        width: '100%',
        padding: '10px',
        marginBottom: '20px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        backgroundColor: '#f9f9f9',
        fontSize: '16px',
    };

    const buttonStyle = {
        width: '100%',
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        fontSize: '16px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    };

    const buttonHoverStyle = {
        backgroundColor: '#0056b3',
    };

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>Book an Appointment</h1>
            <DepartmentSelect 
                onSelectDepartment={setSelectedDepartment} 
                selectStyle={selectStyle} 
            />
            {selectedDepartment && (
                <DoctorSelect 
                    departmentId={selectedDepartment} 
                    onSelectDoctor={setSelectedDoctor} 
                    selectStyle={selectStyle} 
                />
            )}
            {selectedDoctor && (
                <SlotSelect 
                    doctorId={selectedDoctor} 
                    selectStyle={selectStyle} 
                />
            )}
            {selectedDoctor && (
                <button 
                    type="button" 
                    style={buttonStyle} 
                    onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                    onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
                >
                    Confirm Appointment
                </button>
            )}
        </div>
    );
};

export default BookAppointments;
