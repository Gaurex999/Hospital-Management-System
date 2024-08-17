    import React, { useState } from 'react';
    import "bootstrap/dist/css/bootstrap.min.css";
    import "../Components/Style/register.css";

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

        const [errors, setErrors] = useState({});
        const [msg, setMsg] = useState('');
        const [usernameAvailable, setUsernameAvailable] = useState(null);

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

            // Check username availability if the changed field is the username
            if (name === 'user.userName') {
                setMsg('');
                setUsernameAvailable(null);

                fetch(`http://localhost:8080/api/users/check-username?username=${value}`)
                    .then(response => {
                        if (!response.ok) {
                            return response.text().then(text => {
                                throw new Error(`HTTP error! Status: ${response.status}, Message: ${text}`);
                            });
                        }
                        return response.json();
                    })
                    .then(data => {
                        if (data) {
                            setUsernameAvailable(true);
                            setMsg(' Username is already taken.');
                        } else {
                            setUsernameAvailable(false);
                            setMsg('Username is available.');
                        }
                    })
                    .catch(error => {
                        console.error('There has been a problem with your fetch operation:', error);
                        setMsg('Error checking username availability.');
                    });
            }
        };

        const validateForm = () => {
            const newErrors = {};
        
            // Regular expressions
            const aadharRegex = /^\d{12}$/;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const contactRegex = /^\d{10}$/;
            const passwordRegex = /^.{8,12}$/; // Password must be between 8 and 12 characters long
        
            // Validation logic
            if (!formData.patientName.trim()) newErrors.patientName = 'Patient Name is required';
            if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required';
            if (!formData.bloodGroup) newErrors.bloodGroup = 'Blood Group is required';
            if (!formData.patientAddress.trim()) newErrors.patientAddress = 'Patient Address is required';
            if (!formData.patientAadharNo.trim() || !aadharRegex.test(formData.patientAadharNo)) newErrors.patientAadharNo = 'Aadhar Number must be a 12-digit number';
            if (!formData.patientEmailId.trim() || !emailRegex.test(formData.patientEmailId)) newErrors.patientEmailId = 'Valid Email ID is required';
            if (!formData.patientContactNo.trim() || !contactRegex.test(formData.patientContactNo)) newErrors.patientContactNo = 'Contact Number must be a 10-digit number';
            if (!formData.user.userName.trim()) newErrors.userName = 'User Name is required';
            if (!formData.user.password.trim() || !passwordRegex.test(formData.user.password)) newErrors.password = 'Password must be between 8 and 12 characters long';
        
            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        };

        // Handle form submission
        const handleSubmit = (e) => {
            e.preventDefault();
            if (!validateForm()) return;

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
                setMsg('Patient saved successfully!');
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
                setMsg('Failed to save patient data');
            });
        };

        // Handle Aadhar and Contact Number input to only accept numbers
        const handleNumericInput = (e) => {
            const { name, value } = e.target;
            if (/^\d*$/.test(value)) {
                setFormData(prevState => ({
                    ...prevState,
                    [name]: value
                }));
            }
        };

        return (
            <div className="container">
                <h2>Save Patient</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="patientName" className="form-label" style={{color:'black'}}>Patient Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="patientName"
                            name="patientName"
                            value={formData.patientName}
                            onChange={handleChange}
                            aria-describedby="patientNameHelp"
                            aria-invalid={!!errors.patientName}
                        />
                        {errors.patientName && <div id="patientNameHelp" className="text-danger" style={{color:'black'}}>{errors.patientName}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dateOfBirth" className="form-label" style={{color:'black'}}>Date of Birth</label>
                        <input
                            type="date"
                            className="form-control"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            aria-describedby="dateOfBirthHelp"
                            aria-invalid={!!errors.dateOfBirth}
                        />
                        {errors.dateOfBirth && <div id="dateOfBirthHelp" className="text-danger">{errors.dateOfBirth}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="bloodGroup" className="form-label" style={{color:'black'}}>Blood Group</label>
                        <select
                            className="form-control"
                            id="bloodGroup"
                            name="bloodGroup"
                            value={formData.bloodGroup}
                            onChange={handleChange}
                            aria-describedby="bloodGroupHelp"
                            aria-invalid={!!errors.bloodGroup}
                        >
                            <option value="">Select Blood Group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                        {errors.bloodGroup && <div id="bloodGroupHelp" className="text-danger">{errors.bloodGroup}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="patientAddress" className="form-label" style={{color:'black'}}>Patient Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="patientAddress"
                            name="patientAddress"
                            value={formData.patientAddress}
                            onChange={handleChange}
                            aria-describedby="patientAddressHelp"
                            aria-invalid={!!errors.patientAddress}
                        />
                        {errors.patientAddress && <div id="patientAddressHelp" className="text-danger">{errors.patientAddress}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="patientAadharNo" className="form-label" style={{color:'black'}}>Aadhar Number</label>
                        <input
                            type="text"
                            className="form-control"
                            id="patientAadharNo"
                            name="patientAadharNo"
                            value={formData.patientAadharNo}
                            onChange={handleNumericInput}
                            aria-describedby="patientAadharNoHelp"
                            aria-invalid={!!errors.patientAadharNo}
                        />
                        {errors.patientAadharNo && <div id="patientAadharNoHelp" className="text-danger">{errors.patientAadharNo}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="patientEmailId" className="form-label" style={{color:'black'}}>Email ID</label>
                        <input
                            type="email"
                            className="form-control"
                            id="patientEmailId"
                            name="patientEmailId"
                            value={formData.patientEmailId}
                            onChange={handleChange}
                            aria-describedby="patientEmailIdHelp"
                            aria-invalid={!!errors.patientEmailId}
                        />
                        {errors.patientEmailId && <div id="patientEmailIdHelp" className="text-danger">{errors.patientEmailId}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="patientContactNo" className="form-label" style={{color:'black'}}>Contact Number</label>
                        <input
                            type="text"
                            className="form-control"
                            id="patientContactNo"
                            name="patientContactNo"
                            value={formData.patientContactNo}
                            onChange={handleNumericInput}
                            aria-describedby="patientContactNoHelp"
                            aria-invalid={!!errors.patientContactNo}
                        />
                        {errors.patientContactNo && <div id="patientContactNoHelp" className="text-danger">{errors.patientContactNo}</div>}
                    </div>
                    <div className="mb-3">
                        <h4>User Details</h4>
                        <div className="mb-3">
                            <label htmlFor="user.userName" className="form-label" style={{color:'black'}}>User Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="user.userName"
                                name="user.userName"
                                value={formData.user.userName}
                                onChange={handleChange}
                                aria-describedby="userNameHelp"
                                aria-invalid={!!errors.userName}
                            />
                            {errors.userName && <div id="userNameHelp" className="text-danger">{errors.userName}</div>}
                        </div>
                    
                    </div>
                    <div className="mb-3">
                        <label htmlFor="user.password" className="form-label" style={{color:'black'}}>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="user.password"
                            name="user.password"
                            value={formData.user.password}
                            onChange={handleChange}
                            aria-describedby="passwordHelp"
                            aria-invalid={!!errors.password}
                        />
                        {errors.password && <div id="passwordHelp" className="text-danger">{errors.password}</div>}
                    </div>
                    <button type="submit" className="btn btn-primary">Save Patient</button>
                </form>
                {msg && <p className="mt-3">{msg}</p>}
            </div>
        );
    }
