// DepartmentSelect.js
import React, { useEffect, useState } from 'react';

const DepartmentSelect = ({ onSelectDepartment }) => {
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/departments')
            .then(response => response.json())
            .then(data => setDepartments(data))
            .catch(error => console.error('Error fetching departments:', error));
    }, []);

    return (
        <select onChange={(e) => onSelectDepartment(e.target.value)}>
            <option value="">Select Department</option>
            {departments.map(dept => (
                <option key={dept.departmentId} value={dept.departmentId}>
                    {dept.departmentName}
                </option>
            ))}
        </select>
    );
};

export default DepartmentSelect;
