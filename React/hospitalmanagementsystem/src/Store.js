import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slice/AuthSlice';
import patientReducer from './Slice/PatientSlice'; 

export const store = configureStore({
  reducer: {
    auth: authReducer, 
    patient: patientReducer,
  },
});

export default store;
