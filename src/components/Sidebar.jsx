import React, { useState } from 'react';
import { 
  Users, 
  ChevronRight, 
  ChevronDown, 
  GitBranch, 
  ArrowLeftRight, 
  Banknote, 
  Edit3, 
  Monitor, 
  Paperclip, 
  AlertTriangle,
  HelpCircle, Search, PhoneCall, FileUp, Send, Mail, NotebookPen
} from 'lucide-react';

export default function Sidebar({ selectedYear = 'TY2025', currentFilter, onFilterChange }) {
  const [openMenus, setOpenMenus] = useState({
    preprocessing: true,
    preparation: false,
    payment: false,
    clientReview: false,
    efiling: false,
    paperFiling: false
  });

  const [activeItem, setActiveItem] = useState('registered-users');
  const currentActive = currentFilter || activeItem;

  const toggleMenu = (menuKey) => {
    setOpenMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
    if (onFilterChange) {
      onFilterChange(itemId);
    }
  };

  return (
    <aside className="sidebar-year">
      {/* Sidebar Header */}
      <div className="sidebar-heading">
        <Users size={18} />
        <span>Tax Year - {selectedYear}</span>
      </div>

      <div className="sidebar-menu-container">
        {/* All Registered */}
        <button 
          className={`sidebar-menu-btn ${currentActive === 'all-registered' ? 'active' : ''}`}
          onClick={() => handleItemClick('all-registered')}
        >
          <div className="menu-btn-left">
            <ChevronRight size={14} className="chevron-bullet" />
            <span>All Registered</span>
          </div>
        </button>

        {/* PRE-PROCESSING */}
        <div className="sidebar-dropdown-group">
          <button 
            className={`sidebar-menu-btn dropdown-trigger ${currentActive.startsWith('registered-') || currentActive.startsWith('info-') || currentActive.startsWith('scheduling-') || currentActive.startsWith('interview-') || currentActive.startsWith('docs-') || currentActive === 'preprocessing' ? 'active' : ''}`}
            onClick={() => toggleMenu('preprocessing')}
          >
            <div className="menu-btn-left">
              <GitBranch size={16} className="menu-icon" />
              <span className="uppercase-label">PRE-PROCESSING</span>
            </div>
            <ChevronDown size={14} className={`dropdown-arrow ${openMenus.preprocessing ? 'open' : ''}`} />
          </button>

          {openMenus.preprocessing && (
            <div className="sidebar-submenu">
              <button 
                className={`submenu-item ${currentActive === 'registered-users' ? 'active' : ''}`}
                onClick={() => handleItemClick('registered-users')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>Registered Users</span>
                </div>
                <span className="sidebar-badge">7</span>
              </button>

              <button 
                className={`submenu-item ${currentActive === 'info-pending' ? 'active' : ''}`}
                onClick={() => handleItemClick('info-pending')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>Information Pending</span>
                </div>
                <span className="sidebar-badge">0</span>
              </button>

              <button 
                className={`submenu-item ${currentActive === 'scheduling-pending' ? 'active' : ''}`}
                onClick={() => handleItemClick('scheduling-pending')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>Scheduling Pending</span>
                </div>
                <span className="sidebar-badge">386</span>
              </button>

              <button 
                className={`submenu-item ${currentActive === 'interview-pending' ? 'active' : ''}`}
                onClick={() => handleItemClick('interview-pending')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>Interview Pending</span>
                </div>
                <span className="sidebar-badge">44</span>
              </button>

              <button 
                className={`submenu-item ${currentActive === 'docs-pending' ? 'active' : ''}`}
                onClick={() => handleItemClick('docs-pending')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>Documents Pending</span>
                </div>
                <span className="sidebar-badge">19</span>
              </button>
            </div>
          )}
        </div>

        {/* PREPARATION */}
        <div className="sidebar-dropdown-group">
          <button 
            className="sidebar-menu-btn dropdown-trigger"
            onClick={() => toggleMenu('preparation')}
          >
            <div className="menu-btn-left">
              <ArrowLeftRight size={16} className="menu-icon" />
              <span className="uppercase-label">PREPARATION</span>
            </div>
            <ChevronDown size={14} className={`dropdown-arrow ${openMenus.preparation ? 'open' : ''}`} />
          </button>
          {openMenus.preparation && (
            <div className="sidebar-submenu">
                <button 
                className={`submenu-item ${currentActive === 'preparation-1' ? 'active' : ''}`}
                onClick={() => handleItemClick('preparation-1')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>Preparation - 1</span>
                </div>
              </button>

              <button 
                className={`submenu-item ${currentActive === 'preparation-2' ? 'active' : ''}`}
                onClick={() => handleItemClick('preparation-2')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>Preparation - 2</span>
                </div>
              </button>

              <button 
                className={`submenu-item ${currentActive === 'review-summary-1' ? 'active' : ''}`}
                onClick={() => handleItemClick('review-summary-1')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>Review & Summary 1</span>
                </div>
              </button>

              <button 
                className={`submenu-item ${currentActive === 'review-summary-2' ? 'active' : ''}`}
                onClick={() => handleItemClick('review-summary-2')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>Review & Summary 2</span>
                </div>
              </button>

              <button 
                className={`submenu-item ${currentActive === 'itin-files' ? 'active' : ''}`}
                onClick={() => handleItemClick('itin-files')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>ITIN Files</span>
                </div>
              </button>

              <button 
                className={`submenu-item ${currentActive === 'revised-estimate' ? 'active' : ''}`}
                onClick={() => handleItemClick('revised-estimate')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>Revised Estimate</span>
                </div>
              </button>

            </div>
          )}
        </div>

        {/* PAYMENT */}
        <div className="sidebar-dropdown-group">
          <button 
            className="sidebar-menu-btn dropdown-trigger"
            onClick={() => toggleMenu('payment')}
          >
            <div className="menu-btn-left">
              <Banknote size={16} className="menu-icon" />
              <span className="uppercase-label">PAYMENT</span>
            </div>
            <ChevronDown size={14} className={`dropdown-arrow ${openMenus.payment ? 'open' : ''}`} />
          </button>
          {openMenus.payment && (
            <div className="sidebar-submenu">
             
                <button 
                className={`submenu-item ${currentActive === 'payment-pending-efiling' ? 'active' : ''}`}
                onClick={() => handleItemClick('payment-pending-efiling')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>Payment Pending - Efiling</span>
                </div>
                <span className="sidebar-badge">670</span>
              </button>

              <button 
                className={`submenu-item ${currentActive === 'payable-pending-paper-filing' ? 'active' : ''}`}
                onClick={() => handleItemClick('payable-pending-paper-filing')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>Payment Pending - Paper filing</span>
                </div>
                <span className="sidebar-badge">25</span>
              </button>

              <button 
                className={`submenu-item ${currentActive === 'fee-payment-received-1' ? 'active' : ''}`}
                onClick={() => handleItemClick('fee-payment-received-1')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>Fee Payment Received - I</span>
                </div>
                <span className="sidebar-badge">0</span>
              </button>

              <button 
                className={`submenu-item ${currentActive === 'fee-payment-received-2' ? 'active' : ''}`}
                onClick={() => handleItemClick('fee-payment-received-2')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>Fee Payment Received - II</span>
                </div>
                <span className="sidebar-badge">13</span>
              </button>
            </div>
          )}
        </div>

        {/* CLIENT REVIEW */}
        <div className="sidebar-dropdown-group">
          <button 
            className="sidebar-menu-btn dropdown-trigger"
            onClick={() => toggleMenu('clientReview')}
          >
            <div className="menu-btn-left">
              <Edit3 size={16} className="menu-icon" />
              <span className="uppercase-label">CLIENT REVIEW</span>
            </div>
            <ChevronDown size={14} className={`dropdown-arrow ${openMenus.clientReview ? 'open' : ''}`} />
          </button>

          {openMenus.clientReview && (
            <div className="sidebar-submenu">
                <button 
                className={`submenu-item ${currentActive === 'client-review-efiling' ? 'active' : ''}`}
                onClick={() => handleItemClick('client-review-efiling')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>Client Review - Efiling</span>
                </div>
                <span className="sidebar-badge">30</span>
              </button>

              <button 
                className={`submenu-item ${currentActive === 'client-review-paper-filing' ? 'active' : ''}`}
                onClick={() => handleItemClick('client-review-paper-filing')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>Client Review - Paper Filing</span>
                </div>
                <span className="sidebar-badge">1</span>
              </button>
            </div>
          )}
        </div>

        {/* E-FILING */}
        <div className="sidebar-dropdown-group">
          <button 
            className="sidebar-menu-btn dropdown-trigger"
            onClick={() => toggleMenu('efiling')}
          >
            <div className="menu-btn-left">
              <Monitor size={16} className="menu-icon" />
              <span className="uppercase-label">E-FILING</span>
            </div>
            <ChevronDown size={14} className={`dropdown-arrow ${openMenus.efiling ? 'open' : ''}`} />
          </button>

          {openMenus.efiling && (
            <div className="sidebar-submenu">
                <button 
                className={`submenu-item ${currentActive === 'efiling-pending-1' ? 'active' : ''}`}
                onClick={() => handleItemClick('efiling-pending-1')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>Efiling Pending - 1</span>
                </div>
              </button>

              <button 
                className={`submenu-item ${currentActive === 'efiling-pending-2' ? 'active' : ''}`}
                onClick={() => handleItemClick('efiling-pending-2')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>Efiling Pending - 2</span>
                </div>
              </button>

              <button 
                className={`submenu-item ${currentActive === 'efiled-awaiting-1' ? 'active' : ''}`}
                onClick={() => handleItemClick('efiled-awaiting-1')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>E - Filed & Awaiting Acceptance - 1</span>
                </div>
              </button>

              <button 
                className={`submenu-item ${currentActive === 'efiled-awaiting-2' ? 'active' : ''}`}
                onClick={() => handleItemClick('efiled-awaiting-2')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>E - Filed & Awaiting Acceptance - 2</span>
                </div>
              </button>

              <button 
                className={`submenu-item ${currentActive === 'efiled-rejected' ? 'active' : ''}`}
                onClick={() => handleItemClick('efiled-rejected')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>E - Filed & Rejected</span>
                </div>
              </button>

              <button 
                className={`submenu-item ${currentActive === 'city-return' ? 'active' : ''}`}
                onClick={() => handleItemClick('city-return')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>City Return</span>
                </div>
              </button>

              <button 
                className={`submenu-item ${currentActive === 'efiling-accepted-complete' ? 'active' : ''}`}
                onClick={() => handleItemClick('efiling-accepted-complete')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>E-Filing Accepted & Filing Complete</span>
                </div>
              </button>
            </div>
          )}

        </div>

        {/* PAPER FILING */}
        <div className="sidebar-dropdown-group">
          <button 
            className="sidebar-menu-btn dropdown-trigger"
            onClick={() => toggleMenu('paperFiling')}
          >
            <div className="menu-btn-left">
              <Paperclip size={16} className="menu-icon" />
              <span className="uppercase-label">PAPER FILING</span>
            </div>
            <ChevronDown size={14} className={`dropdown-arrow ${openMenus.paperFiling ? 'open' : ''}`} />
          </button>

          {openMenus.paperFiling && (
            <div className="sidebar-submenu">
              <button 
                className={`submenu-item ${currentActive === 'paper-filing-pending' ? 'active' : ''}`}
                onClick={() => handleItemClick('paper-filing-pending')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>Paper Filing Pending</span>
                </div>
                <span className="sidebar-badge">0</span>
              </button>

              <button 
                className={`submenu-item ${currentActive === 'paper-filing-accepted-complete' ? 'active' : ''}`}
                onClick={() => handleItemClick('paper-filing-accepted-complete')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>Paper Filing Done</span>
                </div>
                <span className="sidebar-badge">188</span>
              </button>
            </div>
          )}
        </div>

        {/* CANCELLED */}
        <button 
          className={`sidebar-menu-btn ${currentActive === 'cancelled' ? 'active' : ''}`}
          onClick={() => handleItemClick('cancelled')}
        >
          <div className="menu-btn-left">
            <AlertTriangle size={16} className="menu-icon" />
            <span className="uppercase-label">CANCELLED</span>
          </div>
        </button>

        {/* QUERY LIST */}
        <button 
          className={`sidebar-menu-btn ${currentActive === 'query-list' ? 'active' : ''}`}
          onClick={() => handleItemClick('query-list')}
        >
          <div className="menu-btn-left">
            <Search size={16} className="menu-icon" />
            <span className="uppercase-label">QUERY LIST</span>
          </div>
          <span className="sidebar-badge">20</span>
        </button>

        {/* CALL BACK REQUESTS */}
        <button 
          className={`sidebar-menu-btn ${currentActive === 'call-back-requests' ? 'active' : ''}`}
          onClick={() => handleItemClick('call-back-requests')}
        >
          <div className="menu-btn-left">
            <PhoneCall size={16} className="menu-icon" />
            <span className="uppercase-label">CALL BACK REQUESTS</span>
          </div>
          <span className="sidebar-badge">20</span>
        </button>

        {/* JUST UPLOADED DOCS */}
        <button 
          className={`sidebar-menu-btn ${currentActive === 'just-uploaded-docs' ? 'active' : ''}`}
          onClick={() => handleItemClick('just-uploaded-docs')}
        >
          <div className="menu-btn-left">
            <FileUp size={16} className="menu-icon" />
            <span className="uppercase-label">JUST UPLOADED DOCS</span>
          </div>
          <span className="sidebar-badge">0</span>
        </button>

        {/* SEND MAIL */}
        <button 
          className={`sidebar-menu-btn ${currentActive === 'send-mail' ? 'active' : ''}`}
          onClick={() => handleItemClick('send-mail')}
        >
          <div className="menu-btn-left">
            <Send size={16} className="menu-icon" />
            <span className="uppercase-label">SEND MAIL</span>
          </div>
        </button>

        {/* MAILGUN */}
        <button 
          className={`sidebar-menu-btn ${currentActive === 'mailgun' ? 'active' : ''}`}
          onClick={() => handleItemClick('mailgun')}
        >
          <div className="menu-btn-left">
            <Mail size={16} className="menu-icon" />
            <span className="uppercase-label">MAILGUN</span>
          </div>
        </button>

        {/* LEADS */}
        <button 
          className={`sidebar-menu-btn ${currentActive === 'leads' ? 'active' : ''}`}
          onClick={() => handleItemClick('leads')}
        >
          <div className="menu-btn-left">
            <Users size={16} className="menu-icon" />
            <span className="uppercase-label">LEADS</span>
          </div>
        </button>

        {/* NOTES */}
        <button 
          className={`sidebar-menu-btn ${currentActive === 'notes' ? 'active' : ''}`}
          onClick={() => handleItemClick('notes')}
        >
          <div className="menu-btn-left">
            <NotebookPen size={16} className="menu-icon" />
            <span className="uppercase-label">NOTES</span>
          </div>
        </button>
      </div>
    </aside>
  );
}
