import React, { useState } from 'react';
import { Eye } from 'lucide-react';

export default function ReferralsReport({ selectedYear }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [submittedSearch, setSubmittedSearch] = useState({ term: '', from: '', to: '' });
  
  // OTP Verification States
  const [unmaskedFields, setUnmaskedFields] = useState({});
  const [verificationOtp, setVerificationOtp] = useState('');
  const [verificationFieldKey, setVerificationFieldKey] = useState(null);
  const [otpInput, setOtpInput] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpError, setOtpError] = useState('');

  // Mock Referrals data matching screenshot and supporting multiple years (2021-2025)
  const initialReferrals = [
    // TY2025
    { sNo: 1, name: 'Azharuddin Jamadar', email: 'azharuddin.jamadar@gmail.com', referralsCount: 1, dollarsEarned: 0, year: '2025', date: '2026-01-15' },
    { sNo: 2, name: 'OemKsxQjDxUflKoK', email: 'oemksxqj@yahoo.com', referralsCount: 1, dollarsEarned: 0, year: '2025', date: '2026-01-20' },
    { sNo: 3, name: 'ZNSKYLCvnhCJpKuPRdGYBc', email: 'znskylc.vnh@gmail.com', referralsCount: 1, dollarsEarned: 0, year: '2025', date: '2026-02-02' },
    { sNo: 4, name: 'LZeFlUzgwrJsmADkScjUX', email: 'lzeflu.zgwr@outlook.com', referralsCount: 1, dollarsEarned: 0, year: '2025', date: '2026-02-12' },
    { sNo: 5, name: 'nyNpuPYFkKljbEdAVcYJYj', email: 'nynpu.pyfk@gmail.com', referralsCount: 1, dollarsEarned: 0, year: '2025', date: '2026-02-18' },
    { sNo: 6, name: 'Saurabh seth', email: 'saurabh.seth@gmail.com', referralsCount: 3, dollarsEarned: 0, year: '2025', date: '2026-03-02' },
    { sNo: 7, name: 'uxfoiWimTbztaujYNjpJ', email: 'uxfoiwim.t@gmail.com', referralsCount: 1, dollarsEarned: 0, year: '2025', date: '2026-03-10' },
    { sNo: 8, name: 'DHEERAN ANANDAN', email: 'dheeran.anandan@tech.net', referralsCount: 1, dollarsEarned: 0, year: '2025', date: '2026-03-12' },
    { sNo: 9, name: 'Geeth Chandra Kalleda', email: 'geeth.kalleda@gmail.com', referralsCount: 1, dollarsEarned: 10, year: '2025', date: '2026-03-15' },
    { sNo: 10, name: 'Neelima M', email: 'neelima.m@gmail.com', referralsCount: 2, dollarsEarned: 0, year: '2025', date: '2026-03-18' },
    { sNo: 11, name: 'Srikanth Balijapelly', email: 'srikanth.balijapelly@gmail.com', referralsCount: 1, dollarsEarned: 0, year: '2025', date: '2026-03-20' },
    { sNo: 12, name: 'Aneri Bhupeshbhai Shah', email: 'aneri.shah@gmail.com', referralsCount: 1, dollarsEarned: 0, year: '2025', date: '2026-03-24' },
    { sNo: 13, name: 'AVINASH SANAPLA', email: 'avinash.sanapla@gmail.com', referralsCount: 1, dollarsEarned: 0, year: '2025', date: '2026-03-28' },
    { sNo: 14, name: 'Kiran Balakrishna', email: 'kiran.balakrishna@gmail.com', referralsCount: 1, dollarsEarned: 0, year: '2025', date: '2026-04-01' },
    { sNo: 15, name: 'Anudeep Nallamothu', email: 'anudeep.nallamothu@gmail.com', referralsCount: 1, dollarsEarned: 0, year: '2025', date: '2026-04-05' },
    { sNo: 16, name: 'Saurabh Rege', email: 'saurabh.rege@gmail.com', referralsCount: 1, dollarsEarned: 10, year: '2025', date: '2026-04-10' },
    { sNo: 17, name: 'Arjun Sharma', email: 'arjun.sharma@gmail.com', referralsCount: 2, dollarsEarned: 0, year: '2025', date: '2026-04-12' },
    { sNo: 18, name: 'Meghna Sriram', email: 'meghna.sriram@gmail.com', referralsCount: 1, dollarsEarned: 10, year: '2025', date: '2026-04-15' },
    { sNo: 19, name: 'Rohan Patil', email: 'rohan.patil@gmail.com', referralsCount: 1, dollarsEarned: 0, year: '2025', date: '2026-04-18' },
    { sNo: 20, name: 'Ravikrishna Thigulla', email: 'ravikrishna.thigulla@gmail.com', referralsCount: 1, dollarsEarned: 0, year: '2025', date: '2026-04-20' },

    // TY2024
    { sNo: 101, name: 'Venkata Swamy', email: 'venkata.swamy@gmail.com', referralsCount: 2, dollarsEarned: 20, year: '2024', date: '2025-02-15' },
    { sNo: 102, name: 'Divya Teja', email: 'divya.teja@yahoo.com', referralsCount: 1, dollarsEarned: 0, year: '2024', date: '2025-02-28' },
    { sNo: 103, name: 'Praveen Raju', email: 'praveen.raju@outlook.com', referralsCount: 4, dollarsEarned: 40, year: '2024', date: '2025-03-05' },
    
    // TY2023
    { sNo: 201, name: 'Karthik Subbaraj', email: 'karthik.subbaraj@gmail.com', referralsCount: 1, dollarsEarned: 10, year: '2023', date: '2024-03-01' },
    { sNo: 202, name: 'Anjali Deshmukh', email: 'anjali.desh@gmail.com', referralsCount: 3, dollarsEarned: 30, year: '2023', date: '2024-03-12' },

    // TY2022
    { sNo: 301, name: 'Prasad Babu', email: 'prasad.babu@gmail.com', referralsCount: 2, dollarsEarned: 20, year: '2022', date: '2023-02-10' },

    // TY2021
    { sNo: 401, name: 'Naresh Kumar', email: 'naresh.k@gmail.com', referralsCount: 1, dollarsEarned: 10, year: '2021', date: '2022-03-15' }
  ];

  const handleFieldClick = (fieldKey, isCurrentlyUnmasked) => {
    if (isCurrentlyUnmasked) {
      setUnmaskedFields(prev => ({
        ...prev,
        [fieldKey]: false
      }));
    } else {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setVerificationOtp(code);
      setVerificationFieldKey(fieldKey);
      setOtpInput('');
      setOtpError('');
      setShowOtpModal(true);
    }
  };

  const getMaskedEmail = (email) => {
    if (!email) return '';
    const parts = email.split('@');
    return 'XXXXXXXXXX.' + parts[parts.length - 1].split('.').pop();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedSearch({ term: searchTerm, from: dateFrom, to: dateTo });
  };

  const numericYear = selectedYear ? selectedYear.replace('TY', '') : '2025';

  const filteredReferrals = initialReferrals.filter(ref => {
    const matchesYear = ref.year === numericYear;
    const matchesEmail = !submittedSearch.term || ref.email.toLowerCase().includes(submittedSearch.term.toLowerCase()) || ref.name.toLowerCase().includes(submittedSearch.term.toLowerCase());
    
    let matchesDate = true;
    if (submittedSearch.from) {
      matchesDate = matchesDate && ref.date >= submittedSearch.from;
    }
    if (submittedSearch.to) {
      matchesDate = matchesDate && ref.date <= submittedSearch.to;
    }

    return matchesYear && matchesEmail && matchesDate;
  });

  return (
    <div className="content-card">
      <div className="header-section" style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '12px', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>Referred Friends Report</h2>
      </div>

      {/* Filter Form Block */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-end', marginBottom: '24px', backgroundColor: '#f8f9fa', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '200px' }}>
          <label style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-muted)' }}>Email</label>
          <input 
            type="text" 
            placeholder="Search by Email" 
            className="search-input-box" 
            style={{ width: '100%' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '150px' }}>
          <label style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-muted)' }}>Date From</label>
          <input 
            type="date" 
            className="date-picker-box" 
            style={{ width: '100%' }}
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '150px' }}>
          <label style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-muted)' }}>Date To</label>
          <input 
            type="date" 
            className="date-picker-box" 
            style={{ width: '100%' }}
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{ padding: '8px 24px', height: '38px' }}>
          Submit
        </button>
      </form>

      {/* Report Table */}
      <div className="table-responsive">
        <table className="corporate-table">
          <thead>
            <tr>
              <th style={{ width: '60px' }}>S.No</th>
              <th>Name/Email</th>
              <th style={{ width: '150px' }}>Referrals Count</th>
              <th style={{ width: '180px' }}>Dollars earned</th>
              <th style={{ width: '100px', textAlign: 'center' }}>View List</th>
            </tr>
          </thead>
          <tbody>
            {filteredReferrals.length > 0 ? (
              filteredReferrals.map((ref, index) => (
                <tr key={ref.sNo}>
                  <td>{index + 1}</td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontWeight: '500' }}>{ref.name}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                          {unmaskedFields[`ref_${ref.sNo}_email`] ? ref.email : getMaskedEmail(ref.email)}
                        </span>
                        <button 
                          type="button" 
                          className="email-toggle-eye-btn" 
                          onClick={() => handleFieldClick(`ref_${ref.sNo}_email`, !!unmaskedFields[`ref_${ref.sNo}_email`])}
                          style={{ padding: '2px', display: 'inline-flex', alignSelf: 'center', color: '#0076a3', border: 'none', background: 'none', cursor: 'pointer' }}
                        >
                          <Eye size={12} />
                        </button>
                      </div>
                    </div>
                  </td>
                  <td>{ref.referralsCount}</td>
                  <td>Total : {ref.dollarsEarned}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button 
                      type="button" 
                      className="btn" 
                      style={{ backgroundColor: '#5cb85c', color: '#ffffff', padding: '4px 10px', fontSize: '12px', borderRadius: '4px' }}
                      onClick={() => alert(`Showing referrals list for ${ref.name}`)}
                    >
                      View List
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>
                  No referral records found for year {numericYear}.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {filteredReferrals.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
          <div className="pagination-row">
            <button className="page-link-btn active">1</button>
            {filteredReferrals.length > 20 && <button className="page-link-btn">2</button>}
            {filteredReferrals.length > 20 && <button className="page-link-btn">&gt;</button>}
            {filteredReferrals.length > 20 && <button className="page-link-btn">Last</button>}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Showing 1 to {Math.min(filteredReferrals.length, 20)} of {filteredReferrals.length} entries
          </div>
        </div>
      )}

      {/* OTP Verification Modal */}
      {showOtpModal && (
        <div className="modal-overlay">
          <div className="modal-dialog" style={{ width: '400px' }}>
            <div className="modal-header">
              <h3 className="modal-title">Verification Code Required</h3>
              <button className="modal-close-trigger" onClick={() => setShowOtpModal(false)}>
                &times;
              </button>
            </div>
            <div className="modal-body" style={{ padding: '20px' }}>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '14px' }}>
                For security, enter the 6-digit verification code below to reveal this field:
              </p>
              <div 
                style={{ 
                  textAlign: 'center', 
                  backgroundColor: '#f8f9fa', 
                  padding: '12px', 
                  borderRadius: 'var(--radius-sm)', 
                  fontSize: '18px', 
                  fontWeight: 'bold', 
                  letterSpacing: '2px',
                  marginBottom: '16px',
                  border: '1px dashed #ccc',
                  color: 'var(--text-dark)'
                }}
              >
                Code: {verificationOtp}
              </div>
              
              {otpError && (
                <div style={{ color: '#dc3545', fontSize: '13px', marginBottom: '12px', backgroundColor: 'rgba(220, 53, 69, 0.1)', padding: '8px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(220, 53, 69, 0.2)' }}>
                  {otpError}
                </div>
              )}

              <div className="form-group">
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Enter 6-digit code"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  style={{ padding: '10px', textAlign: 'center', fontSize: '16px', letterSpacing: '1px' }}
                  maxLength={6}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" style={{ padding: '8px 16px' }} onClick={() => setShowOtpModal(false)}>
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                style={{ padding: '8px 16px', backgroundColor: 'var(--bg-navbar)' }}
                onClick={() => {
                  if (otpInput === verificationOtp) {
                    setUnmaskedFields(prev => ({
                      ...prev,
                      [verificationFieldKey]: true
                    }));
                    setShowOtpModal(false);
                  } else {
                    setOtpError('Invalid code. Please try again.');
                  }
                }}
              >
                Verify &amp; Show
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
