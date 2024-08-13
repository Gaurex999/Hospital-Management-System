import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../Components/Slice'; // Ensure you import the correct logout action
import "../Components/Style/DoctorNavBar.css"

const DoctorNavbar = () => {
  const navigate = useNavigate();
  const reduxDispatch = useDispatch();

  const handleLogout = () => {
    reduxDispatch(logout());
    navigate("/login"); // Redirect to login page
  };

  return (
    <header className="App-header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">DoctorApp</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="/manage-patients">Manage Patients</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/view-appointments">View Appointments</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/update-profile">Update Profile</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/update-time-slot">Update Time Slot</a>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default DoctorNavbar;
