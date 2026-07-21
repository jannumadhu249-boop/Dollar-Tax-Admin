import React, { useState } from 'react';
import { Eye } from 'lucide-react';

export default function ClientSearch({ selectedYear, setSelectedYear }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchIdType, setSearchIdType] = useState('Select Search by ID');
  const [submittedSearch, setSubmittedSearch] = useState({ term: '', idType: '' });
  const [selectedMember, setSelectedMember] = useState(null);
  const [activeDetailTab, setActiveDetailTab] = useState('personal');

  // OTP Verification States
  const [unmaskedFields, setUnmaskedFields] = useState({});
  const [verificationOtp, setVerificationOtp] = useState('');
  const [verificationFieldKey, setVerificationFieldKey] = useState(null);
  const [otpInput, setOtpInput] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpError, setOtpError] = useState('');

  // 20 Mock Members for Year 2023 (Third Screenshot) + other years
  const initialMembers = [
    // TY2023 (Financial Year 2023)
    { sNo: 1, name: 'Amardeep Kumar', fileNo: '31010', filingType: 'E-Filing', email: 'amardeep.k@gmail.com', status: 'E-Filing Accepted & Filing Complete', regDate: '2024-06-05 09:10:48', year: '2023' },
    { sNo: 2, name: 'Anubhav Yadav', fileNo: '41795', filingType: 'E-Filing', email: 'anubhav.yadav@hotmail.com', status: 'E-Filing Accepted & Filing Complete', regDate: '2024-05-26 11:23:09', year: '2023' },
    { sNo: 3, name: 'Manideep Yenugula', fileNo: '63129', filingType: 'E-Filing', email: 'manideep.y@outlook.com', status: 'Client Review - Efiling', regDate: '2024-05-28 20:07:51', year: '2023' },
    { sNo: 4, name: 'Arun Kumar', fileNo: '20530', filingType: 'E-Filing', email: 'arunkumar@tech.net', status: 'E-Filing Accepted & Filing Complete', regDate: '2024-05-23 12:24:55', year: '2023' },
    { sNo: 5, name: 'Himani Uday Gadve', fileNo: '52575', filingType: 'E-Filing', email: 'himani.gadve@outlook.com', status: 'Scheduling Pending', regDate: '2024-05-16 02:41:14', year: '2023' },
    { sNo: 6, name: 'Nitish Bipinbhai Kotak', fileNo: '81604', filingType: 'E-Filing', email: 'nitish.b.kotak@gmail.com', status: 'E-Filing Accepted & Filing Complete', regDate: '2024-05-18 11:23:37', year: '2023' },
    { sNo: 7, name: 'Koritala Yoga Sriram', fileNo: '70887', filingType: 'Paper Filing', email: 'koritala.yoga@gmail.com', status: 'Scheduling Pending', regDate: '2024-05-20 16:02:40', year: '2023' },
    { sNo: 8, name: 'RAMAIAH CHINNASAMY', fileNo: '71099', filingType: 'E-Filing', email: 'ramaiah.chinnasamy@gmail.com', status: 'E-Filing Accepted & Filing Complete', regDate: '2024-05-22 09:15:46', year: '2023' },
    { sNo: 9, name: 'Md nehal Khan', fileNo: '81302', filingType: 'E-Filing', email: 'md.nehal.khan@gmail.com', status: 'Payment Pending - Efiling', regDate: '2024-05-25 13:34:52', year: '2023' },
    { sNo: 10, name: 'Abhay Patel', fileNo: '81677', filingType: 'Paper Filing', email: 'abhay.patel@gmail.com', status: 'E-Filing Accepted & Filing Complete', regDate: '2024-05-26 15:30:21', year: '2023' },
    { sNo: 11, name: 'Vidhi Chetan Patel', fileNo: '70998', filingType: 'Paper Filing', email: 'vidhi.patel@gmail.com', status: 'E-Filing Accepted & Filing Complete', regDate: '2024-05-27 10:22:05', year: '2023' },
    { sNo: 12, name: 'Nitu Kumari', fileNo: '81210', filingType: 'E-Filing', email: 'nitu.kumari@gmail.com', status: 'Client Review - Efiling', regDate: '2024-05-28 14:05:30', year: '2023' },
    { sNo: 13, name: 'Parth Patel', fileNo: '63162', filingType: 'E-Filing', email: 'parth.patel@gmail.com', status: 'E-Filing Accepted & Filing Complete', regDate: '2024-05-29 08:12:00', year: '2023' },
    { sNo: 14, name: 'Srishti Ashok Mishra', fileNo: '63155', filingType: 'Paper Filing', email: 'srishti.mishra@gmail.com', status: 'E-Filing Accepted & Filing Complete', regDate: '2024-05-30 09:29:44', year: '2023' },
    { sNo: 15, name: 'Vishal Mange', fileNo: '81290', filingType: 'E-Filing', email: 'vishal.mange@gmail.com', status: 'Payment Pending - Efiling', regDate: '2024-06-01 11:25:00', year: '2023' },
    { sNo: 16, name: 'Probid Janardhanan Panikkan', fileNo: '81716', filingType: 'E-Filing', email: 'probid.janardhanan@gmail.com', status: 'E-Filing Accepted & Filing Complete', regDate: '2024-06-02 12:44:11', year: '2023' },
    { sNo: 17, name: 'Venkata Sai Kiran Pelluri', fileNo: '81715', filingType: 'Paper Filing', email: 'sai.kiran.pelluri@gmail.com', status: 'E-Filing Accepted & Filing Complete', regDate: '2024-06-03 14:05:00', year: '2023' },
    { sNo: 18, name: 'Mythreyi Ragothuman', fileNo: '81686', filingType: 'E-Filing', email: 'mythreyi.ragothuman@gmail.com', status: 'E-Filing Accepted & Filing Complete', regDate: '2024-06-04 15:30:12', year: '2023' },
    { sNo: 19, name: 'Hardik Lukhi', fileNo: '70973', filingType: 'E-Filing', email: 'hardik.lukhi@gmail.com', status: 'E-Filing Accepted & Filing Complete', regDate: '2024-06-05 16:45:00', year: '2023' },
    { sNo: 20, name: 'Mrinal Shukla', fileNo: '10148', filingType: 'E-Filing', email: 'mrinal.shukla@gmail.com', status: 'E-Filing Accepted & Filing Complete', regDate: '2024-06-06 17:15:30', year: '2023' },

    // TY2025
    { sNo: 101, name: 'Amardeep Kumar', fileNo: '31010', filingType: 'E-Filing', email: 'amardeep.k@gmail.com', status: 'Scheduling Pending', regDate: '2026-06-05 09:10:48', year: '2025' },
    { sNo: 102, name: 'Narashima Vaddala', fileNo: '101570', filingType: 'E-Filing', email: 'narashima.v@yahoo.com', status: 'Scheduling Pending', regDate: '2026-05-29 13:34:52', year: '2025' },
    { sNo: 103, name: 'Anubhav Yadav', fileNo: '41795', filingType: 'E-Filing', email: 'anubhav.yadav@hotmail.com', status: 'Scheduling Pending', regDate: '2026-05-26 11:23:09', year: '2025' },

    // TY2024
    { sNo: 201, name: 'Maitryi Das', fileNo: '100017', filingType: 'E-Filing', email: 'maitryi.das@gmail.com', status: 'Payment Pending - Efiling', regDate: '2025-12-28 01:33:59', year: '2024' },
    { sNo: 202, name: 'Raj Kamal', fileNo: '10047', filingType: 'E-Filing', email: 'raj.kamal@gmail.com', status: 'Fee Payment Received - II', regDate: '2025-12-22 23:51:16', year: '2024' }
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

  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear('TY' + year);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedSearch({ term: searchTerm, idType: searchIdType });
  };

  const currentYearVal = selectedYear ? selectedYear.replace('TY', '') : '2023';

  const filteredMembers = initialMembers.filter(member => {
    const matchesYear = member.year === currentYearVal;
    
    let matchesSearch = true;
    if (submittedSearch.term) {
      const termLower = submittedSearch.term.toLowerCase();
      if (submittedSearch.idType === 'File No') {
        matchesSearch = member.fileNo.includes(submittedSearch.term);
      } else if (submittedSearch.idType === 'Email') {
        matchesSearch = member.email.toLowerCase().includes(termLower);
      } else {
        matchesSearch = member.name.toLowerCase().includes(termLower) ||
                        member.fileNo.includes(submittedSearch.term) ||
                        member.email.toLowerCase().includes(termLower);
      }
    }

    return matchesYear && matchesSearch;
  });

  const detailTabs = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'spouse', label: 'Spouse Info' },
    { id: 'dependent', label: 'Dependent Info' },
    { id: 'bank', label: 'Bank Details' },
    { id: 'address', label: 'Address' },
    { id: 'download', label: 'Download' }
  ];

  const getMemberDetails = (member) => {
    if (!member) return null;
    return {
      personal: {
        firstName: member.name.split(' ')[0].toUpperCase(),
        middleName: '',
        lastName: (member.name.split(' ')[1] || 'Kumar').toUpperCase(),
        contactNumber: '9876543210',
        alternateNumber: '9876543210',
        timeZone: 'EST',
        ssn: `999-00-${member.fileNo}`,
        dob: '08-15-1990',
        employer: 'TECH SOLUTIONS',
        gender: 'MALE',
        occupation: 'SOFTWARE DEVELOPER',
        visaType: 'H1B',
        email: member.email,
        address: '100 Main St Apt 2C',
        city: 'Jersey City',
        state: 'NJ',
        zipcode: '07302',
        filingStatus: 'SINGLE',
        filingType: member.filingType,
        firstEntry: '08-12-2018',
        marriageDate: '',
        referred: 'NO',
        referredName: '',
        referredEmail: '',
        updatedAt: member.regDate
      },
      spouse: {
        firstName: '',
        middleName: '',
        lastName: '',
        ssn: '',
        dob: '',
        occupation: '',
        visaType: '',
        taxIdType: '',
        passportNumber: '',
        passportExpiry: '',
        visaNumber: '',
        visaExpiry: '',
        usaEntry: '',
        updatedAt: ''
      },
      dependents: [],
      bank: {
        bankName: 'Bank of America',
        accountNumber: '1029384756',
        routingNumber: '021000021',
        accountType: 'Checking Account',
        updatedAt: member.regDate
      }
    };
  };

  return (
    <div className="content-card">
      {selectedMember ? (
        /* ==================== DETAILED MEMBER VIEW WORKSPACE ==================== */
        <div className="detail-view-container" style={{ animation: 'fadeIn 0.2s ease-out' }}>
          <button 
            type="button"
            className="detail-back-btn" 
            onClick={() => {
              setSelectedMember(null);
              setActiveDetailTab('personal');
            }}
          >
            Back
          </button>

          {/* Horizonal 6 tabs ribbon row */}
          <div className="detail-tabs-row" style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px', marginBottom: '16px' }}>
            {detailTabs.map(tab => (
              <button
                key={tab.id}
                type="button"
                className={`detail-tab-btn ${activeDetailTab === tab.id ? 'active' : ''}`}
                style={{ padding: '8px 16px', background: activeDetailTab === tab.id ? 'var(--bg-navbar)' : 'none', color: activeDetailTab === tab.id ? '#fff' : 'var(--text-dark)', border: '1px solid var(--border-light)', borderRadius: '4px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}
                onClick={() => setActiveDetailTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Tab Panel Body */}
          <div className="detail-tab-panel">
            {(() => {
              const details = getMemberDetails(selectedMember);
              if (!details) return null;

              switch (activeDetailTab) {
                case 'personal':
                  const personalRows = [
                    { label: 'FIRST NAME', value: details.personal.firstName },
                    { label: 'MIDDLE NAME', value: details.personal.middleName },
                    { label: 'LAST NAME', value: details.personal.lastName },
                    { label: 'CONTACT NUMBER', value: details.personal.contactNumber, isMasked: true, fieldKey: `cs_det_${selectedMember.sNo}_phone` },
                    { label: 'ALTERNATE NUMBER', value: details.personal.alternateNumber },
                    { label: 'TIME ZONE', value: details.personal.timeZone },
                    { label: 'SSN', value: details.personal.ssn },
                    { label: 'DOB', value: details.personal.dob },
                    { label: 'EMAIL', value: details.personal.email, isMasked: true, fieldKey: `cs_det_${selectedMember.sNo}_email` },
                    { label: 'ADDRESS', value: details.personal.address },
                    { label: 'CITY', value: details.personal.city },
                    { label: 'STATE', value: details.personal.state },
                    { label: 'ZIPCODE', value: details.personal.zipcode }
                  ];

                  return (
                    <div className="table-responsive">
                      <table className="corporate-table detail-card-table">
                        <thead>
                          <tr>
                            <th colSpan="2" style={{ textAlign: 'left', fontWeight: 'bold' }}>PERSONAL DETAILS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {personalRows.map((row, idx) => (
                            <tr key={idx}>
                              <td style={{ width: '30%', fontWeight: '600', color: 'var(--text-muted)' }}>{row.label}</td>
                              <td>
                                {row.isMasked ? (
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span>
                                      {unmaskedFields[row.fieldKey] 
                                        ? row.value 
                                        : (row.label.includes('EMAIL') ? 'XXXXXXXXX.COM' : 'XXXXXXXXXX')}
                                    </span>
                                    <button 
                                      type="button"
                                      className="email-toggle-eye-btn" 
                                      onClick={() => handleFieldClick(row.fieldKey, !!unmaskedFields[row.fieldKey])}
                                      title={unmaskedFields[row.fieldKey] ? 'Mask Field' : 'Show Field'}
                                    >
                                      <Eye size={14} />
                                    </button>
                                  </div>
                                ) : (
                                  row.value
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );

                case 'spouse':
                  return (
                    <div className="table-responsive">
                      <table className="corporate-table">
                        <thead>
                          <tr><th colSpan="2" style={{ textAlign: 'left' }}>SPOUSE DETAILS</th></tr>
                        </thead>
                        <tbody>
                          <tr><td colSpan="2" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '16px' }}>No Spouse registered for this tax profile.</td></tr>
                        </tbody>
                      </table>
                    </div>
                  );

                case 'dependent':
                  return (
                    <div className="table-responsive">
                      <table className="corporate-table">
                        <thead>
                          <tr><th colSpan="2" style={{ textAlign: 'left' }}>DEPENDENT DETAILS</th></tr>
                        </thead>
                        <tbody>
                          <tr><td colSpan="2" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '16px' }}>No Dependents registered.</td></tr>
                        </tbody>
                      </table>
                    </div>
                  );

                case 'bank':
                  return (
                    <div className="table-responsive">
                      <table className="corporate-table">
                        <thead>
                          <tr><th colSpan="2" style={{ textAlign: 'left' }}>BANK ACCOUNT DETAILS</th></tr>
                        </thead>
                        <tbody>
                          <tr><td style={{ fontWeight: '600', color: 'var(--text-muted)' }}>Bank Name</td><td>{details.bank.bankName}</td></tr>
                          <tr><td style={{ fontWeight: '600', color: 'var(--text-muted)' }}>Account Number</td><td>{details.bank.accountNumber}</td></tr>
                          <tr><td style={{ fontWeight: '600', color: 'var(--text-muted)' }}>Routing Number</td><td>{details.bank.routingNumber}</td></tr>
                        </tbody>
                      </table>
                    </div>
                  );

                case 'address':
                  return (
                    <div style={{ border: '1px solid var(--border-light)', padding: '16px', borderRadius: 'var(--radius-sm)' }}>
                      <p><strong>Current Address:</strong> {details.personal.address}, {details.personal.city}, {details.personal.state} - {details.personal.zipcode}</p>
                    </div>
                  );

                case 'download':
                  return (
                    <div style={{ padding: '16px', color: 'var(--text-muted)', textAlign: 'center' }}>
                      No files uploaded.
                    </div>
                  );

                default:
                  return null;
              }
            })()}
          </div>
        </div>
      ) : (
        /* ==================== NORMAL TABLE VIEW ==================== */
        <>
          <div className="header-section" style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '12px', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>All registred members</h2>
          </div>

          {/* Search form controls block */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-end', marginBottom: '24px', backgroundColor: '#f8f9fa', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '220px' }}>
              <label style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-muted)' }}>Search Term</label>
              <input 
                type="text" 
                placeholder="Search Term" 
                className="search-input-box" 
                style={{ width: '100%' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '180px' }}>
              <label style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-muted)' }}>Search ID</label>
              <select 
                className="search-input-box" 
                style={{ width: '100%', height: '38px' }}
                value={searchIdType}
                onChange={(e) => setSearchIdType(e.target.value)}
              >
                <option value="Select Search by ID">Select Search by ID</option>
                <option value="File No">File No</option>
                <option value="Email">Email</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '150px' }}>
              <label style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-muted)' }}>Financial Year</label>
              <select 
                className="search-input-box" 
                style={{ width: '100%', height: '38px' }}
                value={currentYearVal}
                onChange={handleYearChange}
              >
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary" style={{ padding: '8px 24px', height: '38px' }}>
              Submit
            </button>
          </form>

          {/* Members Table */}
          <div className="table-responsive">
            <table className="corporate-table">
              <thead>
                <tr>
                  <th style={{ width: '60px' }}>S.No</th>
                  <th>Name</th>
                  <th>File No</th>
                  <th>Filing Type</th>
                  <th>E-mail</th>
                  <th>File Status</th>
                  <th style={{ width: '80px', textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member, index) => (
                    <tr key={member.sNo}>
                      <td>{index + 1}</td>
                      <td style={{ fontWeight: '500' }}>{member.name}</td>
                      <td>{member.fileNo}</td>
                      <td>{member.filingType}</td>
                      <td>
                        <div className="email-cell-container" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span>
                            {unmaskedFields[`cs_${member.sNo}_email`] ? member.email : getMaskedEmail(member.email)}
                          </span>
                          <button 
                            type="button" 
                            className="email-toggle-eye-btn" 
                            onClick={() => handleFieldClick(`cs_${member.sNo}_email`, !!unmaskedFields[`cs_${member.sNo}_email`])}
                            title="Toggle Email View"
                            style={{ padding: '2px', display: 'inline-flex', color: '#0076a3', border: 'none', background: 'none', cursor: 'pointer' }}
                          >
                            <Eye size={14} />
                          </button>
                        </div>
                      </td>
                      <td>
                        <span style={{ 
                          color: member.status.includes('Complete') ? 'var(--color-darkgreen-btn)' : 
                                 member.status.includes('Pending') ? '#856404' : '#212529',
                          fontWeight: member.status.includes('Complete') ? 'bold' : 'normal'
                        }}>
                          {member.status}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button 
                          type="button" 
                          className="btn" 
                          style={{ backgroundColor: '#5cb85c', color: '#ffffff', padding: '4px 10px', fontSize: '12px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
                          onClick={() => setSelectedMember(member)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>
                      No registered members found for year {currentYearVal}.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          {filteredMembers.length > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
              <div className="pagination-row">
                <button className="page-link-btn active">1</button>
                {filteredMembers.length > 20 && <button className="page-link-btn">2</button>}
                {filteredMembers.length > 20 && <button className="page-link-btn">&gt;</button>}
                {filteredMembers.length > 20 && <button className="page-link-btn">Last</button>}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Showing 1 to {Math.min(filteredMembers.length, 20)} of {filteredMembers.length} entries
              </div>
            </div>
          )}
        </>
      )}

      {/* OTP Verification Modal */}
      {showOtpModal && (
        <div className="modal-overlay">
          <div className="modal-dialog" style={{ width: '400px' }}>
            <div className="modal-header">
              <h3 className="modal-title">Verification Code Required</h3>
              <button type="button" className="modal-close-trigger" onClick={() => setShowOtpModal(false)}>
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
              <button type="button" className="btn btn-secondary" style={{ padding: '8px 16px' }} onClick={() => setShowOtpModal(false)}>
                Cancel
              </button>
              <button 
                type="button" 
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
