import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Register() {
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedOption, setSelectedOption] = useState('Admin');
    const navigate = useNavigate();
    const handleSelectChange = (event) => {
      setSelectedOption(event.target.value);
    };
    const handleSubmitRegister = (e) => {
        e.preventDefault();
        // let emailRegex =
        //     /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            let numberRegex = /^[1-9]\d*$/;
        // Basic validation
        if (userName === '') {
            toast.error('Please Enter Name');
            return;
        }
        if (email === '') {
            toast.error('Please Enter Email');
            return;
        }
       
        if (phoneNumber === '') {
            toast.error('Please Enter Number');
            return;
        }
        if ( phoneNumber.length < 10 || phoneNumber.length > 10) {
            // toast.error("Please enter valid phone number");
             toast.error("Please enter a valid phone number")
          }
        if (password === '') {
            toast.error('Please Enter Password');
            return;
        }
      
        if (!numberRegex.test( phoneNumber)) {
            toast.error('Please Enter Valid Number');
            return;
        }
        if (selectedOption === '') {
            toast.error('Please Select Option');
            return;
        }
        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.some(user => user.userName === userName)) {
            toast.error('User already exists');
          return;
        }
    
        users.push({ userName, password,email,phoneNumber });
        localStorage.setItem('users', JSON.stringify(users));
        toast.success('Registration successful');
        navigate('/')
    };

    return (
        <div className='  border-0  d-flex justify-content-center align-items-center flex-column' style={{ height: '100vh' }}>
            <h2>Register</h2>
            <form className='shadow-lg rounded p-5 w-25' >
            <div>
                    <label>User Name:</label>
                    <input
                        className="form-control form-control-sm"
                        type="text"
                        placeholder="User Name"
                        value={userName}
                        onChange={(e) => setUserName(
                        e.target.value)}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        className="form-control form-control-sm"
                        type="email"
                          placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail( e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        className="form-control form-control-sm"
                        type="password"
                          placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(
                         e.target.value)}
                    />
                </div>
               
                <div>
                    <label>Phone Number:</label>
                    <input
                        className="form-control form-control-sm"
                        type="telephone"
                          placeholder="PhoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber( e.target.value)}
                    />
                    
                    <select className="form-select mt-3" aria-label="Default select example" value={selectedOption} onChange={handleSelectChange}>
                        <option >Roll Dropdown</option>
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                    </select>
                </div>

                <div className='d-flec align-items-center'>
                <button type="submit" className="btn btn-primary me-2 " onClick={handleSubmitRegister}>Register</button>
                <button type="button" className="btn btn-primary " onClick={()=>  navigate('/login')}>Login</button>
              </div>
            </form>
        </div>
    );
}

export default Register;
