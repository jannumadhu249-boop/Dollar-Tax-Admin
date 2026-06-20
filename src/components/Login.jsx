import React, { useState } from 'react';
import logoLg from '../assets/logo-lg.png';

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState('');
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'forgot'

  const handleGenerateOtp = (e) => {
    e.preventDefault();
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setInfoMsg(`Generated OTP Code: ${code}`);
    setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (activeTab === 'forgot') {
      setInfoMsg('Password reset link has been simulated to your email.');
      return;
    }

    if (!username || !password) {
      setErrorMsg('Username/Email and Password are required.');
      return;
    }

    if (!generatedOtp) {
      setErrorMsg('Please click "Generate Otp" first.');
      return;
    }

    if (otpInput !== generatedOtp) {
      setErrorMsg('Incorrect OTP code. Please try again.');
      return;
    }

    // Success
    setInfoMsg('Login successful! Redirecting...');
    setTimeout(() => {
      onLoginSuccess();
    }, 800);
  };

  const handleCancel = () => {
    setUsername('');
    setPassword('');
    setOtpInput('');
    setGeneratedOtp('');
    setErrorMsg('');
    setInfoMsg('');
  };

  return (
    <div className="login-wrapper">
      {/* Upper Logo Banner */}
      <div className="login-logo-container">
        <div className="login-logo-box">
            <img
              src={logoLg}
              alt="Dollar Tax Filer"
              style={{
                height: "60px",
                width: "auto",
                objectFit: "contain",
              }}
            />
        </div>
        <h2 className="login-welcome-text">Welcome to Admin Login</h2>
      </div>

      {/* Main Login Card */}
      <div className="login-card">
        {/* Tab Buttons */}
        <div className="login-tabs-group">
          <button 
            type="button" 
            className={`login-tab-btn ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('login');
              setErrorMsg('');
              setInfoMsg('');
            }}
          >
            Login
          </button>
          <button 
            type="button" 
            className={`login-tab-btn ${activeTab === 'forgot' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('forgot');
              setErrorMsg('');
              setInfoMsg('');
            }}
          >
            Forgot Password ?
          </button>
        </div>

        <form onSubmit={handleSubmit} className="login-form-body">
          {errorMsg && (
            <div className="login-message error">
              {errorMsg}
            </div>
          )}

          {infoMsg && (
            <div className="login-message info">
              {infoMsg}
            </div>
          )}

          {activeTab === 'login' ? (
            <>
              {/* Username Input */}
              <div className="login-form-group">
                <label className="login-label">User name/Email</label>
                <input 
                  type="text" 
                  className="login-input" 
                  placeholder="Enter Username or Email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              {/* Password Input */}
              <div className="login-form-group">
                <label className="login-label">Password</label>
                <input 
                  type="password" 
                  className="login-input" 
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* OTP Input */}
              <div className="login-form-group">
                <div className="otp-label-row">
                  <label className="login-label">Otp</label>
                  <button 
                    type="button" 
                    className="generate-otp-btn"
                    onClick={handleGenerateOtp}
                  >
                    Generate Otp
                  </button>
                </div>
                <input 
                  type="text" 
                  className="login-input" 
                  placeholder="Enter Otp"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  required
                />
              </div>
            </>
          ) : (
            <div className="login-form-group">
              <label className="login-label">Registered Email</label>
              <input 
                type="email" 
                className="login-input" 
                placeholder="Enter Registered Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}

          {/* Form Actions */}
          <div className="login-actions-row">
            <button type="submit" className="login-action-btn submit">
              Submit
            </button>
            <button type="button" className="login-action-btn cancel" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
