import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../Slice/PasswordSlice';

const ChangePasswordForm = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const dispatch = useDispatch();
    const { status, message, error } = useSelector((state) => state.password);

    const handleSubmit = (event) => {
        event.preventDefault();
        const userId = JSON.parse(localStorage.getItem('loggedUser')).userId;
        dispatch(changePassword({ userId, oldPassword, newPassword }));
    };

    return (
        <div>
            <h2>Change Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="oldPassword">Old Password</label>
                    <input
                        type="password"
                        id="oldPassword"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Change Password</button>
            </form>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'succeeded' && <p>{message}</p>}
            {status === 'failed' && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default ChangePasswordForm;
