import React, { useState } from 'react';

const MOCK_STAGE_MEMBERS = [
  { sNo: 1, name: 'Balu Krishna', fileNo: '100253', loginYear: '2026', stage1: 'A5', stage2: 'B5' },
  { sNo: 2, name: 'Yash Yash', fileNo: '101588', loginYear: '2025', stage1: 'A5', stage2: 'B5' },
  { sNo: 3, name: 'Ravi Teja', fileNo: '101587', loginYear: '2025', stage1: 'A3', stage2: 'B3' },
  { sNo: 4, name: 'Hemanth Chellangi', fileNo: '101586', loginYear: '2025', stage1: 'A1', stage2: 'B1' },
  { sNo: 5, name: 'Harish Prakasha', fileNo: '41702', loginYear: '2025', stage1: 'A3', stage2: 'B3' },
  { sNo: 6, name: 'Miles Maddox', fileNo: '101585', loginYear: '2025', stage1: 'A2', stage2: 'B2' },
  { sNo: 7, name: 'Virendra Kumar', fileNo: '101584', loginYear: '2025', stage1: 'A1', stage2: 'B1' },
  { sNo: 8, name: 'PRADEEP PUNNATI', fileNo: '70056', loginYear: '2025', stage1: 'A7', stage2: 'B7' },
  { sNo: 9, name: 'Yogeshkumar Kuite', fileNo: '101583', loginYear: '2025', stage1: 'A6', stage2: 'B6' },
  { sNo: 10, name: 'Gurpreet Kaur LNU', fileNo: '81350', loginYear: '2025', stage1: 'A5', stage2: 'B5' },
  { sNo: 11, name: 'Haron Constantino Athayde De Lima', fileNo: '81351', loginYear: '2025', stage1: 'A4', stage2: 'B4' },
  { sNo: 12, name: 'Gururaja Ghorpade', fileNo: '101582', loginYear: '2025', stage1: 'A3', stage2: 'B3' },
  { sNo: 13, name: 'Vamsi Krishna', fileNo: '101581', loginYear: '2025', stage1: 'A2', stage2: 'B2' },
  { sNo: 14, name: 'Urmi Phanse', fileNo: '101580', loginYear: '2025', stage1: 'A1', stage2: 'B1' },
  { sNo: 15, name: 'Dhruvi Doshi', fileNo: '80203', loginYear: '2025', stage1: 'A7', stage2: 'B7' },
  { sNo: 16, name: 'Mathew Burke', fileNo: '101579', loginYear: '2025', stage1: 'A6', stage2: 'B6' },
  { sNo: 17, name: 'Taneisha West', fileNo: '101578', loginYear: '2025', stage1: 'A5', stage2: 'B5' },
  { sNo: 18, name: 'Urmi Phanse', fileNo: '101577', loginYear: '2025', stage1: 'A4', stage2: 'B4' },
  { sNo: 19, name: 'Nkengafack Thierry', fileNo: '101576', loginYear: '2025', stage1: 'A3', stage2: 'B3' },
  { sNo: 20, name: 'Sai Jollu', fileNo: '101575', loginYear: '2025', stage1: 'A2', stage2: 'B2' },
];

export default function ClientStage() {
  const [searchName, setSearchName] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedYear, setSelectedYear] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const [activeFilter, setActiveFilter] = useState({ name: '', dateFrom: '', dateTo: '', year: 'All' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setActiveFilter({ name: searchName, dateFrom, dateTo, year: selectedYear });
    setCurrentPage(1);
  };

  const filteredMembers = MOCK_STAGE_MEMBERS.filter((m) => {
    const matchesName = !activeFilter.name || m.name.toLowerCase().includes(activeFilter.name.toLowerCase());
    const matchesYear = activeFilter.year === 'All' || m.loginYear === activeFilter.year;
    return matchesName && matchesYear;
  });

  return (
    <div style={{ padding: '20px', background: '#fff', minHeight: '100vh' }}>
      {/* Title */}
      <h2 style={{ fontSize: '20px', color: '#334155', fontWeight: '500', marginBottom: '20px' }}>
        Registered Member Stages
      </h2>

      {/* Search / Filter Bar matching design */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'flex-end', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '12px', fontWeight: '600', color: '#334155' }}>Name</label>
          <input
            type="text"
            placeholder="Seacarch by Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            style={{
              padding: '6px 10px',
              border: '1px solid #cbd5e1',
              borderRadius: '4px',
              fontSize: '13px',
              width: '180px',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '12px', fontWeight: '600', color: '#334155' }}>Date From</label>
          <input
            type="text"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            style={{
              padding: '6px 10px',
              border: '1px solid #cbd5e1',
              borderRadius: '4px',
              fontSize: '13px',
              width: '150px',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '12px', fontWeight: '600', color: '#334155' }}>Date To</label>
          <input
            type="text"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            style={{
              padding: '6px 10px',
              border: '1px solid #cbd5e1',
              borderRadius: '4px',
              fontSize: '13px',
              width: '150px',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '12px', fontWeight: '600', color: '#334155' }}>Year</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            style={{
              padding: '6px 10px',
              border: '1px solid #cbd5e1',
              borderRadius: '4px',
              fontSize: '13px',
              width: '100px',
              outline: 'none',
              background: '#fff'
            }}
          >
            <option value="All">All</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>
        </div>

        <button
          type="submit"
          style={{
            padding: '7px 20px',
            background: '#3182ce',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Submit
        </button>
      </form>

      {/* Table matching design */}
      <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f1f5f9', borderBottom: '1px solid #cbd5e1', color: '#1e293b' }}>
              <th style={{ padding: '10px 12px', fontWeight: '700', borderRight: '1px solid #e2e8f0' }}>S.No</th>
              <th style={{ padding: '10px 12px', fontWeight: '700', borderRight: '1px solid #e2e8f0' }}>Name</th>
              <th style={{ padding: '10px 12px', fontWeight: '700', borderRight: '1px solid #e2e8f0' }}>File No</th>
              <th style={{ padding: '10px 12px', fontWeight: '700', borderRight: '1px solid #e2e8f0' }}>Login Year</th>
              <th style={{ padding: '10px 12px', fontWeight: '700', borderRight: '1px solid #e2e8f0' }}>Stage I</th>
              <th style={{ padding: '10px 12px', fontWeight: '700' }}>Stage II</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((m, idx) => (
              <tr
                key={m.sNo}
                style={{
                  borderBottom: '1px solid #e2e8f0',
                  background: idx % 2 === 1 ? '#f8fafc' : '#fff'
                }}
              >
                <td style={{ padding: '10px 12px', color: '#64748b', borderRight: '1px solid #f1f5f9' }}>{m.sNo}</td>
                <td style={{ padding: '10px 12px', color: '#334155', borderRight: '1px solid #f1f5f9' }}>{m.name}</td>
                <td style={{ padding: '10px 12px', color: '#334155', borderRight: '1px solid #f1f5f9' }}>{m.fileNo}</td>
                <td style={{ padding: '10px 12px', color: '#334155', borderRight: '1px solid #f1f5f9' }}>{m.loginYear}</td>
                <td style={{ padding: '10px 12px', color: '#334155', borderRight: '1px solid #f1f5f9' }}>{m.stage1}</td>
                <td style={{ padding: '10px 12px', color: '#334155' }}>{m.stage2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination matching design */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '16px', fontSize: '12px' }}>
        <button
          onClick={() => setCurrentPage(1)}
          style={{
            padding: '4px 8px',
            border: '1px solid #cbd5e1',
            background: currentPage === 1 ? '#e2e8f0' : '#fff',
            fontWeight: currentPage === 1 ? '700' : 'normal',
            cursor: 'pointer',
            borderRadius: '2px'
          }}
        >
          1
        </button>
        <button
          onClick={() => setCurrentPage(2)}
          style={{
            padding: '4px 8px',
            border: '1px solid #cbd5e1',
            background: currentPage === 2 ? '#e2e8f0' : '#fff',
            fontWeight: currentPage === 2 ? '700' : 'normal',
            cursor: 'pointer',
            borderRadius: '2px'
          }}
        >
          2
        </button>
        <button
          onClick={() => setCurrentPage(3)}
          style={{
            padding: '4px 8px',
            border: '1px solid #cbd5e1',
            background: currentPage === 3 ? '#e2e8f0' : '#fff',
            fontWeight: currentPage === 3 ? '700' : 'normal',
            cursor: 'pointer',
            borderRadius: '2px'
          }}
        >
          3
        </button>
        <button style={{ padding: '4px 8px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', borderRadius: '2px' }}>&gt;</button>
        <button style={{ padding: '4px 8px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', borderRadius: '2px' }}>Last &gt;</button>
      </div>
    </div>
  );
}
