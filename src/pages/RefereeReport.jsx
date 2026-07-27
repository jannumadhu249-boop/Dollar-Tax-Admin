import React, { useState } from 'react';
import { Eye, EyeOff, Shield, X, CheckCircle, Clock, RefreshCw, Loader2 } from 'lucide-react';

const MOCK_REFEREES = [
  { sNo: 1, name: 'Xander', email: 'xander@example.com', mobile: '+13358937743', refName: 'Xander', refEmail: 'xander.ref@example.com', followUpDate: '', description: '', status: '' },
  { sNo: 2, name: 'Mafalda', email: 'mafalda@example.com', mobile: '+14633078107', refName: 'Mafalda', refEmail: 'mafalda.ref@example.com', followUpDate: '', description: '', status: '' },
  { sNo: 3, name: 'Rosalind', email: 'rosalind@example.com', mobile: '+16833551411', refName: 'Rosalind', refEmail: 'rosalind.ref@example.com', followUpDate: '', description: '', status: '' },
  { sNo: 4, name: 'Tomasa', email: 'tomasa@example.com', mobile: '+18619628343', refName: 'Tomasa', refEmail: 'tomasa.ref@example.com', followUpDate: '', description: '', status: '' },
  { sNo: 5, name: 'OVOZsWGZWouPpmxEiQfvlkJ', email: 'ovozs@example.com', mobile: '2690641930', refName: 'ynupxenlhkuiaRJcvSzxn', refEmail: 'ynupxen@example.com', followUpDate: '', description: '', status: '' },
  { sNo: 6, name: 'Alvina', email: 'alvina@example.com', mobile: '+18967408834', refName: 'Alvina', refEmail: 'alvina.ref@example.com', followUpDate: '', description: '', status: '' },
  { sNo: 7, name: 'Alfredo', email: 'alfredo@example.com', mobile: '+14153584169', refName: 'Alfredo', refEmail: 'alfredo.ref@example.com', followUpDate: '', description: '', status: '' },
  { sNo: 8, name: 'Rafaela', email: 'rafaela@example.com', mobile: '+12099523099', refName: 'Rafaela', refEmail: 'rafaela.ref@example.com', followUpDate: '', description: '', status: '' },
  { sNo: 9, name: 'Luisa', email: 'luisa@example.com', mobile: '+18919852328', refName: 'Luisa', refEmail: 'luisa.ref@example.com', followUpDate: '', description: '', status: '' },
  { sNo: 10, name: 'Edwin', email: 'edwin@example.com', mobile: '+17645175105', refName: 'Edwin', refEmail: 'edwin.ref@example.com', followUpDate: '', description: '', status: '' },
  { sNo: 11, name: 'Corbin', email: 'corbin@example.com', mobile: '+1547715501', refName: 'Corbin', refEmail: 'corbin.ref@example.com', followUpDate: '', description: '', status: '' },
  { sNo: 12, name: 'Luna', email: 'luna@example.com', mobile: '+19135567528', refName: 'Luna', refEmail: 'luna.ref@example.com', followUpDate: '', description: '', status: '' },
  { sNo: 13, name: 'Lyla', email: 'lyla@example.com', mobile: '+12018277530', refName: 'Lyla', refEmail: 'lyla.ref@example.com', followUpDate: '', description: '', status: '' },
  { sNo: 14, name: 'Wilhelmine', email: 'wilhelmine@example.com', mobile: '+16406335216', refName: 'Wilhelmine', refEmail: 'wilhelmine.ref@example.com', followUpDate: '', description: '', status: '' },
  { sNo: 15, name: 'Lane', email: 'lane@example.com', mobile: '+12687058507', refName: 'Lane', refEmail: 'lane.ref@example.com', followUpDate: '', description: '', status: '' },
  { sNo: 16, name: 'Cathryn', email: 'cathryn@example.com', mobile: '+18194622410', refName: 'Cathryn', refEmail: 'cathryn.ref@example.com', followUpDate: '', description: '', status: '' },
  { sNo: 17, name: 'Alejandra', email: 'alejandra@example.com', mobile: '+17718924003', refName: 'Alejandra', refEmail: 'alejandra.ref@example.com', followUpDate: '', description: '', status: '' },
  { sNo: 18, name: 'Lisandro', email: 'lisandro@example.com', mobile: '+18766754898', refName: 'Lisandro', refEmail: 'lisandro.ref@example.com', followUpDate: '', description: '', status: '' },
  { sNo: 19, name: 'Andrew', email: 'andrew@example.com', mobile: '+14436666129', refName: 'Andrew', refEmail: 'andrew.ref@example.com', followUpDate: '', description: '', status: '' },
  { sNo: 20, name: 'Jamie', email: 'jamie@example.com', mobile: '+17097203281', refName: 'Jamie', refEmail: 'jamie.ref@example.com', followUpDate: '', description: '', status: '' },
];

export default function RefereeReport() {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [unmasked, setUnmasked] = useState({});
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [pendingKey, setPendingKey] = useState(null);
  const [pendingLabel, setPendingLabel] = useState('');
  const [otpInput, setOtpInput] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(120);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpError, setOtpError] = useState('');

  const handleEyeClick = (key, label) => {
    if (unmasked[key]) {
      setUnmasked((prev) => ({ ...prev, [key]: false }));
    } else {
      setPendingKey(key);
      setPendingLabel(label);
      setOtpInput(['', '', '', '', '', '']);
      setTimeLeft(120);
      setOtpError('');
      setOtpModalOpen(true);
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const code = otpInput.join('');
    if (code.length < 6) {
      setOtpError('Please enter the 6-digit code.');
      return;
    }
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      if (pendingKey) {
        setUnmasked((prev) => ({ ...prev, [pendingKey]: true }));
      }
      setOtpModalOpen(false);
    }, 500);
  };

  const filteredReferees = MOCK_REFEREES.filter((r) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      r.name.toLowerCase().includes(term) ||
      r.refName.toLowerCase().includes(term) ||
      r.mobile.includes(term)
    );
  });

  return (
    <div style={{ padding: '20px', background: '#fff', minHeight: '100vh' }}>
      {/* Title */}
      <h2 style={{ fontSize: '20px', color: '#334155', fontWeight: '500', marginBottom: '20px' }}>
        Referee Report
      </h2>

      {/* Controls Bar matching Image 2 design */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
        {/* Left Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Status</span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{
              padding: '6px 10px',
              border: '1px solid #cbd5e1',
              borderRadius: '4px',
              fontSize: '13px',
              background: '#fff',
              outline: 'none'
            }}
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
          </select>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            style={{
              padding: '6px 10px',
              border: '1px solid #cbd5e1',
              borderRadius: '4px',
              fontSize: '13px',
              background: '#fff',
              outline: 'none'
            }}
          >
            <option value="">Select year</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>

          <button
            onClick={() => alert('Exporting Referee Report to Excel...')}
            style={{
              padding: '6px 14px',
              background: '#e2e8f0',
              border: '1px solid #cbd5e1',
              borderRadius: '4px',
              fontSize: '13px',
              fontWeight: '500',
              color: '#334155',
              cursor: 'pointer'
            }}
          >
            Export to Excel
          </button>
        </div>

        {/* Right Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <input
            type="text"
            placeholder=""
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '6px 10px',
              border: '1px solid #cbd5e1',
              borderRadius: '4px 0 0 4px',
              fontSize: '13px',
              width: '180px',
              outline: 'none'
            }}
          />
          <button
            onClick={() => {}}
            style={{
              padding: '6px 16px',
              background: '#3182ce',
              color: '#fff',
              border: 'none',
              borderRadius: '0 4px 4px 0',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Search
          </button>
        </div>
      </div>

      {/* Table matching Image 2 */}
      <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f1f5f9', borderBottom: '1px solid #cbd5e1', color: '#1e293b' }}>
              <th style={{ padding: '10px 12px', fontWeight: '700', borderRight: '1px solid #e2e8f0' }}>S.No</th>
              <th style={{ padding: '10px 12px', fontWeight: '700', borderRight: '1px solid #e2e8f0' }}>Name</th>
              <th style={{ padding: '10px 12px', fontWeight: '700', borderRight: '1px solid #e2e8f0' }}>Email</th>
              <th style={{ padding: '10px 12px', fontWeight: '700', borderRight: '1px solid #e2e8f0' }}>Mobile</th>
              <th style={{ padding: '10px 12px', fontWeight: '700', borderRight: '1px solid #e2e8f0' }}>Referred By Name</th>
              <th style={{ padding: '10px 12px', fontWeight: '700', borderRight: '1px solid #e2e8f0' }}>Referred By Email</th>
              <th style={{ padding: '10px 12px', fontWeight: '700', borderRight: '1px solid #e2e8f0' }}>Follow Up date</th>
              <th style={{ padding: '10px 12px', fontWeight: '700', borderRight: '1px solid #e2e8f0' }}>Description</th>
              <th style={{ padding: '10px 12px', fontWeight: '700' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredReferees.map((r, idx) => {
              const emailKey = `ref_email_${r.sNo}`;
              const refEmailKey = `ref_by_email_${r.sNo}`;

              return (
                <tr
                  key={r.sNo}
                  style={{
                    borderBottom: '1px solid #e2e8f0',
                    background: idx % 2 === 1 ? '#f8fafc' : '#fff'
                  }}
                >
                  <td style={{ padding: '10px 12px', color: '#64748b', borderRight: '1px solid #f1f5f9' }}>{r.sNo}</td>
                  <td style={{ padding: '10px 12px', color: '#334155', borderRight: '1px solid #f1f5f9' }}>{r.name}</td>
                  <td style={{ padding: '10px 12px', borderRight: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>{unmasked[emailKey] ? r.email : 'XXXXXXXXXX.com'}</span>
                      <button
                        onClick={() => handleEyeClick(emailKey, `Email for ${r.name}`)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0076a3', padding: 0 }}
                      >
                        {unmasked[emailKey] ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </td>
                  <td style={{ padding: '10px 12px', color: '#334155', borderRight: '1px solid #f1f5f9' }}>{r.mobile}</td>
                  <td style={{ padding: '10px 12px', color: '#334155', borderRight: '1px solid #f1f5f9' }}>{r.refName}</td>
                  <td style={{ padding: '10px 12px', borderRight: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>{unmasked[refEmailKey] ? r.refEmail : 'XXXXXXXXXX.com'}</span>
                      <button
                        onClick={() => handleEyeClick(refEmailKey, `Referred By Email for ${r.refName}`)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0076a3', padding: 0 }}
                      >
                        {unmasked[refEmailKey] ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </td>
                  <td style={{ padding: '10px 12px', color: '#64748b', borderRight: '1px solid #f1f5f9' }}>{r.followUpDate || '—'}</td>
                  <td style={{ padding: '10px 12px', color: '#64748b', borderRight: '1px solid #f1f5f9' }}>{r.description || '—'}</td>
                  <td style={{ padding: '10px 12px', color: '#64748b' }}>{r.status || '—'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination matching design */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '16px', fontSize: '12px' }}>
        <button style={{ padding: '4px 8px', border: '1px solid #cbd5e1', background: '#e2e8f0', fontWeight: '700', cursor: 'pointer', borderRadius: '2px' }}>1</button>
        <button style={{ padding: '4px 8px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', borderRadius: '2px' }}>2</button>
        <button style={{ padding: '4px 8px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', borderRadius: '2px' }}>3</button>
        <button style={{ padding: '4px 8px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', borderRadius: '2px' }}>&gt;</button>
        <button style={{ padding: '4px 8px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', borderRadius: '2px' }}>Last &gt;</button>
      </div>

      {/* OTP Modal */}
      {otpModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.65)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '16px' }}>
          <div style={{ background: '#fff', borderRadius: '12px', width: '100%', maxWidth: '420px', overflow: 'hidden', boxShadow: '0 20px 25px rgba(0,0,0,0.2)' }}>
            <div style={{ background: '#0076a3', padding: '16px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Shield size={18} />
                <span style={{ fontWeight: '700', fontSize: '15px' }}>OTP Verification Required</span>
              </div>
              <button onClick={() => setOtpModalOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleVerifyOtp} style={{ padding: '20px' }}>
              <p style={{ fontSize: '13px', color: '#475569', textAlign: 'center', marginBottom: '16px' }}>
                Enter the 6-digit OTP sent to unmask {pendingLabel}
              </p>

              {otpError && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', borderRadius: '6px', padding: '8px 12px', fontSize: '12px', marginBottom: '14px' }}>
                  ⚠️ {otpError}
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '20px' }}>
                {otpInput.map((val, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    value={val}
                    onChange={(e) => {
                      const next = [...otpInput];
                      next[i] = e.target.value;
                      setOtpInput(next);
                    }}
                    style={{ width: '40px', height: '46px', textAlign: 'center', fontSize: '18px', fontWeight: '700', border: '1px solid #cbd5e1', borderRadius: '6px', outline: 'none' }}
                  />
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setOtpModalOpen(false)} style={{ padding: '8px 16px', border: '1px solid #cbd5e1', borderRadius: '6px', background: '#fff', fontSize: '13px', cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" disabled={isVerifying} style={{ padding: '8px 18px', border: 'none', borderRadius: '6px', background: '#0076a3', color: '#fff', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
                  {isVerifying ? 'Verifying...' : 'Verify & Reveal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
