



import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const RegistrationPage = () => {
  const [forgotPassword, setForgotPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  
  const navigate = useNavigate()



  const [emailForReset, setEmailForReset] = useState('');

  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    designation: '',
    dob: '',
    dateOfJoining: '',
    password: '',
    confirmPassword: ''
  });

  // const [emailForReset, setEmailForReset] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (forgotPassword) {
      // Only handle email change for password reset
      setEmailForReset(value);
    } else if (isLogin) {
      setLoginData({
        ...loginData,
        [name]: value
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/api/forgot-password', { email: emailForReset });
      alert('Password reset link sent to your email!');
      setForgotPassword(false); // Close the form
    } catch (error) {
      console.error('Error sending password reset link:', error.response?.data?.message);
      alert(error.response?.data?.message || 'Something went wrong');
    }
  };

  

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (forgotPassword) {
  //     console.log("Resetting password for", emailForReset);
  //     alert("Password reset link has been sent to your email.");
  //     // Handle reset password logic here
  //   } else if (isLogin) {
  //     console.log("Logging in with", loginData);
  //     alert("Login successful!");
  //     // Handle login logic here
  //   } else {
  //     console.log("Registering with", formData);
  //     alert("Registration successful!");
      
  //     // After registration, switch to the login form
  //     setIsLogin(true);

  //     // Optionally, reset the formData
  //     setFormData({
  //       username: '',
  //       email: '',
  //       phoneNumber: '',
  //       designation: '',
  //       dob: '',
  //       dateOfJoining: '',
  //       password: '',
  //       confirmPassword: ''
  //     });
  //   }
  // };



  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   try {
  //     if (forgotPassword) {
  //       const response = await axios.post('/api/reset-password', { email: emailForReset });
  //       alert(response.data.message);
  //     } else if (isLogin) {
  //       // await axios.post('http://localhost:3000/api/login', loginData);

  //       // alert(response.data.message);
  //       const response = await axios.post('http://localhost:3000/api/login', loginData);
  //       alert(response.data.message); // Accessing response.data.message
  //     } else {
  //       const response = await axios.post('http://localhost:5000/api/register', formData);
  //       alert(response.data.message);
  //       setIsLogin(true); // Switch to login page after registration
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //     alert(error.response?.data?.message || 'Something went wrong!');
  //   }
  // };
  const handleSubmit = async (e) => {
        e.preventDefault();
      
        // try {
        //   if (forgotPassword) {
        //     console.log("Resetting password for", emailForReset);
        //     const response = await axios.post('http://localhost:5000/api/reset-password', { email: emailForReset });
        //     alert(response.data.message);
        //   } else if (isLogin) {
        //     const response = await axios.post('http://localhost:5000/api/login', loginData);
        //     alert(response.data.message);
        //     // Redirect or perform other actions after login success
        //   } else {
        //     const response = await axios.post('http://localhost:5000/api/register', formData);
        //     alert(response.data.message);
        //     setIsLogin(true); // Switch to login section
        //   }
        // } catch (error) {
        //   console.error('Error:', error.response?.data?.message);
        //   alert(error.response?.data?.message || 'Something went wrong');
        // }
        
        // try {
        //   if (forgotPassword) {
        //     console.log("Resetting password for", emailForReset);
        //     const response = await axios.post('http://localhost:5000/api/reset-password', { email: emailForReset });
        //     alert(response.data.message || 'Password reset link has been sent to your email.');
        //   } else if (isLogin) {
        //     const response = await axios.post('http://localhost:5000/api/login', loginData);
        //     alert(response.data.message || 'Login successful!');
        //     // Redirect or perform other actions after login success
        //   } else {
        //     const response = await axios.post('http://localhost:5000/api/register', formData);
        //     alert(response.data.message || 'Registration successful!');
        //     setIsLogin(true); // Switch to login section
        //   }
        // } catch (error) {
        //   if (error.response) {
        //     // Server responded with a status outside the 2xx range
        //     console.error('Response Error:', error.response.data);
        //     alert(error.response.data.message || 'Something went wrong!');
        //   } else if (error.request) {
        //     // Request was made but no response was received
        //     console.error('Request Error:', error.request);
        //     alert('No response from server. Please try again later.');
        //   } else {
        //     // Something else went wrong
        //     console.error('Unexpected Error:', error.message);
        //     alert('An unexpected error occurred. Please try again.');
        //   }
        // }
        // / Password and Confirm Password validation
  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

        try {
          if (forgotPassword) {
            console.log("Resetting password for", emailForReset);
            const response = await axios.post('http://localhost:5000/api/forgot-password', { email: emailForReset });
            alert(response.data.message || 'Password reset link has been sent to your email.');
          } else if (isLogin) {
            const response = await axios.post('http://localhost:5000/api/login', loginData);
            alert(response.data.message || 'Login successful!');
            navigate('/dashboard');
            // Redirect or perform other actions after login success
          } else {
            const response = await axios.post('http://localhost:5000/api/register', formData);
            alert(response.data.message || 'Registration successful!');
            setIsLogin(true); // Switch to login section
          }
        } catch (error) {
              console.error('Error:', error);
              alert(error.response?.data?.message || 'Something went wrong!');
            }
        
    
      };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-5" style={{ width: "800px" }}>
        <h3 className="text-center mb-4">
          {forgotPassword
            ? "Forgot Password"
            : isLogin
            ? "Login to Your Account"
            : "Create an Account"}
        </h3>

        <form onSubmit={handleSubmit}>
          {forgotPassword ? (
            <>
              <div className="mb-3">
                <label className="form-label d-block text-start">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  value={emailForReset}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-25 mb-3">
                Send Reset Link
              </button>
              <button type="button" className="btn btn-link" onClick={() => setForgotPassword(false)}>
                Back to Login
              </button>
            </>
          ) : isLogin ? (
            <>
              <div className="mb-3">
                <label className="form-label d-block text-start">Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={loginData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label d-block text-start">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-25 mb-3">
                Login
              </button>
              <button type="button" className="btn btn-link" onClick={() => setForgotPassword(true)}>
                Forgot Password?
              </button>
              {forgotPassword && (
  <form onSubmit={handleForgotPassword}>
    <label>Email:</label>
    <input 
      type="email"
      value={emailForReset}
      onChange={(e) => setEmailForReset(e.target.value)}
      required
    />
    <button type="submit">Send Reset Link</button>
  </form>
)}

            </>
          ) : (
            <>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label d-block text-start">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label d-block text-start">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label d-block text-start">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label d-block text-start">Designation</label>
                  <input
                    type="text"
                    className="form-control"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label d-block text-start">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label d-block text-start">Date of Joining</label>
                  <input
                    type="date"
                    className="form-control"
                    name="dateOfJoining"
                    value={formData.dateOfJoining}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label d-block text-start">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label d-block text-start">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-25 mb-3">
                Register
              </button>
            </>
          )}
        </form>

        <div className="text-center">
          {!forgotPassword && (
            <p>
              {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
              <button type="button" className="btn btn-link p-0" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Register here" : "Login here"}
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
