import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const changePassword = createAsyncThunk(
    'password/changePassword',
    async ({ userId, oldPassword, newPassword }, thunkAPI) => {
        try {
            const response = await fetch(`http://localhost:8080/api/users/change-password/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ oldPassword, newPassword }),
            });

            if (!response.ok) {
                throw new Error('Failed to change password');
            }

            return await response.json();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const passwordSlice = createSlice({
    name: 'password',
    initialState: {
        status: 'idle',
        message: '',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(changePassword.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.message = action.payload;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default passwordSlice.reducer;
