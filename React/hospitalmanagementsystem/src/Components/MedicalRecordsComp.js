import React, { useState } from 'react';

function MedicalRecordsComp() {
    const [patientId, setPatientId] = useState('');
    const [prescriptions, setPrescriptions] = useState([]);

    const handleInputChange = (event) => {
        setPatientId(event.target.value);
    };

    const fetchPrescriptions = () => {
        if (patientId) {
            fetch(`http://localhost:8080/patient?patientId=${patientId}`)
                .then((response) => response.json())
                .then((data) => {
                    setPrescriptions(data);
                })
                .catch((error) => {
                    console.error('Error fetching prescriptions:', error);
                });
        } else {
            alert('Please enter a valid patient ID');
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Prescription List</h1>
            <input
                type="number"
                value={patientId}
                onChange={handleInputChange}
                placeholder="Enter Patient ID"
                style={{
                    padding: '8px',
                    marginRight: '10px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                }}
            />
            <button
                onClick={fetchPrescriptions}
                style={{
                    padding: '8px 16px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}
            >
                Get Prescriptions
            </button>

            {prescriptions.length > 0 && (
                <table style={{ marginTop: '20px', width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f2f2f2' }}>
                            <th style={{ border: '1px solid #ddd', padding: '8px', color: 'black' }}>Prescription ID</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', color: 'black' }}>Patient Name</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', color: 'black' }}>Doctor Name</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', color: 'black' }}>Description</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', color: 'black' }}>Prescription Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prescriptions.map((prescription) => (
                            <tr key={prescription.prescriptionId}>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{prescription.prescriptionId}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    {prescription.patient ? prescription.patient.patientName : 'N/A'}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    {prescription.doctor ? `${prescription.doctor.firstName} ${prescription.doctor.lastName}` : 'N/A'}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{prescription.description}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{prescription.prescriptionDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default MedicalRecordsComp;
