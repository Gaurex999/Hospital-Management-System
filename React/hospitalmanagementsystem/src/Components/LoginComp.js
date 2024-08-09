import "bootstrap/dist/css/bootstrap.min.css";
import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, loginSuccess, loginFailure } from '../Components/Slice';
import '../Components/Style/login.css'
export default function LoginComp() {
    const init = {
        uname: "",
        pwd: ""
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case 'update':
                return { ...state, [action.fld]: action.val };
            case 'reset':
                return init;
            default:
                return state;
        }
    };

    const [info, dispatch] = useReducer(reducer, init);
    const navigate = useNavigate();
    const reduxDispatch = useDispatch();
    const authStatus = useSelector((state) => state.auth.status);
    const [msg, setMsg] = useState("");

    const sendData = (e) => {
        e.preventDefault();
        setMsg(""); // Clear previous messages

        reduxDispatch(loginRequest());

        const reqOption = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ UserName: info.uname, Password: info.pwd }) // Ensure the keys match your API model
        };

        fetch("http://localhost:5042/api/Doctor/UpdateVerifyLogin", reqOption)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json(); // Parse JSON response
            })
            .then(data => {
                if (data.roleId === 1) {
                    reduxDispatch(loginSuccess(data));
                    navigate("/patient_home");
                } else if (data.roleId === 2) {
                    reduxDispatch(loginSuccess(data));
                    navigate("/doctor_home");
                } else {
                    setMsg("Unknown role");
                }
            })
            .catch(error => {
                reduxDispatch(loginFailure(error.message));
                console.error('There has been a problem with your fetch operation:', error);
                setMsg(error.message || "Failed to fetch data from server");
            });
    };

    return (
        <div>
            <form onSubmit={sendData}>
                <div className="mb-4">
                    <label htmlFor="uname" className="form-label">Username: </label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="uname" 
                        name="uname" 
                        value={info.uname} 
                        onChange={(e) => dispatch({ type: 'update', fld: 'uname', val: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="pwd" className="form-label">Password:</label>
                    <input 
                        type="password" 
                        id="pwd" 
                        className="form-control" 
                        name="pwd" 
                        value={info.pwd} 
                        onChange={(e) => dispatch({ type: 'update', fld: 'pwd', val: e.target.value })}
                    />
                </div>
                <button type="submit" className="btn btn-primary mb-2" style={{ marginRight: "10px" }}>Submit</button>
                <button type="button" className="btn btn-primary mb-2" onClick={() => dispatch({ type: 'reset' })}>Clear</button>
            </form>
            <p>{msg}</p>
        </div>
    );
}
