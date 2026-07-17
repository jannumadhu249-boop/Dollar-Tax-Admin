import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import PaperFilingDoneView from './PaperFilingDoneView';

/* ─────────────────────────────────────────────────────────────
   Mock data — Paper Filing Done records
───────────────────────────────────────────────────────────── */
const DONE_DATA = [
  { sNo: 1,  name: 'Durga Prasad Yarubandi',          fileNo: '100240', filingType: 'Paper Filling', email: 'durga.yarubandi@gmail.com',       regDate: '2026-01-30 08:41:25', status: 'Paper Filing Done', statusDate: '2026-06-19 02:00:36' },
  { sNo: 2,  name: 'Madhavi Kolasani',                fileNo: '101433', filingType: 'Paper Filling', email: 'madhavi.kolasani@yahoo.com',       regDate: '2026-04-10 09:25:56', status: 'Paper Filing Done', statusDate: '2026-06-19 00:26:14' },
  { sNo: 3,  name: 'Pritish Nammaniwar',              fileNo: '90575',  filingType: 'E-Filling',     email: 'pritish.namm@hotmail.com',         regDate: '2026-02-01 23:51:20', status: 'Paper Filing Done', statusDate: '2026-06-17 23:29:59' },
  { sNo: 4,  name: 'Sai Manoj Jaddu',                 fileNo: '90229',  filingType: 'E-Filling',     email: 'sai.jaddu@outlook.com',            regDate: '2026-01-27 02:43:57', status: 'Paper Filing Done', statusDate: '2026-06-17 21:37:34' },
  { sNo: 5,  name: 'Kiran Palil',                     fileNo: '90477',  filingType: 'Paper Filling', email: 'kiran.palil@gmail.com',            regDate: '2026-01-28 07:28:16', status: 'Paper Filing Done', statusDate: '2026-06-17 03:31:29' },
  { sNo: 6,  name: 'Vamshi Yalavarthi',               fileNo: '70974',  filingType: 'Paper Filling', email: 'vamshi.yala@yahoo.com',            regDate: '2026-01-24 22:49:29', status: 'Paper Filing Done', statusDate: '2026-06-17 02:37:26' },
  { sNo: 7,  name: 'Lokesh Mahinder Kumar Sharma',    fileNo: '100098', filingType: 'Paper Filling', email: 'lokesh.sharma@gmail.com',          regDate: '2026-01-21 08:01:58', status: 'Paper Filing Done', statusDate: '2026-06-16 00:41:01' },
  { sNo: 8,  name: 'Yash Desai',                      fileNo: '80834',  filingType: 'E-Filling',     email: 'yash.desai@hotmail.com',           regDate: '2026-01-27 04:09:35', status: 'Paper Filing Done', statusDate: '2026-06-15 23:22:53' },
  { sNo: 9,  name: 'AMEYA HUJARE',                    fileNo: '100788', filingType: 'Paper Filling', email: 'ameya.hujare@gmail.com',           regDate: '2026-03-05 06:09:25', status: 'Paper Filing Done', statusDate: '2026-06-12 22:09:35' },
  { sNo: 10, name: 'Dhurkadevi Siruvachur Krishnan',  fileNo: '100275', filingType: 'Paper Filling', email: 'dhurkadevi.krishnan@yahoo.com',    regDate: '2026-02-01 21:59:44', status: 'Paper Filing Done', statusDate: '2026-06-11 22:34:29' },
  { sNo: 11, name: 'SRUSHTI RAJ BEERELLI',            fileNo: '101025', filingType: 'Paper Filling', email: 'srushti.beerelli@gmail.com',       regDate: '2026-03-18 05:18:15', status: 'Paper Filing Done', statusDate: '2026-06-10 22:46:33' },
  { sNo: 12, name: 'Deepali Verma',                   fileNo: '100043', filingType: 'E-Filling',     email: 'deepali.verma@outlook.com',        regDate: '2026-01-07 01:36:07', status: 'Paper Filing Done', statusDate: '2026-06-10 22:09:32' },
  { sNo: 13, name: 'Srinivasa Rao Katta',             fileNo: '101381', filingType: 'Paper Filling', email: 'srinivasa.katta@gmail.com',        regDate: '2026-04-07 22:41:10', status: 'Paper Filing Done', statusDate: '2026-06-10 05:04:39' },
  { sNo: 14, name: 'Shailendra Kumar',                fileNo: '90620',  filingType: 'E-Filling',     email: 'shailendra.kumar@hotmail.com',     regDate: '2025-12-25 04:18:23', status: 'Paper Filing Done', statusDate: '2026-06-06 02:06:05' },
  { sNo: 15, name: 'Vasu Gaadhi',                     fileNo: '100588', filingType: 'Paper Filling', email: 'vasu.gaadhi@yahoo.com',            regDate: '2026-02-20 04:45:42', status: 'Paper Filing Done', statusDate: '2026-06-06 01:45:36' },
  { sNo: 16, name: 'Kavin Kuppusamy',                 fileNo: '70886',  filingType: 'E-Filling',     email: 'kavin.kuppusamy@gmail.com',        regDate: '2026-01-09 03:22:26', status: 'Paper Filing Done', statusDate: '2026-06-06 01:18:23' },
  { sNo: 17, name: 'Ranjeet Mahla',                   fileNo: '90872',  filingType: 'E-Filling',     email: 'ranjeet.mahla@outlook.com',        regDate: '2026-01-18 22:52:00', status: 'Paper Filing Done', statusDate: '2026-06-05 00:09:17' },
  { sNo: 18, name: 'Surya Potubri',                   fileNo: '101093', filingType: 'E-Filling',     email: 'surya.potubri@gmail.com',          regDate: '2026-03-23 21:25:32', status: 'Paper Filing Done', statusDate: '2026-06-05 00:07:17' },
  { sNo: 19, name: 'Anuj Khandelwal',                 fileNo: '70236',  filingType: 'Paper Filling', email: 'anuj.khandelwal@yahoo.com',        regDate: '2026-02-28 07:20:10', status: 'Paper Filing Done', statusDate: '2026-06-05 00:02:55' },
  { sNo: 20, name: 'Srinivas Kante',                  fileNo: '91233',  filingType: 'Paper Filling', email: 'srinivas.kante@hotmail.com',       regDate: '2026-02-26 07:43:59', status: 'Paper Filing Done', statusDate: '2026-06-04 23:54:46' },
];

const TOTAL_DONE = 186;

/* Mask email: keep domain extension only */
const getMaskedEmail = (email) => {
  if (!email) return '';
  const ext = email.split('.').pop();
  return `XXXXXXXXXX.${ext}`;
};

/* ─────────────────────────────────────────────────────────────
   PaperFilingDone — Paper Filing Done list + detail view
───────────────────────────────────────────────────────────── */
export default function PaperFilingDone() {
  /* State */
  const [filterDate,      setFilterDate]      = useState('');
  const [activeSubTab,    setActiveSubTab]     = useState('New');
  const [searchTerm,      setSearchTerm]       = useState('');
  const [currentPage,     setCurrentPage]      = useState(1);
  const [selectedMember,  setSelectedMember]   = useState(null);
  const [activeDetailTab, setActiveDetailTab]  = useState('personal');
  const [unmaskedFields,  setUnmaskedFields]   = useState({});
  const [showOtpModal,    setShowOtpModal]     = useState(false);
  const [otpInput,        setOtpInput]         = useState('');
  const [otpError,        setOtpError]         = useState('');
  const [verificationOtp, setVerificationOtp]  = useState('');
  const [verificationKey, setVerificationKey]  = useState(null);
  const [commentText,     setCommentText]      = useState('');
  const [commentStatus,   setCommentStatus]    = useState('Paper Filing Done');
  const [commentsHistory, setCommentsHistory]  = useState({});
  const [statusOverrides, setStatusOverrides]  = useState({});

  const ROWS_PER_PAGE = 20;

  // Apply any in-session status overrides
  const members = DONE_DATA.map(m =>
    statusOverrides[m.sNo] ? { ...m, ...statusOverrides[m.sNo] } : m
  );

  /* Filter */
  const filtered = members.filter(m => {
    const matchSearch = !searchTerm ||
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.fileNo.includes(searchTerm) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDate = !filterDate || m.regDate.startsWith(filterDate);
    return matchSearch && matchDate;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
  const pageRows   = filtered.slice((currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE);

  /* OTP flow */
  const handleEyeClick = (fieldKey, isUnmasked) => {
    if (isUnmasked) {
      setUnmaskedFields(prev => ({ ...prev, [fieldKey]: false }));
    } else {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setVerificationOtp(code);
      setVerificationKey(fieldKey);
      setOtpInput(''); setOtpError('');
      setShowOtpModal(true);
    }
  };

  /* Comment submit */
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    const dt  = `${pad(now.getMonth()+1)}-${pad(now.getDate())}-${now.getFullYear()} :: ${pad(now.getHours())}:${pad(now.getMinutes())}`;
    const entry = { status: commentStatus, comments: commentText, dateTime: dt };
    setCommentsHistory(prev => ({ ...prev, [selectedMember.sNo]: [entry, ...(prev[selectedMember.sNo] || [])] }));
    setStatusOverrides(prev => ({ ...prev, [selectedMember.sNo]: { status: commentStatus, statusDate: dt } }));
    setSelectedMember(prev => ({ ...prev, status: commentStatus, statusDate: dt }));
    setCommentText('');
  };

  /* ──────────────────── TABLE LIST VIEW ──────────────────── */
  const TableView = () => (
    <>
      <div className="table-responsive" style={{ animation: 'fadeIn 0.2s ease-out' }}>
        <table className="corporate-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>File No</th>
              <th>Filing Type</th>
              <th>E-mail</th>
              <th>Register date</th>
              <th>File Status</th>
              <th>Status Updated Date</th>
              <th style={{ width: '80px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  No records found.
                </td>
              </tr>
            ) : (
              pageRows.map(m => (
                <tr key={m.sNo}>
                  <td>{m.sNo}</td>
                  <td>
                    <button
                      type="button"
                      style={{ background: 'none', border: 'none', padding: 0, color: '#0076a3', cursor: 'pointer', fontWeight: '500', textAlign: 'left' }}
                      onClick={() => { setSelectedMember(m); setActiveDetailTab('personal'); setCommentStatus(m.status); }}
                    >
                      {m.name}
                    </button>
                  </td>
                  <td>{m.fileNo}</td>
                  <td>
                    <span style={{ color: m.filingType === 'E-Filling' ? '#0d6e8a' : '#333' }}>
                      {m.filingType}
                    </span>
                  </td>
                  <td>
                    <div className="email-cell-container">
                      <span>{unmaskedFields[`${m.sNo}_email`] ? m.email : getMaskedEmail(m.email)}</span>
                      <button
                        className="email-toggle-eye-btn"
                        onClick={() => handleEyeClick(`${m.sNo}_email`, !!unmaskedFields[`${m.sNo}_email`])}
                        title={unmaskedFields[`${m.sNo}_email`] ? 'Mask Email' : 'Show Email'}
                      >
                        <Eye size={14} />
                      </button>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-muted)' }}>{m.regDate}</td>
                  <td>
                    <span style={{ color: '#28a745', fontWeight: '600' }}>{m.status}</span>
                  </td>
                  <td style={{ color: 'var(--text-muted)' }}>{m.statusDate}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      className="btn-view-action"
                      onClick={() => { setSelectedMember(m); setActiveDetailTab('personal'); setCommentStatus(m.status); }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filtered.length > ROWS_PER_PAGE && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
          <div className="pagination-row">
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(pg => (
              <button
                key={pg}
                className={`page-link-btn ${currentPage === pg ? 'active' : ''}`}
                onClick={() => setCurrentPage(pg)}
              >
                {pg}
              </button>
            ))}
            {totalPages > 5 && (
              <>
                <button className="page-link-btn" onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}>›</button>
                <button className="page-link-btn" onClick={() => setCurrentPage(totalPages)}>Last »</button>
              </>
            )}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Showing {(currentPage - 1) * ROWS_PER_PAGE + 1}–{Math.min(currentPage * ROWS_PER_PAGE, filtered.length)} of {filtered.length} entries
          </div>
        </div>
      )}
    </>
  );

  /* ──────────────────── RENDER ──────────────────── */
  return (
    <div className="content-card">

      {/* Header row */}
      <div className="header-section" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>Paper Filing Done</h2>
        <input
          type="date"
          className="date-picker-box"
          value={filterDate}
          onChange={e => { setFilterDate(e.target.value); setCurrentPage(1); }}
        />
      </div>

      {/* Ribbon toolbar + Excel — only show when NOT in detail view */}
      {!selectedMember && (
        <>
          <div className="table-filter-bar">
            <div className="filter-left-pill-group">
              <button
                className="pill-btn new-members"
                onClick={() => setActiveSubTab('New')}
                style={{ border: activeSubTab === 'New' ? '2px solid #000' : 'none' }}
              >
                New Registered Members
              </button>
              <button
                className="pill-btn modified-members"
                onClick={() => setActiveSubTab('Modified')}
                style={{ border: activeSubTab === 'Modified' ? '2px solid #000' : 'none' }}
              >
                Last modified Members
              </button>
              <span className="pill-badge">Total {TOTAL_DONE}</span>
            </div>

            <div className="filter-right-inputs">
              <input
                type="text"
                className="search-input-box"
                placeholder="Search by name, file no, email…"
                value={searchTerm}
                onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              />
            </div>
          </div>

          {/* Excel download buttons */}
          <div className="excel-btn-group">
            <button className="excel-download-btn" onClick={() => alert('Exporting (except 2025 year)…')}>
              <span>⬇ Excel</span>
              <span className="excel-btn-subtext">Note: Download All members except 2025 Year</span>
            </button>
            <button className="excel-download-btn" onClick={() => alert('Exporting 2025 year only…')}>
              <span>⬇ Excel</span>
              <span className="excel-btn-subtext">Note: Download All Members 2025 Year Only</span>
            </button>
          </div>
        </>
      )}

      {/* Content: detail view (via PaperFilingDoneView) or table list */}
      {selectedMember ? (
        <PaperFilingDoneView
          selectedMember={selectedMember}
          activeDetailTab={activeDetailTab}
          setActiveDetailTab={setActiveDetailTab}
          setSelectedMember={setSelectedMember}
          unmaskedFields={unmaskedFields}
          handleEyeClick={handleEyeClick}
          commentText={commentText}
          setCommentText={setCommentText}
          commentStatus={commentStatus}
          setCommentStatus={setCommentStatus}
          commentsHistory={commentsHistory}
          handleCommentSubmit={handleCommentSubmit}
        />
      ) : (
        <TableView />
      )}

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="modal-overlay">
          <div className="modal-dialog" style={{ width: '400px' }}>
            <div className="modal-header">
              <h3 className="modal-title">Verification Code Required</h3>
              <button className="modal-close-trigger" onClick={() => setShowOtpModal(false)}>&times;</button>
            </div>
            <div className="modal-body" style={{ padding: '20px' }}>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '14px' }}>
                Enter the 6-digit verification code below to reveal this field:
              </p>
              <div style={{ textAlign: 'center', background: '#f8f9fa', padding: '12px', borderRadius: 'var(--radius-sm)', fontSize: '18px', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '16px', border: '1px dashed #ccc', color: 'var(--text-dark)' }}>
                Code: {verificationOtp}
              </div>
              {otpError && (
                <div style={{ color: '#dc3545', fontSize: '13px', marginBottom: '12px', background: 'rgba(220,53,69,0.1)', padding: '8px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(220,53,69,0.2)' }}>
                  {otpError}
                </div>
              )}
              <div className="form-group">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter 6-digit code"
                  value={otpInput}
                  onChange={e => setOtpInput(e.target.value)}
                  style={{ padding: '10px', textAlign: 'center', fontSize: '16px', letterSpacing: '1px' }}
                  maxLength={6}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" style={{ padding: '8px 16px' }} onClick={() => setShowOtpModal(false)}>Cancel</button>
              <button
                className="btn btn-primary"
                style={{ padding: '8px 16px', background: 'var(--bg-navbar)' }}
                onClick={() => {
                  if (otpInput === verificationOtp) {
                    setUnmaskedFields(prev => ({ ...prev, [verificationKey]: true }));
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
