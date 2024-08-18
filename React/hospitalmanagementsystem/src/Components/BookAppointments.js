import React, { useState, useEffect } from 'react';
import DepartmentSelect from './DepartmentSelect';
import DoctorSelect from './DoctorSelect';
import SlotSelect from './SlotSelect';

const BookAppointments = () => {
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [patientId, setPatientId] = useState(null);
    const [slots, setSlots] = useState([]);

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

    // Retrieve patientId from local storage
    useEffect(() => {
        const loggedPatient = JSON.parse(localStorage.getItem('loggedPatient'));
        if (loggedPatient && loggedPatient.patientId) {
            setPatientId(loggedPatient.patientId);
        }
    }, []);

    // Fetch slots when doctor changes
    useEffect(() => {
        if (selectedDoctor) {
            fetch(`http://localhost:8080/api/bookings/slots/${selectedDoctor}`)
                .then(response => response.json())
                .then(data => setSlots(data))
                .catch(error => console.error('Error fetching slots:', error));
        }
    }, [selectedDoctor]);

    const handleBooking = () => {
        if (!patientId || !selectedDoctor || !selectedSlot) {
            alert('Please ensure all fields are selected.');
            return;
        }

        const bookingData = {
            doctorId: selectedDoctor,
            patientId: patientId,
            slotId: selectedSlot,
            bookingStatus: 'Booked',
            bookingDate: new Date().toISOString().split('T')[0], // Current date
        };

        console.log('Booking Data:', bookingData); // Log booking data

        fetch('http://localhost:8080/api/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData),
        })
        .then(response => response.json())
        .then(() => {
            alert('Booking successful!');
            // Refetch slots to update availability
            fetch(`http://localhost:8080/api/bookings/slots/${selectedDoctor}`)
                .then(response => response.json())
                .then(data => setSlots(data))
                .catch(error => console.error('Error fetching slots:', error));
        })
        .catch(error => console.error('Error booking slot:', error));
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
                    onSlotChange={setSelectedSlot} 
                    selectStyle={selectStyle} 
                    slots={slots} // Pass slots to SlotSelect
                />
            )}
            {selectedSlot && (
                <button 
                    type="button" 
                    style={buttonStyle} 
                    onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                    onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
                    onClick={handleBooking}
                >
                    Confirm Appointment
                </button>
            )}
        </div>
    );
};

export default BookAppointments;
