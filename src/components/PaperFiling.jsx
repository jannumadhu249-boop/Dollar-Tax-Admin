import React, { useState } from 'react';
import { Eye } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   Mock data — 20 rows matching the "Paper Filing Done" screenshot
   (used for 'done'; 'pending' starts with an empty list = 0)
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

const DETAIL_TABS = [
  { id: 'personal', label: 'Personal Info' },
  { id: 'spouse',   label: 'Spouse Info' },
  { id: 'dependent',label: 'Dependent Info' },
  { id: 'bank',     label: 'Bank Details' },
  { id: 'address',  label: 'Address' },
  { id: 'download', label: 'Download' },
  { id: 'interview',label: 'Interview' },
  { id: 'pay',      label: 'Pay' },
  { id: 'upload',   label: 'Upload' },
  { id: 'fileInfo', label: 'File Info' },
];

/* Mask email: keep domain extension only */
const getMaskedEmail = (email) => {
  if (!email) return '';
  const ext = email.split('.').pop();
  return `XXXXXXXXXX.${ext}`;
};

/* Build generic detail object from a row */
const buildDetails = (member) => {
  const parts  = (member.name || '').split(' ');
  const fName  = parts[0] || 'N/A';
  const lName  = parts[parts.length - 1] || 'N/A';
  return {
    personal: {
      firstName: fName.toUpperCase(), middleName: '', lastName: lName.toUpperCase(),
      contactNumber: '9876543210', alternateNumber: '9876543210', timeZone: 'PST',
      ssn: `999-00-${member.fileNo.substring(0, 4)}`, dob: '01-01-1990',
      employer: 'TECH CORP', gender: 'N/A', occupation: 'PROFESSIONAL', visaType: 'H1B',
      email: member.email, address: '100 Main St', city: 'Los Angeles', state: 'CA',
      zipcode: '90001', filingStatus: 'SINGLE', filingType: member.filingType,
      firstEntry: '01-01-2018', marriageDate: '', referred: 'NO',
      referredName: '', referredEmail: '', updatedAt: member.regDate,
    },
    spouse: {
      firstName: '', middleName: '', lastName: '', ssn: '', dob: '',
      occupation: '', visaType: '', taxIdType: '', passportNumber: '',
      passportExpiry: '', visaNumber: '', visaExpiry: '', usaEntry: '', updatedAt: '',
    },
    dependents: [],
    bank: {
      bankName: 'Chase', accountNumber: '1029384756',
      routingNumber: '322271627', accountType: 'Checking Account', updatedAt: member.regDate,
    },
  };
};

/* ─────────────────────────────────────────────────────────────
   Main Component
   prop: mode = 'pending' | 'done'
───────────────────────────────────────────────────────────── */
export default function PaperFiling({ mode = 'pending' }) {
  const isPending = mode === 'pending';
  const title     = isPending ? 'Paper Filing Pending' : 'Paper Filing Done';

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
  // statusOverrides holds any in-session status changes keyed by sNo
  const [statusOverrides, setStatusOverrides]  = useState({});

  const ROWS_PER_PAGE = 20;

  // Always derive base data from the mode prop — never store it in state
  const baseData = isPending ? [] : DONE_DATA;

  // Apply any in-session status overrides
  const members = baseData.map(m =>
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

  const totalPages  = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
  const pageRows    = filtered.slice((currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE);
  const totalBadge  = isPending ? 0 : TOTAL_DONE;

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
    // Persist status override without touching baseData
    setStatusOverrides(prev => ({ ...prev, [selectedMember.sNo]: { status: commentStatus, statusDate: dt } }));
    setSelectedMember(prev => ({ ...prev, status: commentStatus, statusDate: dt }));
    setCommentText('');
  };

  /* ──────────────────── DETAIL VIEW ──────────────────── */
  const DetailView = () => {
    const details = buildDetails(selectedMember);
    return (
      <div className="detail-view-container" style={{ animation: 'fadeIn 0.2s ease-out' }}>
        <button
          className="detail-back-btn"
          onClick={() => { setSelectedMember(null); setActiveDetailTab('personal'); }}
        >
          ← Back
        </button>

        {/* Member header info */}
        <div style={{ marginBottom: '12px', padding: '10px 14px', background: '#f8f9fa', borderRadius: '4px', border: '1px solid #e5e7eb', fontSize: '13px' }}>
          <strong style={{ fontSize: '15px', color: '#0076a3' }}>{selectedMember.name}</strong>
          &nbsp;|&nbsp; File No: <strong>{selectedMember.fileNo}</strong>
          &nbsp;|&nbsp; {selectedMember.filingType}
          &nbsp;|&nbsp; <span style={{ color: '#28a745', fontWeight: 600 }}>{selectedMember.status}</span>
        </div>

        {/* 10-tab ribbon */}
        <div className="detail-tabs-row">
          {DETAIL_TABS.map(tab => (
            <button
              key={tab.id}
              className={`detail-tab-btn ${activeDetailTab === tab.id ? 'active' : ''}`}
              onClick={() => { setActiveDetailTab(tab.id); if (tab.id === 'fileInfo') setCommentStatus(selectedMember.status); }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="detail-tab-panel" style={{ marginTop: '16px' }}>
          {activeDetailTab === 'personal' && (
            <div className="table-responsive">
              <table className="corporate-table detail-card-table">
                <thead><tr><th colSpan="2" style={{ textAlign: 'left' }}>PERSONAL DETAILS</th></tr></thead>
                <tbody>
                  {[
                    { label: 'FIRST NAME',                  value: details.personal.firstName },
                    { label: 'MIDDLE NAME',                 value: details.personal.middleName },
                    { label: 'LAST NAME',                   value: details.personal.lastName },
                    { label: 'CONTACT NUMBER',              value: details.personal.contactNumber, masked: true, fk: `${selectedMember.sNo}_phone` },
                    { label: 'ALTERNATE NUMBER',            value: details.personal.alternateNumber },
                    { label: 'TIME ZONE',                   value: details.personal.timeZone },
                    { label: 'SSN',                         value: details.personal.ssn },
                    { label: 'DOB',                         value: details.personal.dob },
                    { label: 'EMPLOYER',                    value: details.personal.employer },
                    { label: 'GENDER',                      value: details.personal.gender },
                    { label: 'OCCUPATION',                  value: details.personal.occupation },
                    { label: 'VISA TYPE',                   value: details.personal.visaType },
                    { label: 'EMAIL',                       value: details.personal.email, masked: true, fk: `${selectedMember.sNo}_personal_email` },
                    { label: 'ADDRESS',                     value: details.personal.address },
                    { label: 'CITY',                        value: details.personal.city },
                    { label: 'STATE',                       value: details.personal.state },
                    { label: 'ZIPCODE',                     value: details.personal.zipcode },
                    { label: 'FILING STATUS',               value: details.personal.filingStatus },
                    { label: 'FILING TYPE',                 value: details.personal.filingType },
                    { label: 'FIRST ENTRY DATE INTO USA',   value: details.personal.firstEntry },
                    { label: 'DATE OF MARRIAGE',            value: details.personal.marriageDate },
                    { label: 'HAVE YOU BEEN REFERRED?',     value: details.personal.referred },
                    { label: 'UPDATED DATE & TIME',         value: details.personal.updatedAt },
                  ].map((row, idx) => (
                    <tr key={idx}>
                      <td style={{ width: '30%', fontWeight: '600', color: 'var(--text-muted)' }}>{row.label}</td>
                      <td>
                        {row.masked ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span>{unmaskedFields[row.fk] ? row.value : (row.label.includes('EMAIL') ? 'XXXXXXXXX.COM' : 'XXXXXXXXXX')}</span>
                            <button className="email-toggle-eye-btn" onClick={() => handleEyeClick(row.fk, !!unmaskedFields[row.fk])} title="Toggle visibility"><Eye size={14} /></button>
                          </div>
                        ) : row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeDetailTab === 'spouse' && (
            <div className="table-responsive">
              <table className="corporate-table detail-card-table">
                <thead><tr><th colSpan="2" style={{ textAlign: 'left' }}>SPOUSE DETAILS</th></tr></thead>
                <tbody>
                  {[
                    { label: 'FIRST NAME',       value: details.spouse.firstName },
                    { label: 'MIDDLE NAME',      value: details.spouse.middleName },
                    { label: 'LAST NAME',        value: details.spouse.lastName },
                    { label: 'SSN',              value: details.spouse.ssn },
                    { label: 'DOB',              value: details.spouse.dob },
                    { label: 'OCCUPATION',       value: details.spouse.occupation },
                    { label: 'VISA TYPE',        value: details.spouse.visaType },
                    { label: 'TAX ID TYPE',      value: details.spouse.taxIdType },
                    { label: 'PASSPORT NUMBER',  value: details.spouse.passportNumber },
                    { label: 'PASSPORT EXPIRY',  value: details.spouse.passportExpiry },
                    { label: 'VISA NUMBER',      value: details.spouse.visaNumber },
                    { label: 'VISA EXPIRY DATE', value: details.spouse.visaExpiry },
                    { label: 'USA ENTRY',        value: details.spouse.usaEntry },
                    { label: 'UPDATE DATE & TIME', value: details.spouse.updatedAt },
                  ].map((row, idx) => (
                    <tr key={idx}>
                      <td style={{ width: '30%', fontWeight: '600', color: 'var(--text-muted)' }}>{row.label}</td>
                      <td>{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

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

          {activeDetailTab === 'bank' && (
            <div style={{ border: '1px solid var(--border-light)', padding: '20px', borderRadius: 'var(--radius-sm)', background: '#fff' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '16px' }}>Bank Details</h3>
              <div className="table-responsive">
                <table className="corporate-table">
                  <tbody>
                    {[
                      ['Bank Name', details.bank.bankName],
                      ['Account Number', details.bank.accountNumber],
                      ['Routing Number', details.bank.routingNumber],
                      ['Account Type', details.bank.accountType],
                      ['Updated Date', details.bank.updatedAt],
                    ].map(([label, val], i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 'bold', width: '25%', color: 'var(--text-muted)' }}>{label}</td>
                        <td>{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

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

          {activeDetailTab === 'download' && (
            <div style={{ border: '1px solid var(--border-light)', padding: '20px', borderRadius: 'var(--radius-sm)', background: '#fff' }}>
              <h4 style={{ fontWeight: 'bold', marginBottom: '12px', fontSize: '14px' }}>Available Client Documents</h4>
              <div className="table-responsive">
                <table className="corporate-table">
                  <thead><tr><th>Document Name</th><th>Category</th><th>Uploaded Date</th><th>Action</th></tr></thead>
                  <tbody>
                    {[
                      ['Form_1040_Draft_v1.pdf', 'Tax Returns', '2026-06-11'],
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

          {activeDetailTab === 'interview' && (
            <div style={{ border: '1px solid var(--border-light)', padding: '20px', borderRadius: 'var(--radius-sm)', background: '#fff' }}>
              <h4 style={{ fontWeight: 'bold', marginBottom: '12px', fontSize: '14px' }}>Interview Scheduling Info</h4>
              <div className="table-responsive">
                <table className="corporate-table">
                  <tbody>
                    {[['Coordinator','Nagasri K.'],['Schedule Type','Phone Interview (USA)'],['Scheduled Time','Completed'],['Status', 'Done']].map(([l,v],i)=>(
                      <tr key={i}><td style={{fontWeight:'bold',width:'25%',color:'var(--text-muted)'}}>{l}</td><td>{v}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeDetailTab === 'pay' && (
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
                      <td><button className="btn-view-action" style={{ padding: '4px 8px', fontSize: '12px' }} onClick={() => alert('Receipt generated.')}>Receipt</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeDetailTab === 'upload' && (
            <div style={{ border: '1px solid var(--border-light)', padding: '20px', borderRadius: 'var(--radius-sm)', background: '#fff', textAlign: 'center' }}>
              <h4 style={{ fontWeight: 'bold', marginBottom: '12px', textAlign: 'left', fontSize: '14px' }}>Upload Member Document</h4>
              <div style={{ border: '2px dashed #ccc', padding: '40px 20px', borderRadius: 'var(--radius-sm)', background: '#f9f9f9', cursor: 'pointer' }}
                onClick={() => alert('File dialog opened.')}>
                <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)' }}>Drag & Drop files here, or click to select</p>
                <span style={{ fontSize: '11px', color: '#999' }}>Supported: PDF, JPEG, PNG (Max 10MB)</span>
              </div>
            </div>
          )}

          {activeDetailTab === 'fileInfo' && (() => {
            const history = commentsHistory[selectedMember.sNo] || [
              { status: selectedMember.status, comments: 'Paper filing completed and mailed.', dateTime: selectedMember.statusDate }
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
                    <textarea rows="4" className="search-input-box" style={{ width: '100%', height: 'auto', fontFamily: 'inherit' }}
                      placeholder="Enter workflow update notes..." value={commentText} onChange={e => setCommentText(e.target.value)} required />
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="submit" className="btn btn-primary" style={{ background: '#3ea94f', padding: '8px 20px', border: 'none', fontWeight: 'bold', color: '#fff', borderRadius: '4px', cursor: 'pointer' }}>Submit</button>
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
                          <td><span style={{ color: c.status.includes('Done') || c.status.includes('Complete') ? 'var(--color-darkgreen-btn)' : c.status.includes('Pending') ? '#856404' : '#212529', fontWeight: c.status.includes('Done') ? 'bold' : 'normal' }}>{c.status}</span></td>
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
                  {isPending ? 'No pending paper filing records found.' : 'No records found.'}
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
                    <span style={{ color: '#28a745', fontWeight: '600' }}>
                      {m.status}
                    </span>
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

      {/* Minimal pagination for pending (empty table) */}
      {isPending && (
        <div className="pagination-row" style={{ marginTop: '12px' }}>
          <button className="page-link-btn active">1</button>
          <button className="page-link-btn">2</button>
          <button className="page-link-btn">3</button>
          <button className="page-link-btn">›</button>
          <button className="page-link-btn">Last »</button>
        </div>
      )}
    </>
  );

  /* ──────────────────── RENDER ──────────────────── */
  return (
    <div className="content-card">

      {/* Header row */}
      <div className="header-section" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>{title}</h2>
        <input
          type="date"
          className="date-picker-box"
          value={filterDate}
          onChange={e => { setFilterDate(e.target.value); setCurrentPage(1); }}
        />
      </div>

      {/* Ribbon toolbar — New/Modified buttons + Total badge */}
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
          <span className="pill-badge">Total {totalBadge}</span>
        </div>

        {!selectedMember && (
          <div className="filter-right-inputs">
            <input
              type="text"
              className="search-input-box"
              placeholder="Search by name, file no, email…"
              value={searchTerm}
              onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
          </div>
        )}
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

      {/* Content: detail or list */}
      {selectedMember ? <DetailView /> : <TableView />}

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
                <input type="text" className="form-input" placeholder="Enter 6-digit code" value={otpInput}
                  onChange={e => setOtpInput(e.target.value)}
                  style={{ padding: '10px', textAlign: 'center', fontSize: '16px', letterSpacing: '1px' }}
                  maxLength={6}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" style={{ padding: '8px 16px' }} onClick={() => setShowOtpModal(false)}>Cancel</button>
              <button className="btn btn-primary" style={{ padding: '8px 16px', background: 'var(--bg-navbar)' }}
                onClick={() => {
                  if (otpInput === verificationOtp) {
                    setUnmaskedFields(prev => ({ ...prev, [verificationKey]: true }));
                    setShowOtpModal(false);
                  } else {
                    setOtpError('Invalid code. Please try again.');
                  }
                }}>
                Verify &amp; Show
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
