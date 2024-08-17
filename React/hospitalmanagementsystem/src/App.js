import logo from './logo.svg';
import './App.css';
import LoginComp from './Components/LoginComp';
import PatientHome from './Components/patient';
import { Route, Router, Routes } from 'react-router-dom';
import SavePatientForm from './Components/RegisterComp';
import Doctor from './Components/Doctor';
import ViewAppointment from './Components/ViewAppointments';


  

import UpdatePatientProfile from './Components/UpdatePatientProfile';


import SlotManager from './Components/SlotManager';
import MedicalRecordsComp from './Components/MedicalRecordsComp';
import DoctorRegistration from './Components/RegisterDoctor';
import InsertDoctor from './Components/RegisterDoctor';
import BookAppointments from './Components/BookAppointments';





 
function App() {
  return (
   
  

    <div className="App">
     <header className="App-header">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">MyApp</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/login" st>Login</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/Register">Register</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    
   



      <Routes>
     
        <Route path="/login" element={<LoginComp />} />
        <Route path='/Doctor_home' element ={<Doctor/>}/>
        <Route path="/patient_home" element={<PatientHome />} />
        <Route path='/Register' element={<SavePatientForm/>}/>
        <Route path='/view-appointments' element={<ViewAppointment />} />


        

        <Route path='/SlotManager' element={<SlotManager/>}/>


        <Route path='/medicalrecord' element={<MedicalRecordsComp/>}/>

        <Route path='/updatepatient' element={<UpdatePatientProfile/>}/>
        <Route path='/RegisterDoctor' element={<InsertDoctor/>}/>
        <Route path='/bookappointment' element={<BookAppointments/>}/>

      </Routes>
    </header>
  </div>
    

  );
}




export default App;
