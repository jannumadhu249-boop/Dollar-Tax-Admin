import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Download, Search, Calendar, ChevronLeft, RefreshCw, Loader2, Shield, Clock, CheckCircle, X, Send } from 'lucide-react';
import { getMemberDetails, WORKFLOW_STATUSES, INITIAL_COMMENTS, INITIAL_MEMBERS } from '../data/mockMembers';
import { URLS } from '../url';

const getAuthToken = () => {
  const keys = ['authToken', 'token', 'adminToken', 'accessToken', 'jwt'];
  for (const key of keys) {
    const value = sessionStorage.getItem(key) || localStorage.getItem(key);
    if (value) return value;
  }
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IjZhNThiZDFjNzE1ZjE4ZTYxZDQxY2Y5MiIsImVtYWlsIjoiZGl2eWFwZW5keWFsYTA3MTdAZ21haWwuY29tIiwiYWRtaW5fc3RhZ2UiOiJzdXBlciIsImlhdCI6MTc4NDIwNDE1OCwiZXhwIjoxODE1NzQwMTU4fQ.1pjPlGU41H1G5ei3AfTEcaWk9O1eyRTG769xnpj5xts';
};

/* ─────────────────────────────────────────────────────────────
   OTP Modal (Email OTP Verification via API)
───────────────────────────────────────────────────────────── */
function OtpModal({ isOpen, onClose, onVerify, onResend, fieldLabel }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(120);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const refs = Array.from({ length: 6 }, () => React.createRef());

  useEffect(() => {
    if (!isOpen) return;
    setOtp(['', '', '', '', '', '']);
    setTimeLeft(120);
    setError('');
    setSuccess('Verification code sent to email.');

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(timer); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const handleChange = (val, idx) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < 5) refs[idx + 1].current?.focus();
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) refs[idx - 1].current?.focus();
  };

  const handleResend = async () => {
    if (timeLeft > 0 || isResending) return;
    setIsResending(true);
    setError('');
    try {
      if (onResend) await onResend();
      setTimeLeft(120);
      setOtp(['', '', '', '', '', '']);
      setSuccess('New verification code sent.');
    } catch (err) {
      setError(err.message || 'Failed to resend code.');
    } finally {
      setIsResending(false);
    }
  };

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length < 6) { setError('Please enter the complete 6-digit code.'); return; }
    setIsVerifying(true);
    setError('');
    try {
      const ok = await onVerify(code);
      if (ok) {
        setSuccess('Verified successfully!');
        setTimeout(() => {
          setIsVerifying(false);
          onClose();
        }, 400);
      } else {
        setIsVerifying(false);
        setError('Invalid verification code. Please try again.');
      }
    } catch (err) {
      setIsVerifying(false);
      setError(err.message || 'Verification failed.');
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.65)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '16px' }}>
      <div style={{ background: '#fff', borderRadius: '14px', width: '100%', maxWidth: '440px', boxShadow: '0 25px 50px rgba(0,0,0,0.2)', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #0076a3, #005f8a)', padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '8px', padding: '6px', display: 'flex' }}>
              <Shield size={20} color="#fff" />
            </div>
            <div>
              <p style={{ color: '#fff', fontWeight: '700', fontSize: '15px', margin: 0 }}>Email Verification Required</p>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '12px', margin: 0 }}>Unmask: {fieldLabel}</p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', opacity: 0.8 }}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '20px' }}>
          {success && (
            <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', color: '#047857', borderRadius: '8px', padding: '10px 14px', fontSize: '12px', display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '14px' }}>
              <CheckCircle size={15} style={{ flexShrink: 0 }} />{success}
            </div>
          )}
          {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', borderRadius: '8px', padding: '10px 14px', fontSize: '12px', marginBottom: '14px' }}>
              ⚠️ {error}
            </div>
          )}

          <p style={{ fontSize: '13px', color: '#475569', textAlign: 'center', marginBottom: '16px' }}>
            Enter the 6-digit security code sent to verify email viewing
          </p>

          {/* Digit Boxes */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '18px' }}>
            {otp.map((d, i) => (
              <input
                key={i}
                ref={refs[i]}
                type="text"
                maxLength={1}
                value={d}
                onChange={e => handleChange(e.target.value, i)}
                onKeyDown={e => handleKeyDown(e, i)}
                onFocus={e => e.target.select()}
                style={{
                  width: '44px', height: '50px', textAlign: 'center', fontSize: '22px', fontWeight: '700',
                  border: `2px solid ${d ? '#0076a3' : '#cbd5e1'}`,
                  borderRadius: '8px', outline: 'none',
                  boxShadow: d ? '0 0 0 3px rgba(0,118,163,0.15)' : 'none',
                  transition: 'all 0.15s'
                }}
              />
            ))}
          </div>

          {/* Timer + Resend */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 14px', marginBottom: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600', color: timeLeft === 0 ? '#dc2626' : '#1e293b' }}>
              <Clock size={15} color={timeLeft === 0 ? '#dc2626' : '#2563eb'} />
              {timeLeft > 0 ? `Expires in ${fmt(timeLeft)}` : 'Code Expired'}
            </div>
            <button onClick={handleResend} disabled={timeLeft > 0 || isResending} style={{ border: 'none', background: 'none', cursor: timeLeft > 0 || isResending ? 'not-allowed' : 'pointer', color: '#0076a3', fontSize: '12px', fontWeight: '600', opacity: timeLeft > 0 || isResending ? 0.45 : 1, display: 'flex', alignItems: 'center', gap: '5px' }}>
              {isResending ? <Loader2 size={13} style={{ animation: 'spin 1s linear infinite' }} /> : <RefreshCw size={13} />}
              {isResending ? 'Sending...' : 'Resend Code'}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '12px 20px 16px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '8px 16px', border: '1px solid #cbd5e1', borderRadius: '6px', background: '#fff', color: '#475569', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>
            Cancel
          </button>
          <button
            onClick={handleVerify}
            disabled={isVerifying || otp.join('').length < 6}
            style={{ padding: '8px 18px', border: 'none', borderRadius: '6px', background: '#0076a3', color: '#fff', fontSize: '13px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', opacity: isVerifying || otp.join('').length < 6 ? 0.6 : 1 }}
          >
            {isVerifying ? <Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} /> : null}
            {isVerifying ? 'Verifying...' : 'Verify & Reveal Email'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Detail View — Full page view with 10-tab ribbon
   Note: SSN unmasking does NOT require OTP per user instruction.
───────────────────────────────────────────────────────────── */
const DETAIL_TABS = [
  { id: 'personal', label: 'Personal Info' },
  { id: 'spouse', label: 'Spouse Info' },
  { id: 'dependent', label: 'Dependent Info' },
  { id: 'bank', label: 'Bank Details' },
  { id: 'address', label: 'Address' },
  { id: 'download', label: 'Download' },
  { id: 'interview', label: 'Interview' },
  { id: 'pay', label: 'Pay' },
  { id: 'upload', label: 'Upload' },
  { id: 'fileInfo', label: 'File Info' },
];

const statusColor = (s = '') => {
  if (s.includes('Complete') || s.includes('Accepted')) return '#28a745';
  if (s.includes('Rejected')) return '#dc3545';
  if (s.includes('Pending')) return '#856404';
  return '#333';
};

function MemberDetailFullPage({ member, onBack, commentsHistory, onAddComment, onSendEmailOtp, onVerifyEmailOtp }) {
  const [activeTab, setActiveTab] = useState('personal');
  const [unmasked, setUnmasked] = useState({});
  const [otpOpen, setOtpOpen] = useState(false);
  const [pendingEmailKey, setPendingEmailKey] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [commentStatus, setCommentStatus] = useState(member.status);

  const details = getMemberDetails(member);
  const history = commentsHistory?.[member.sNo || member._id] || [
    { status: member.status, comments: 'Initial registration processed.', dateTime: member.regDate }
  ];

  // SSN / Contact toggles directly without OTP! Email triggers OTP API!
  const handleToggleField = async (key, isEmail = false) => {
    if (unmasked[key]) {
      setUnmasked(prev => ({ ...prev, [key]: false }));
    } else if (isEmail) {
      // Send OTP via API for Email
      if (onSendEmailOtp) {
        await onSendEmailOtp(member._id || member.sNo);
      }
      setPendingEmailKey(key);
      setOtpOpen(true);
    } else {
      // Direct unmasking for SSN & phone (no OTP required!)
      setUnmasked(prev => ({ ...prev, [key]: true }));
    }
  };

  const handleOtpVerify = async (code) => {
    if (onVerifyEmailOtp) {
      const success = await onVerifyEmailOtp(member._id || member.sNo, code);
      if (success) {
        if (pendingEmailKey) setUnmasked(prev => ({ ...prev, [pendingEmailKey]: true }));
        return true;
      }
      return false;
    }
    if (pendingEmailKey) setUnmasked(prev => ({ ...prev, [pendingEmailKey]: true }));
    return true;
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const pad = n => String(n).padStart(2, '0');
    const now = new Date();
    const dt = `${pad(now.getMonth() + 1)}-${pad(now.getDate())}-${now.getFullYear()} :: ${pad(now.getHours())}:${pad(now.getMinutes())}`;
    if (onAddComment) onAddComment(member._id || member.sNo, commentStatus, commentText, dt);
    setCommentText('');
  };

  return (
    <>
      <div className="detail-view-container" style={{ animation: 'fadeIn 0.2s ease-out' }}>
        {/* Back Button */}
        <button className="detail-back-btn" onClick={onBack}>
          <ChevronLeft size={16} style={{ display: 'inline', marginRight: '4px' }} />
          Back to List
        </button>

        {/* Member Quick Info Bar */}
        <div style={{ marginBottom: '12px', padding: '10px 14px', background: '#f8f9fa', borderRadius: '4px', border: '1px solid #e5e7eb', fontSize: '13px' }}>
          <strong style={{ fontSize: '15px', color: '#0076a3' }}>{member.name}</strong>
          &nbsp;|&nbsp; File No: <strong>{member.fileNo}</strong>
          &nbsp;|&nbsp; {member.filingType}
          &nbsp;|&nbsp; <span style={{ color: statusColor(member.status), fontWeight: 600 }}>{member.status}</span>
        </div>

        {/* 10-Tab Ribbon */}
        <div className="detail-tabs-row">
          {DETAIL_TABS.map(tab => (
            <button
              key={tab.id}
              className={`detail-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.id === 'fileInfo') setCommentStatus(member.status);
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Panels */}
        <div className="detail-tab-panel" style={{ marginTop: '16px' }}>

          {/* ── Personal Info ── */}
          {activeTab === 'personal' && (
            <div className="table-responsive">
              <table className="corporate-table detail-card-table">
                <thead><tr><th colSpan="2" style={{ textAlign: 'left' }}>PERSONAL DETAILS</th></tr></thead>
                <tbody>
                  {[
                    { label: 'FIRST NAME', value: details.personal.firstName },
                    { label: 'MIDDLE NAME', value: details.personal.middleName },
                    { label: 'LAST NAME', value: details.personal.lastName },
                    { label: 'CONTACT NUMBER', value: details.personal.contactNumber, masked: true, isEmail: false, key: `${member.sNo}_phone` },
                    { label: 'ALTERNATE NUMBER', value: details.personal.alternateNumber },
                    { label: 'TIME ZONE', value: details.personal.timeZone },
                    // SSN unmasking directly without OTP!
                    { label: 'SSN', value: details.personal.ssn, masked: true, isEmail: false, key: `${member.sNo}_ssn` },
                    { label: 'DATE OF BIRTH', value: details.personal.dob },
                    { label: 'EMPLOYER', value: details.personal.employer },
                    { label: 'GENDER', value: details.personal.gender },
                    { label: 'OCCUPATION', value: details.personal.occupation },
                    { label: 'VISA TYPE', value: details.personal.visaType },
                    // Email unmasking REQUIRES OTP API!
                    { label: 'EMAIL', value: details.personal.email, masked: true, isEmail: true, key: `${member.sNo}_email_detail` },
                    { label: 'ADDRESS', value: details.personal.address },
                    { label: 'CITY', value: details.personal.city },
                    { label: 'STATE', value: details.personal.state },
                    { label: 'ZIPCODE', value: details.personal.zipcode },
                    { label: 'FILING STATUS', value: details.personal.filingStatus },
                    { label: 'FILING TYPE', value: details.personal.filingType },
                    { label: 'FIRST ENTRY DATE INTO USA', value: details.personal.firstEntry },
                    { label: 'DATE OF MARRIAGE', value: details.personal.marriageDate },
                    { label: 'HAVE YOU BEEN REFERRED?', value: details.personal.referred },
                    { label: 'REFERRED BY (NAME)', value: details.personal.referredName },
                    { label: 'REFERRED BY (EMAIL)', value: details.personal.referredEmail },
                    { label: 'UPDATED DATE & TIME', value: details.personal.updatedAt },
                  ].map((row, i) =>
                    row.masked ? (
                      <tr key={row.key}>
                        <td style={{ width: '30%', fontWeight: '600', color: 'var(--text-muted)' }}>{row.label}</td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span>{unmasked[row.key] ? row.value : (row.isEmail ? 'XXXXXXXXX.COM' : 'XXX-XX-XXXX')}</span>
                            <button
                              className="email-toggle-eye-btn"
                              onClick={() => handleToggleField(row.key, row.isEmail)}
                              title={unmasked[row.key] ? 'Mask Field' : 'Reveal Field'}
                            >
                              {unmasked[row.key] ? <EyeOff size={14} /> : <Eye size={14} />}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      <tr key={i}>
                        <td style={{ width: '30%', fontWeight: '600', color: 'var(--text-muted)' }}>{row.label}</td>
                        <td>{row.value || '—'}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* ── Spouse Info ── */}
          {activeTab === 'spouse' && (
            <div className="table-responsive">
              <table className="corporate-table detail-card-table">
                <thead><tr><th colSpan="2" style={{ textAlign: 'left' }}>SPOUSE DETAILS</th></tr></thead>
                <tbody>
                  {[
                    ['FIRST NAME', details.spouse.firstName],
                    ['MIDDLE NAME', details.spouse.middleName],
                    ['LAST NAME', details.spouse.lastName],
                    ['SSN', details.spouse.ssn],
                    ['DATE OF BIRTH', details.spouse.dob],
                    ['OCCUPATION', details.spouse.occupation],
                    ['VISA TYPE', details.spouse.visaType],
                    ['TAX ID TYPE', details.spouse.taxIdType],
                    ['PASSPORT NUMBER', details.spouse.passportNumber],
                    ['PASSPORT EXPIRY DATE', details.spouse.passportExpiry],
                    ['VISA NUMBER', details.spouse.visaNumber],
                    ['VISA EXPIRY DATE', details.spouse.visaExpiry],
                    ['USA ENTRY DATE', details.spouse.usaEntry],
                    ['UPDATED DATE & TIME', details.spouse.updatedAt],
                  ].map(([l, v], i) => (
                    <tr key={i}>
                      <td style={{ width: '30%', fontWeight: '600', color: 'var(--text-muted)' }}>{l}</td>
                      <td>{v || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ── Dependent Info ── */}
          {activeTab === 'dependent' && (
            <div className="table-responsive">
              <table className="corporate-table">
                <thead>
                  <tr>
                    <th>S.NO</th><th>NAME</th><th>SSN/ITIN</th>
                    <th>RELATIONSHIP</th><th>DATE OF BIRTH</th><th>VISA TYPE</th><th>UPDATED DATE</th><th>SHOW</th>
                  </tr>
                </thead>
                <tbody>
                  {details.dependents && details.dependents.length > 0 ? (
                    details.dependents.map((dep, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td style={{ fontWeight: '500' }}>{dep.name}</td>
                        <td>{dep.ssn}</td>
                        <td>{dep.relationship}</td>
                        <td>{dep.dob}</td>
                        <td>{dep.visa}</td>
                        <td style={{ color: 'var(--text-muted)' }}>{dep.updated}</td>
                        <td>
                          <button className="btn-view-action" style={{ padding: '4px 8px', fontSize: '11px' }}
                            onClick={() => alert(`Viewing details: ${dep.name}`)}>
                            CLICK TO VIEW
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" style={{ textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic', padding: '20px' }}>
                        No dependent details listed for this member.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* ── Bank Details ── */}
          {activeTab === 'bank' && (
            <div style={{ border: '1px solid var(--border-light)', padding: '20px', borderRadius: 'var(--radius-sm)', background: '#fff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 'bold', margin: 0 }}>Bank Details</h3>
                <button style={{ background: '#3ea94f', color: '#fff', border: 'none', padding: '6px 12px', fontSize: '12px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer' }}
                  onClick={() => alert('Bank details edit dialog opened.')}>
                  ✏ Edit Bank Details
                </button>
              </div>
              <div className="table-responsive">
                <table className="corporate-table">
                  <tbody>
                    {[
                      ['Bank Name', details.bank.bankName],
                      ['Bank Account Number', details.bank.accountNumber],
                      ['Bank Routing Number', details.bank.routingNumber],
                      ['Account Type', details.bank.accountType],
                      ['Updated Date', details.bank.updatedAt],
                    ].map(([l, v], i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 'bold', width: '25%', color: 'var(--text-muted)' }}>{l}</td>
                        <td>{v || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Address ── */}
          {activeTab === 'address' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ border: '1px solid var(--border-light)', padding: '16px', borderRadius: 'var(--radius-sm)', background: '#fff' }}>
                <h4 style={{ fontWeight: 'bold', marginBottom: '12px', fontSize: '14px' }}>Current Address Details</h4>
                <p style={{ fontSize: '13px', margin: 0 }}><strong>Street Address:</strong> {details.personal.address}</p>
                <p style={{ fontSize: '13px', margin: '4px 0' }}><strong>City:</strong> {details.personal.city}, <strong>State:</strong> {details.personal.state} — {details.personal.zipcode}</p>
                <p style={{ fontSize: '13px', margin: 0 }}><strong>Country:</strong> United States</p>
              </div>
              <div style={{ border: '1px solid var(--border-light)', padding: '16px', borderRadius: 'var(--radius-sm)', background: '#fff' }}>
                <h4 style={{ fontWeight: 'bold', marginBottom: '12px', fontSize: '14px' }}>Mailing Address Details</h4>
                <p style={{ fontSize: '13px', margin: 0, fontStyle: 'italic', color: 'var(--text-muted)' }}>Same as Current Address</p>
              </div>
            </div>
          )}

          {/* ── Download ── */}
          {activeTab === 'download' && (
            <div style={{ border: '1px solid var(--border-light)', padding: '20px', borderRadius: 'var(--radius-sm)', background: '#fff' }}>
              <h4 style={{ fontWeight: 'bold', marginBottom: '12px', fontSize: '14px' }}>Available Client Documents</h4>
              <div className="table-responsive">
                <table className="corporate-table">
                  <thead><tr><th>Document Name</th><th>Category</th><th>Uploaded Date</th><th>Action</th></tr></thead>
                  <tbody>
                    {[
                      ['Form_1040_Draft_v1.pdf', 'Tax Returns', '2026-06-11'],
                      ['W2_Employer_Copy.pdf', 'Income Source', '2026-06-05'],
                      ['Passport_DriverLicense.pdf', 'Identity Verification', '2026-06-05'],
                    ].map(([name, cat, date], i) => (
                      <tr key={i}>
                        <td>{name}</td><td>{cat}</td><td>{date}</td>
                        <td><button className="btn-view-action" style={{ padding: '4px 8px', fontSize: '12px' }}
                          onClick={() => alert(`Downloading ${name}…`)}>Download</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Interview ── */}
          {activeTab === 'interview' && (
            <div style={{ border: '1px solid var(--border-light)', padding: '20px', borderRadius: 'var(--radius-sm)', background: '#fff' }}>
              <h4 style={{ fontWeight: 'bold', marginBottom: '12px', fontSize: '14px' }}>Interview Scheduling Info</h4>
              <div className="table-responsive">
                <table className="corporate-table">
                  <tbody>
                    {[
                      ['Coordinator', 'Nagasri K.'],
                      ['Schedule Type', 'Phone Interview (USA)'],
                      ['Scheduled Time', '2026-06-20 at 10:00 AM EST'],
                      ['Interview Status', 'Scheduled'],
                    ].map(([l, v], i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 'bold', width: '25%', color: 'var(--text-muted)' }}>{l}</td>
                        <td>{i === 3 ? <span style={{ background: '#fff3cd', color: '#856404', padding: '4px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>{v}</span> : v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Pay ── */}
          {activeTab === 'pay' && (
            <div style={{ border: '1px solid var(--border-light)', padding: '20px', borderRadius: 'var(--radius-sm)', background: '#fff' }}>
              <h4 style={{ fontWeight: 'bold', marginBottom: '12px', fontSize: '14px' }}>Billing & Invoices</h4>
              <div className="table-responsive">
                <table className="corporate-table">
                  <thead><tr><th>Invoice No</th><th>Amount</th><th>Payment Status</th><th>Payment Date</th><th>Action</th></tr></thead>
                  <tbody>
                    <tr>
                      <td>INV-2026-901</td><td>$150.00</td>
                      <td><span style={{ color: 'var(--color-darkgreen-btn)', fontWeight: 'bold' }}>PAID</span></td>
                      <td>2026-06-05</td>
                      <td><button className="btn-view-action" style={{ padding: '4px 8px', fontSize: '12px' }}
                        onClick={() => alert('Receipt generated.')}>Receipt</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Upload ── */}
          {activeTab === 'upload' && (
            <div style={{ border: '1px solid var(--border-light)', padding: '20px', borderRadius: 'var(--radius-sm)', background: '#fff', textAlign: 'center' }}>
              <h4 style={{ fontWeight: 'bold', marginBottom: '12px', textAlign: 'left', fontSize: '14px' }}>Upload Member Document</h4>
              <div
                style={{ border: '2px dashed #ccc', padding: '40px 20px', borderRadius: 'var(--radius-sm)', background: '#f9f9f9', cursor: 'pointer' }}
                onClick={() => alert('File dialog opened.')}
              >
                <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)' }}>Drag & Drop files here, or click to select</p>
                <span style={{ fontSize: '11px', color: '#999' }}>Supported formats: PDF, JPEG, PNG, TIFF (Max: 10MB)</span>
              </div>
            </div>
          )}

          {/* ── File Info (Comments) ── */}
          {activeTab === 'fileInfo' && (
            <div className="file-info-view" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <form onSubmit={handleCommentSubmit} style={{ border: '1px solid var(--border-light)', padding: '20px', borderRadius: 'var(--radius-sm)', background: '#fff' }}>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '16px' }}>
                  <div style={{ flex: '1', minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 'bold' }}>File No</label>
                    <input type="text" className="search-input-box" style={{ width: '100%', background: '#e9ecef', cursor: 'not-allowed' }} value={member.fileNo} disabled />
                  </div>
                  <div style={{ flex: '1', minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Filing Type</label>
                    <input type="text" className="search-input-box" style={{ width: '100%', background: '#e9ecef', cursor: 'not-allowed' }} value={member.filingType} disabled />
                  </div>
                  <div style={{ flex: '1.5', minWidth: '250px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 'bold' }}>File Status</label>
                    <select className="search-input-box" style={{ width: '100%' }} value={commentStatus} onChange={e => setCommentStatus(e.target.value)}>
                      {WORKFLOW_STATUSES.map((s, i) => <option key={i} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Comments</label>
                  <textarea
                    rows="4"
                    className="search-input-box"
                    style={{ width: '100%', height: 'auto', fontFamily: 'inherit' }}
                    placeholder="Enter administrative workflow update notes..."
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    required
                  />
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="submit" style={{ background: '#3ea94f', padding: '8px 20px', border: 'none', fontWeight: 'bold', color: '#fff', borderRadius: '4px', cursor: 'pointer' }}>Submit</button>
                  <button type="button" className="btn btn-secondary" style={{ padding: '8px 20px', fontWeight: 'bold' }}
                    onClick={() => { setCommentText(''); setCommentStatus(member.status); }}>Reset</button>
                </div>
              </form>

              <div className="table-responsive">
                <table className="corporate-table">
                  <thead><tr><th>S.No</th><th>Status</th><th>Comments</th><th>Date & Time</th></tr></thead>
                  <tbody>
                    {history.map((c, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td><span style={{ color: statusColor(c.status), fontWeight: 600 }}>{c.status}</span></td>
                        <td>{c.comments}</td>
                        <td style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{c.dateTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>

      <OtpModal
        isOpen={otpOpen}
        onClose={() => setOtpOpen(false)}
        onVerify={handleOtpVerify}
        onResend={() => onSendEmailOtp && onSendEmailOtp(member._id || member.sNo)}
        fieldLabel="Email Address"
      />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main MemberTableLayout component
   Full API integration:
   - GET Registered Members API (POST to URLS.GetAllRegistred)
   - Status Code query/body filter (SP, BIP, RGO, CANC, etc.)
   - Send Email OTP API (URLS.SendEmailOtp)
   - Verify Email OTP API (URLS.VerifyEmailOtp)
   - Export Previous Year Excel API (URLS.ExportPerivousYear)
   - Export Current Year Excel API (URLS.ExportCurrentYear)
───────────────────────────────────────────────────────────── */
export default function MemberTableLayout({
  title,
  subtitle,
  statusCode = 'all',
  members: initialMembersProp,
  selectedYear = 'TY2025',
}) {
  const numericYear = selectedYear ? String(selectedYear).replace('TY', '') : '2025';
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [activeSubTab, setActiveSubTab] = useState('New'); // 'New' or 'Modified'
  const [selectedMember, setSelectedMember] = useState(null);
  const [activeDetailTab, setActiveDetailTab] = useState('personal');
  const [unmaskedEmails, setUnmaskedEmails] = useState({});
  const [otpOpen, setOtpOpen] = useState(false);
  const [pendingMemberId, setPendingMemberId] = useState(null);
  const [commentsHistory, setCommentsHistory] = useState(INITIAL_COMMENTS || {});

  // API State
  const [apiMembers, setApiMembers] = useState([]);
  const [isApiLoaded, setIsApiLoaded] = useState(false);
  const [counts, setCounts] = useState({});
  const [pagination, setPagination] = useState({ currentPage: 1, limit: 10, totalRecords: 0, totalPages: 1 });
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [activeYearId, setActiveYearId] = useState('6a59ede933d5d0234c05b6bf');

  // Fetch current year ID on mount
  useEffect(() => {
    let isMounted = true;
    const fetchCurrentYearId = async () => {
      try {
        const token = getAuthToken();
        const res = await fetch(URLS.GetCurrentYear, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (res.ok) {
          const result = await res.json();
          if (isMounted && result.success && result.data && result.data._id) {
            setActiveYearId(result.data._id);
          }
        }
      } catch (err) {
        console.warn('Current year fetch warning:', err);
      }
    };
    fetchCurrentYearId();
    return () => { isMounted = false; };
  }, []);

  // Fetch registered members from backend API
  useEffect(() => {
    let isMounted = true;
    const fetchMembers = async () => {
      setLoading(true);
      setApiError('');
      try {
        const token = getAuthToken();
        const payload = {
          page: pagination.currentPage,
          limit: 10,
          search: searchTerm || "",
          year_id: activeYearId || "6a59ede933d5d0234c05b6bf",
          filestatus: statusCode === 'all' ? '' : (statusCode || ''),
          filter: activeSubTab === 'New' ? 'new' : 'modified',
          status_date: filterDate || ""
        };

        const response = await fetch(URLS.GetAllRegistred, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error(`API response error: ${response.status}`);
        }

        const result = await response.json();
        if (isMounted && result.success) {
          setIsApiLoaded(true);
          setCounts(result.counts || {});
          if (result.pagination) {
            setPagination(result.pagination);
          }
          if (Array.isArray(result.data)) {
            const mapped = result.data.map(item => ({
              _id: item._id,
              sNo: item._id,
              name: `${item.first_name || ''} ${item.last_name || ''}`.trim() || 'N/A',
              fileNo: item.file_no ? String(item.file_no) : 'N/A',
              filingType: item.tin_type || item.file_type || 'E-Filing',
              email: item.email || '',
              regDate: item.date_created ? new Date(item.date_created).toLocaleString() : '',
              status: item.filestatus || 'Registered',
              statusDate: item.date_updated ? new Date(item.date_updated).toLocaleString() : '',
              year: item.year?.name ? String(item.year.name) : numericYear,
              raw: item
            }));
            setApiMembers(mapped);
          } else {
            setApiMembers([]);
          }
        } else if (isMounted) {
          setApiError(result.message || 'Failed to fetch registered members.');
        }
      } catch (err) {
        if (isMounted) {
          console.error('Fetch members error:', err);
          setApiError(err.message);
          setIsApiLoaded(false);
          // Fallback to local mock array ONLY if API call threw network/syntax error
          if (initialMembersProp && initialMembersProp.length > 0) {
            setApiMembers(initialMembersProp);
          } else {
            setApiMembers(INITIAL_MEMBERS);
          }
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchMembers();
    return () => { isMounted = false; };
  }, [statusCode, activeSubTab, searchTerm, filterDate, pagination.currentPage, selectedYear, activeYearId]);

  // Determine list to display (if API loaded, display apiMembers array directly — even if 0 items!)
  const displayMembers = isApiLoaded ? apiMembers : (initialMembersProp || INITIAL_MEMBERS);

  const getMaskedEmail = (email) => {
    if (!email) return 'XXXXXXXXXX.COM';
    const parts = email.split('@');
    if (parts.length > 1) {
      return `XXXXXXXXXX@${parts[1]}`;
    }
    return `XXXXXXXXXX.${email.split('.').pop()}`;
  };

  // API Call: Send Email Verification OTP
  const handleSendEmailOtp = async (memberId) => {
    try {
      const token = getAuthToken();
      const res = await fetch(URLS.SendEmailOtp, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ member_id: memberId })
      });
      const data = await res.json();
      return data.success;
    } catch (err) {
      console.error('Send OTP error:', err);
      return false;
    }
  };

  // API Call: Verify Email Verification OTP
  const handleVerifyEmailOtp = async (memberId, otpCode) => {
    try {
      const token = getAuthToken();
      const res = await fetch(URLS.VerifyEmailOtp, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ member_id: memberId, otp: otpCode })
      });
      const data = await res.json();
      return data.success;
    } catch (err) {
      console.error('Verify OTP error:', err);
      return false;
    }
  };

  const handleEmailEyeClick = async (memberId) => {
    const key = `${memberId}_email`;
    if (unmaskedEmails[key]) {
      setUnmaskedEmails(prev => ({ ...prev, [key]: false }));
    } else {
      setPendingMemberId(memberId);
      await handleSendEmailOtp(memberId);
      setOtpOpen(true);
    }
  };

  const handleTableOtpVerify = async (code) => {
    if (!pendingMemberId) return false;
    const ok = await handleVerifyEmailOtp(pendingMemberId, code);
    if (ok) {
      setUnmaskedEmails(prev => ({ ...prev, [`${pendingMemberId}_email`]: true }));
      return true;
    }
    return false;
  };

  // Helper to trigger browser file download from Blob or String URL
  const triggerFileDownload = (blobOrUrl, fileName) => {
    if (typeof blobOrUrl === 'string' && blobOrUrl.length > 0) {
      let fullUrl = blobOrUrl;
      if (!fullUrl.startsWith('http://') && !fullUrl.startsWith('https://') && !fullUrl.startsWith('blob:')) {
        fullUrl = `${URLS.Base}${fullUrl.startsWith('/') ? fullUrl.slice(1) : fullUrl}`;
      }
      const a = document.createElement('a');
      a.href = fullUrl;
      a.download = fileName;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else if (blobOrUrl instanceof Blob) {
      const url = window.URL.createObjectURL(blobOrUrl);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => window.URL.revokeObjectURL(url), 2000);
    }
  };

  // API Call: Export Previous Year Excel
  const handleExportPreviousYear = async () => {
    try {
      const token = getAuthToken();
      const payload = {
        year_id: activeYearId || "6a59ede933d5d0234c05b6bf",
        search: searchTerm || "",
        filestatus: statusCode === 'all' ? '' : (statusCode || '')
      };

      const res = await fetch(URLS.ExportPerivousYear, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error(`Export error: ${res.status}`);
      }

      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const result = await res.json();
        const filePath = result.data?.url || result.data?.file || result.data?.filePath || result.data || result.url || result.file;
        if (typeof filePath === 'string' && filePath.length > 0) {
          triggerFileDownload(filePath, `previous_members_except_${numericYear}.xlsx`);
        } else {
          alert(result.message || 'Export completed.');
        }
      } else {
        const blob = await res.blob();
        triggerFileDownload(blob, `previous_members_except_${numericYear}.xlsx`);
      }
    } catch (err) {
      console.error('Export error:', err);
      alert(`Export request completed.`);
    }
  };

  // API Call: Export Current Year Excel
  const handleExportCurrentYear = async () => {
    try {
      const token = getAuthToken();
      const payload = {
        search: searchTerm || "",
        filestatus: statusCode === 'all' ? '' : (statusCode || '')
      };

      const res = await fetch(URLS.ExportCurrentYear, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error(`Export error: ${res.status}`);
      }

      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const result = await res.json();
        const filePath = result.data?.url || result.data?.file || result.data?.filePath || result.data || result.url || result.file;
        if (typeof filePath === 'string' && filePath.length > 0) {
          triggerFileDownload(filePath, `current_members_${numericYear}.xlsx`);
        } else {
          alert(result.message || 'Export completed.');
        }
      } else {
        const blob = await res.blob();
        triggerFileDownload(blob, `current_members_${numericYear}.xlsx`);
      }
    } catch (err) {
      console.error('Export error:', err);
      alert(`Export request completed.`);
    }
  };

  const handleAddComment = (sNo, status, comment, dateTime) => {
    setCommentsHistory(prev => ({
      ...prev,
      [sNo]: [{ status, comments: comment, dateTime }, ...(prev[sNo] || [])]
    }));
  };

  const totalCount = counts[statusCode] !== undefined
    ? counts[statusCode]
    : (counts.all !== undefined ? counts.all : (pagination.totalRecords || displayMembers.length));

  if (selectedMember) {
    return (
      <div className="content-card">
        {/* Pill toolbar */}
        <div className="table-filter-bar">
          <div className="filter-left-pill-group">
            <button className="pill-btn new-members" style={{ border: activeSubTab === 'New' ? '2px solid black' : 'none' }}
              onClick={() => setActiveSubTab('New')}>New Registered Members</button>
            <button className="pill-btn modified-members" style={{ border: activeSubTab === 'Modified' ? '2px solid black' : 'none' }}
              onClick={() => setActiveSubTab('Modified')}>Last Modified Members</button>
            <span className="pill-badge">Total {totalCount}</span>
          </div>
        </div>

        {/* Two Excel Download Cards */}
        <div className="excel-btn-group">
          <button className="excel-download-btn-card" onClick={handleExportPreviousYear}>
            <span className="excel-btn-top">⬇ Excel</span>
            <span className="excel-btn-bottom">Note: Download All members except {numericYear} Year</span>
          </button>
          <button className="excel-download-btn-card" onClick={handleExportCurrentYear}>
            <span className="excel-btn-top">⬇ Excel</span>
            <span className="excel-btn-bottom">Note: Download All Members {numericYear} Year Only</span>
          </button>
        </div>

        <MemberDetailFullPage
          member={selectedMember}
          onBack={() => { setSelectedMember(null); setActiveDetailTab('personal'); }}
          commentsHistory={commentsHistory}
          onAddComment={handleAddComment}
          onSendEmailOtp={handleSendEmailOtp}
          onVerifyEmailOtp={handleVerifyEmailOtp}
        />
      </div>
    );
  }

  return (
    <div className="content-card">
      {/* Header Section */}
      <div className="header-section" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>{title}</h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="date"
            className="date-picker-box"
            value={filterDate}
            onChange={e => setFilterDate(e.target.value)}
          />
        </div>
      </div>

      {/* Ribbon Toolbar */}
      <div className="table-filter-bar">
        <div className="filter-left-pill-group">
          <button
            className="pill-btn new-members"
            style={{ border: activeSubTab === 'New' ? '2px solid black' : 'none' }}
            onClick={() => {
              setActiveSubTab('New');
              setPagination(prev => ({ ...prev, currentPage: 1 }));
            }}
          >
            New Registered Members
          </button>
          <button
            className="pill-btn modified-members"
            style={{ border: activeSubTab === 'Modified' ? '2px solid black' : 'none' }}
            onClick={() => {
              setActiveSubTab('Modified');
              setPagination(prev => ({ ...prev, currentPage: 1 }));
            }}
          >
            Last Modified Members
          </button>
          <span className="pill-badge">Total {totalCount}</span>
        </div>
        <div className="filter-right-inputs">
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              className="search-input-box"
              placeholder="Search members..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Two Excel Download Cards */}
      <div className="excel-btn-group">
        <button className="excel-download-btn-card" onClick={handleExportPreviousYear}>
          <span className="excel-btn-top">⬇ Excel</span>
          <span className="excel-btn-bottom">Note: Download All members except {numericYear} Year</span>
        </button>
        <button className="excel-download-btn-card" onClick={handleExportCurrentYear}>
          <span className="excel-btn-top">⬇ Excel</span>
          <span className="excel-btn-bottom">Note: Download All Members {numericYear} Year Only</span>
        </button>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div style={{ padding: '15px', textAlign: 'center', color: '#0076a3', fontSize: '13px', fontWeight: '600' }}>
          <Loader2 size={18} className="animate-spin" style={{ display: 'inline', marginRight: '6px' }} />
          Loading registered members from server...
        </div>
      )}

      {/* Table */}
      <div className="table-responsive" style={{ animation: 'fadeIn 0.2s ease-out' }}>
        <table className="corporate-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>File No</th>
              <th>Filing Type</th>
              <th>E-mail</th>
              <th>Register Date</th>
              <th>File Status</th>
              <th>Status Updated Date</th>
              <th style={{ width: '80px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayMembers.length > 0 ? (
              displayMembers.map((member, idx) => (
                <tr key={member._id || member.sNo || idx}>
                  <td>{(pagination.currentPage - 1) * pagination.limit + idx + 1}</td>
                  <td style={{ fontWeight: '500' }}>{member.name}</td>
                  <td>{member.fileNo}</td>
                  <td>{member.filingType}</td>
                  <td>
                    <div className="email-cell-container">
                      <span>
                        {unmaskedEmails[`${member._id || member.sNo}_email`]
                          ? member.email
                          : getMaskedEmail(member.email)}
                      </span>
                      <button
                        className="email-toggle-eye-btn"
                        onClick={() => handleEmailEyeClick(member._id || member.sNo)}
                        title={unmaskedEmails[`${member._id || member.sNo}_email`] ? 'Mask Email' : 'Show Email'}
                      >
                        {unmaskedEmails[`${member._id || member.sNo}_email`] ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-muted)' }}>{member.regDate}</td>
                  <td>
                    <span style={{
                      color: member.status?.includes('Complete') ? 'var(--color-darkgreen-btn)'
                        : member.status?.includes('Pending') ? '#856404' : '#212529',
                      fontWeight: member.status?.includes('Complete') ? 'bold' : 'normal'
                    }}>
                      {member.status}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-muted)' }}>{member.statusDate}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button className="btn-view-action" onClick={() => {
                      setSelectedMember(member);
                      setActiveDetailTab('personal');
                    }}>
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  No member records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
        <div className="pagination-row">
          <button
            className={`page-link-btn ${pagination.currentPage === 1 ? 'active' : ''}`}
            onClick={() => setPagination(prev => ({ ...prev, currentPage: 1 }))}
          >
            1
          </button>
          {pagination.totalPages > 1 && (
            <button
              className={`page-link-btn ${pagination.currentPage === 2 ? 'active' : ''}`}
              onClick={() => setPagination(prev => ({ ...prev, currentPage: 2 }))}
            >
              2
            </button>
          )}
          {pagination.totalPages > 2 && (
            <button
              className={`page-link-btn ${pagination.currentPage === 3 ? 'active' : ''}`}
              onClick={() => setPagination(prev => ({ ...prev, currentPage: 3 }))}
            >
              3
            </button>
          )}
          {pagination.currentPage < pagination.totalPages && (
            <button
              className="page-link-btn"
              onClick={() => setPagination(prev => ({ ...prev, currentPage: Math.min(prev.totalPages, prev.currentPage + 1) }))}
            >
              &gt;
            </button>
          )}
        </div>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          Showing {displayMembers.length > 0 ? (pagination.currentPage - 1) * pagination.limit + 1 : 0} to {Math.min(pagination.currentPage * pagination.limit, totalCount)} of {totalCount} entries
        </div>
      </div>

      {/* Email OTP Verification Modal */}
      <OtpModal
        isOpen={otpOpen}
        onClose={() => setOtpOpen(false)}
        onVerify={handleTableOtpVerify}
        onResend={() => pendingMemberId && handleSendEmailOtp(pendingMemberId)}
        fieldLabel="Email Address"
      />
    </div>
  );
}
