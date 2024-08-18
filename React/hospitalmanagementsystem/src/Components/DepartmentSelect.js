import React, { useState, useEffect } from 'react';

const DepartmentSelect = ({ onSelectDepartment, selectStyle }) => {
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/departments')
            .then(response => response.json())
            .then(data => setDepartments(data))
            .catch(error => console.error('Error fetching departments:', error));
    }, []);

    const handleChange = (event) => {
        onSelectDepartment(event.target.value);
    };

    return (
        <select onChange={handleChange} style={selectStyle}>
            <option value="">Select Department</option>
            {departments.map(department => (
                <option key={department.departmentId} value={department.departmentId}>
                    {department.departmentName}
                </option>
            ))}
        </select>
    );
};

export default DepartmentSelect;
