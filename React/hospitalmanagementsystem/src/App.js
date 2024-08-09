import logo from './logo.svg';
import './App.css';
import LoginComp from './Components/LoginComp';
import PatientHome from './Components/patient';
import { Route, Router, Routes } from 'react-router-dom';
import SavePatientForm from './Components/RegisterComp';
import Doctor from './Components/Doctor';
 
function App() {
  return (
   
    <div className="App">
    <header className="App-header">
    <div className="App">
  <header className="App-header">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">MyApp</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/login">Login</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/Register">Register</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Pricing</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" aria-disabled="true">Disabled</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</div>




      <Routes>
     
        <Route path="/login" element={<LoginComp />} />
        <Route path='/Doctor_home' element ={<Doctor/>}/>
        <Route path="/patient_home" element={<PatientHome />} />
        <Route path='/Register' element={<SavePatientForm/>}/>
      </Routes>
    </header>
  </div>
    

  );
}




export default App;
