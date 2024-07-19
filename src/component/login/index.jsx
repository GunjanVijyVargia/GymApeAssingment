import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login({onLogin}) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

 
    const handleLogin = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password);
    
        if (user) {
          localStorage.setItem('loggedInUser', JSON.stringify(user));
        navigate('/home');
        } else {
          toast.error('Invalid username or password');
        }
      };
    
    return (
        <div className='  border-0   d-flex justify-content-center align-items-center flex-column' style={{height:'100vh'}}>
            <h2 className='d-flex align-item-center justify-content-center  '>Login</h2>
            <form className='shadow-lg rounded p-5 w-25 ' >
                <div>
                    <label>Email:</label>
                    <input className="form-control form-control-sm"
                        type="email"
                        name='email'
                        value={email}
                        onChange={(e)=> setEmail(e.target.v)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        className="form-control form-control-sm"
                        type="password"
                        name='password'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}

                    />
                </div>
                <div className='d-flex align-items-center justify-content-center'>
                    <button className="btn btn-primary me-2" type="submit" onClick={handleLogin}>Login</button>
                    <button className="btn btn-primary " onClick={() => navigate('/register')} > Register</button>
                </div>
            </form>

        </div>
    );
}

export default Login;
