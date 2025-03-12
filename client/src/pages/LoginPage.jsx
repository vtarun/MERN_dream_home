import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { setLogin } from '../redux/state';
import { useDispatch } from "react-redux";

import "../styles/login.scss";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await fetch("http://localhost:4000/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({email, password})
      });
      const loginData = await response.json();

      if(loginData){
        dispatch(
          setLogin({
            user: loginData.user,
            token: loginData.token
          })
        );
        navigate('/');
      }
    } catch(err){
      console.log("Login failed", err?.message);
    }

  }
  return (
    <div className='login'>
      <div className='login_content'>
        <form className="login_content_form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder='Email'
            name="email"
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
            required
          />
          <input
            type="password"
            placeholder='Password'
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <button type="submit">LOG IN</button>
        </form>
        <Link to="/register">Already have an account? Log In Here</Link>
      </div>
    </div>
  )
}

export default LoginPage
