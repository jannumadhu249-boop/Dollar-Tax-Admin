import React, { useState, useEffect } from 'react';
import { Eye, Edit2, Plus, Filter, X, ChevronLeft, ChevronRight } from 'lucide-react';

/* ─────────────── Mock Data ─────────────── */
const generateMockLeads = () => [
  { id: 1, date: '2025-03-02', name: 'Adhithya', mobile: '8602099673', email: 'Adhithyaranganathan@yahoo.com', referredBy: 'rubarajan muthu krishnan', followUpDate: '2025-03-02', description: 'registered', status: 'completed', link: 'https://www.dollartaxfiler.com/office/' },
  { id: 2, date: '2025-03-02', name: 'Anuj Pawar', mobile: '8572651363', email: 'pawar.anu@northeastern.edu', referredBy: 'Ketan Narayan Kshirsagar', followUpDate: '2025-03-05', description: 'he will register', status: 'completed', link: '' },
  { id: 3, date: '2025-03-02', name: 'Venkatesh Gunji', mobile: '4155736774', email: 'venkigunjl0359@gmail.com', referredBy: 'Naga Surya Kusumanjali Devi Badampudi', followUpDate: '2025-03-01', description: 'registered', status: 'completed', link: '' },
  { id: 4, date: '2025-03-02', name: 'Akshit Rajani', mobile: '9452683711', email: 'akshitrajani2001@gmail.com', referredBy: 'PINESH GOVINDBHAI MAGTARPARA', followUpDate: '2025-03-02', description: 'vm sent', status: 'pending', link: '' },
  { id: 5, date: '2025-03-02', name: 'Harish Gadde', mobile: '3177984208', email: 'gaddeharish.97@gmail.com', referredBy: 'Jetti Harika Naidu', followUpDate: '2025-03-02', description: 'registered', status: 'completed', link: '' },
  { id: 6, date: '2025-03-02', name: 'Kavish Shah', mobile: '3153951922', email: 'kavishshah07@gmail.com', referredBy: 'Jahnavi Mahetalia', followUpDate: '2025-03-05', description: 'he will get back to us', status: 'pending', link: '' },
  { id: 7, date: '2025-03-02', name: 'Ram Verma', mobile: '3473714720', email: 'R.verma22@outlook.com', referredBy: 'Ashish Sharma', followUpDate: '2025-03-03', description: 'he will register', status: 'pending', link: '' },
  { id: 8, date: '2025-03-02', name: 'Sahil Gupta', mobile: '3154509475', email: 'sgupta47@syr.edu', referredBy: 'Rashmi Joshi', followUpDate: '2025-03-02', description: 'registered', status: 'completed', link: '' },
  { id: 9, date: '2025-03-02', name: 'Sampath', mobile: '6824512452', email: 'sampathpenugonda@hotmail.com', referredBy: 'Suresh Kadali', followUpDate: '2025-03-03', description: 'vm sent', status: 'pending', link: '' },
  { id: 10, date: '2025-03-02', name: 'Devina Neema', mobile: '8579194885', email: 'Devinaneema188@gmail.com', referredBy: 'Parul Rathore', followUpDate: '2025-03-02', description: 'Registered', status: 'completed', link: '' },
  { id: 11, date: '2025-03-03', name: 'Priya Sharma', mobile: '9876543210', email: 'priya.sharma@gmail.com', referredBy: 'Ravi Kumar', followUpDate: '2025-03-06', description: 'interested', status: 'pending', link: '' },
  { id: 12, date: '2025-03-03', name: 'Kiran Mehta', mobile: '8765432109', email: 'kiran.mehta@outlook.com', referredBy: 'Sunita Patel', followUpDate: '2025-03-04', description: 'registered', status: 'completed', link: '' },
  { id: 13, date: '2025-03-04', name: 'Arjun Das', mobile: '7654321098', email: 'arjun.das@yahoo.com', referredBy: 'Mohan Rao', followUpDate: '2025-03-07', description: 'callback requested', status: 'pending', link: '' },
  { id: 14, date: '2025-03-04', name: 'Sneha Nair', mobile: '6543210987', email: 'sneha.nair@gmail.com', referredBy: 'Lakshmi Iyer', followUpDate: '2025-03-05', description: 'registered', status: 'completed', link: '' },
  { id: 15, date: '2025-03-05', name: 'Vikram Singh', mobile: '5432109876', email: 'vikram.singh@hotmail.com', referredBy: 'Deepak Verma', followUpDate: '2025-03-08', description: 'vm sent', status: 'pending', link: '' },
];

/* ─────────────── Helpers ─────────────── */
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, '0');
  const month = d.toLocaleString('en-US', { month: 'short' });
  const year = d.getFullYear();
  return `${day}th ${month} ${year}`;
};

const statusColor = (s) => {
  const lower = (s || '').toLowerCase();
  if (lower === 'completed') return { bg: 'rgba(40,167,69,0.12)', color: '#28a745' };
  if (lower === 'pending') return { bg: 'rgba(255,140,0,0.12)', color: '#e07b00' };
  return { bg: '#f0f0f0', color: '#555' };
};

/* ─────────────── Sub-components ─────────────── */

/** Modal wrapper */
function ModalOverlay({ children, onClose }) {
  return (
    <div
      className="modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {children}
    </div>
  );
}

/** Create New Lead Modal */
function CreateLeadModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    name: '', mobile: '', email: '', followUpDate: '',
    description: '', referredBy: '', status: 'pending',
  });

  const handle = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.mobile || !form.email) {
      alert('Name, Mobile and Email are required.');
      return;
    }
    onSave({
      ...form,
      date: new Date().toISOString().split('T')[0],
      link: '',
    });
  };

  return (
    <ModalOverlay onClose={onClose}>
      <div className="leads-modal-dialog" style={{ width: 380 }}>
        {/* Header */}
        <div className="leads-modal-header">
          <span className="leads-modal-title">Add New Lead</span>
          <button className="leads-modal-close" onClick={onClose}><X size={16} /></button>
        </div>

        {/* Body */}
        <form className="leads-modal-body" onSubmit={submit}>
          <div className="leads-form-row">
            <div className="leads-form-group">
              <label>Name <span className="leads-required">*</span></label>
              <input className="leads-input" value={form.name} onChange={handle('name')} placeholder="" />
            </div>
            <div className="leads-form-group">
              <label>Mobile <span className="leads-required">*</span></label>
              <input className="leads-input" value={form.mobile} onChange={handle('mobile')} placeholder="" />
            </div>
          </div>

          <div className="leads-form-row">
            <div className="leads-form-group">
              <label>Email <span className="leads-required">*</span></label>
              <input className="leads-input" value={form.email} onChange={handle('email')} placeholder="" />
            </div>
            <div className="leads-form-group">
              <label>FollowUp Date <span className="leads-required">*</span></label>
              <input className="leads-input" type="date" value={form.followUpDate} onChange={handle('followUpDate')} />
            </div>
          </div>

          <div className="leads-form-row">
            <div className="leads-form-group" style={{ flex: '0 0 100%' }}>
              <label>Description <span className="leads-required">*</span></label>
              <textarea className="leads-input leads-textarea" value={form.description} onChange={handle('description')} rows={3} />
            </div>
          </div>

          <div className="leads-form-row">
            <div className="leads-form-group" style={{ flex: '0 0 100%' }}>
              <label>Refered By <span className="leads-required">*</span></label>
              <input className="leads-input" value={form.referredBy} onChange={handle('referredBy')} placeholder="" />
            </div>
          </div>

          {/* Footer */}
          <div className="leads-modal-footer">
            <button type="button" className="leads-btn-close-modal" onClick={onClose}>Close</button>
            <button type="submit" className="leads-btn-save">Save</button>
          </div>
        </form>
      </div>
    </ModalOverlay>
  );
}

/** Edit Lead Modal */
function EditLeadModal({ lead, onClose, onSave }) {
  const [form, setForm] = useState({
    name: lead.name || '',
    mobile: lead.mobile || '',
    email: lead.email || '',
    referredBy: lead.referredBy || '',
    status: lead.status || 'pending',
    link: lead.link || '',
  });

  const handle = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    onSave({ ...lead, ...form });
  };

  return (
    <ModalOverlay onClose={onClose}>
      <div className="leads-modal-dialog" style={{ width: 390 }}>
        {/* Header */}
        <div className="leads-modal-header">
          <span className="leads-modal-title">Leads Edit</span>
          <button className="leads-modal-close" onClick={onClose}><X size={16} /></button>
        </div>

        {/* Body */}
        <form className="leads-modal-body" onSubmit={submit}>
          <div className="leads-form-row">
            <div className="leads-form-group">
              <label>Name</label>
              <input className="leads-input" value={form.name} onChange={handle('name')} />
            </div>
            <div className="leads-form-group">
              <label>Mobile</label>
              <input className="leads-input" value={form.mobile} onChange={handle('mobile')} />
            </div>
          </div>

          <div className="leads-form-row">
            <div className="leads-form-group">
              <label>Email</label>
              <input className="leads-input" value={form.email} onChange={handle('email')} />
            </div>
            <div className="leads-form-group">
              <label style={{ color: '#888', fontSize: '11px' }}>{lead.link || ''}</label>
              <label>Refered By</label>
              <input className="leads-input" value={form.referredBy} onChange={handle('referredBy')} />
            </div>
          </div>

          <div className="leads-form-row">
            <div className="leads-form-group" style={{ flex: '0 0 100%' }}>
              <label>Status</label>
              <select className="leads-input leads-select" value={form.status} onChange={handle('status')}>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="leads-modal-footer">
            <button type="button" className="leads-btn-close-modal" onClick={onClose}>Close</button>
            <button type="submit" className="leads-btn-save">Save Changes</button>
          </div>
        </form>
      </div>
    </ModalOverlay>
  );
}

/** Filter By Date Modal */
function FilterModal({ filter, onClose, onApply }) {
  const [from, setFrom] = useState(filter.from || '');
  const [to, setTo] = useState(filter.to || '');

  return (
    <ModalOverlay onClose={onClose}>
      <div className="leads-modal-dialog" style={{ width: 360 }}>
        <div className="leads-modal-header">
          <span className="leads-modal-title">Filter By Date</span>
          <button className="leads-modal-close" onClick={onClose}><X size={16} /></button>
        </div>
        <div className="leads-modal-body">
          <p style={{ fontSize: '11px', color: '#888', marginBottom: '12px' }}>
            https://www.dollartaxfiler.com/office/
          </p>
          <div className="leads-form-row" style={{ alignItems: 'flex-end' }}>
            <div className="leads-form-group">
              <label>From</label>
              <input className="leads-input" type="date" value={from} onChange={e => setFrom(e.target.value)} />
            </div>
            <div className="leads-form-group">
              <label>To</label>
              <input className="leads-input" type="date" value={to} onChange={e => setTo(e.target.value)} />
            </div>
          </div>
          <p style={{ fontSize: '11px', color: '#888', marginTop: '8px', marginBottom: '12px' }}>
            https://www.dollartaxfiler.com/office/
          </p>
          <div className="leads-modal-footer">
            <button className="leads-btn-close-modal" onClick={onClose}>Close</button>
            <button
              className="leads-btn-save"
              onClick={() => onApply({ from, to })}
            >
              Filter
            </button>
          </div>
        </div>
      </div>
    </ModalOverlay>
  );
}

/** Lead Detail View */
function LeadDetailView({ lead, onBack }) {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="content-card" style={{ animation: 'fadeIn 0.2s ease-out' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 className="view-title" style={{ marginBottom: 0, borderBottom: 'none', paddingBottom: 0 }}>
          Leads Details
        </h2>
        <button className="detail-back-btn" onClick={onBack}>Back</button>
      </div>

      {/* Tabs */}
      <div className="detail-tabs-row" style={{ marginBottom: '0' }}>
        <button
          className={`detail-tab-btn ${activeTab === 'general' ? 'active' : ''}`}
          onClick={() => setActiveTab('general')}
        >
          General
        </button>
        <button
          className={`detail-tab-btn ${activeTab === 'discussion' ? 'active' : ''}`}
          onClick={() => setActiveTab('discussion')}
        >
          Discussion
        </button>
      </div>

      {/* Tab content */}
      <div style={{ border: '1px solid #ddd', borderTop: 'none', padding: '0' }}>
        {activeTab === 'general' && (
          <div className="table-responsive" style={{ margin: 0, border: 'none' }}>
            <table className="corporate-table detail-card-table" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>E-mail</th>
                  <th>Status</th>
                  <th>Follow Up date</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{lead.date}</td>
                  <td>{lead.name}</td>
                  <td>{lead.mobile}</td>
                  <td style={{ color: '#1a6eb5' }}>{lead.email}</td>
                  <td>{lead.description}</td>
                  <td style={{ color: '#1a6eb5' }}>{lead.followUpDate}</td>
                  <td style={{ color: '#1a6eb5' }}>{lead.status === 'completed' ? 'registered' : lead.status}</td>
                </tr>
                {lead.link && (
                  <tr>
                    <td colSpan={7}>
                      <a href={lead.link} target="_blank" rel="noreferrer" style={{ color: '#1a6eb5', fontSize: '12px' }}>
                        {lead.link}
                      </a>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'discussion' && (
          <div style={{ padding: '24px', color: '#888', fontSize: '13px' }}>
            No discussions yet.
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────── Main Leads Component ─────────────── */
export default function Leads() {
  const [leads, setLeads] = useState(() => generateMockLeads());
  const [viewLead, setViewLead] = useState(null);
  const [editLead, setEditLead] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFilter, setDateFilter] = useState({ from: '', to: '' });

  /* ── Filtering ── */
  const filtered = leads.filter(l => {
    const matchSearch =
      !searchTerm ||
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.mobile.includes(searchTerm) ||
      l.referredBy.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus =
      statusFilter === 'All' ||
      (l.status || '').toLowerCase() === statusFilter.toLowerCase();

    const matchDateFrom = !dateFilter.from || l.date >= dateFilter.from;
    const matchDateTo = !dateFilter.to || l.date <= dateFilter.to;

    return matchSearch && matchStatus && matchDateFrom && matchDateTo;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  useEffect(() => { setCurrentPage(1); }, [searchTerm, statusFilter, perPage, dateFilter]);

  /* ── Handlers ── */
  const handleCreate = (newLead) => {
    setLeads(prev => [{ id: prev.length + 1, ...newLead }, ...prev]);
    setShowCreate(false);
  };

  const handleEdit = (updated) => {
    setLeads(prev => prev.map(l => (l.id === updated.id ? updated : l)));
    setEditLead(null);
  };

  const handleApplyFilter = (f) => {
    setDateFilter(f);
    setShowFilter(false);
  };

  /* ── Pagination helpers ── */
  const pageNumbers = () => {
    const pages = [];
    const delta = 2;
    const range = [];
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }
    if (totalPages <= 1) return [1];
    pages.push(1);
    if (range[0] > 2) pages.push('...');
    range.forEach(p => pages.push(p));
    if (range[range.length - 1] < totalPages - 1) pages.push('...');
    if (totalPages > 1) pages.push(totalPages);
    return pages;
  };

  /* ── Show detail view ── */
  if (viewLead) {
    return <LeadDetailView lead={viewLead} onBack={() => setViewLead(null)} />;
  }

  return (
    <div className="content-card" style={{ animation: 'fadeIn 0.2s ease-out' }}>
      <h2 className="view-title">Leads</h2>

      {/* Top controls row */}
      <div className="leads-controls-row">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            className="leads-btn-new"
            onClick={() => setShowCreate(true)}
          >
            <Plus size={14} /> New Lead
          </button>
        </div>
        <button className="leads-btn-filter" onClick={() => setShowFilter(true)}>
          Filter
        </button>
      </div>

      {/* Second controls row */}
      <div className="leads-sub-controls">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <select
            className="leads-status-filter"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, justifyContent: 'flex-end' }}>
          <select
            className="leads-per-page"
            value={perPage}
            onChange={e => setPerPage(Number(e.target.value))}
          >
            {[10, 25, 50, 100].map(v => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
          <span style={{ fontSize: '13px', color: '#555' }}>entries per page</span>
          <span style={{ fontSize: '13px', color: '#555', marginLeft: '16px' }}>Search:</span>
          <input
            className="leads-search-box"
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="corporate-table leads-table">
          <thead>
            <tr>
              <th>S.No ↕</th>
              <th>Date ↕</th>
              <th>Name ↕</th>
              <th>Mobile ↕</th>
              <th>E-mail ↕</th>
              <th>Refered By ↕</th>
              <th>Follow Up date ↕</th>
              <th>Description ↕</th>
              <th>Status ↕</th>
              <th>Action ↕</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={10} style={{ textAlign: 'center', padding: '24px', color: '#888' }}>
                  No leads found.
                </td>
              </tr>
            ) : (
              paginated.map((lead, idx) => {
                const sc = statusColor(lead.status);
                return (
                  <tr key={lead.id} className={idx % 2 === 0 ? 'leads-row-even' : 'leads-row-odd'}>
                    <td>{(currentPage - 1) * perPage + idx + 1}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      <span style={{ color: '#1a6eb5', fontWeight: 500 }}>
                        {formatDate(lead.date)}
                      </span>
                    </td>
                    <td>{lead.name}</td>
                    <td>{lead.mobile}</td>
                    <td>
                      <a href={`mailto:${lead.email}`} style={{ color: '#1a6eb5', textDecoration: 'none' }}>
                        {lead.email}
                      </a>
                    </td>
                    <td>{lead.referredBy}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      <span style={{ color: '#1a6eb5', fontWeight: 500 }}>
                        {formatDate(lead.followUpDate)}
                      </span>
                    </td>
                    <td>{lead.description}</td>
                    <td>
                      <span
                        className="leads-status-badge"
                        style={{ background: sc.bg, color: sc.color }}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td>
                      <div className="leads-action-btns">
                        {/* View */}
                        <button
                          className="leads-icon-btn leads-icon-view"
                          title="View"
                          onClick={() => setViewLead(lead)}
                        >
                          <Eye size={14} />
                        </button>
                        {/* Edit */}
                        <button
                          className="leads-icon-btn leads-icon-edit"
                          title="Edit"
                          onClick={() => setEditLead(lead)}
                        >
                          <Edit2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer row: showing entries + pagination */}
      <div className="leads-footer-row">
        <span className="leads-entries-info">
          Showing {filtered.length === 0 ? 0 : (currentPage - 1) * perPage + 1} to{' '}
          {Math.min(currentPage * perPage, filtered.length)} of {filtered.length} entries
        </span>

        <div className="pagination-row">
          <button
            className="page-link-btn"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >«</button>
          <button
            className="page-link-btn"
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >‹</button>

          {pageNumbers().map((p, i) =>
            p === '...' ? (
              <span key={`dots-${i}`} style={{ padding: '4px 6px', color: '#888', fontSize: '12px' }}>…</span>
            ) : (
              <button
                key={p}
                className={`page-link-btn ${currentPage === p ? 'active' : ''}`}
                onClick={() => setCurrentPage(p)}
              >
                {p}
              </button>
            )
          )}

          <button
            className="page-link-btn"
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
          >›</button>
          <button
            className="page-link-btn"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages || totalPages === 0}
          >»</button>
        </div>
      </div>

      {/* Modals */}
      {showCreate && (
        <CreateLeadModal onClose={() => setShowCreate(false)} onSave={handleCreate} />
      )}
      {editLead && (
        <EditLeadModal lead={editLead} onClose={() => setEditLead(null)} onSave={handleEdit} />
      )}
      {showFilter && (
        <FilterModal
          filter={dateFilter}
          onClose={() => setShowFilter(false)}
          onApply={handleApplyFilter}
        />
      )}
    </div>
  );
}
