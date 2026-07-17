import React, { useState, useRef } from 'react';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  Send 
} from 'lucide-react';
import './ForgotPassword.css';
import { URLS } from '../url';

const EMAIL_NOT_FOUND_MESSAGE = "We couldn't find an account associated with this email address";

const getForgotEmailErrorMessage = (data, status) => {
  const message = (data?.message || '').toLowerCase();
  if (
    status === 404 ||
    message.includes('not found') ||
    message.includes('no admin') ||
    message.includes('no account') ||
    message.includes('does not exist') ||
    message.includes("doesn't exist")
  ) {
    return EMAIL_NOT_FOUND_MESSAGE;
  }
  return data?.message || 'Failed to generate password recovery OTP.';
};

export default function ForgotPassword({ onCancel, onSuccess }) {
  // Steps: 'email', 'otp', 'reset'
  const [forgotStep, setForgotStep] = useState('email');
  const [forgotEmail, setForgotEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [forgotOtpDigits, setForgotOtpDigits] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const forgotOtpRefs = useRef([]);

  const [errorMsg, setErrorMsg] = useState('');

  // OTP focus helpers
  const handleDigitChange = (idx, value) => {
    const val = value.replace(/\D/g, '').slice(-1);
    const next = [...forgotOtpDigits];
    next[idx] = val;
    setForgotOtpDigits(next);
    if (val && idx < 5) {
      forgotOtpRefs.current[idx + 1]?.focus();
    }
  };

  const handleDigitKeyDown = (idx, e) => {
    if (e.key === 'Backspace' && !forgotOtpDigits[idx] && idx > 0) {
      forgotOtpRefs.current[idx - 1]?.focus();
    }
  };

  const handleDigitPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const next = [...forgotOtpDigits];
    pastedData.split('').forEach((char, i) => {
      next[i] = char;
    });
    setForgotOtpDigits(next);
    forgotOtpRefs.current[Math.min(pastedData.length, 5)]?.focus();
  };

  // Send Forgot Password OTP
  const handleSendForgotOtp = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!forgotEmail) {
      setErrorMsg('Registered Email is required.');
      return;
    }

    try {
      const res = await fetch(URLS.GenerateOtp, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail })
      });

      let data = {};
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
      } else {
        const text = await res.text();
        setErrorMsg(text || `Request failed with status: ${res.status}`);
        return;
      }

      if (!res.ok || data.success === false) {
        setErrorMsg(getForgotEmailErrorMessage(data, res.status));
        return;
      }

      // Save user ID from response
      const uId = data.userId || data.data?.userId || data.data?._id;

      if (!uId) {
        setErrorMsg(EMAIL_NOT_FOUND_MESSAGE);
        return;
      }

      setUserId(uId);
      setForgotOtpDigits(['', '', '', '', '', '']);
      setForgotStep('otp');
    } catch (err) {
      setErrorMsg('Unable to connect to recovery server. Please try again.');
      console.error(err);
    }
  };


  // Verify Forgot Password OTP
  const handleVerifyForgotOtp = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    const enteredCode = forgotOtpDigits.join('');

    if (enteredCode.length < 6) {
      setErrorMsg('Please enter the complete 6-digit code.');
      return;
    }

    try {
      const res = await fetch(URLS.VerifyOtp, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: userId, otp: enteredCode })
      });
      const data = await res.json();

      if (!res.ok || data.success === false) {
        setErrorMsg(data.message || 'Incorrect verification code. Please try again.');
        return;
      }

      setForgotStep('reset');
    } catch (err) {
      setErrorMsg('Unable to connect to verification server. Please try again.');
      console.error(err);
    }
  };

  // Save new Password
  const handleUpdatePasswordSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (newPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    try {
      const res = await fetch(URLS.ResetPassword, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: userId, newPassword: newPassword, confirmPassword: confirmPassword })
      });
      const data = await res.json();

      if (!res.ok || data.success === false) {
        setErrorMsg(data.message || 'Failed to update administrative password.');
        return;
      }

      onSuccess('Password updated successfully! You can now log in.');
    } catch (err) {
      setErrorMsg('Unable to connect to password server. Please try again.');
      console.error(err);
    }
  };

  const handleCancelForgot = () => {
    setForgotStep('email');
    setForgotEmail('');
    setUserId('');
    setNewPassword('');
    setConfirmPassword('');
    setForgotOtpDigits(['', '', '', '', '', '']);
    setErrorMsg('');
    onCancel();
  };

  return (
    <div className="login-form-body">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <button 
          type="button" 
          onClick={handleCancelForgot}
          style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '4px' }}
        >
          <ArrowLeft size={18} />
        </button>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0, color: '#1e293b' }}>
          Reset Password
        </h3>
      </div>

      {errorMsg && (
        <div className="login-message error" style={{ marginBottom: '16px' }}>
          {errorMsg}
        </div>
      )}

      {/* Step Indicators */}
      <div className="forgot-step-indicator">
        <div className={`forgot-step-dot ${forgotStep === 'email' ? 'active' : ''} ${forgotStep !== 'email' ? 'done' : ''}`}>
          {forgotStep !== 'email' ? '✓' : '1'}
        </div>
        <div style={{ width: '24px', height: '2px', backgroundColor: forgotStep !== 'email' ? '#22c55e' : '#e2e8f0', alignSelf: 'center' }} />
        <div className={`forgot-step-dot ${forgotStep === 'otp' ? 'active' : ''} ${forgotStep === 'reset' ? 'done' : ''}`}>
          {forgotStep === 'reset' ? '✓' : '2'}
        </div>
        <div style={{ width: '24px', height: '2px', backgroundColor: forgotStep === 'reset' ? '#22c55e' : '#e2e8f0', alignSelf: 'center' }} />
        <div className={`forgot-step-dot ${forgotStep === 'reset' ? 'active' : ''}`}>
          3
        </div>
      </div>

      {/* STEP 1: Enter Email */}
      {forgotStep === 'email' && (
        <form onSubmit={handleSendForgotOtp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 4px 0', lineHeight: 1.4 }}>
            Enter your registered admin email address and we'll send you a 6-digit OTP code to verify your identity.
          </p>
          <div className="login-form-group">
            <label className="login-label">Email Address</label>
            <div className="forgot-field-wrap">
              <span className="forgot-icon"><Mail size={16} /></span>
              <input 
                type="email" 
                className="forgot-input-adv" 
                placeholder="admin@example.com"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className="forgot-btn-primary" style={{ gap: '8px' }}>
            <Send size={15} /> Send OTP code
          </button>
        </form>
      )}

      {/* STEP 2: Enter Forgot Password OTP */}
      {forgotStep === 'otp' && (
        <form onSubmit={handleVerifyForgotOtp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 4px 0', lineHeight: 1.4 }}>
            Enter the verification code sent to <strong style={{ color: '#0076a3' }}>{forgotEmail}</strong>
          </p>

          <div className="login-form-group">
            <label className="login-label" style={{ textAlign: 'center', marginBottom: '8px' }}>6-Digit Verification Code</label>
            <div className="forgot-otp-digit-row" onPaste={handleDigitPaste}>
              {forgotOtpDigits.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (forgotOtpRefs.current[i] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  className={`forgot-otp-digit-box ${digit ? 'filled' : ''}`}
                  value={digit}
                  onChange={(e) => handleDigitChange(i, e.target.value)}
                  onKeyDown={(e) => handleDigitKeyDown(i, e)}
                  required
                />
              ))}
            </div>
          </div>

          <button type="submit" className="forgot-btn-primary">
            Verify OTP
          </button>
          <button type="button" className="otp-btn-verify">
            Resend Otp
          </button>
        </form>
      )}

      {/* STEP 3: Reset Password */}
      {forgotStep === 'reset' && (
        <form onSubmit={handleUpdatePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 4px 0', lineHeight: 1.4 }}>
            Configure your new login credentials
          </p>

          <div className="login-form-group">
            <label className="login-label">New Password</label>
            <div className="forgot-field-wrap">
              <span className="forgot-icon"><Lock size={16} /></span>
              <input 
                type={showNewPassword ? 'text' : 'password'}
                className="forgot-input-adv" 
                placeholder="Minimum 6 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{ paddingRight: '44px' }}
                required
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="login-form-group">
            <label className="login-label">Confirm New Password</label>
            <div className="forgot-field-wrap">
              <span className="forgot-icon"><Lock size={16} /></span>
              <input 
                type={showConfirmPassword ? 'text' : 'password'}
                className="forgot-input-adv" 
                placeholder="Repeat new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ paddingRight: '44px' }}
                required
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" className="forgot-btn-primary">
            Update Password
          </button>
        </form>
      )}
    </div>
  );
}
