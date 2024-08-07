import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Components/Slice'; // Import your slices here

export const store = configureStore({
  reducer: {
    auth: authReducer, // Add your reducers here
  },
});
