import { createSlice } from '@reduxjs/toolkit';

const patientSlice = createSlice({
  name: 'patient',
  initialState: {
    appointments: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    fetchAppointmentsRequest: (state) => {
      state.status = 'loading';
    },
    fetchAppointmentsSuccess: (state, action) => {
      state.status = 'succeeded';
      state.appointments = action.payload;
    },
    fetchAppointmentsFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    bookAppointmentRequest: (state) => {
      state.status = 'loading';
    },
    bookAppointmentSuccess: (state, action) => {
      state.status = 'succeeded';
      state.appointments.push(action.payload);
    },
    bookAppointmentFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    logout: (state) => {
      state.appointments = [];
      state.status = 'idle';
      state.error = null;
    },
  },
});

export const {
  fetchAppointmentsRequest,
  fetchAppointmentsSuccess,
  fetchAppointmentsFailure,
  bookAppointmentRequest,
  bookAppointmentSuccess,
  bookAppointmentFailure,
  logout,
} = patientSlice.actions;

export default patientSlice.reducer;
