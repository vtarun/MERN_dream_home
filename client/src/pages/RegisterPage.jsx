import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Register.scss";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });
  const [passwordMatch, setPasswordMatch] = useState(true);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value, files} = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: name ==="profileImage" ? files[0] : value
    }));    
  };

  useEffect(() => {
    setPasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword === "")
  }, [formData.password, formData.confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const registerFormData = new FormData();

      for(let key in formData) {
        registerFormData.append(key, formData[key]);
      }

      const response = await fetch('http://localhost:4000/auth/register', {
        method: 'POST',
        body: registerFormData
      });

      if(response.ok){        
        navigate('/login');
      }

    }catch(err) {
      console.log("Registraion failed", err?.message)
    }
  }

  return (
    <div className="register">
      <div className='register_content'>
        <form className="register_content_form" onSubmit={handleSubmit}>
          <input type="text" placeholder='First Name' name="firstName" onChange={handleChange} value={formData.firstName} required/>
          <input type="text" placeholder='Last Name' name="lastName"  onChange={handleChange} value={formData.lastName} required/>
          <input type="email" placeholder='Email' name="email"  onChange={handleChange} value={formData.email} required/>
          <input type="password" placeholder='Password' name="password"  onChange={handleChange} value={formData.password} required/>
          <input type="password" placeholder='Confirm Password' name="confirmPassword"  onChange={handleChange} value={formData.confirmPassword} required/>
          {!passwordMatch && (<p style={{color: 'red'}}>Password didn't match</p>)}
          <input type="file" id="image" name="profileImage" accept="image/*" style={{display: "none"}}  onChange={handleChange} required/>
          <label htmlFor="image">
            <img src="/assets/addImage.png" alt="add profile photo"/>
            <p>Upload Your Photo</p>
          </label>
          {formData.profileImage && <img src={URL.createObjectURL(formData.profileImage)} alt="profile photo" style={{ maxWidth: '80px'}} />}
          <button type="submit" disabled={!passwordMatch}>Register</button>
        </form>
        <Link to="/login">Already have an account? Log In Here</Link>
      </div>
    </div>
  )
}

export default RegisterPage
