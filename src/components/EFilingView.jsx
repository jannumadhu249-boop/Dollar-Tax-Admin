import React, { useState } from 'react';
import { Eye } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   DATASETS  — each key matches a sidebar route
═══════════════════════════════════════════════════════════════ */

const DATA = {

  /* ── Efiling Pending – 1  (count: 3) ─────────────────────── */
  'efiling-pending-1': [
    { sNo: 1, name: 'Arjun Mehta',        fileNo: '101601', filingType: 'E-Filling',     email: 'arjun.mehta@gmail.com',      regDate: '2026-05-12 11:34:22', status: 'Efiling Pending - 1', statusDate: '2026-06-18 10:22:10' },
    { sNo: 2, name: 'Pooja Verma',        fileNo: '101602', filingType: 'E-Filling',     email: 'pooja.verma@yahoo.com',      regDate: '2026-05-18 09:15:47', status: 'Efiling Pending - 1', statusDate: '2026-06-17 23:50:33' },
    { sNo: 3, name: 'Rahul Nair',         fileNo: '101603', filingType: 'Paper Filling', email: 'rahul.nair@hotmail.com',     regDate: '2026-05-25 14:02:38', status: 'Efiling Pending - 1', statusDate: '2026-06-16 08:45:19' },
  ],

  /* ── Efiling Pending – 2  (count: 1) ─────────────────────── */
  'efiling-pending-2': [
    { sNo: 1, name: 'Kavitha Sundaram',   fileNo: '101701', filingType: 'E-Filling',     email: 'kavitha.sundaram@gmail.com', regDate: '2026-05-30 17:42:05', status: 'Efiling Pending - 2', statusDate: '2026-06-15 04:11:28' },
  ],

  /* ── E-Filed & Awaiting Acceptance – 1  (count: 0) ───────── */
  'efiled-awaiting-1': [],

  /* ── E-Filed & Awaiting Acceptance – 2  (count: 0) ───────── */
  'efiled-awaiting-2': [],

  /* ── E-Filed & Rejected  (count: 2) ──────────────────────── */
  'efiled-rejected': [
    { sNo: 1, name: 'DHARMENDRA KASHYAP', fileNo: '91071',  filingType: 'Paper Filling', email: 'dharmendra.kashyap@gmail.com', regDate: '2026-01-31 19:01:52', status: 'E-Filed & Rejected', statusDate: '2026-04-24 21:30:45' },
    { sNo: 2, name: 'Harshal Barot',      fileNo: '101517', filingType: 'E-Filling',     email: 'harshal.barot@yahoo.com',     regDate: '2026-04-14 19:06:58', status: 'E-Filed & Rejected', statusDate: '2026-04-17 22:03:23' },
  ],

  /* ── City Return  (count: 127) ───────────────────────────── */
  'city-return': [
    { sNo: 1,  name: 'Ravi Karan Borugadda',      fileNo: '42010',  filingType: 'E-Filling',     email: 'ravi.borugadda@gmail.com',       regDate: '2026-01-15 03:36:51', status: 'City Return', statusDate: '2026-06-18 22:49:55' },
    { sNo: 2,  name: 'Koteswara Rao Kadiyala',    fileNo: '91383',  filingType: 'E-Filling',     email: 'koteswara.kadiyala@yahoo.com',   regDate: '2026-01-23 02:46:20', status: 'City Return', statusDate: '2026-06-13 01:49:24' },
    { sNo: 3,  name: 'Silambarasan Rajendran',    fileNo: '100170', filingType: 'E-Filling',     email: 'silambarasan.r@gmail.com',       regDate: '2026-01-27 03:21:54', status: 'City Return', statusDate: '2026-06-05 22:20:28' },
    { sNo: 4,  name: 'Gajendra Singh Chawda',     fileNo: '91184',  filingType: 'E-Filling',     email: 'gajendra.chawda@hotmail.com',    regDate: '2026-01-03 20:11:27', status: 'City Return', statusDate: '2026-05-29 22:35:54' },
    { sNo: 5,  name: 'Nimish Bali',               fileNo: '10220',  filingType: 'E-Filling',     email: 'nimish.bali@gmail.com',          regDate: '2026-01-23 10:13:51', status: 'City Return', statusDate: '2026-05-27 22:07:34' },
    { sNo: 6,  name: 'Ashutosh Yadav',            fileNo: '100452', filingType: 'E-Filling',     email: 'ashutosh.yadav@outlook.com',     regDate: '2026-02-12 23:25:31', status: 'City Return', statusDate: '2026-05-21 01:34:03' },
    { sNo: 7,  name: 'Akshay Kadam',              fileNo: '91536',  filingType: 'E-Filling',     email: 'akshay.kadam@gmail.com',         regDate: '2026-03-03 18:15:10', status: 'City Return', statusDate: '2026-05-19 05:07:22' },
    { sNo: 8,  name: 'Sarath Gurram',             fileNo: '80048',  filingType: 'E-Filling',     email: 'sarath.gurram@yahoo.com',        regDate: '2026-01-20 02:47:38', status: 'City Return', statusDate: '2026-05-13 22:23:39' },
    { sNo: 9,  name: 'Nadeem Ahmad',              fileNo: '90115',  filingType: 'E-Filling',     email: 'nadeem.ahmad@gmail.com',         regDate: '2026-01-04 03:40:34', status: 'City Return', statusDate: '2026-05-13 00:38:39' },
    { sNo: 10, name: 'Mouneesh Jayakumar',        fileNo: '100680', filingType: 'Paper Filling', email: 'mouneesh.jay@hotmail.com',       regDate: '2026-02-26 22:53:14', status: 'City Return', statusDate: '2026-05-12 22:28:17' },
    { sNo: 11, name: 'Chockalingam Thiagarajan',  fileNo: '10006',  filingType: 'E-Filling',     email: 'chockalingam.t@gmail.com',       regDate: '2025-12-23 23:29:48', status: 'City Return', statusDate: '2026-04-30 22:02:15' },
    { sNo: 12, name: 'Prashanth Reddy Karemulu',  fileNo: '20401',  filingType: 'E-Filling',     email: 'prashanth.karemulu@yahoo.com',   regDate: '2026-01-27 00:16:56', status: 'City Return', statusDate: '2026-04-22 22:21:42' },
    { sNo: 13, name: 'Aarthi Thamotharan',        fileNo: '100530', filingType: 'E-Filling',     email: 'aarthi.thamotharan@gmail.com',   regDate: '2026-02-17 06:21:39', status: 'City Return', statusDate: '2026-04-24 04:32:18' },
    { sNo: 14, name: 'Fnu Syed Adnaan Umair',     fileNo: '101125', filingType: 'E-Filling',     email: 'syed.adnaan@outlook.com',        regDate: '2026-03-25 22:24:03', status: 'City Return', statusDate: '2026-04-24 04:07:11' },
    { sNo: 15, name: 'Lokeshwar Reddy Tatimakula',fileNo: '52248',  filingType: 'E-Filling',     email: 'lokeshwar.tatimakula@gmail.com', regDate: '2025-12-23 03:47:05', status: 'City Return', statusDate: '2026-04-22 05:45:32' },
    { sNo: 16, name: 'Sai Madhav Yedupati',       fileNo: '100884', filingType: 'Paper Filling', email: 'sai.yedupati@yahoo.com',         regDate: '2026-03-10 23:30:50', status: 'City Return', statusDate: '2026-04-21 21:13:39' },
    { sNo: 17, name: 'THARUN VANGALA',            fileNo: '100823', filingType: 'Paper Filling', email: 'tharun.vangala@gmail.com',       regDate: '2026-03-07 00:55:07', status: 'City Return', statusDate: '2026-04-21 21:13:06' },
    { sNo: 18, name: 'Paritosh Shinde',           fileNo: '100234', filingType: 'Paper Filling', email: 'paritosh.shinde@hotmail.com',    regDate: '2026-01-30 01:59:38', status: 'City Return', statusDate: '2026-04-21 21:12:39' },
    { sNo: 19, name: 'Khantil Buch',              fileNo: '70439',  filingType: 'E-Filling',     email: 'khantil.buch@gmail.com',         regDate: '2026-03-31 07:02:23', status: 'City Return', statusDate: '2026-04-21 05:46:22' },
    { sNo: 20, name: 'Joshika Thiyagarajan',      fileNo: '101505', filingType: 'Paper Filling', email: 'joshika.thiyagarajan@yahoo.com', regDate: '2026-04-14 02:38:07', status: 'City Return', statusDate: '2026-04-21 05:46:06' },
  ],

  /* ── E-Filing Accepted & Filing Complete  (count: 3434) ──── */
  'efiling-accepted-complete': [
    { sNo: 1,  name: 'Manikandan Balakrishnan',          fileNo: '100343', filingType: 'E-Filling',     email: 'manikandan.b@gmail.com',         regDate: '2026-02-06 01:01:30', status: 'E-Filing Accepted & Filing Complete', statusDate: '2026-06-19 02:37:17' },
    { sNo: 2,  name: 'Sangji Singh Shishodiya',          fileNo: '90039',  filingType: 'E-Filling',     email: 'sangji.shishodiya@yahoo.com',    regDate: '2026-01-02 12:36:05', status: 'E-Filing Accepted & Filing Complete', statusDate: '2026-06-19 02:09:22' },
    { sNo: 3,  name: 'Pradeep Kumar Altha',              fileNo: '52584',  filingType: 'E-Filling',     email: 'pradeep.altha@hotmail.com',      regDate: '2026-01-20 00:58:29', status: 'E-Filing Accepted & Filing Complete', statusDate: '2026-06-19 00:49:20' },
    { sNo: 4,  name: 'Karunamai Pamulaparthi',           fileNo: '91290',  filingType: 'E-Filling',     email: 'karunamai.p@gmail.com',          regDate: '2026-01-27 02:13:37', status: 'E-Filing Accepted & Filing Complete', statusDate: '2026-06-18 23:09:39' },
    { sNo: 5,  name: 'PRAVEEN KATRAGADDA',               fileNo: '70612',  filingType: 'E-Filling',     email: 'praveen.katragadda@gmail.com',   regDate: '2026-01-22 00:56:29', status: 'E-Filing Accepted & Filing Complete', statusDate: '2026-06-18 22:30:30' },
    { sNo: 6,  name: 'Sakshi Patel',                     fileNo: '91105',  filingType: 'Paper Filling', email: 'sakshi.patel@yahoo.com',         regDate: '2026-03-06 22:57:45', status: 'E-Filing Accepted & Filing Complete', statusDate: '2026-06-18 22:22:03' },
    { sNo: 7,  name: 'PRABHU MURUGESAN',                 fileNo: '20669',  filingType: 'E-Filling',     email: 'prabhu.murugesan@gmail.com',     regDate: '2025-12-25 09:49:36', status: 'E-Filing Accepted & Filing Complete', statusDate: '2026-06-18 03:36:25' },
    { sNo: 8,  name: 'ATANU PATRA',                      fileNo: '101022', filingType: 'E-Filling',     email: 'atanu.patra@hotmail.com',        regDate: '2026-03-18 04:30:37', status: 'E-Filing Accepted & Filing Complete', statusDate: '2026-06-18 03:25:05' },
    { sNo: 9,  name: 'Venkata Reddy Bapathu',            fileNo: '80816',  filingType: 'E-Filling',     email: 'venkata.bapathu@gmail.com',      regDate: '2026-01-04 01:46:44', status: 'E-Filing Accepted & Filing Complete', statusDate: '2026-06-18 00:29:14' },
    { sNo: 10, name: 'Krunal Shah',                      fileNo: '101210', filingType: 'E-Filling',     email: 'krunal.shah@yahoo.com',          regDate: '2026-03-31 00:34:23', status: 'E-Filing Accepted & Filing Complete', statusDate: '2026-06-18 00:18:30' },
    { sNo: 11, name: 'Swapna Dirisanala',                fileNo: '20393',  filingType: 'E-Filling',     email: 'swapna.dirisanala@gmail.com',    regDate: '2026-01-15 22:24:57', status: 'E-Filing Accepted & Filing Complete', statusDate: '2026-06-18 00:05:24' },
    { sNo: 12, name: 'Shreyansh Singhal',                fileNo: '100986', filingType: 'E-Filling',     email: 'shreyansh.singhal@outlook.com',  regDate: '2026-03-16 08:49:08', status: 'E-Filing Accepted & Filing Complete', statusDate: '2026-06-17 23:48:29' },
    { sNo: 13, name: 'Suresh Gurlhosur',                 fileNo: '10042',  filingType: 'E-Filling',     email: 'suresh.gurlhosur@gmail.com',     regDate: '2025-12-27 23:50:14', status: 'E-Filing Accepted & Filing Complete', statusDate: '2026-06-17 22:15:27' },
    { sNo: 14, name: 'SUSHIL DHAMGAYE',                  fileNo: '80280',  filingType: 'E-Filling',     email: 'sushil.dhamgaye@yahoo.com',      regDate: '2025-12-27 04:50:49', status: 'E-Filing Accepted & Filing Complete', statusDate: '2026-06-17 21:43:35' },
    { sNo: 15, name: 'Susavan Das',                      fileNo: '90687',  filingType: 'Paper Filling', email: 'susavan.das@gmail.com',          regDate: '2025-12-23 21:24:52', status: 'E-Filing Accepted & Filing Complete', statusDate: '2026-06-17 05:47:31' },
    { sNo: 16, name: 'Chandrasekar Thiagarajan',         fileNo: '70479',  filingType: 'E-Filling',     email: 'chandrasekar.t@hotmail.com',     regDate: '2026-01-18 05:24:08', status: 'E-Filing Accepted & Filing Complete', statusDate: '2026-06-17 03:26:29' },
    { sNo: 17, name: 'Tirumala Tejasa Yalla',            fileNo: '91342',  filingType: 'Paper Filling', email: 'tirumala.yalla@gmail.com',       regDate: '2026-03-18 04:21:33', status: 'E-Filing Accepted & Filing Complete', statusDate: '2026-06-17 02:42:05' },
    { sNo: 18, name: 'HIMANSHU YADAV',                   fileNo: '80874',  filingType: 'E-Filling',     email: 'himanshu.yadav@yahoo.com',       regDate: '2025-12-28 20:19:51', status: 'E-Filing Accepted & Filing Complete', statusDate: '2026-06-17 02:39:59' },
    { sNo: 19, name: 'Suresh Krishnan',                  fileNo: '80136',  filingType: 'E-Filling',     email: 'suresh.krishnan@gmail.com',      regDate: '2026-01-01 04:56:32', status: 'E-Filing Accepted & Filing Complete', statusDate: '2026-06-17 01:34:28' },
    { sNo: 20, name: 'Venkata Sai Jyothirmayee Kunisetty', fileNo: '62685', filingType: 'E-Filling',   email: 'venkata.kunisetty@outlook.com',  regDate: '2026-02-01 09:58:32', status: 'E-Filing Accepted & Filing Complete', statusDate: '2026-06-16 23:56:36' },
  ],
};

/* ── Config per mode ──────────────────────────────────────── */
const CONFIG = {
  'efiling-pending-1':        { title: 'E-Filing Pending - I',                    total: 3    },
  'efiling-pending-2':        { title: 'E-Filing Pending - II',                   total: 1    },
  'efiled-awaiting-1':        { title: 'E-Filed & Awaiting Acceptance - I',       total: 0    },
  'efiled-awaiting-2':        { title: 'E-Filed & Awaiting Acceptance - II',      total: 0    },
  'efiled-rejected':          { title: 'E-Filed & Rejected',                      total: 2    },
  'city-return':              { title: 'City Return',                              total: 127  },
  'efiling-accepted-complete':{ title: 'E-Filing Accepted & Filing Complete',     total: 3434 },
};

/* ── Status colour helper ─────────────────────────────────── */
const statusColor = (s = '') => {
  if (s.includes('Complete') || s.includes('Accepted')) return '#28a745';
  if (s.includes('Rejected')) return '#dc3545';
  if (s.includes('City Return')) return '#0076a3';
  if (s.includes('Pending')) return '#856404';
  return '#333';
};

/* ── Mask email ───────────────────────────────────────────── */
const maskEmail = (email = '') => {
  const ext = email.split('.').pop();
  return `XXXXXXXXXX.${ext}`;
};

/* ── Detail / workflow statuses ──────────────────────────── */
const WORKFLOW_STATUSES = [
  'Registered Users','Scheduling Pending','Information Pending','Interview Pending',
  'Documents Pending','Preparation - 1','Preparation - 2','Review & Summary 1',
  'Review & Summary 2','Payment Pending - Efiling','Payable Pending - Paper Filing',
  'Fee Payment Received - 1','Fee Payment Received - 2',
  'Client Review - Efiling','Client Review - Paper Filing',
  'Efiling Pending - 1','Efiling Pending - 2',
  'E - Filed & Awaiting Acceptance - 1','E - Filed & Awaiting Acceptance - 2',
  'E - Filed & Rejected','City Return','E-Filing Accepted & Filing Complete',
  'Paper Filing Pending','Paper Filing Done','Cancelled',
];

const DETAIL_TABS = [
  { id: 'personal',  label: 'Personal Info'   },
  { id: 'spouse',    label: 'Spouse Info'     },
  { id: 'dependent', label: 'Dependent Info'  },
  { id: 'bank',      label: 'Bank Details'    },
  { id: 'address',   label: 'Address'         },
  { id: 'download',  label: 'Download'        },
  { id: 'interview', label: 'Interview'       },
  { id: 'pay',       label: 'Pay'             },
  { id: 'upload',    label: 'Upload'          },
  { id: 'fileInfo',  label: 'File Info'       },
];

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
    spouse:   { firstName:'',middleName:'',lastName:'',ssn:'',dob:'',occupation:'',visaType:'',taxIdType:'',passportNumber:'',passportExpiry:'',visaNumber:'',visaExpiry:'',usaEntry:'',updatedAt:'' },
    bank:     { bankName:'Chase', accountNumber:'1029384756', routingNumber:'322271627', accountType:'Checking Account', updatedAt: m.regDate },
  };
};

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   prop: mode — one of the 7 sidebar keys
═══════════════════════════════════════════════════════════════ */
export default function EFilingView({ mode = 'efiling-accepted-complete' }) {
  const cfg        = CONFIG[mode] || CONFIG['efiling-accepted-complete'];
  const baseData   = DATA[mode]   || [];

  /* UI state */
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
  const [commentStatus,   setCommentStatus]    = useState(cfg.title);
  const [commentsHistory, setCommentsHistory]  = useState({});
  const [statusOverrides, setStatusOverrides]  = useState({});

  const ROWS_PER_PAGE = 20;

  /* Derive display data — never store baseData in state */
  const members  = baseData.map(m => statusOverrides[m.sNo] ? { ...m, ...statusOverrides[m.sNo] } : m);
  const filtered = members.filter(m => {
    const ms = !searchTerm ||
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.fileNo.includes(searchTerm) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase());
    const md = !filterDate || m.regDate.startsWith(filterDate);
    return ms && md;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
  const pageRows   = filtered.slice((currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE);

  /* OTP */
  const handleEyeClick = (fieldKey, isUnmasked) => {
    if (isUnmasked) {
      setUnmaskedFields(p => ({ ...p, [fieldKey]: false }));
    } else {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setVerificationOtp(code); setVerificationKey(fieldKey);
      setOtpInput(''); setOtpError(''); setShowOtpModal(true);
    }
  };

  /* Comment submit */
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    const dt  = `${pad(now.getMonth()+1)}-${pad(now.getDate())}-${now.getFullYear()} :: ${pad(now.getHours())}:${pad(now.getMinutes())}`;
    setCommentsHistory(p => ({ ...p, [selectedMember.sNo]: [{ status: commentStatus, comments: commentText, dateTime: dt }, ...(p[selectedMember.sNo] || [])] }));
    setStatusOverrides(p => ({ ...p, [selectedMember.sNo]: { status: commentStatus, statusDate: dt } }));
    setSelectedMember(p => ({ ...p, status: commentStatus, statusDate: dt }));
    setCommentText('');
  };

  /* ── Detail view ────────────────────────────────────────── */
  const renderDetail = () => {
    const details = buildDetails(selectedMember);
    return (
      <div className="detail-view-container" style={{ animation: 'fadeIn 0.2s ease-out' }}>
        <button className="detail-back-btn"
          onClick={() => { setSelectedMember(null); setActiveDetailTab('personal'); }}>
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
            <button key={tab.id}
              className={`detail-tab-btn ${activeDetailTab === tab.id ? 'active' : ''}`}
              onClick={() => { setActiveDetailTab(tab.id); if (tab.id === 'fileInfo') setCommentStatus(selectedMember.status); }}>
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
                    { label: 'FIRST NAME',               value: details.personal.firstName },
                    { label: 'MIDDLE NAME',              value: details.personal.middleName },
                    { label: 'LAST NAME',                value: details.personal.lastName },
                    { label: 'CONTACT NUMBER',           value: details.personal.contactNumber, masked: true, fk: `${selectedMember.sNo}_phone` },
                    { label: 'ALTERNATE NUMBER',         value: details.personal.alternateNumber },
                    { label: 'TIME ZONE',                value: details.personal.timeZone },
                    { label: 'SSN',                      value: details.personal.ssn },
                    { label: 'DOB',                      value: details.personal.dob },
                    { label: 'EMPLOYER',                 value: details.personal.employer },
                    { label: 'GENDER',                   value: details.personal.gender },
                    { label: 'OCCUPATION',               value: details.personal.occupation },
                    { label: 'VISA TYPE',                value: details.personal.visaType },
                    { label: 'EMAIL',                    value: details.personal.email, masked: true, fk: `${selectedMember.sNo}_email_detail` },
                    { label: 'ADDRESS',                  value: details.personal.address },
                    { label: 'CITY',                     value: details.personal.city },
                    { label: 'STATE',                    value: details.personal.state },
                    { label: 'ZIPCODE',                  value: details.personal.zipcode },
                    { label: 'FILING STATUS',            value: details.personal.filingStatus },
                    { label: 'FILING TYPE',              value: details.personal.filingType },
                    { label: 'FIRST ENTRY DATE INTO USA',value: details.personal.firstEntry },
                    { label: 'DATE OF MARRIAGE',         value: details.personal.marriageDate },
                    { label: 'HAVE YOU BEEN REFERRED?',  value: details.personal.referred },
                    { label: 'UPDATED DATE & TIME',      value: details.personal.updatedAt },
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
                  {[['FIRST NAME',''],['MIDDLE NAME',''],['LAST NAME',''],['SSN',''],['DOB',''],
                    ['OCCUPATION',''],['VISA TYPE',''],['TAX ID TYPE',''],['PASSPORT NUMBER',''],
                    ['PASSPORT EXPIRY',''],['VISA NUMBER',''],['VISA EXPIRY DATE',''],['USA ENTRY',''],
                    ['UPDATE DATE & TIME','']
                  ].map(([l,v],i) => (
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
                <thead><tr><th>S.NO</th><th>NAME</th><th>SSN/ITIN</th><th>RELATIONSHIP</th><th>DATE OF BIRTH</th><th>VISA TYPE</th><th>UPDATED DATE</th></tr></thead>
                <tbody>
                  <tr><td colSpan="7" style={{ textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic', padding: '16px' }}>No dependent details listed for this member.</td></tr>
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
                    {[['Bank Name', details.bank.bankName],['Account Number', details.bank.accountNumber],['Routing Number', details.bank.routingNumber],['Account Type', details.bank.accountType],['Updated Date', details.bank.updatedAt]].map(([l,v],i) => (
                      <tr key={i}><td style={{ fontWeight: 'bold', width: '25%', color: 'var(--text-muted)' }}>{l}</td><td>{v}</td></tr>
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
                    {[['Form_1040_Draft_v1.pdf','Tax Returns','2026-06-11'],['W2_Employer_Copy.pdf','Income Source','2026-06-05']].map(([name,cat,date],i) => (
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
                <table className="corporate-table"><tbody>
                  {[['Coordinator','Nagasri K.'],['Schedule Type','Phone Interview (USA)'],['Scheduled Time','Completed'],['Status','Done']].map(([l,v],i) => (
                    <tr key={i}><td style={{ fontWeight: 'bold', width: '25%', color: 'var(--text-muted)' }}>{l}</td><td>{v}</td></tr>
                  ))}
                </tbody></table>
              </div>
            </div>
          )}

          {/* ── Pay ── */}
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

          {/* ── Upload ── */}
          {activeDetailTab === 'upload' && (
            <div style={{ border: '1px solid var(--border-light)', padding: '20px', borderRadius: 'var(--radius-sm)', background: '#fff', textAlign: 'center' }}>
              <h4 style={{ fontWeight: 'bold', marginBottom: '12px', textAlign: 'left', fontSize: '14px' }}>Upload Member Document</h4>
              <div style={{ border: '2px dashed #ccc', padding: '40px 20px', borderRadius: 'var(--radius-sm)', background: '#f9f9f9', cursor: 'pointer' }} onClick={() => alert('File dialog opened.')}>
                <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)' }}>Drag & Drop files here, or click to select</p>
                <span style={{ fontSize: '11px', color: '#999' }}>Supported: PDF, JPEG, PNG (Max 10MB)</span>
              </div>
            </div>
          )}

          {/* ── File Info ── */}
          {activeDetailTab === 'fileInfo' && (() => {
            const history = commentsHistory[selectedMember.sNo] || [{ status: selectedMember.status, comments: 'Initial entry.', dateTime: selectedMember.statusDate }];
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
  };

  /* ── Table list view ────────────────────────────────────── */
  const renderTable = () => (
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
                  No records found for this status.
                </td>
              </tr>
            ) : (
              pageRows.map(m => (
                <tr key={m.sNo}>
                  <td>{m.sNo}</td>
                  <td>
                    <button type="button"
                      style={{ background: 'none', border: 'none', padding: 0, color: '#0076a3', cursor: 'pointer', fontWeight: '500', textAlign: 'left' }}
                      onClick={() => { setSelectedMember(m); setActiveDetailTab('personal'); setCommentStatus(m.status); }}>
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
                      <span>{unmaskedFields[`${m.sNo}_email`] ? m.email : maskEmail(m.email)}</span>
                      <button className="email-toggle-eye-btn"
                        onClick={() => handleEyeClick(`${m.sNo}_email`, !!unmaskedFields[`${m.sNo}_email`])}
                        title={unmaskedFields[`${m.sNo}_email`] ? 'Mask' : 'Show'}>
                        <Eye size={14} />
                      </button>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-muted)' }}>{m.regDate}</td>
                  <td>
                    <span style={{ color: statusColor(m.status), fontWeight: '600' }}>{m.status}</span>
                  </td>
                  <td style={{ color: 'var(--text-muted)' }}>{m.statusDate}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button className="btn-view-action"
                      onClick={() => { setSelectedMember(m); setActiveDetailTab('personal'); setCommentStatus(m.status); }}>
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
        <div className="pagination-row">
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(pg => (
            <button key={pg} className={`page-link-btn ${currentPage === pg ? 'active' : ''}`} onClick={() => setCurrentPage(pg)}>{pg}</button>
          ))}
          {totalPages > 5 && <>
            <button className="page-link-btn" onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}>›</button>
            <button className="page-link-btn" onClick={() => setCurrentPage(totalPages)}>Last »</button>
          </>}
        </div>
        {filtered.length > 0 && (
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Showing {(currentPage - 1) * ROWS_PER_PAGE + 1}–{Math.min(currentPage * ROWS_PER_PAGE, filtered.length)} of {filtered.length}
          </div>
        )}
      </div>
    </>
  );

  /* ── Main render ────────────────────────────────────────── */
  return (
    <div className="content-card">
      {/* Header */}
      <div className="header-section" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>{cfg.title}</h2>
        <input type="date" className="date-picker-box" value={filterDate}
          onChange={e => { setFilterDate(e.target.value); setCurrentPage(1); }} />
      </div>

      {/* Ribbon */}
      <div className="table-filter-bar">
        <div className="filter-left-pill-group">
          <button className="pill-btn new-members" onClick={() => setActiveSubTab('New')}
            style={{ border: activeSubTab === 'New' ? '2px solid #000' : 'none' }}>
            New Registered Members
          </button>
          <button className="pill-btn modified-members" onClick={() => setActiveSubTab('Modified')}
            style={{ border: activeSubTab === 'Modified' ? '2px solid #000' : 'none' }}>
            Last modified Members
          </button>
          <span className="pill-badge">Total {cfg.total}</span>
        </div>
        {!selectedMember && (
          <div className="filter-right-inputs">
            <input type="text" className="search-input-box" placeholder="Search by name, file no, email…"
              value={searchTerm} onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }} />
          </div>
        )}
      </div>

      {/* Excel buttons */}
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

      {/* Content */}
      {selectedMember ? renderDetail() : renderTable()}

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="modal-overlay">
          <div className="modal-dialog" style={{ width: '400px' }}>
            <div className="modal-header">
              <h3 className="modal-title">Verification Code Required</h3>
              <button className="modal-close-trigger" onClick={() => setShowOtpModal(false)}>&times;</button>
            </div>
            <div className="modal-body" style={{ padding: '20px' }}>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '14px' }}>Enter the 6-digit verification code to reveal this field:</p>
              <div style={{ textAlign: 'center', background: '#f8f9fa', padding: '12px', borderRadius: 'var(--radius-sm)', fontSize: '18px', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '16px', border: '1px dashed #ccc' }}>
                Code: {verificationOtp}
              </div>
              {otpError && <div style={{ color: '#dc3545', fontSize: '13px', marginBottom: '12px', background: 'rgba(220,53,69,0.1)', padding: '8px', borderRadius: 'var(--radius-sm)' }}>{otpError}</div>}
              <div className="form-group">
                <input type="text" className="form-input" placeholder="Enter 6-digit code" value={otpInput}
                  onChange={e => setOtpInput(e.target.value)}
                  style={{ padding: '10px', textAlign: 'center', fontSize: '16px', letterSpacing: '1px' }} maxLength={6} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" style={{ padding: '8px 16px' }} onClick={() => setShowOtpModal(false)}>Cancel</button>
              <button className="btn btn-primary" style={{ padding: '8px 16px', background: 'var(--bg-navbar)' }}
                onClick={() => {
                  if (otpInput === verificationOtp) { setUnmaskedFields(p => ({ ...p, [verificationKey]: true })); setShowOtpModal(false); }
                  else setOtpError('Invalid code. Please try again.');
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
