import React, { useState } from 'react';

export default function SendMail({ selectedYear = 'TY2025' }) {
  const [status, setStatus] = useState('Select Status');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState(null);

  // Extract digits/year from selectedYear (e.g. "TY2025" -> "2025")
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
      
      // Reset form
      setStatus('Select Status');
      setSubject('');
      setBody('');
      setImageFile(null);
      setMessage({ type: 'success', text: 'Emails dispatched successfully to all target subscribers!' });
    }
  };

  return (
    <div className="content-card" style={{ animation: 'fadeIn 0.2s ease-out' }}>
      <div className="header-section" style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '12px', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0, color: 'var(--text-dark)' }}>
          Send Mail to All Register in {resolvedYear} Tax Year
        </h2>
      </div>

      {message && (
        <div 
          className={`login-message ${message.type}`} 
          style={{ 
            marginBottom: '20px', 
            borderRadius: 'var(--radius-sm)',
            textAlign: 'left'
          }}
        >
          {message.text}
        </div>
      )}

      <form style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '800px' }}>
        {/* Status Selection */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#333333' }}>Select Status</label>
          <select 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
            className="search-input-box"
            style={{ width: '100%', padding: '10px 12px', fontSize: '14px' }}
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
          <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#333333' }}>Subject</label>
          <input
            type="text"
            className="search-input-box"
            placeholder="Enter Email Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            style={{ width: '100%', padding: '10px 12px', fontSize: '14px' }}
          />
        </div>

        {/* Body */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#333333' }}>Body</label>
          <textarea
            rows="6"
            className="search-input-box"
            placeholder="Enter Email Content Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            style={{ width: '100%', height: '150px', fontSize: '14px', fontFamily: 'inherit', padding: '10px 12px' }}
          />
        </div>

        {/* Image File Upload */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#333333' }}>Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0] ? e.target.files[0].name : null)}
            style={{
              padding: '10px 12px',
              border: '1px solid #ccc',
              borderRadius: 'var(--radius-sm)',
              fontSize: '13px',
              backgroundColor: '#fff',
              cursor: 'pointer'
            }}
          />
          {imageFile && (
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Selected image: <strong>{imageFile}</strong>
            </span>
          )}
        </div>

        {/* Buttons Row */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button
            type="button"
            onClick={handleTestMail}
            style={{
              backgroundColor: '#1b62a5',
              color: '#ffffff',
              border: 'none',
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: '600',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              transition: 'opacity var(--transition-fast)'
            }}
          >
            Test Mail
          </button>
          <button
            type="button"
            onClick={handleSendMail}
            style={{
              backgroundColor: '#1b62a5',
              color: '#ffffff',
              border: 'none',
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: '600',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              transition: 'opacity var(--transition-fast)'
            }}
          >
            Send Mail
          </button>
        </div>
      </form>
    </div>
  );
}
