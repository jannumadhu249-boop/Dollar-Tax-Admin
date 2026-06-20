import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

export default function CreateNoteModal({ onClose, onSave }) {
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !note) {
      setError('Both date and note are required.');
      return;
    }
    onSave({ date, employee: 'New Employee', note, status: 'pending' });
    setDate('');
    setNote('');
    setError('');
  };

  return (
    <div className="modal-overlay" style={overlayStyle}>
      <div className="modal-dialog" style={dialogStyle}>
        <div className="modal-header" style={headerStyle}>
          <h3 className="modal-title">Create New Note</h3>
          <button className="modal-close-trigger" onClick={onClose} style={closeBtnStyle}>✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={bodyStyle}>
            {error && (
              <div style={errorStyle}>{error}</div>
            )}
            <div className="form-group" style={groupStyle}>
              <label style={labelStyle}>Date</label>
              <input
                type="date"
                className="search-input-box"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div className="form-group" style={groupStyle}>
              <label style={labelStyle}>Notes</label>
              <textarea
                className="search-input-box"
                rows={4}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                style={textareaStyle}
              />
            </div>
          </div>
          <div className="modal-footer" style={footerStyle}>
            <button type="button" className="btn btn-secondary" onClick={onClose} style={secondaryBtnStyle}>Close</button>
            <button type="submit" className="btn btn-primary" style={primaryBtnStyle}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Inline styles for quick styling (replace with CSS classes in real project)
const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0,0,0,0.4)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};
const dialogStyle = {
  backgroundColor: '#fff',
  borderRadius: '8px',
  width: '420px',
  maxWidth: '90%',
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
};
const headerStyle = { padding: '12px 16px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const closeBtnStyle = { background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' };
const bodyStyle = { padding: '16px' };
const groupStyle = { marginBottom: '12px' };
const labelStyle = { display: 'block', marginBottom: '4px', fontWeight: '600' };
const inputStyle = { width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' };
const textareaStyle = { ...inputStyle, resize: 'vertical' };
const footerStyle = { padding: '12px 16px', borderTop: '1px solid #eee', textAlign: 'right' };
const secondaryBtnStyle = { backgroundColor: '#6c757d', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', marginRight: '8px', cursor: 'pointer' };
const primaryBtnStyle = { backgroundColor: 'var(--color-green-btn)', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' };
const errorStyle = { backgroundColor: 'rgba(220,53,69,0.1)', color: '#dc3545', padding: '8px', borderRadius: '4px', marginBottom: '8px', border: '1px solid rgba(220,53,69,0.2)' };
