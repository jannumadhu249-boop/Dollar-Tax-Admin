import React, { useState } from 'react';
import AuthAlert from './AuthAlert';
import { Send, Mail, Image as ImageIcon } from 'lucide-react';

export default function SendMail({ selectedYear = 'TY2025' }) {
  const [status, setStatus] = useState('Select Status');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState(null);

  const resolvedYear = selectedYear.replace(/\D/g, '') || '2025';

  const handleTestMail = (e) => {
    e.preventDefault();
    if (!subject.trim() || !body.trim()) {
      setMessage({ type: 'error', text: 'Subject and Body are required to send a test email.' });
      return;
    }
    
    alert(`Success: Test mail sent to administrator inbox!\nSubject: "${subject}"\nStatus Targeted: ${status}`);
    setMessage({ type: 'success', text: 'Test email has been simulated successfully.' });
  };

  const handleSendMail = (e) => {
    e.preventDefault();
    if (status === 'Select Status') {
      setMessage({ type: 'error', text: 'Please select a status target first.' });
      return;
    }
    if (!subject.trim() || !body.trim()) {
      setMessage({ type: 'error', text: 'Subject and Body are required to send broadcast emails.' });
      return;
    }

    if (confirm(`Are you sure you want to send this email to all users with status "${status}" for Tax Year ${resolvedYear}?`)) {
      alert(`Success: Email broadcast dispatched successfully!\n\nTarget Group: ${status}\nTotal recipients simulated: 142\nSubject: "${subject}"`);
      
      setStatus('Select Status');
      setSubject('');
      setBody('');
      setImageFile(null);
      setMessage({ type: 'success', text: 'Emails dispatched successfully to all target subscribers!' });
    }
  };

  return (
    <div className="content-card" style={{ animation: 'fadeIn 0.2s ease-out', padding: '24px' }}>
      <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '14px', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Mail size={20} color="#0076a3" />
          Send Mail to All Registered in {resolvedYear} Tax Year
        </h2>
      </div>

      {message && (
        <AuthAlert
          type={message.type === 'success' ? 'success' : message.type === 'error' ? 'error' : 'info'}
          title={message.type === 'success' ? 'Email Sent' : message.type === 'error' ? 'Cannot Send Email' : 'Notice'}
          message={message.text}
        />
      )}

      <form style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '800px' }}>
        {/* Select Status */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#334155' }}>Select Status <span style={{ color: '#dc2626' }}>*</span></label>
          <select 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
            className="search-input-box"
            style={{ width: '100%', padding: '10px 12px', fontSize: '13px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          >
            <option value="Select Status">Select Status</option>
            <option value="Registered Users">Registered Users</option>
            <option value="Scheduling Pending">Scheduling Pending</option>
            <option value="Information Pending">Information Pending</option>
            <option value="Interview Pending">Interview Pending</option>
            <option value="Documents Pending">Documents Pending</option>
            <option value="All Registered">All Registered</option>
          </select>
        </div>

        {/* Subject */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#334155' }}>Subject <span style={{ color: '#dc2626' }}>*</span></label>
          <input
            type="text"
            className="search-input-box"
            placeholder="Enter Email Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            style={{ width: '100%', padding: '10px 12px', fontSize: '13px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          />
        </div>

        {/* Body */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#334155' }}>Body <span style={{ color: '#dc2626' }}>*</span></label>
          <textarea
            rows="6"
            className="search-input-box"
            placeholder="Enter Email Content Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            style={{ width: '100%', height: '150px', fontSize: '13px', fontFamily: 'inherit', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          />
        </div>

        {/* Image Attachment */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#334155' }}>Image Attachment</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0] ? e.target.files[0].name : null)}
            style={{
              padding: '8px 12px',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
              fontSize: '13px',
              backgroundColor: '#fff',
              cursor: 'pointer'
            }}
          />
          {imageFile && (
            <span style={{ fontSize: '12px', color: '#0076a3', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ImageIcon size={14} /> Selected image: <strong>{imageFile}</strong>
            </span>
          )}
        </div>

        {/* Buttons Row */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
          <button
            type="button"
            onClick={handleTestMail}
            style={{
              backgroundColor: '#64748b',
              color: '#ffffff',
              border: 'none',
              padding: '10px 20px',
              fontSize: '13px',
              fontWeight: '600',
              borderRadius: '6px',
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            Test Mail
          </button>
          <button
            type="button"
            onClick={handleSendMail}
            style={{
              backgroundColor: '#0076a3',
              color: '#ffffff',
              border: 'none',
              padding: '10px 24px',
              fontSize: '13px',
              fontWeight: '600',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 4px rgba(0,118,163,0.2)'
            }}
          >
            <Send size={15} /> Send Mail
          </button>
        </div>
      </form>
    </div>
  );
}
