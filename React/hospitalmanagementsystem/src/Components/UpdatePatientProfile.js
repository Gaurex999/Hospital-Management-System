import React, { useState, useEffect } from 'react';

function UpdatePatientProfile({ patientId }) {
    const [patient, setPatient] = useState({
        patientName: '',
        dateOfBirth: '',
        bloodGroup: '',
        patientAddress: '',
        patientAadharNo: '',
        patientEmailId: '',
        patientContactNo: '',
    });

    const [originalPatient, setOriginalPatient] = useState({});

    // Fetch the patient data when the component loads
    useEffect(() => {
        fetch(`http://localhost:8080/api/patients/patient?id=${patientId}`)
            .then(response => response.json())
            .then(data => {
                setPatient(data);
                setOriginalPatient(data);
            });
    }, [patientId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatient({
            ...patient,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedFields = {};
        Object.keys(patient).forEach(key => {
            if (patient[key] !== originalPatient[key]) {
                updatedFields[key] = patient[key];
            }
        });

        fetch(`/api/patients/${patientId}/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedFields),
        })
            .then(response => {
                if (response.ok) {
                    alert('Profile updated successfully!');
                } else {
                    alert('Failed to update profile');
                }
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="patientName"
                    value={patient.patientName}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Date of Birth:</label>
                <input
                    type="date"
                    name="dateOfBirth"
                    value={patient.dateOfBirth}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Blood Group:</label>
                <input
                    type="text"
                    name="bloodGroup"
                    value={patient.bloodGroup}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Address:</label>
                <input
                    type="text"
                    name="patientAddress"
                    value={patient.patientAddress}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Aadhar No:</label>
                <input
                    type="text"
                    name="patientAadharNo"
                    value={patient.patientAadharNo}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="patientEmailId"
                    value={patient.patientEmailId}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Contact No:</label>
                <input
                    type="text"
                    name="patientContactNo"
                    value={patient.patientContactNo}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Update Profile</button>
        </form>
    );
}

export default UpdatePatientProfile;
