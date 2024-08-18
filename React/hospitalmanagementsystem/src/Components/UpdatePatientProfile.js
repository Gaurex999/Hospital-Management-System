import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import patient1 from '../Components/Style/patient1.jpg'; // Import the image

function UpdatePatientProfile() {
    const [patientDetails, setPatientDetails] = useState({
        patientName: '',
        dateOfBirth: '',
        bloodGroup: '',
        patientAddress: '',
        patientAadharNo: '',
        patientEmailId: '',
        patientContactNo: ''
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Get the logged-in patient's data from local storage
        const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
        if (loggedUser && loggedUser.userId) {
            const userId = loggedUser.userId;

            // Fetch patient data using the patient ID
            fetch(`http://localhost:8080/api/patients/patient?id=${userId}`)
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
                    localStorage.setItem('loggedPatient', JSON.stringify(data)); // Save to local storage
                })
                .catch(error => {
                    console.error('Error fetching patient data:', error);
                });
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatientDetails({
            ...patientDetails,
            [name]: value
        });
    };

    const handleNumericInput = (e) => {
        const { name, value } = e.target;
        if (/^\d*$/.test(value)) {
            setPatientDetails({
                ...patientDetails,
                [name]: value
            });
        }
    };

    const validateForm = () => {
        const newErrors = {}; 

        const aadharRegex = /^\d{12}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const contactRegex = /^\d{10}$/;

        if (!patientDetails.patientName.trim()) newErrors.patientName = 'Name is required';
        if (!patientDetails.dateOfBirth.trim()) newErrors.dateOfBirth = 'Date of Birth is required';
        if (!patientDetails.bloodGroup.trim()) newErrors.bloodGroup = 'Blood Group is required';
        if (!patientDetails.patientAddress.trim()) newErrors.patientAddress = 'Address is required';
        if (!patientDetails.patientAadharNo.trim() || !aadharRegex.test(patientDetails.patientAadharNo)) newErrors.patientAadharNo = 'Aadhar Number must be a 12-digit number';
        if (!patientDetails.patientEmailId.trim() || !emailRegex.test(patientDetails.patientEmailId)) newErrors.patientEmailId = 'Valid Email ID is required';
        if (!patientDetails.patientContactNo.trim() || !contactRegex.test(patientDetails.patientContactNo)) newErrors.patientContactNo = 'Contact Number must be a 10-digit number';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setMessage('');

        // Assuming the patient ID is part of the patientDetails object
        const url = `http://localhost:8080/api/patients/profile/${patientDetails.patientId}`;
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patientDetails)
        };

        fetch(url, requestOptions)
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => {
                        console.error('Error response from server:', text);
                        throw new Error(text || 'Network response was not ok.');
                    });
                }
                return response.json();
            })
            .then(data => setMessage('Patient profile updated successfully.'))
            .catch(err => setMessage('Failed to update patient profile'));
    };

    return (
        <div
            className="container-fluid d-flex justify-content-center align-items-center vh-100"
            style={{
                backgroundImage: `url(${patient1})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                backgroundRepeat: 'no-repeat',
                height: '100vh',
                marginTop: '50px'
            }}
        >
            <div className="container mt-5 p-4 bg-light rounded">
                <h2 className="text-center mb-4">Update Patient Profile</h2>
                {message && <div className="alert alert-success">{message}</div>}
                <form onSubmit={handleSubmit} className="table-responsive">
                    {Object.keys(errors).length > 0 && (
                        <div className="alert alert-danger">
                            {Object.values(errors).map((error, index) => (
                                <div key={index}>{error}</div>
                            ))}
                        </div>
                    )}
                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <th>Name:</th>
                                <td>
                                    <input
                                        type="text"
                                        name="patientName"
                                        className="form-control"
                                        value={patientDetails.patientName}
                                        onChange={handleChange}
                                        aria-describedby="patientNameHelp"
                                        aria-invalid={!!errors.patientName}
                                    />
                                    {errors.patientName && <div id="patientNameHelp" className="text-danger">{errors.patientName}</div>}
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
                                        aria-describedby="dateOfBirthHelp"
                                        aria-invalid={!!errors.dateOfBirth}
                                    />
                                    {errors.dateOfBirth && <div id="dateOfBirthHelp" className="text-danger">{errors.dateOfBirth}</div>}
                                </td>
                            </tr>
                            <tr>
                                <th>Blood Group:</th>
                                <td>
                                    <select
                                        name="bloodGroup"
                                        className="form-control"
                                        value={patientDetails.bloodGroup}
                                        onChange={handleChange}
                                        aria-describedby="bloodGroupHelp"
                                        aria-invalid={!!errors.bloodGroup}
                                    >
                                        <option value="">{patientDetails.bloodGroup}</option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="AB">AB</option>
                                        <option value="O">O</option>
                                    </select>
                                    {errors.bloodGroup && <div id="bloodGroupHelp" className="text-danger">{errors.bloodGroup}</div>}
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
                                        aria-describedby="patientAddressHelp"
                                        aria-invalid={!!errors.patientAddress}
                                    />
                                    {errors.patientAddress && <div id="patientAddressHelp" className="text-danger">{errors.patientAddress}</div>}
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
                                        onChange={handleNumericInput}
                                        aria-describedby="patientAadharNoHelp"
                                        aria-invalid={!!errors.patientAadharNo}
                                    />
                                    {errors.patientAadharNo && <div id="patientAadharNoHelp" className="text-danger">{errors.patientAadharNo}</div>}
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
                                        aria-describedby="patientEmailIdHelp"
                                        aria-invalid={!!errors.patientEmailId}
                                    />
                                    {errors.patientEmailId && <div id="patientEmailIdHelp" className="text-danger">{errors.patientEmailId}</div>}
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
                                        onChange={handleNumericInput}
                                        aria-describedby="patientContactNoHelp"
                                        aria-invalid={!!errors.patientContactNo}
                                    />
                                    {errors.patientContactNo && <div id="patientContactNoHelp" className="text-danger">{errors.patientContactNo}</div>}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary">Update Profile</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdatePatientProfile;
