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
import HomeNav from './Components/HomeNav';
import PatientBookings from './Components/PatinetBookings';
import ChangePasswordForm from './Components/ChangePassword';






 
function App() {
  return (
   
  

    <div className="App">
     <header className="App-header">
        <HomeNav/>
        
   



      <Routes>
        
        <Route path="/" element={<LoginComp />} />
        <Route path="/login" element={<LoginComp />} />
        <Route path='/Doctor_home' element ={<Doctor/>}/>
        <Route path="/patient_home" element={<PatientHome />} />
        <Route path='/Register' element={<SavePatientForm/>}/>
        <Route path='/view-appointments' element={<ViewAppointment />} />


        

        <Route path='/SlotManager' element={<SlotManager/>}/>
        <Route path='/change-password' element={<ChangePasswordForm/>}/>

        <Route path='/Booking' element={<BookAppointments/>}/>
        <Route path='/medicalrecord' element={<MedicalRecordsComp/>}/>

        <Route path='/updatepatient' element={<UpdatePatientProfile/>}/>
        <Route path='/RegisterDoctor' element={<InsertDoctor/>}/>
        <Route path='/bookappointment' element={<BookAppointments/>}/>
        <Route path='/ViewPatientAppointment' element={<PatientBookings/>}/>
      </Routes>
    </header>
  </div>
    

  );
}




export default App;
