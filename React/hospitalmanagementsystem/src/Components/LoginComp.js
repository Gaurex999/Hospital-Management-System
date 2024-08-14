import "bootstrap/dist/css/bootstrap.min.css";
import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, loginSuccess, loginFailure } from '../Components/Slice';
import '../Components/Style/NavBarLogin.css'
import '../Components/Style/Logincss.css';
import hospital from '../Components/Style/H3.jpg' 

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
        setMsg("");

        reduxDispatch(loginRequest());

        const reqOption = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ UserName: info.uname, Password: info.pwd }) 
        };

        fetch("http://localhost:5042/api/Doctor/UpdateVerifyLogin", reqOption)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json(); 
            })
            .then(data => {
                localStorage.setItem("loggedUser", JSON.stringify(data));
                console.log(localStorage.getItem("loggedUser"));
                if (data.roleId === 1) {
                    reduxDispatch(loginSuccess(data));
                    navigate("/patient_home");
                } else if (data.roleId === 2) {
                    reduxDispatch(loginSuccess(data));
                    navigate("/doctor_home");
                } else if(data.roleId === 3){
                    reduxDispatch(loginSuccess(data));
                    navigate("/Admin_home");
                }
                else
                {
                    setMsg("unknow role")
                }
            })
            .catch(error => {
                reduxDispatch(loginFailure(error.message));
                console.error('There has been a problem with your fetch operation:', error);
                setMsg(error.message || "Failed to fetch data from server");
            });
    };

    return (
        
        <div
            className="container-fluid form-container"
            style={{
                backgroundImage: `url(${hospital})`,
                backgroundSize: 'cover', 
                backgroundPosition: 'center', 
                backgroundRepeat: 'no-repeat', 
                height: '100vh' 
            }}
        >
            <div className="form-border" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '8px' }}>
                <h2 className="text-center" style={{color:"black"}}>Login</h2>
                <form onSubmit={sendData}>
                    <div className="mb-4">
                        <label htmlFor="uname" className="form-label"  style={{color:"black"}}>Username: </label>
                        <input 
                            type="text" 
                            className={`form-control ${info.uname ? 'input-normal' : 'input-error'}`}
                            id="uname" 
                            name="uname" 
                            value={info.uname} 
                            onChange={(e) => dispatch({ type: 'update', fld: 'uname', val: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pwd" className="form-label"  style={{color:"black"}}>Password:</label>
                        <input 
                            type="password" 
                            id="pwd" 
                            className={`form-control ${info.pwd ? 'input-normal' : 'input-error'}`} 
                            name="pwd" 
                            value={info.pwd} 
                            onChange={(e) => dispatch({ type: 'update', fld: 'pwd', val: e.target.value })}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mb-2" style={{ marginRight: "10px",}}>Submit</button>
                    <button type="button" className="btn btn-primary mb-2" onClick={() => dispatch({ type: 'reset' })}>Clear</button>
                </form>
                <p className="message">{msg}</p>
            </div>
        </div>
    );
}
 