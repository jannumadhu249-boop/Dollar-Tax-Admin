import React from 'react';
import { Eye } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   Detail tab definitions
───────────────────────────────────────────────────────────── */
const DETAIL_TABS = [
  { id: 'personal',  label: 'Personal Info'  },
  { id: 'spouse',    label: 'Spouse Info'    },
  { id: 'dependent', label: 'Dependent Info' },
  { id: 'bank',      label: 'Bank Details'   },
  { id: 'address',   label: 'Address'        },
  { id: 'download',  label: 'Download'       },
  { id: 'interview', label: 'Interview'      },
  { id: 'pay',       label: 'Pay'            },
  { id: 'upload',    label: 'Upload'         },
  { id: 'fileInfo',  label: 'File Info'      },
];

const WORKFLOW_STATUSES = [
  'Registered Users', 'Scheduling Pending', 'Information Pending', 'Interview Pending',
  'Documents Pending', 'Preparation - 1', 'Preparation - 2', 'Review & Summary 1',
  'Review & Summary 2', 'Payment Pending - Efiling', 'Payable Pending - Paper Filing',
  'Fee Payment Received - 1', 'Fee Payment Received - 2',
  'Client Review - Efiling', 'Client Review - Paper Filing',
  'Efiling Pending - 1', 'Efiling Pending - 2',
  'E - Filed & Awaiting Acceptance - 1', 'E - Filed & Awaiting Acceptance - 2',
  'E - Filed & Rejected', 'City Return', 'E-Filing Accepted & Filing Complete',
  'Paper Filing Pending', 'Paper Filing Done', 'Cancelled',
];

const statusColor = (s = '') => {
  if (s.includes('Complete') || s.includes('Accepted')) return '#28a745';
  if (s.includes('Rejected')) return '#dc3545';
  if (s.includes('City Return')) return '#0076a3';
  if (s.includes('Pending')) return '#856404';
  return '#333';
};

const buildDetails = (m) => {
  const parts = (m.name || '').split(' ');
  return {
    personal: {
      firstName: parts[0]?.toUpperCase() || 'N/A', middleName: '',
      lastName: parts[parts.length - 1]?.toUpperCase() || 'N/A',
      contactNumber: '9876543210', alternateNumber: '9876543210', timeZone: 'PST',
      ssn: `999-00-${m.fileNo.substring(0, 4)}`, dob: '01-01-1990',
      employer: 'TECH CORP', gender: 'N/A', occupation: 'PROFESSIONAL', visaType: 'H1B',
      email: m.email, address: '100 Main St', city: 'Los Angeles', state: 'CA',
      zipcode: '90001', filingStatus: 'SINGLE', filingType: m.filingType,
      firstEntry: '01-01-2018', marriageDate: '', referred: 'NO',
      referredName: '', referredEmail: '', updatedAt: m.regDate,
    },
    spouse: {
      firstName: '', middleName: '', lastName: '', ssn: '', dob: '',
      occupation: '', visaType: '', taxIdType: '', passportNumber: '',
      passportExpiry: '', visaNumber: '', visaExpiry: '', usaEntry: '', updatedAt: '',
    },
    bank: {
      bankName: 'Chase', accountNumber: '1029384756',
      routingNumber: '322271627', accountType: 'Checking Account', updatedAt: m.regDate,
    },
  };
};

/* ─────────────────────────────────────────────────────────────
   EFilingDetailView — Detail view for a selected E-Filing member
   Props:
     selectedMember      — member object being viewed
     activeDetailTab     — currently active tab id
     setActiveDetailTab  — setter for tab id
     setSelectedMember   — setter to clear selection (back button)
     unmaskedFields      — { [fieldKey]: bool }
     handleEyeClick      — fn(fieldKey, isUnmasked)
     commentText         — current comment textarea value
     setCommentText      — setter
     commentStatus       — currently selected status in file-info form
     setCommentStatus    — setter
     commentsHistory     — { [sNo]: [{status, comments, dateTime}] }
     handleCommentSubmit — form submit handler
───────────────────────────────────────────────────────────── */
export default function EFilingDetailView({
  selectedMember,
  activeDetailTab,
  setActiveDetailTab,
  setSelectedMember,
  unmaskedFields,
  handleEyeClick,
  commentText,
  setCommentText,
  commentStatus,
  setCommentStatus,
  commentsHistory,
  handleCommentSubmit,
}) {
  if (!selectedMember) return null;

  const details = buildDetails(selectedMember);

  return (
    <div className="detail-view-container" style={{ animation: 'fadeIn 0.2s ease-out' }}>
      <button
        className="detail-back-btn"
        onClick={() => { setSelectedMember(null); setActiveDetailTab('personal'); }}
      >
        ← Back
      </button>

      {/* Member quick-info bar */}
      <div style={{ marginBottom: '12px', padding: '10px 14px', background: '#f8f9fa', borderRadius: '4px', border: '1px solid #e5e7eb', fontSize: '13px' }}>
        <strong style={{ fontSize: '15px', color: '#0076a3' }}>{selectedMember.name}</strong>
        &nbsp;|&nbsp; File No: <strong>{selectedMember.fileNo}</strong>
        &nbsp;|&nbsp; {selectedMember.filingType}
        &nbsp;|&nbsp; <span style={{ color: statusColor(selectedMember.status), fontWeight: 600 }}>{selectedMember.status}</span>
      </div>

      {/* 10-tab ribbon */}
      <div className="detail-tabs-row">
        {DETAIL_TABS.map(tab => (
          <button
            key={tab.id}
            className={`detail-tab-btn ${activeDetailTab === tab.id ? 'active' : ''}`}
            onClick={() => {
              setActiveDetailTab(tab.id);
              if (tab.id === 'fileInfo') setCommentStatus(selectedMember.status);
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="detail-tab-panel" style={{ marginTop: '16px' }}>

        {/* ── Personal ── */}
        {activeDetailTab === 'personal' && (
          <div className="table-responsive">
            <table className="corporate-table detail-card-table">
              <thead><tr><th colSpan="2" style={{ textAlign: 'left' }}>PERSONAL DETAILS</th></tr></thead>
              <tbody>
                {[
                  { label: 'FIRST NAME',                value: details.personal.firstName },
                  { label: 'MIDDLE NAME',               value: details.personal.middleName },
                  { label: 'LAST NAME',                 value: details.personal.lastName },
                  { label: 'CONTACT NUMBER',            value: details.personal.contactNumber, masked: true, fk: `${selectedMember.sNo}_phone` },
                  { label: 'ALTERNATE NUMBER',          value: details.personal.alternateNumber },
                  { label: 'TIME ZONE',                 value: details.personal.timeZone },
                  { label: 'SSN',                       value: details.personal.ssn },
                  { label: 'DOB',                       value: details.personal.dob },
                  { label: 'EMPLOYER',                  value: details.personal.employer },
                  { label: 'GENDER',                    value: details.personal.gender },
                  { label: 'OCCUPATION',                value: details.personal.occupation },
                  { label: 'VISA TYPE',                 value: details.personal.visaType },
                  { label: 'EMAIL',                     value: details.personal.email, masked: true, fk: `${selectedMember.sNo}_email_detail` },
                  { label: 'ADDRESS',                   value: details.personal.address },
                  { label: 'CITY',                      value: details.personal.city },
                  { label: 'STATE',                     value: details.personal.state },
                  { label: 'ZIPCODE',                   value: details.personal.zipcode },
                  { label: 'FILING STATUS',             value: details.personal.filingStatus },
                  { label: 'FILING TYPE',               value: details.personal.filingType },
                  { label: 'FIRST ENTRY DATE INTO USA', value: details.personal.firstEntry },
                  { label: 'DATE OF MARRIAGE',          value: details.personal.marriageDate },
                  { label: 'HAVE YOU BEEN REFERRED?',   value: details.personal.referred },
                  { label: 'UPDATED DATE & TIME',       value: details.personal.updatedAt },
                ].map((row, i) => (
                  <tr key={i}>
                    <td style={{ width: '30%', fontWeight: '600', color: 'var(--text-muted)' }}>{row.label}</td>
                    <td>
                      {row.masked ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span>{unmaskedFields[row.fk] ? row.value : (row.label.includes('EMAIL') ? 'XXXXXXXXX.COM' : 'XXXXXXXXXX')}</span>
                          <button className="email-toggle-eye-btn" onClick={() => handleEyeClick(row.fk, !!unmaskedFields[row.fk])} title="Toggle"><Eye size={14} /></button>
                        </div>
                      ) : row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── Spouse ── */}
        {activeDetailTab === 'spouse' && (
          <div className="table-responsive">
            <table className="corporate-table detail-card-table">
              <thead><tr><th colSpan="2" style={{ textAlign: 'left' }}>SPOUSE DETAILS</th></tr></thead>
              <tbody>
                {[
                  ['FIRST NAME', details.spouse.firstName],
                  ['MIDDLE NAME', details.spouse.middleName],
                  ['LAST NAME', details.spouse.lastName],
                  ['SSN', details.spouse.ssn],
                  ['DOB', details.spouse.dob],
                  ['OCCUPATION', details.spouse.occupation],
                  ['VISA TYPE', details.spouse.visaType],
                  ['TAX ID TYPE', details.spouse.taxIdType],
                  ['PASSPORT NUMBER', details.spouse.passportNumber],
                  ['PASSPORT EXPIRY', details.spouse.passportExpiry],
                  ['VISA NUMBER', details.spouse.visaNumber],
                  ['VISA EXPIRY DATE', details.spouse.visaExpiry],
                  ['USA ENTRY', details.spouse.usaEntry],
                  ['UPDATE DATE & TIME', details.spouse.updatedAt],
                ].map(([l, v], i) => (
                  <tr key={i}>
                    <td style={{ width: '30%', fontWeight: '600', color: 'var(--text-muted)' }}>{l}</td>
                    <td>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── Dependent ── */}
        {activeDetailTab === 'dependent' && (
          <div className="table-responsive">
            <table className="corporate-table">
              <thead>
                <tr>
                  <th>S.NO</th><th>NAME</th><th>SSN/ITIN</th>
                  <th>RELATIONSHIP</th><th>DATE OF BIRTH</th><th>VISA TYPE</th><th>UPDATED DATE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic', padding: '16px' }}>
                    No dependent details listed for this member.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* ── Bank ── */}
        {activeDetailTab === 'bank' && (
          <div style={{ border: '1px solid var(--border-light)', padding: '20px', borderRadius: 'var(--radius-sm)', background: '#fff' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '16px' }}>Bank Details</h3>
            <div className="table-responsive">
              <table className="corporate-table">
                <tbody>
                  {[
                    ['Bank Name',      details.bank.bankName],
                    ['Account Number', details.bank.accountNumber],
                    ['Routing Number', details.bank.routingNumber],
                    ['Account Type',   details.bank.accountType],
                    ['Updated Date',   details.bank.updatedAt],
                  ].map(([l, v], i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 'bold', width: '25%', color: 'var(--text-muted)' }}>{l}</td>
                      <td>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Address ── */}
        {activeDetailTab === 'address' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ border: '1px solid var(--border-light)', padding: '16px', borderRadius: 'var(--radius-sm)', background: '#fff' }}>
              <h4 style={{ fontWeight: 'bold', marginBottom: '12px', fontSize: '14px' }}>Current Address Details</h4>
              <p style={{ fontSize: '13px', margin: 0 }}><strong>Street:</strong> {details.personal.address}</p>
              <p style={{ fontSize: '13px', margin: '4px 0' }}><strong>City:</strong> {details.personal.city}, <strong>State:</strong> {details.personal.state} – {details.personal.zipcode}</p>
              <p style={{ fontSize: '13px', margin: 0 }}><strong>Country:</strong> United States</p>
            </div>
            <div style={{ border: '1px solid var(--border-light)', padding: '16px', borderRadius: 'var(--radius-sm)', background: '#fff' }}>
              <h4 style={{ fontWeight: 'bold', marginBottom: '12px', fontSize: '14px' }}>Mailing Address Details</h4>
              <p style={{ fontSize: '13px', margin: 0, fontStyle: 'italic', color: 'var(--text-muted)' }}>Same as Current Address</p>
            </div>
          </div>
        )}

        {/* ── Download ── */}
        {activeDetailTab === 'download' && (
          <div style={{ border: '1px solid var(--border-light)', padding: '20px', borderRadius: 'var(--radius-sm)', background: '#fff' }}>
            <h4 style={{ fontWeight: 'bold', marginBottom: '12px', fontSize: '14px' }}>Available Client Documents</h4>
            <div className="table-responsive">
              <table className="corporate-table">
                <thead><tr><th>Document Name</th><th>Category</th><th>Uploaded Date</th><th>Action</th></tr></thead>
                <tbody>
                  {[
                    ['Form_1040_Draft_v1.pdf', 'Tax Returns',   '2026-06-11'],
                    ['W2_Employer_Copy.pdf',   'Income Source', '2026-06-05'],
                  ].map(([name, cat, date], i) => (
                    <tr key={i}>
                      <td>{name}</td><td>{cat}</td><td>{date}</td>
                      <td><button className="btn-view-action" style={{ padding: '4px 8px', fontSize: '12px' }} onClick={() => alert(`Downloading ${name}…`)}>Download</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Interview ── */}
        {activeDetailTab === 'interview' && (
          <div style={{ border: '1px solid var(--border-light)', padding: '20px', borderRadius: 'var(--radius-sm)', background: '#fff' }}>
            <h4 style={{ fontWeight: 'bold', marginBottom: '12px', fontSize: '14px' }}>Interview Scheduling Info</h4>
            <div className="table-responsive">
              <table className="corporate-table">
                <tbody>
                  {[
                    ['Coordinator',    'Nagasri K.'],
                    ['Schedule Type',  'Phone Interview (USA)'],
                    ['Scheduled Time', 'Completed'],
                    ['Status',         'Done'],
                  ].map(([l, v], i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 'bold', width: '25%', color: 'var(--text-muted)' }}>{l}</td>
                      <td>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Pay ── */}
        {activeDetailTab === 'pay' && (
          <div style={{ border: '1px solid var(--border-light)', padding: '20px', borderRadius: 'var(--radius-sm)', background: '#fff' }}>
            <h4 style={{ fontWeight: 'bold', marginBottom: '12px', fontSize: '14px' }}>Billing &amp; Invoices</h4>
            <div className="table-responsive">
              <table className="corporate-table">
                <thead><tr><th>Invoice No</th><th>Amount</th><th>Payment Status</th><th>Payment Date</th><th>Action</th></tr></thead>
                <tbody>
                  <tr>
                    <td>INV-2026-901</td><td>$150.00</td>
                    <td><span style={{ color: 'var(--color-darkgreen-btn)', fontWeight: 'bold' }}>PAID</span></td>
                    <td>2026-06-05</td>
                    <td><button className="btn-view-action" style={{ padding: '4px 8px', fontSize: '12px' }} onClick={() => alert('Receipt generated.')}>Receipt</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Upload ── */}
        {activeDetailTab === 'upload' && (
          <div style={{ border: '1px solid var(--border-light)', padding: '20px', borderRadius: 'var(--radius-sm)', background: '#fff', textAlign: 'center' }}>
            <h4 style={{ fontWeight: 'bold', marginBottom: '12px', textAlign: 'left', fontSize: '14px' }}>Upload Member Document</h4>
            <div
              style={{ border: '2px dashed #ccc', padding: '40px 20px', borderRadius: 'var(--radius-sm)', background: '#f9f9f9', cursor: 'pointer' }}
              onClick={() => alert('File dialog opened.')}
            >
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)' }}>Drag &amp; Drop files here, or click to select</p>
              <span style={{ fontSize: '11px', color: '#999' }}>Supported: PDF, JPEG, PNG (Max 10MB)</span>
            </div>
          </div>
        )}

        {/* ── File Info ── */}
        {activeDetailTab === 'fileInfo' && (() => {
          const history = commentsHistory[selectedMember.sNo] || [
            { status: selectedMember.status, comments: 'Initial entry.', dateTime: selectedMember.statusDate }
          ];
          return (
            <div className="file-info-view" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <form onSubmit={handleCommentSubmit} style={{ border: '1px solid var(--border-light)', padding: '20px', borderRadius: 'var(--radius-sm)', background: '#fff' }}>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '16px' }}>
                  <div style={{ flex: '1', minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 'bold' }}>File No</label>
                    <input type="text" className="search-input-box" style={{ width: '100%', background: '#e9ecef', cursor: 'not-allowed' }} value={selectedMember.fileNo} disabled />
                  </div>
                  <div style={{ flex: '1', minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Filing Type</label>
                    <input type="text" className="search-input-box" style={{ width: '100%', background: '#e9ecef', cursor: 'not-allowed' }} value={selectedMember.filingType} disabled />
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
                    placeholder="Enter workflow update notes..."
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    required
                  />
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="submit" style={{ background: '#3ea94f', padding: '8px 20px', border: 'none', fontWeight: 'bold', color: '#fff', borderRadius: '4px', cursor: 'pointer' }}>Submit</button>
                  <button type="button" className="btn btn-secondary" style={{ padding: '8px 20px', fontWeight: 'bold' }} onClick={() => { setCommentText(''); setCommentStatus(selectedMember.status); }}>Reset</button>
                </div>
              </form>

              <div className="table-responsive">
                <table className="corporate-table">
                  <thead><tr><th>S.No</th><th>Status</th><th>Comments</th><th>Date &amp; Time</th></tr></thead>
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
          );
        })()}

      </div>
    </div>
  );
}
