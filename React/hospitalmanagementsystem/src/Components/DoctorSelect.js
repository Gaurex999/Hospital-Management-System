// DoctorSelect.js
import React, { useEffect, useState } from 'react';

const DoctorSelect = ({ departmentId, onSelectDoctor }) => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        if (departmentId) {
            fetch(`http://localhost:8080/api/fetchDoctByDept/${departmentId}`)
                .then(response => response.json())
                .then(data => setDoctors(data))
                .catch(error => console.error('Error fetching doctors:', error));
        }
    }, [departmentId]);

    return (
        <select onChange={(e) => onSelectDoctor(e.target.value)}>
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
