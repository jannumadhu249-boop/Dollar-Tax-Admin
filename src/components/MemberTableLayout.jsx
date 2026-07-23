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

  // Profile API State
  const [profileData, setProfileData] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchMemberProfile = async () => {
      const memberId = member._id || member.sNo;
      if (!memberId) return;
      setLoadingProfile(true);
      try {
        const token = getAuthToken();
        const res = await fetch(`${URLS.GetMemberView}${memberId}/profile`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (res.ok) {
          const result = await res.json();
          if (isMounted && result.success && result.data) {
            setProfileData(result.data);
          }
        }
      } catch (err) {
        console.warn('Member profile fetch warning:', err);
      } finally {
        if (isMounted) setLoadingProfile(false);
      }
    };
    fetchMemberProfile();
    return () => { isMounted = false; };
  }, [member]);

  const details = getMemberDetails(member);
  const history = commentsHistory?.[member.sNo || member._id] || [
    { status: member.status, comments: 'Initial registration processed.', dateTime: member.regDate }
  ];

  // SSN / Contact toggles directly without OTP! Email triggers OTP API!
  const handleToggleField = (key, isEmail = false) => {
    if (unmasked[key]) {
      setUnmasked(prev => ({ ...prev, [key]: false }));
    } else if (isEmail) {
      // Open OTP modal immediately without waiting for API call!
      setPendingEmailKey(key);
      setOtpOpen(true);
      if (onSendEmailOtp) {
        onSendEmailOtp(member._id || member.sNo);
      }
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
          <strong style={{ fontSize: '15px', color: '#0076a3' }}>
            {profileData?.header ? `${profileData.header.first_name || ''} ${profileData.header.last_name || ''}`.trim() : member.name}
          </strong>
          &nbsp;|&nbsp; File No: <strong>{profileData?.header?.file_no || member.fileNo}</strong>
          &nbsp;|&nbsp; {profileData?.header?.tin_type || profileData?.header?.file_type || member.filingType}
          &nbsp;|&nbsp; <span style={{ color: statusColor(profileData?.header?.filestatus || member.status), fontWeight: 600 }}>{profileData?.header?.filestatus || member.status}</span>
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
              {loadingProfile ? (
                <div style={{ padding: '15px', textAlign: 'center', color: '#0076a3', fontSize: '13px', fontWeight: '600' }}>
                  <Loader2 size={18} className="animate-spin" style={{ display: 'inline', marginRight: '6px' }} />
                  Loading personal details...
                </div>
              ) : (
                <>
                  {!profileData?.personalInfo && (
                    <div style={{ marginBottom: '12px', padding: '10px 14px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '4px', fontSize: '12px', color: '#1e40af' }}>
                      ℹ Showing registered member account details (Extended profile form not yet submitted by member).
                    </div>
                  )}
                  <table className="corporate-table detail-card-table">
                    <thead><tr><th colSpan="2" style={{ textAlign: 'left' }}>PERSONAL DETAILS</th></tr></thead>
                    <tbody>
                      {[
                        { label: 'FIRST NAME', value: profileData?.personalInfo?.first_name || member.raw?.first_name || member.name?.split(' ')[0] || '—' },
                        { label: 'MIDDLE NAME', value: profileData?.personalInfo?.middle_name || '—' },
                        { label: 'LAST NAME', value: profileData?.personalInfo?.last_name || member.raw?.last_name || member.name?.split(' ').slice(1).join(' ') || '—' },
                        { label: 'CONTACT NUMBER', value: profileData?.personalInfo?.contact_number || member.raw?.contact_number || '—', masked: true, isEmail: false, key: `${member._id || member.sNo}_phone` },
                        { label: 'ALTERNATE NUMBER', value: profileData?.personalInfo?.alternate_number || member.raw?.alter_number || '—' },
                        { label: 'TIME ZONE', value: profileData?.personalInfo?.timezone || member.raw?.time_zone || '—' },
                        { label: 'SSN / TIN TYPE', value: profileData?.personalInfo?.ssn_tin || member.raw?.tin_type || member.filingType || '—', masked: true, isEmail: false, key: `${member._id || member.sNo}_ssn` },
                        { label: 'DATE OF BIRTH', value: profileData?.personalInfo?.date_of_birth ? new Date(profileData.personalInfo.date_of_birth).toLocaleDateString() : '—' },
                        { label: 'OCCUPATION', value: profileData?.personalInfo?.occupation || '—' },
                        { label: 'GENDER', value: profileData?.personalInfo?.gender || '—' },
                        { label: 'VISA TYPE', value: profileData?.personalInfo?.visa_type || '—' },
                        { label: 'EMAIL', value: profileData?.personalInfo?.email || member.raw?.email || member.email || '—', masked: true, isEmail: true, key: `${member._id || member.sNo}_email_detail` },
                        { label: 'MAILING ADDRESS', value: profileData?.personalInfo?.mailing_address || '—' },
                        { label: 'CITY', value: profileData?.personalInfo?.city || '—' },
                        { label: 'STATE', value: profileData?.personalInfo?.state || '—' },
                        { label: 'ZIPCODE', value: profileData?.personalInfo?.zipcode || '—' },
                        { label: 'FILING STATUS', value: profileData?.personalInfo?.filing_status || member.raw?.filestatus || member.status || '—' },
                        { label: 'FIRST ENTRY DATE INTO USA', value: profileData?.personalInfo?.first_entry_date_into_usa ? new Date(profileData.personalInfo.first_entry_date_into_usa).toLocaleDateString() : '—' },
                        { label: 'REGISTRATION DATE', value: member.raw?.date_created ? new Date(member.raw.date_created).toLocaleString() : member.regDate || '—' },
                        { label: 'LAST UPDATED', value: member.raw?.date_updated ? new Date(member.raw.date_updated).toLocaleString() : member.statusDate || '—' },
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
                </>
              )}
            </div>
          )}

          {/* ── Spouse Info ── */}
          {activeTab === 'spouse' && (
            <div className="table-responsive">
              {loadingProfile ? (
                <div style={{ padding: '15px', textAlign: 'center', color: '#0076a3', fontSize: '13px', fontWeight: '600' }}>
                  <Loader2 size={18} className="animate-spin" style={{ display: 'inline', marginRight: '6px' }} />
                  Loading spouse details...
                </div>
              ) : profileData?.spouseInfo && Object.keys(profileData.spouseInfo).length > 0 ? (
                <table className="corporate-table detail-card-table">
                  <thead><tr><th colSpan="2" style={{ textAlign: 'left' }}>SPOUSE DETAILS</th></tr></thead>
                  <tbody>
                    {[
                      ['FIRST NAME', profileData.spouseInfo.first_name],
                      ['MIDDLE NAME', profileData.spouseInfo.middle_name],
                      ['LAST NAME', profileData.spouseInfo.last_name],
                      ['GENDER', profileData.spouseInfo.gender],
                      ['DATE OF BIRTH', profileData.spouseInfo.date_of_birth ? new Date(profileData.spouseInfo.date_of_birth).toLocaleDateString() : ''],
                      ['OCCUPATION', profileData.spouseInfo.occupation],
                      ['VISA TYPE', profileData.spouseInfo.visa_type],
                      ['TAX ID TYPE', profileData.spouseInfo.tax_id_type],
                      ['SSN / ITIN', profileData.spouseInfo.ssn_itin],
                      ['PASSPORT NUMBER', profileData.spouseInfo.passport_number],
                      ['PASSPORT EXPIRY DATE', profileData.spouseInfo.passport_expiry_date ? new Date(profileData.spouseInfo.passport_expiry_date).toLocaleDateString() : ''],
                      ['VISA NUMBER', profileData.spouseInfo.visa_number],
                      ['VISA EXPIRY DATE', profileData.spouseInfo.visa_expiry_date ? new Date(profileData.spouseInfo.visa_expiry_date).toLocaleDateString() : ''],
                      ['FIRST ENTRY DATE INTO USA', profileData.spouseInfo.first_entry_date_into_usa ? new Date(profileData.spouseInfo.first_entry_date_into_usa).toLocaleDateString() : ''],
                      ['CREATED AT', profileData.spouseInfo.createdAt ? new Date(profileData.spouseInfo.createdAt).toLocaleString() : ''],
                      ['UPDATED AT', profileData.spouseInfo.updatedAt ? new Date(profileData.spouseInfo.updatedAt).toLocaleString() : ''],
                    ].map(([l, v], i) => (
                      <tr key={i}>
                        <td style={{ width: '30%', fontWeight: '600', color: 'var(--text-muted)' }}>{l}</td>
                        <td>{v || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div style={{ padding: '24px', textAlign: 'center', color: '#64748b', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                  <p style={{ margin: 0, fontWeight: '600', fontSize: '13px' }}>No spouse details submitted yet</p>
                  <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#94a3b8' }}>Member stage: <strong>{member.status || 'Basic Information Pending'}</strong></p>
                </div>
              )}
            </div>
          )}

          {/* ── Dependent Info ── */}
          {activeTab === 'dependent' && (
            <div className="table-responsive">
              {loadingProfile ? (
                <div style={{ padding: '15px', textAlign: 'center', color: '#0076a3', fontSize: '13px', fontWeight: '600' }}>
                  <Loader2 size={18} className="animate-spin" style={{ display: 'inline', marginRight: '6px' }} />
                  Loading dependent details...
                </div>
              ) : (() => {
                const deps = Array.isArray(profileData?.dependentInfo)
                  ? profileData.dependentInfo
                  : (profileData?.dependentInfo ? [profileData.dependentInfo] : []);

                return deps.length > 0 ? (
                  <table className="corporate-table">
                    <thead>
                      <tr>
                        <th>S.NO</th>
                        <th>NAME</th>
                        <th>GENDER</th>
                        <th>RELATIONSHIP</th>
                        <th>DATE OF BIRTH</th>
                        <th>VISA TYPE</th>
                        <th>TAX ID TYPE</th>
                        <th>SSN / ITIN</th>
                        <th>PASSPORT NO</th>
                        <th>PASSPORT EXPIRY</th>
                        <th>VISA NO</th>
                        <th>VISA EXPIRY</th>
                        <th>USA ENTRY DATE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deps.map((dep, i) => (
                        <tr key={dep._id || i}>
                          <td>{i + 1}</td>
                          <td style={{ fontWeight: '600' }}>{`${dep.first_name || ''} ${dep.middle_name || ''} ${dep.last_name || ''}`.trim() || '—'}</td>
                          <td>{dep.gender || '—'}</td>
                          <td>{dep.relationship || '—'}</td>
                          <td>{dep.date_of_birth ? new Date(dep.date_of_birth).toLocaleDateString() : '—'}</td>
                          <td>{dep.visa_type || '—'}</td>
                          <td>{dep.tax_id_type || '—'}</td>
                          <td>{dep.ssn_itin || '—'}</td>
                          <td>{dep.passport_number || '—'}</td>
                          <td>{dep.passport_expiry_date ? new Date(dep.passport_expiry_date).toLocaleDateString() : '—'}</td>
                          <td>{dep.visa_number || '—'}</td>
                          <td>{dep.visa_expiry_date ? new Date(dep.visa_expiry_date).toLocaleDateString() : '—'}</td>
                          <td>{dep.first_entry_date_into_usa ? new Date(dep.first_entry_date_into_usa).toLocaleDateString() : '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div style={{ padding: '24px', textAlign: 'center', color: '#64748b', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                    <p style={{ margin: 0, fontWeight: '600', fontSize: '13px' }}>No dependent details submitted yet</p>
                    <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#94a3b8' }}>Member has not listed any dependents.</p>
                  </div>
                );
              })()}
            </div>
          )}

          {/* ── Bank Details ── */}
          {activeTab === 'bank' && (
            <div style={{ border: '1px solid var(--border-light)', padding: '20px', borderRadius: 'var(--radius-sm)', background: '#fff' }}>
              <h4 style={{ fontWeight: 'bold', marginBottom: '16px', fontSize: '14px' }}>Bank Account Details</h4>
              {loadingProfile ? (
                <div style={{ padding: '15px', textAlign: 'center', color: '#0076a3', fontSize: '13px', fontWeight: '600' }}>
                  <Loader2 size={18} className="animate-spin" style={{ display: 'inline', marginRight: '6px' }} />
                  Loading bank details...
                </div>
              ) : profileData?.bankDetails && Object.keys(profileData.bankDetails).length > 0 ? (
                <div className="table-responsive">
                  <table className="corporate-table">
                    <tbody>
                      {[
                        ['Bank Name', profileData.bankDetails.bank_name],
                        ['Account Number', profileData.bankDetails.account_number],
                        ['Routing Number', profileData.bankDetails.routing_number],
                        ['Account Type', profileData.bankDetails.account_type],
                        ['Created At', profileData.bankDetails.createdAt ? new Date(profileData.bankDetails.createdAt).toLocaleString() : ''],
                        ['Updated At', profileData.bankDetails.updatedAt ? new Date(profileData.bankDetails.updatedAt).toLocaleString() : ''],
                      ].map(([l, v], i) => (
                        <tr key={i}>
                          <td style={{ fontWeight: 'bold', width: '25%', color: 'var(--text-muted)' }}>{l}</td>
                          <td>{v || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div style={{ padding: '24px', textAlign: 'center', color: '#64748b', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                  <p style={{ margin: 0, fontWeight: '600', fontSize: '13px' }}>No bank account details submitted yet</p>
                  <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#94a3b8' }}>Bank account information will appear once filled by the member.</p>
                </div>
              )}
            </div>
          )}

          {/* ── Address ── */}
          {activeTab === 'address' && (
            <div style={{ border: '1px solid var(--border-light)', padding: '20px', borderRadius: 'var(--radius-sm)', background: '#fff' }}>
              <h4 style={{ fontWeight: 'bold', marginBottom: '16px', fontSize: '14px' }}>Member Address Records</h4>
              {loadingProfile ? (
                <div style={{ padding: '15px', textAlign: 'center', color: '#0076a3', fontSize: '13px', fontWeight: '600' }}>
                  <Loader2 size={18} className="animate-spin" style={{ display: 'inline', marginRight: '6px' }} />
                  Loading address details...
                </div>
              ) : (() => {
                const addrs = Array.isArray(profileData?.address)
                  ? profileData.address
                  : (profileData?.address ? [profileData.address] : []);

                return addrs.length > 0 ? (
                  <div className="table-responsive">
                    <table className="corporate-table">
                      <thead>
                        <tr>
                          <th>S.NO</th>
                          <th>PERSON</th>
                          <th>STATE</th>
                          <th>TAX YEAR</th>
                          <th>ADDRESS FROM</th>
                          <th>ADDRESS TO</th>
                          <th>CREATED AT</th>
                        </tr>
                      </thead>
                      <tbody>
                        {addrs.map((addr, i) => (
                          <tr key={addr._id || i}>
                            <td>{i + 1}</td>
                            <td style={{ fontWeight: '600' }}>{addr.person || 'Taxpayer'}</td>
                            <td>{addr.state?.name || '—'}</td>
                            <td>{addr.year?.name || '—'}</td>
                            <td>{addr.address_from ? new Date(addr.address_from).toLocaleDateString() : '—'}</td>
                            <td>{addr.address_to ? new Date(addr.address_to).toLocaleDateString() : '—'}</td>
                            <td style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                              {addr.createdAt ? new Date(addr.createdAt).toLocaleString() : '—'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div style={{ padding: '24px', textAlign: 'center', color: '#64748b', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                    <p style={{ margin: 0, fontWeight: '600', fontSize: '13px' }}>No address history records submitted yet</p>
                    <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#94a3b8' }}>Address details will appear once filled by the member.</p>
                  </div>
                );
              })()}
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
  selectedYear = `TY${new Date().getFullYear()}`,
}) {
  const [numericYear, setNumericYear] = useState(() => String(selectedYear).replace('TY', ''));
  // Update numericYear when selectedYear prop changes
  useEffect(() => {
    setNumericYear(String(selectedYear).replace('TY', ''));
  }, [selectedYear]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [activeSubTab, setActiveSubTab] = useState(statusCode === 'all' ? '' : 'New'); // '' (none), 'New' or 'Modified'
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

  // Fetch active year ID based on selectedYear prop (e.g. TY2025 -> 2025)
  useEffect(() => {
    let isMounted = true;
    const fetchYearId = async () => {
      try {
        const token = getAuthToken();
        const res = await fetch(URLS.GetYears, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (res.ok) {
          const result = await res.json();
          if (isMounted && result.success && Array.isArray(result.data)) {
            const found = result.data.find(y => String(y.name) === String(numericYear));
            if (found && found._id) {
              setActiveYearId(found._id);
            } else if (result.data.length > 0 && result.data[0]._id) {
              setActiveYearId(result.data[0]._id);
            }
          }
        }
      } catch (err) {
        console.warn('Year fetch warning:', err);
      }
    };
    fetchYearId();
    return () => { isMounted = false; };
  }, [selectedYear, numericYear]);

  // Fetch registered members from backend API
  useEffect(() => {
    let isMounted = true;
    const fetchMembers = async () => {
      setLoading(true);
      setApiError('');
      try {
        const token = getAuthToken();
        const filterPayload = statusCode === 'all'
          ? (activeSubTab === 'New' ? 'new' : (activeSubTab === 'Modified' ? 'modified' : ''))
          : (activeSubTab === 'Modified' ? 'modified' : 'new');

        const payload = {
          page: pagination.currentPage,
          limit: 10,
          search: searchTerm || "",
          year_id: activeYearId || "",
          filestatus: statusCode === 'all' || !statusCode ? 'all' : statusCode,
          filter: filterPayload,
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
          setIsApiLoaded(true);
          setApiMembers([]);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Fetch members error:', err);
          setApiError(err.message);
          setIsApiLoaded(true);
          setApiMembers([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchMembers();
    return () => { isMounted = false; };
  }, [statusCode, activeSubTab, searchTerm, filterDate, pagination.currentPage, selectedYear, activeYearId]);

  // Determine list to display (never load static mock data)
  const displayMembers = apiMembers;

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

  const handleEmailEyeClick = (memberId) => {
    const key = `${memberId}_email`;
    if (unmaskedEmails[key]) {
      setUnmaskedEmails(prev => ({ ...prev, [key]: false }));
    } else {
      setPendingMemberId(memberId);
      setOtpOpen(true);
      handleSendEmailOtp(memberId);
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

  // Helper to trigger browser file download from Blob, Array, or String URL
  const triggerFileDownload = (blobOrUrl, fileName) => {
    if (blobOrUrl instanceof Blob) {
      const url = window.URL.createObjectURL(blobOrUrl);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => window.URL.revokeObjectURL(url), 2000);
    } else if (Array.isArray(blobOrUrl)) {
      if (blobOrUrl.length === 0) {
        alert("No member records found to export.");
        return;
      }
      const headers = [
        "File No", "File Type", "First Name", "Last Name", "Contact Number",
        "Alt Number", "Email", "Tin Type", "File Status", "Stage", "Year",
        "Created Date", "Updated Date"
      ];
      const rows = blobOrUrl.map(item => [
        `"${item.file_no || ''}"`,
        `"${(item.file_type || '').replace(/"/g, '""')}"`,
        `"${(item.first_name || '').replace(/"/g, '""')}"`,
        `"${(item.last_name || '').replace(/"/g, '""')}"`,
        `"${(item.contact_number || '').replace(/"/g, '""')}"`,
        `"${(item.alter_number || '').replace(/"/g, '""')}"`,
        `"${(item.email || '').replace(/"/g, '""')}"`,
        `"${(item.tin_type || '').replace(/"/g, '""')}"`,
        `"${(item.filestatus || '').replace(/"/g, '""')}"`,
        `"${(item.current_stage || item.stage || '').replace(/"/g, '""')}"`,
        `"${(item.year?.name || '').replace(/"/g, '""')}"`,
        `"${item.date_created ? new Date(item.date_created).toLocaleString() : ''}"`,
        `"${item.date_updated ? new Date(item.date_updated).toLocaleString() : ''}"`
      ].join(','));

      const csvString = '\uFEFF' + [headers.join(','), ...rows].join('\n');
      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName.endsWith('.csv') ? fileName : fileName.replace(/\.xlsx$/i, '.csv');
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => window.URL.revokeObjectURL(url), 2000);
    } else if (typeof blobOrUrl === 'string' && blobOrUrl.length > 0) {
      let fullUrl = blobOrUrl;
      if (!fullUrl.startsWith('http://') && !fullUrl.startsWith('https://') && !fullUrl.startsWith('blob:') && !fullUrl.startsWith('data:')) {
        fullUrl = `${URLS.Base}${fullUrl.startsWith('/') ? fullUrl.slice(1) : fullUrl}`;
      }
      const a = document.createElement('a');
      a.href = fullUrl;
      a.download = fileName;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  };

  // API Call: Export Previous Year Excel
  const handleExportPreviousYear = async () => {
    try {
      const token = getAuthToken();
      const payload = {
        year_id: activeYearId || "6a59ede933d5d0234c05b6bf",
        search: searchTerm || "",
        filestatus: statusCode === 'all' || !statusCode ? 'all' : statusCode
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
        const filePath = result.data?.url || result.data?.file || result.data?.filePath || result.download_url || result.file_path || result.file;
        if (typeof filePath === 'string' && filePath.length > 0) {
          triggerFileDownload(filePath, `previous_members_except_${numericYear}.xlsx`);
        } else if (Array.isArray(result.data)) {
          triggerFileDownload(result.data, `previous_members_except_${numericYear}.csv`);
        } else if (typeof result.data === 'string' && result.data.length > 0) {
          triggerFileDownload(result.data, `previous_members_except_${numericYear}.xlsx`);
        } else {
          alert(result.message || 'Export completed.');
        }
      } else {
        const rawBlob = await res.blob();
        const excelBlob = new Blob([rawBlob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        triggerFileDownload(excelBlob, `previous_members_except_${numericYear}.xlsx`);
      }
    } catch (err) {
      console.error('Export error:', err);
      alert(`Export request failed: ${err.message}`);
    }
  };

  // API Call: Export Current Year Excel
  const handleExportCurrentYear = async () => {
    try {
      const token = getAuthToken();
      const payload = {
        year_id: activeYearId || "6a59ede933d5d0234c05b6bf",
        search: searchTerm || "",
        filestatus: statusCode === 'all' || !statusCode ? 'all' : statusCode
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
        const filePath = result.data?.url || result.data?.file || result.data?.filePath || result.download_url || result.file_path || result.file;
        if (typeof filePath === 'string' && filePath.length > 0) {
          triggerFileDownload(filePath, `current_members_${numericYear}.xlsx`);
        } else if (Array.isArray(result.data)) {
          triggerFileDownload(result.data, `current_members_${numericYear}.csv`);
        } else if (typeof result.data === 'string' && result.data.length > 0) {
          triggerFileDownload(result.data, `current_members_${numericYear}.xlsx`);
        } else {
          alert(result.message || 'Export completed.');
        }
      } else {
        const rawBlob = await res.blob();
        const excelBlob = new Blob([rawBlob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        triggerFileDownload(excelBlob, `current_members_${numericYear}.xlsx`);
      }
    } catch (err) {
      console.error('Export error:', err);
      alert(`Export request failed: ${err.message}`);
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

  const filteredTotalRecords = pagination.totalRecords !== undefined ? pagination.totalRecords : displayMembers.length;

  if (selectedMember) {
    return (
      <div className="content-card">
        {/* Pill toolbar */}
        <div className="table-filter-bar">
          <div className="filter-left-pill-group">
            <button className="pill-btn new-members" style={{ border: activeSubTab === 'New' ? '2px solid black' : 'none' }}
              onClick={() => setActiveSubTab(prev => (prev === 'New' ? '' : 'New'))}>New Registered Members</button>
            <button className="pill-btn modified-members" style={{ border: activeSubTab === 'Modified' ? '2px solid black' : 'none' }}
              onClick={() => setActiveSubTab(prev => (prev === 'Modified' ? '' : 'Modified'))}>Last Modified Members</button>
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
              setActiveSubTab(prev => (prev === 'New' ? '' : 'New'));
              setPagination(prev => ({ ...prev, currentPage: 1 }));
            }}
          >
            New Registered Members
          </button>
          <button
            className="pill-btn modified-members"
            style={{ border: activeSubTab === 'Modified' ? '2px solid black' : 'none' }}
            onClick={() => {
              setActiveSubTab(prev => (prev === 'Modified' ? '' : 'Modified'));
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
          {Array.from({ length: pagination.totalPages || 1 }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              className={`page-link-btn ${pagination.currentPage === p ? 'active' : ''}`}
              onClick={() => setPagination(prev => ({ ...prev, currentPage: p }))}
            >
              {p}
            </button>
          ))}
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
          Showing {displayMembers.length > 0 ? (pagination.currentPage - 1) * pagination.limit + 1 : 0} to {Math.min(pagination.currentPage * pagination.limit, filteredTotalRecords)} of {filteredTotalRecords} entries
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
