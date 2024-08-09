import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

export default function SavePatientForm() {
    const [formData, setFormData] = useState({
        patientName: '',
        dateOfBirth: '',
        bloodGroup: '',
        patientAddress: '',
        patientAadharNo: '',
        patientEmailId: '',
        patientContactNo: '',
        user: {
            roleId: 1,
            userName: '',
            password: '',
            active: 1
        }
    });

    const [msg, setMsg] = useState('');

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => {
            const [field, subfield] = name.split('.');
            if (subfield) {
                return {
                    ...prevState,
                    [field]: {
                        ...prevState[field],
                        [subfield]: value
                    }
                };
            }
            return {
                ...prevState,
                [name]: value
            };
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setMsg('');

        fetch("http://localhost:5042/api/PatientLogin/SavePatient/Insert", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(response => {
        
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(`HTTP error! Status: ${response.status}, Message: ${text}`);
                });
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            console.log('Response data:', data);
            setMsg('Patient saved successfully!');
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            setMsg('Failed to save patient data');
        });
    };

    return (
        <div className="container">
            <h2>Save Patient</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="patientName" className="form-label">Patient Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="patientName"
                        name="patientName"
                        value={formData.patientName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
                    <input
                        type="date"
                        className="form-control"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="bloodGroup" className="form-label">Blood Group</label>
                    <input
                        type="text"
                        className="form-control"
                        id="bloodGroup"
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="patientAddress" className="form-label">Patient Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="patientAddress"
                        name="patientAddress"
                        value={formData.patientAddress}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="patientAadharNo" className="form-label">Aadhar Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="patientAadharNo"
                        name="patientAadharNo"
                        value={formData.patientAadharNo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="patientEmailId" className="form-label">Email ID</label>
                    <input
                        type="email"
                        className="form-control"
                        id="patientEmailId"
                        name="patientEmailId"
                        value={formData.patientEmailId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="patientContactNo" className="form-label">Contact Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="patientContactNo"
                        name="patientContactNo"
                        value={formData.patientContactNo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <h4>User Details</h4>
                    <div className="mb-3">
                        <label htmlFor="user.userName" className="form-label">User Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="user.userName"
                            name="user.userName"
                            value={formData.user.userName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="user.password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="user.password"
                            name="user.password"
                            value={formData.user.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="user.roleId" className="form-label">Role ID</label>
                        <input
                            type="number"
                            className="form-control"
                            id="user.roleId"
                            name="user.roleId"
                            value={formData.user.roleId}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="user.active" className="form-label">Active</label>
                        <input
                            type="number"
                            className="form-control"
                            id="user.active"
                            name="user.active"
                            value={formData.user.active}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Save Patient</button>
            </form>
            {msg && <p className="mt-3">{msg}</p>}
        </div>
    );
}
