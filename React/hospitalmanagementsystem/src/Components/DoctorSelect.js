import React, { useState, useEffect } from 'react';

const DoctorSelect = ({ departmentId, onSelectDoctor, selectStyle }) => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        if (departmentId) {
            fetch(`http://localhost:8080/api/fetchDoctByDept/${departmentId}`)
                .then(response => response.json())
                .then(data => setDoctors(data))
                .catch(error => console.error('Error fetching doctors:', error));
        }
    }, [departmentId]);

    const handleChange = (event) => {
        onSelectDoctor(event.target.value);
    };

    return (
        <select onChange={handleChange} style={selectStyle}>
            <option value="">Select Doctor</option>
            {doctors.map(doctor => (
                <option key={doctor.doctorId} value={doctor.doctorId}>
                    {doctor.firstName} {doctor.lastName}
                </option>
            ))}
        </select>
    );
};

export default DoctorSelect;
