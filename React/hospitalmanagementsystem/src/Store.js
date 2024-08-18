import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slice/AuthSlice';
import patientReducer from './Slice/PatientSlice';
import passwordReducer from './Slice/PasswordSlice'; // Import the password reducer

export const store = configureStore({
  reducer: {
    auth: authReducer,
    patient: patientReducer,
    password: passwordReducer, // Add the password reducer to the store
  },
});

export default store;
