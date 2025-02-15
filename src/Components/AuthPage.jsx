


import React, { useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
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

  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const [isLogin, setIsLogin] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isLogin) {
      setLoginData({ ...loginData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (isLogin) {
        const response = await axios.post('http://localhost:5000/api/login', loginData);
        alert(response.data.message);
        // Redirect or perform other actions after login success
      } 
      else {
        const response = await axios.post('http://localhost:5000/api/register', formData);
        alert(response.data.message);
        setIsLogin(true); // Switch to login section
      }
    } catch (error) {
      console.error('Error:', error.response?.data?.message);
      alert(error.response?.data?.message || 'Something went wrong');
    }
    
    

  };
  


  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-5 " style={{ width: '800px' }}>
        <h3 className="text-center mb-4">
          {isLogin ? 'Login to Your Account' : 'Create an Account'}
        </h3>

        <form onSubmit={handleSubmit}>
          {isLogin ? (
            <>
              
              <div className="d-flex justify-content-center align-items-center " id="loginsection">
  <div className="card p-4 shadow" style={{ width: '400px' }}>
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

  </div>
</div>

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
            </>
          )}

          <button type="submit" className="btn btn-primary w-25 mb-3 m-3">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <div className="text-center">
          {isLogin ? (
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                className="btn btn-link p-0"
                onClick={() => setIsLogin(false)}
              >
                Register here
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                className="btn btn-link p-0"
                onClick={() => setIsLogin(true)}
              >
                Login here
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;




