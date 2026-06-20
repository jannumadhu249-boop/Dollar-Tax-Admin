import React, { useState, useEffect } from 'react';
import { Search, Edit3, Plus } from 'lucide-react';
import CreateNoteModal from './CreateNoteModal';
import EditNoteModal from './EditNoteModal';

// Utility to generate mock notes
const generateMockNotes = (count = 20) => {
  const notes = [];
  for (let i = 1; i <= count; i++) {
    notes.push({
      id: i,
      date: new Date(2026, 0, i).toISOString().split('T')[0], // YYYY-MM-DD
      employee: `Employee ${i}`,
      note: `Sample note content for entry ${i}`,
      status: i % 3 === 0 ? 'Solved' : 'Pending',
    });
  }
  return notes;
};

export default function Notes() {
  const [notes, setNotes] = useState(() => generateMockNotes(35));
  const [searchTerm, setSearchTerm] = useState('');
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreate, setShowCreate] = useState(false);
  const [editNote, setEditNote] = useState(null);

  // Filtered notes based on search
  const filteredNotes = notes.filter(n =>
    n.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.note.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredNotes.length / perPage);
  const paginatedNotes = filteredNotes.slice((currentPage - 1) * perPage, currentPage * perPage);

  const handleCreate = (newNote) => {
    setNotes(prev => [{ id: prev.length + 1, ...newNote }, ...prev]);
    setShowCreate(false);
  };

  const handleUpdate = (updated) => {
    setNotes(prev => prev.map(n => (n.id === updated.id ? updated : n)));
    setEditNote(null);
  };

  // Reset page when perPage or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [perPage, searchTerm]);

  return (
    <div className="content-card" style={{ animation: 'fadeIn 0.2s ease-out' }}>
      <h2 className="view-title">Notes Dashboard</h2>

      {/* Controls */}
      <div className="flex-row" style={{ gap: '12px', marginBottom: '16px', alignItems: 'center' }}>
        <button
          className="btn-view-action"
          style={{ backgroundColor: 'var(--color-green-btn)', color: '#fff', display: 'flex', alignItems: 'center', gap: '4px' }}
          onClick={() => setShowCreate(true)}
        >
          <Plus size={14} /> + New Notes
        </button>
        <select
          className="search-input-box"
          style={{ width: '80px' }}
          value={perPage}
          onChange={e => setPerPage(Number(e.target.value))}
        >
          {[10, 25, 50, 100].map(v => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
        <div className="search-input-box" style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <Search size={14} style={{ marginRight: '4px', color: '#888' }} />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ border: 'none', outline: 'none', flex: 1, background: 'transparent' }}
          />
        </div>
      </div>

      {/* Table */}
      <table className="corporate-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Date</th>
            <th>Employee Name</th>
            <th>Notes</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedNotes.map((n, idx) => (
            <tr key={n.id} style={{ backgroundColor: idx % 2 === 0 ? 'var(--bg-card)' : 'transparent' }}>
              <td>{(currentPage - 1) * perPage + idx + 1}</td>
              <td>{n.date}</td>
              <td>{n.employee}</td>
              <td>{n.note}</td>
              <td>
                <span
                  className="status-badge"
                  style={{
                    backgroundColor: n.status === 'Solved' ? 'rgba(40,167,69,0.15)' : 'rgba(255,193,7,0.15)',
                    color: n.status === 'Solved' ? '#28a745' : '#ffc107',
                    padding: '2px 6px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '12px',
                  }}
                >
                  {n.status}
                </span>
              </td>
              <td>
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => setEditNote(n)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#555' }}
                >
                  <Edit3 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex-row" style={{ marginTop: '12px', justifyContent: 'center', gap: '8px' }}>
          <button
            className="btn-view-action"
            style={{ backgroundColor: currentPage === 1 ? '#ccc' : 'var(--color-green-btn)', color: '#fff' }}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
          >
            Prev
          </button>
          <span style={{ padding: '4px 8px', lineHeight: '30px' }}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn-view-action"
            style={{ backgroundColor: currentPage === totalPages ? '#ccc' : 'var(--color-green-btn)', color: '#fff' }}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
          >
            Next
          </button>
        </div>
      )}

      {/* Modals */}
      {showCreate && (
        <CreateNoteModal
          onClose={() => setShowCreate(false)}
          onSave={handleCreate}
        />
      )}
      {editNote && (
        <EditNoteModal
          note={editNote}
          onClose={() => setEditNote(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
