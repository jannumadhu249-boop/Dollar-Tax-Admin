import React, { useState } from 'react';

export default function QueryList() {
  const [searchEmail, setSearchEmail] = useState('');
  const [filterQuery, setFilterQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  // To track replies entered per row (mapped by row S.No)
  const [replies, setReplies] = useState({});

  // Mock data based on the screenshot
  const initialQueries = [
    {
      sNo: 1,
      name: 'Pruthvi Krishna Kompalli',
      email: 'pruthvi.kompalli@gmail.com',
      mobile: '2102840575',
      comments: 'Can you call me',
      dateCreated: '2026-06-16 19:22:09'
    },
    {
      sNo: 2,
      name: 'SUSHIL DHAMGAYE',
      email: 'sushil.d@yahoo.com',
      mobile: '4048342682',
      comments: 'Hi Team, I have received one letter from Georgia Department of Revenue for non resident alien individual . if you NOT then need to submit the attestation . Please check and let me know.',
      dateCreated: '2026-06-16 19:11:21'
    },
    {
      sNo: 3,
      name: 'Manasa Muthyala',
      email: 'manasa.muthyala@gmail.com',
      mobile: '3154024610',
      comments: 'I have questions about my tax returns. Please get back to me',
      dateCreated: '2026-06-15 03:05:54'
    },
    {
      sNo: 4,
      name: 'Tzunika Mohankali',
      email: 'tzunika.mohankali@gmail.com',
      mobile: '+14052190233',
      comments: 'Hey call me',
      dateCreated: '2026-06-13 16:02:15'
    },
    {
      sNo: 5,
      name: 'Devi Sundararajan',
      email: 'devi.s@outlook.com',
      mobile: '+16464196243',
      comments: 'I had sent my spouse and Sons ITIN details thru Mail. please proceed with state tax filing',
      dateCreated: '2026-05-31 22:40:03'
    },
    {
      sNo: 6,
      name: 'Alpeshkumar Patel',
      email: 'alpesh.patel@gmail.com',
      mobile: '7324020182',
      comments: 'I see my tax return for 2024 missing schedule 1 . can you please help me with schedule1 for 2024?',
      dateCreated: '2026-05-31 14:32:30'
    },
    {
      sNo: 7,
      name: 'Aashish Gupta',
      email: 'aashish.gupta@gmail.com',
      mobile: '9104002531',
      comments: 'I need my Tax return copies for 2018 and 2017 please send me ASAP',
      dateCreated: '2026-05-31 13:45:07'
    },
    {
      sNo: 8,
      name: 'Sachin Kamble',
      email: 'sachin.kamble@gmail.com',
      mobile: '1-7472048593',
      comments: 'Not received the refund yet',
      dateCreated: '2026-05-31 17:22:20'
    },
    {
      sNo: 9,
      name: 'Jebastin Thangaraj',
      email: 'jebastin.t@gmail.com',
      mobile: '+14807940232',
      comments: 'Not able to download 1040 for 2026',
      dateCreated: '2026-05-31 23:23:55'
    },
    {
      sNo: 10,
      name: 'Devi Sundararajan',
      email: 'devi.s@outlook.com',
      mobile: '+16464196243',
      comments: 'hi could you please call me back I got a notice from IRS',
      dateCreated: '2026-05-31 14:12:14'
    },
    {
      sNo: 11,
      name: 'Bharath Kumar Madani Venkataramana',
      email: 'bharath.kumar@gmail.com',
      mobile: '+12148038877',
      comments: 'I received IRS Notice CP318 for my kid. Please help if any action is necessary',
      dateCreated: '2026-05-30 17:12:48'
    },
    {
      sNo: 12,
      name: 'Abhisek Ransole',
      email: 'abhisek.ransole@gmail.com',
      mobile: '+17812191535',
      comments: 'Need to communicate. Return not received',
      dateCreated: '2026-05-28 16:16:23'
    },
    {
      sNo: 13,
      name: 'Sachin Gholap',
      email: 'sachin.gholap@gmail.com',
      mobile: '+12065046233',
      comments: "I didn't get my tax refund yet . Please check",
      dateCreated: '2026-05-27 19:57:27'
    },
    {
      sNo: 14,
      name: 'Rajeev Jamwal',
      email: 'rajeev.jamwal@gmail.com',
      mobile: '+15514306635',
      comments: 'Please ask you team to call me on +19293045539',
      dateCreated: '2026-05-20 19:38:04'
    },
    {
      sNo: 15,
      name: 'Giri babu Relkam',
      email: 'giribabu.r@gmail.com',
      mobile: '+13322770823',
      comments: 'My federal return has not been processed still now. Its been more than 1 month since federal return was filed and it still shows return is under process. Let me know my filing number for Federal and State returns so that I can follow up with IRS.',
      dateCreated: '2026-05-18 13:24:45'
    },
    {
      sNo: 16,
      name: 'Srinivas Kontu',
      email: 'srinivas.kontu@gmail.com',
      mobile: '+14806148144',
      comments: "Hello Sas, today I've received letter from IRS asking for additional/supporting information in order to process my tax returns. Could you please do the needful. Thanks",
      dateCreated: '2026-05-18 03:22:31'
    },
    {
      sNo: 17,
      name: 'SHASHIKANT ROHIDAS SONAWANE',
      email: 'shashikant.s@gmail.com',
      mobile: '5108544623',
      comments: 'How can I get tax returns for the year 2024?',
      dateCreated: '2026-05-17 22:22:00'
    },
    {
      sNo: 18,
      name: 'Rutvik Joshi',
      email: 'rutvik.joshi@gmail.com',
      mobile: '+13802137527',
      comments: 'All tax and travel documents uploaded. Not able to reach on phone number. Pls call back.',
      dateCreated: '2026-05-15 23:50:42'
    },
    {
      sNo: 19,
      name: 'Rajeev Jamwal',
      email: 'rajeev.jamwal@gmail.com',
      mobile: '+15514306635',
      comments: 'My Tax return was filed on march 6th 2020 but I am yet to receive my refund. Can you please check and let me know the status >',
      dateCreated: '2026-05-15 22:39:55'
    },
    {
      sNo: 20,
      name: 'Apoorva Rangara',
      email: 'apoorva.r@gmail.com',
      mobile: '1-9179521921',
      comments: 'Need copies of 2023 and 2024 tax returns. Please Can you email it to me?',
      dateCreated: '2026-05-11 21:04:58'
    }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setFilterQuery(searchEmail.trim());
    setCurrentPage(1);
  };

  const filteredQueries = initialQueries.filter((query) => {
    if (!filterQuery) return true;
    return query.email?.toLowerCase().includes(filterQuery.toLowerCase()) || 
           query.name?.toLowerCase().includes(filterQuery.toLowerCase());
  });

  const handleReplyChange = (sNo, value) => {
    setReplies(prev => ({
      ...prev,
      [sNo]: value
    }));
  };

  const handleSendReply = (sNo, name) => {
    const text = replies[sNo];
    if (!text || !text.trim()) {
      alert('Please enter a reply message before sending.');
      return;
    }
    alert(`Success: Reply sent to ${name}!\n\nMessage: "${text}"`);
    setReplies(prev => ({
      ...prev,
      [sNo]: ''
    }));
  };

  return (
    <div className="content-card" style={{ animation: 'fadeIn 0.2s ease-out' }}>
      <div className="header-section" style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '12px', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0, color: 'var(--text-dark)' }}>Send Query Requests</h2>
      </div>

      {/* Search Bar matching screenshot */}
      <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#333' }}>Email</label>
          <input
            type="text"
            className="search-input-box"
            placeholder="Search by Email"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            style={{ width: '220px' }}
          />
        </div>
        <button
          type="submit"
          className="btn"
          style={{
            backgroundColor: '#1b62a5',
            color: '#fff',
            border: 'none',
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: '600',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer'
          }}
        >
          Submit
        </button>
        {filterQuery && (
          <button
            type="button"
            className="btn"
            onClick={() => {
              setSearchEmail('');
              setFilterQuery('');
            }}
            style={{
              backgroundColor: '#6c757d',
              color: '#fff',
              border: 'none',
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: '600',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer'
            }}
          >
            Clear
          </button>
        )}
      </form>

      {/* Table Section */}
      <div className="table-responsive">
        <table className="corporate-table">
          <thead>
            <tr>
              <th style={{ width: '60px' }}>S.No</th>
              <th style={{ width: '150px' }}>Name</th>
              <th style={{ width: '120px' }}>Mobile</th>
              <th>Comments</th>
              <th style={{ width: '150px' }}>Date Created</th>
              <th style={{ width: '280px' }}>Reply</th>
            </tr>
          </thead>
          <tbody>
            {filteredQueries.length > 0 ? (
              filteredQueries.map((query, idx) => (
                <tr key={query.sNo}>
                  <td>{idx + 1}</td>
                  <td style={{ fontWeight: '500' }}>{query.name}</td>
                  <td>{query.mobile}</td>
                  <td style={{ whiteSpace: 'pre-wrap', lineHeight: '1.4' }}>{query.comments}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{query.dateCreated}</td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <textarea
                        rows="2"
                        className="search-input-box"
                        placeholder="Please Enter Replay"
                        value={replies[query.sNo] || ''}
                        onChange={(e) => handleReplyChange(query.sNo, e.target.value)}
                        style={{ width: '100%', height: '54px', fontSize: '12px', fontFamily: 'inherit', resize: 'vertical', padding: '6px' }}
                      />
                      <button
                        type="button"
                        onClick={() => handleSendReply(query.sNo, query.name)}
                        style={{
                          backgroundColor: '#3ea94f',
                          color: '#fff',
                          border: 'none',
                          padding: '6px 12px',
                          fontSize: '12px',
                          fontWeight: '600',
                          borderRadius: 'var(--radius-sm)',
                          cursor: 'pointer',
                          alignSelf: 'flex-start'
                        }}
                      >
                        Send Reply
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  No queries found matching the search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
        <div className="pagination-row">
          <button className={`page-link-btn ${currentPage === 1 ? 'active' : ''}`} onClick={() => setCurrentPage(1)}>1</button>
          <button className={`page-link-btn ${currentPage === 2 ? 'active' : ''}`} onClick={() => setCurrentPage(2)}>2</button>
          <button className={`page-link-btn ${currentPage === 3 ? 'active' : ''}`} onClick={() => setCurrentPage(3)}>3</button>
          <button className="page-link-btn">&gt;</button>
          <button className="page-link-btn">Last</button>
        </div>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          Showing 1 to {filteredQueries.length} of {filteredQueries.length} entries
        </div>
      </div>
    </div>
  );
}
