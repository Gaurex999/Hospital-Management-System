import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const DoctorBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState('');
    const [doctorId, setDoctorId] = useState(null);
    const [patients, setPatients] = useState({}); // Store patient details by ID

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

        if (loggedUser && loggedUser.userId) {
            fetch(`http://localhost:8080/api/doctors/byUserId?userId=${loggedUser.userId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(doctorData => {
                    setDoctorId(doctorData.doctorId);
                })
                .catch(err => setError(err.message));
        } else {
            setError('User ID is missing.');
        }
    }, []);

    useEffect(() => {
        if (doctorId) {
            fetch(`http://localhost:8080/api/bookings/bookings/doctor/${doctorId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    setBookings(data);

                    // Fetch patient details for each booking
                    const patientIds = [...new Set(data.map(booking => booking.patientId))];
                    const patientPromises = patientIds.map(id =>
                        fetch(`http://localhost:8080/api/patients/patient?id=${id}`).then(response => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! Status: ${response.status}`);
                            }
                            return response.json();
                        })
                    );
                    return Promise.all(patientPromises);
                })
                .then(patientData => {
                    // Store patient details in state
                    const patientMap = patientData.reduce((acc, patient) => {
                        if (patient && patient.patientId) {
                            acc[patient.patientId] = patient.patientName; // Save patientName instead of patient object
                        }
                        return acc;
                    }, {});
                    setPatients(patientMap);
                })
                .catch(err => setError(err.message));
        }
    }, [doctorId]);

    const cancelBooking = (bookingId) => {
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
            <h2>Doctor's Bookings</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {bookings.length === 0 ? (
                <p style={{ fontSize: '1.2em', color: '#555', textAlign: 'center', marginTop: '20px' }}>
                    No Bookings Available
                </p>
            ) : (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Booking ID</th>
                            <th>Patient Name</th> {/* Change header to Patient Name */}
                            <th>Slot ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(booking => (
                            <tr key={booking.bookingId}>
                                <td>{booking.bookingId}</td>
                                <td>
                                    {patients[booking.patientId] || 'N/A'} {/* Display patient name */}
                                </td>
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

export default DoctorBookings;
