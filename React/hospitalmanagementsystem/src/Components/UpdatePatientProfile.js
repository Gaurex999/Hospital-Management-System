import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function UpdatePatientProfile() {
    const [patientId, setPatientId] = useState(''); // Set this to the logged-in patient's ID if available
    const [patientDetails, setPatientDetails] = useState({
        patientName: '',
        dateOfBirth: '',
        bloodGroup: '',
        patientAddress: '',
        patientAadharNo: '',
        patientEmailId: '',
        patientContactNo: ''
    });

    useEffect(() => {
        if (patientId) {
            // Fetch the existing patient data by patient ID
            const fetchPatientData = () => {
                fetch(`http://localhost:8080/api/patients/patient?id=${patientId}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        const contentType = response.headers.get('Content-Type');
                        if (contentType && contentType.includes('application/json')) {
                            return response.json();
                        } else {
                            throw new Error('Response is not JSON');
                        }
                    })
                    .then(data => {
                        setPatientDetails(data);
                    })
                    .catch(error => {
                        console.error('Error fetching patient data:', error);
                        // Handle error by showing a message to the user or taking other actions
                    });
            };

            fetchPatientData();
        }
    }, [patientId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatientDetails({
            ...patientDetails,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = `http://localhost:8080/api/patients/profile/${patientId}`;
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patientDetails)
        };

        fetch(url, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const contentType = response.headers.get('Content-Type');
                if (contentType && contentType.includes('application/json')) {
                    return response.json();
                } else {
                    throw new Error('Response is not JSON');
                }
            })
            .then((data) => {
                console.log('Patient profile updated:', data);
                // Handle success - maybe show a success message or redirect
            })
            .catch((error) => {
                console.error('There was a problem with the update operation:', error);
                // Handle error - show an error message to the user
            });
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Update Patient Profile</h2>
            <form onSubmit={handleSubmit} className="table-responsive">
                <table className="table table-bordered">
                    <tbody>
                        <tr>
                            <th>Patient ID:</th>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={patientId}
                                    onChange={(e) => setPatientId(e.target.value)}
                                    placeholder="Enter Patient ID"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Name:</th>
                            <td>
                                <input
                                    type="text"
                                    name="patientName"
                                    className="form-control"
                                    value={patientDetails.patientName}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Date of Birth:</th>
                            <td>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    className="form-control"
                                    value={patientDetails.dateOfBirth}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Blood Group:</th>
                            <td>
                                <input
                                    type="text"
                                    name="bloodGroup"
                                    className="form-control"
                                    value={patientDetails.bloodGroup}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Address:</th>
                            <td>
                                <input
                                    type="text"
                                    name="patientAddress"
                                    className="form-control"
                                    value={patientDetails.patientAddress}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Aadhar No:</th>
                            <td>
                                <input
                                    type="text"
                                    name="patientAadharNo"
                                    className="form-control"
                                    value={patientDetails.patientAadharNo}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Email ID:</th>
                            <td>
                                <input
                                    type="email"
                                    name="patientEmailId"
                                    className="form-control"
                                    value={patientDetails.patientEmailId}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Contact No:</th>
                            <td>
                                <input
                                    type="text"
                                    name="patientContactNo"
                                    className="form-control"
                                    value={patientDetails.patientContactNo}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary">Update Profile</button>
                </div>
            </form>
        </div>
    );
}

export default UpdatePatientProfile;
