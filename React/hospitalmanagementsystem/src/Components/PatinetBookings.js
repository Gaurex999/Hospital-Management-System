import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PatientBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState('');
    const [patientId, setPatientId] = useState(null);
    const [doctors, setDoctors] = useState({}); // Store doctor details by ID

    useEffect(() => {
        // Get the logged-in user's data from local storage
        const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

        if (loggedUser && loggedUser.userId) {
            const userId = loggedUser.userId;

            // Fetch patient data using the user ID
            fetch(`http://localhost:8080/api/patients/patient?id=${userId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(patientData => {
                    setPatientId(patientData.patientId); // Set patient ID from the fetched data
                    // Optionally store patient data in local storage
                    localStorage.setItem('loggedPatient', JSON.stringify(patientData));
                })
                .catch(err => setError(err.message));
        } else {
            setError('User ID is missing.');
        }
    }, []);

    useEffect(() => {
        if (patientId) {
            fetch(`http://localhost:8080/api/bookings/patient/${patientId}`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Failed to fetch bookings.');
                    }
                })
                .then(data => {
                    setBookings(data);
                    // Fetch doctor details for each booking
                    const doctorIds = [...new Set(data.map(booking => booking.doctorId))];
                    const doctorPromises = doctorIds.map(id =>
                        fetch(`http://localhost:8080/api/doctors/doctor?id=${id}`).then(response => response.json())
                    );
                    return Promise.all(doctorPromises);
                })
                .then(doctorData => {
                    // Store doctor details in state
                    const doctorMap = doctorData.reduce((acc, doctor) => {
                        acc[doctor.doctorId] = doctor;
                        return acc;
                    }, {});
                    setDoctors(doctorMap);
                })
                .catch(err => setError(err.message));
        }
    }, [patientId]);

    const cancelBooking = (bookingId) => {
        // Confirmation before cancelling
        if (window.confirm('Are you sure you want to cancel this booking?')) {
            fetch(`http://localhost:8080/api/bookings/${bookingId}`, {
                method: 'DELETE',
            })
                .then(response => {
                    if (response.ok) {
                        setBookings(prevBookings => prevBookings.filter(booking => booking.bookingId !== bookingId));
                    } else {
                        throw new Error('Failed to cancel booking.');
                    }
                })
                .catch(err => setError(err.message));
        }
    };

    return (
        <div style={{ height: '100vh', padding: '20px' }}>
            <h2>Patient Bookings</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {bookings.length === 0 ? (
                <p style={{ fontSize: '1.2em', color: '#555', textAlign: 'center', marginTop: '20px' }}>
                    No Appointments Booked
                </p>
            ) : (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Booking ID</th>
                            <th>Doctor Name</th>
                            <th>Slot ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(booking => (
                            <tr key={booking.bookingId}>
                                <td>{booking.bookingId}</td>
                                <td>{doctors[booking.doctorId]?.firstName} {doctors[booking.doctorId]?.lastName || 'N/A'}</td>
                                <td>{booking.slotId}</td>
                                <td>
                                    <button 
                                        className="btn btn-danger" 
                                        onClick={() => cancelBooking(booking.bookingId)}
                                    >
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PatientBookings;
