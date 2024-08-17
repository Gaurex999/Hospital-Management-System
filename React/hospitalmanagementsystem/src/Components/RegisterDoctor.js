import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

const InsertDoctor = () => {
    const [doctor, setDoctor] = useState({
        DoctorId: 0,
        FirstName: '',
        LastName: '',
        Address: '',
        Qualification: '',
        ContactNo: '',
        EmailId: '',
        AadharNo: '',
        DepartmentId: '',
        User: {
            RoleId: 2,
            UserName: '',
            Password: '',
            Active: 1
        }
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');

    // Handle changes for both nested and non-nested fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name.includes('.')) {
            const [field, subfield] = name.split('.');
            setDoctor(prevState => ({
                ...prevState,
                [field]: {
                    ...prevState[field],
                    [subfield]: value
                }
            }));
        } else {
            setDoctor(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    // Handle numeric input validation
    const handleNumericInput = (e) => {
        const { name, value } = e.target;
        if (/^\d*$/.test(value)) {
            setDoctor(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    // Validate form fields
    const validateForm = () => {
        const newErrors = {};

        const aadharRegex = /^\d{12}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const contactRegex = /^\d{10}$/;
        const passwordRegex = /^.{8,12}$/;

        if (!doctor.FirstName.trim()) newErrors.FirstName = 'First Name is required';
        if (!doctor.LastName.trim()) newErrors.LastName = 'Last Name is required';
        if (!doctor.Address.trim()) newErrors.Address = 'Address is required';
        if (!doctor.Qualification.trim()) newErrors.Qualification = 'Qualification is required';
        if (!doctor.ContactNo.trim() || !contactRegex.test(doctor.ContactNo)) newErrors.ContactNo = 'Contact Number must be a 10-digit number';
        if (!doctor.EmailId.trim() || !emailRegex.test(doctor.EmailId)) newErrors.EmailId = 'Valid Email ID is required';
        if (!doctor.AadharNo.trim() || !aadharRegex.test(doctor.AadharNo)) newErrors.AadharNo = 'Aadhar Number must be a 12-digit number';
        if (!doctor.DepartmentId.trim()) newErrors.DepartmentId = 'Department ID is required';
        if (!doctor.User.UserName.trim()) newErrors.UserName = 'Username is required';
        if (!doctor.User.Password.trim() || !passwordRegex.test(doctor.User.Password)) newErrors.Password = 'Password must be between 8 and 12 characters long';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setMessage('');

        fetch('http://localhost:5042/api/Doctor/InsertDoctor/DocInsert', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(doctor)
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    console.error('Error response from server:', text);
                    throw new Error(text || 'Network response was not ok.');
                });
            }
            return response.json();
        })
        .then(data => setMessage('Doctor inserted successfully.'))
        .catch(err => setMessage('Failed to insert doctor'));
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4 text-dark">Insert New Doctor</h2>
            {message && <div className="alert alert-success">{message}</div>}
            <form onSubmit={handleSubmit} className="text-dark">
                {Object.keys(errors).length > 0 && (
                    <div className="alert alert-danger">
                        {Object.values(errors).map((error, index) => (
                            <div key={index}>{error}</div>
                        ))}
                    </div>
                )}
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="FirstName" className="form-label">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="FirstName"
                            name="FirstName"
                            value={doctor.FirstName}
                            onChange={handleChange}
                            aria-describedby="FirstNameHelp"
                            aria-invalid={!!errors.FirstName}
                        />
                        {errors.FirstName && <div id="FirstNameHelp" className="text-danger">{errors.FirstName}</div>}
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="LastName" className="form-label">Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="LastName"
                            name="LastName"
                            value={doctor.LastName}
                            onChange={handleChange}
                            aria-describedby="LastNameHelp"
                            aria-invalid={!!errors.LastName}
                        />
                        {errors.LastName && <div id="LastNameHelp" className="text-danger">{errors.LastName}</div>}
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="Address" className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="Address"
                        name="Address"
                        value={doctor.Address}
                        onChange={handleChange}
                        aria-describedby="AddressHelp"
                        aria-invalid={!!errors.Address}
                    />
                    {errors.Address && <div id="AddressHelp" className="text-danger">{errors.Address}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="Qualification" className="form-label">Qualification</label>
                    <input
                        type="text"
                        className="form-control"
                        id="Qualification"
                        name="Qualification"
                        value={doctor.Qualification}
                        onChange={handleChange}
                        aria-describedby="QualificationHelp"
                        aria-invalid={!!errors.Qualification}
                    />
                    {errors.Qualification && <div id="QualificationHelp" className="text-danger">{errors.Qualification}</div>}
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="ContactNo" className="form-label">Contact No</label>
                        <input
                            type="text"
                            className="form-control"
                            id="ContactNo"
                            name="ContactNo"
                            value={doctor.ContactNo}
                            onChange={handleNumericInput}
                            aria-describedby="ContactNoHelp"
                            aria-invalid={!!errors.ContactNo}
                        />
                        {errors.ContactNo && <div id="ContactNoHelp" className="text-danger">{errors.ContactNo}</div>}
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="EmailId" className="form-label">Email ID</label>
                        <input
                            type="email"
                            className="form-control"
                            id="EmailId"
                            name="EmailId"
                            value={doctor.EmailId}
                            onChange={handleChange}
                            aria-describedby="EmailIdHelp"
                            aria-invalid={!!errors.EmailId}
                        />
                        {errors.EmailId && <div id="EmailIdHelp" className="text-danger">{errors.EmailId}</div>}
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="AadharNo" className="form-label">Aadhar No</label>
                    <input
                        type="text"
                        className="form-control"
                        id="AadharNo"
                        name="AadharNo"
                        value={doctor.AadharNo}
                        onChange={handleNumericInput}
                        aria-describedby="AadharNoHelp"
                        aria-invalid={!!errors.AadharNo}
                    />
                    {errors.AadharNo && <div id="AadharNoHelp" className="text-danger">{errors.AadharNo}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="DepartmentId" className="form-label">Department ID</label>
                    <input
                        type="text"
                        className="form-control"
                        id="DepartmentId"
                        name="DepartmentId"
                        value={doctor.DepartmentId}
                        onChange={handleChange}
                        aria-describedby="DepartmentIdHelp"
                        aria-invalid={!!errors.DepartmentId}
                    />
                    {errors.DepartmentId && <div id="DepartmentIdHelp" className="text-danger">{errors.DepartmentId}</div>}
                </div>
                <h4 className="mb-4">User Details</h4>
                <div className="mb-3">
                    <label htmlFor="User_UserName" className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="User_UserName"
                        name="User.UserName"
                        value={doctor.User.UserName}
                        onChange={handleChange}
                        aria-describedby="UserNameHelp"
                        aria-invalid={!!errors.UserName}
                    />
                    {errors.UserName && <div id="UserNameHelp" className="text-danger">{errors.UserName}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="User_Password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="User_Password"
                        name="User.Password"
                        value={doctor.User.Password}
                        onChange={handleChange}
                        aria-describedby="PasswordHelp"
                        aria-invalid={!!errors.Password}
                    />
                    {errors.Password && <div id="PasswordHelp" className="text-danger">{errors.Password}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Insert Doctor</button>
            </form>
        </div>
    );
};

export default InsertDoctor;
