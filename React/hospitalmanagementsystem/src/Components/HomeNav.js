import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../Components/Slice'; // Adjust the path to your logout action
import '../Components/Style/PatientNavBar.css'; // Ensure the CSS file is correctly imported

const PatientNavbar = () => {
  const navigate = useNavigate();
  const reduxDispatch = useDispatch();
  const location = useLocation();

  const handleLogin = () => {
    navigate("/login"); // Redirect to login page
  };

  const handleRegister = () => {
    navigate("/register"); // Redirect to register page
  };

  const handleLogout = () => {
    reduxDispatch(logout());
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <Navbar bg="light" expand="lg">
      <div className="container-fluid">
        <Navbar.Brand as={Link} to="/">HMS</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          {['/login', '/register'].includes(location.pathname) && (
            <Nav className="ms-auto">
              <Nav.Item>
                <Button variant="link" className="nav-link text-dark fw-semibold" onClick={handleLogin}>
                  <i className="bi bi-box-arrow-in-right"></i> Login
                </Button>
              </Nav.Item>
              <Nav.Item>
                <Button variant="link" className="nav-link text-dark fw-semibold" onClick={handleRegister}>
                  <i className="bi bi-pencil-square"></i> Register
                </Button>
              </Nav.Item>
            </Nav>
          )}

          {['/change-password', '/doctor_home', '/update-time-slot', '/manage-patients', '/view-appointments', '/update-profile'].includes(location.pathname) && (
            <Nav className="ms-auto">
              <Nav.Item>
                <Nav.Link as={Link} to="/manage-patients" className="text-dark fw-semibold">
                  <i className="bi bi-person-lines-fill"></i> Manage Patients
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/view-appointments" className="text-dark fw-semibold">
                  <i className="bi bi-calendar-check-fill"></i> View Appointments
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/update-profile" className="text-dark fw-semibold">
                  <i className="bi bi-person-circle"></i> Update Profile
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/update-time-slot" className="text-dark fw-semibold">
                  <i className="bi bi-clock-fill"></i> Time Slot
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/change-password" className="text-dark fw-semibold">
                  <i className="bi bi-key-fill"></i> Change Password
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Button variant="link" className="nav-link text-danger fw-semibold" onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right"></i> Logout
                </Button>
              </Nav.Item>
            </Nav>
          )}

          {['/patient_home','/Booking','/updatepatient','/scheduled-appointments'].includes(location.pathname) && (
            <Nav className="ms-auto">
              <Nav.Item>
                <Nav.Link as={Link} to="/Booking" className="text-dark fw-semibold">
                  <i className="bi bi-calendar2-plus-fill"></i> Book Appointment
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/scheduled-appointments" className="text-dark fw-semibold">
                  <i className="bi bi-calendar-check-fill"></i> Check Scheduled Appointments
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/updatepatient" className="text-dark fw-semibold">
                  <i className="bi bi-person-circle"></i> Update Profile
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Button variant="link" className="nav-link text-danger fw-semibold" onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right"></i> Logout
                </Button>
              </Nav.Item>
            </Nav>
          )}
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default PatientNavbar;
