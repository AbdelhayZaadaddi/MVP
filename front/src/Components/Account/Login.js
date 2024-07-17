import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios';

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Login = () => {
  const navigate = useNavigate();

  const initialFormData = {
    email: '',
    password: '',
    role: 'company',  // Default rolesi
  };

  const [formData, updateFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleRoleChange = (role) => {
    updateFormData({
      ...formData,
      role: role,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .post('token/', {
        email: formData.email,
        password: formData.password,
        role: formData.role,
      })
      .then((res) => {
        console.log('Login response:', res.data);
        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);
        axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + res.data.access;
        navigate('/');
      })
      .catch((error) => {
        console.error('Login error:', error);
      });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='login-container'>
      <div className='login-background'></div>
      <div className='login-form-container'>
        <form onSubmit={handleSubmit} className='login-form'>
          <h1 className='login-title'>Log-in</h1>
          <div className='login-tabs'>
            <span className={`login-tab ${formData.role === 'company' ? 'active' : ''}`} onClick={() => handleRoleChange('company')}>Company</span>
            <span className={`login-tab ${formData.role === 'employee' ? 'active' : ''}`} onClick={() => handleRoleChange('employee')}>Employee</span>
            <span className={`login-tab ${formData.role === 'trader' ? 'active' : ''}`} onClick={() => handleRoleChange('trader')}>Trader</span>
          </div>
          <label className='login-label'>Email</label>
          <input
            name="email"
            type="email"
            onChange={handleChange}
            value={formData.email}
            required
            className='login-input'
          />
          <div className='login-password-options'>
            <label className='login-label'>Password</label>
			<div className='l'>
				{showPassword ? 
					<VisibilityIcon style={{ fontSize: 18, color: 'gray' }} onClick={toggleShowPassword} className='login-visibility-icon' /> : 
					<VisibilityOffIcon style={{ fontSize: 18, color: 'gray' }} onClick={toggleShowPassword} className='login-visibility-icon' />
				}
				<span className='login-show-password' style={{ fontSize: 13, color: 'gray' }} onClick={toggleShowPassword}>
					{showPassword ? "Hide" : "Show"}
				</span>
			</div>
          </div>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            onChange={handleChange}
            value={formData.password}
            required
            className='login-input'
          />
          <button type="submit" className='login-button'>Sign in</button>
          <div className='login-options'>
            <div className='login-remember'>
              <input type='checkbox' id='remember' name='remember' />
              <label htmlFor='remember'>Remember me</label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
