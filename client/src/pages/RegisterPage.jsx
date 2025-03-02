import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Register.scss";

const RegisterPage = () => {
  return (
    <div className="register">
      <div className='register_content'>
        <form className="register_content_form">
          <input type="text" placeholder='First Name' name="firstname" required/>
          <input type="text" placeholder='Last Name' name="lastname" required/>
          <input type="email" placeholder='Email' name="email" required/>
          <input type="password" placeholder='Password' name="password" required/>
          <input type="password" placeholder='Confirm Password' name="confirmPassword" required/>
          <input type="file" id="image" name="profileImage" accept="image/*" style={{display: "none"}} required/>
          <label htmlFor="image">
            <img src="/assets/addImage.png" alt="add profile photo"/>
            <p>Upload Your Photo</p>
          </label>
          <button type="submit">Register</button>
        </form>
        <Link to="/login">Already have an account? Log In Here</Link>
      </div>
    </div>
  )
}

export default RegisterPage
