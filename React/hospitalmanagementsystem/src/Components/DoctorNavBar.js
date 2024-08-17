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
          {/* new navbar code start */}
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">MyApp</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <a className="nav-link text-dark fw-semibold" href="/manage-patients">
            <i className="bi bi-person-lines-fill"></i> Manage Patients
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-dark fw-semibold" href="/view-appointments">
            <i className="bi bi-calendar-check-fill"></i> View Appointments
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-dark fw-semibold" href="/update-profile">
            <i className="bi bi-person-circle"></i> Update Profile
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-dark fw-semibold" href="/update-time-slot">
            <i className="bi bi-clock-fill"></i> Time Slot
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-dark fw-semibold" href="/update-time-slot">
            <i className="bi bi-clock-fill"></i> Change password
          </a>
        </li>
        <li className="nav-item">
          <button className="btn btn-link nav-link text-danger fw-semibold" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right"></i> Logout
          </button>
        </li>
      </ul>
    </div>
  </div>
</nav>
       {/* new navbar code end */}
           
          {/* <div className="collapse navbar-collapse" id="navbarNav">
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
                <a className="nav-link" href="/medicalrecord">Medical Records</a>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div> */}

        </div>
      </nav>
    </header>
  );
};

export default DoctorNavbar;
