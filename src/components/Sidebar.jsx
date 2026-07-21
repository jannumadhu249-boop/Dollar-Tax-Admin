// import React, { useState } from 'react';
// import { 
//   Users, 
//   ChevronRight, 
//   ChevronDown, 
//   GitBranch, 
//   ArrowLeftRight, 
//   Banknote, 
//   Edit3, 
//   Monitor, 
//   Paperclip, 
//   AlertTriangle,
//   HelpCircle, Search, PhoneCall, FileUp, Send, Mail, NotebookPen
// } from 'lucide-react';

// export default function Sidebar({ selectedYear = 'TY2025', currentFilter, onFilterChange }) {
//   const [openMenus, setOpenMenus] = useState({
//     preprocessing: true,
//     preparation: false,
//     payment: false,
//     clientReview: false,
//     efiling: false,
//     paperFiling: false
//   });

//   const [activeItem, setActiveItem] = useState('registered-users');
//   const currentActive = currentFilter || activeItem;

//   const toggleMenu = (menuKey) => {
//     setOpenMenus(prev => ({
//       ...prev,
//       [menuKey]: !prev[menuKey]
//     }));
//   };

//   const handleItemClick = (itemId) => {
//     setActiveItem(itemId);
//     if (onFilterChange) {
//       onFilterChange(itemId);
//     }
//   };

//   return (
//     <aside className="sidebar-year">
//       {/* Sidebar Header */}
//       <div className="sidebar-heading">
//         <Users size={18} />
//         <span>Tax Year - {selectedYear}</span>
//       </div>

//       <div className="sidebar-menu-container">
//         {/* All Registered */}
//         <button 
//           className={`sidebar-menu-btn ${currentActive === 'all-registered' ? 'active' : ''}`}
//           onClick={() => handleItemClick('all-registered')}
//         >
//           <div className="menu-btn-left">
//             <ChevronRight size={14} className="chevron-bullet" />
//             <span>All Registered</span>
//           </div>
//         </button>

//         {/* PRE-PROCESSING */}
//         <div className="sidebar-dropdown-group">
//           <button 
//             className="sidebar-menu-btn dropdown-trigger" 
//             // ${currentActive.startsWith('registered-') || currentActive.startsWith('info-') || currentActive.startsWith('scheduling-') || currentActive.startsWith('interview-') || currentActive.startsWith('docs-') || currentActive === 'preprocessing' ? 'active' : ''}`}
//             onClick={() => toggleMenu('preprocessing')}
//           >
//             <div className="menu-btn-left">
//               <GitBranch size={16} className="menu-icon" />
//               <span className="uppercase-label">PRE-PROCESSING</span>
//             </div>
//             <ChevronDown size={14} className={`dropdown-arrow ${openMenus.preprocessing ? 'open' : ''}`} />
//           </button>

//           {openMenus.preprocessing && (
//             <div className="sidebar-submenu">
//               <button 
//                 className={`submenu-item ${currentActive === 'registered-users' ? 'active' : ''}`}
//                 onClick={() => handleItemClick('registered-users')}
//               >
//                 <div className="menu-btn-left">
//                   <ChevronRight size={12} className="chevron-bullet" />
//                   <span>Registered Users</span>
//                 </div>
//                 <span className="sidebar-badge">7</span>
//               </button>

//               <button 
//                 className={`submenu-item ${currentActive === 'info-pending' ? 'active' : ''}`}
//                 onClick={() => handleItemClick('info-pending')}
//               >
//                 <div className="menu-btn-left">
//                   <ChevronRight size={12} className="chevron-bullet" />
//                   <span>Information Pending</span>
//                 </div>
//                 <span className="sidebar-badge">0</span>
//               </button>

//               <button 
//                 className={`submenu-item ${currentActive === 'scheduling-pending' ? 'active' : ''}`}
//                 onClick={() => handleItemClick('scheduling-pending')}
//               >
//                 <div className="menu-btn-left">
//                   <ChevronRight size={12} className="chevron-bullet" />
//                   <span>Scheduling Pending</span>
//                 </div>
//                 <span className="sidebar-badge">386</span>
//               </button>

//               <button 
//                 className={`submenu-item ${currentActive === 'interview-pending' ? 'active' : ''}`}
//                 onClick={() => handleItemClick('interview-pending')}
//               >
//                 <div className="menu-btn-left">
//                   <ChevronRight size={12} className="chevron-bullet" />
//                   <span>Interview Pending</span>
//                 </div>
//                 <span className="sidebar-badge">44</span>
//               </button>

//               <button 
//                 className={`submenu-item ${currentActive === 'docs-pending' ? 'active' : ''}`}
//                 onClick={() => handleItemClick('docs-pending')}
//               >
//                 <div className="menu-btn-left">
//                   <ChevronRight size={12} className="chevron-bullet" />
//                   <span>Documents Pending</span>
//                 </div>
//                 <span className="sidebar-badge">19</span>
//               </button>
//             </div>
//           )}
//         </div>

//         {/* PREPARATION */}
//         <div className="sidebar-dropdown-group">
//           <button 
//             className="sidebar-menu-btn dropdown-trigger"
//             onClick={() => toggleMenu('preparation')}
//           >
//             <div className="menu-btn-left">
//               <ArrowLeftRight size={16} className="menu-icon" />
//               <span className="uppercase-label">PREPARATION</span>
//             </div>
//             <ChevronDown size={14} className={`dropdown-arrow ${openMenus.preparation ? 'open' : ''}`} />
//           </button>
//           {openMenus.preparation && (
//             <div className="sidebar-submenu">
//                 <button 
//                 className={`submenu-item ${currentActive === 'preparation-1' ? 'active' : ''}`}
//                 onClick={() => handleItemClick('preparation-1')}
//               >
//                 <div className="menu-btn-left">
//                   <ChevronRight size={12} className="chevron-bullet" />
//                   <span>Preparation - 1</span>
//                 </div>
//               </button>

//               <button 
//                 className={`submenu-item ${currentActive === 'preparation-2' ? 'active' : ''}`}
//                 onClick={() => handleItemClick('preparation-2')}
//               >
//                 <div className="menu-btn-left">
//                   <ChevronRight size={12} className="chevron-bullet" />
//                   <span>Preparation - 2</span>
//                 </div>
//               </button>

//               <button 
//                 className={`submenu-item ${currentActive === 'review-summary-1' ? 'active' : ''}`}
//                 onClick={() => handleItemClick('review-summary-1')}
//               >
//                 <div className="menu-btn-left">
//                   <ChevronRight size={12} className="chevron-bullet" />
//                   <span>Review & Summary 1</span>
//                 </div>
//               </button>

//               <button 
//                 className={`submenu-item ${currentActive === 'review-summary-2' ? 'active' : ''}`}
//                 onClick={() => handleItemClick('review-summary-2')}
//               >
//                 <div className="menu-btn-left">
//                   <ChevronRight size={12} className="chevron-bullet" />
//                   <span>Review & Summary 2</span>
//                 </div>
//               </button>

//               <button 
//                 className={`submenu-item ${currentActive === 'itin-files' ? 'active' : ''}`}
//                 onClick={() => handleItemClick('itin-files')}
//               >
//                 <div className="menu-btn-left">
//                   <ChevronRight size={12} className="chevron-bullet" />
//                   <span>ITIN Files</span>
//                 </div>
//               </button>

//               <button 
//                 className={`submenu-item ${currentActive === 'revised-estimate' ? 'active' : ''}`}
//                 onClick={() => handleItemClick('revised-estimate')}
//               >
//                 <div className="menu-btn-left">
//                   <ChevronRight size={12} className="chevron-bullet" />
//                   <span>Revised Estimate</span>
//                 </div>
//               </button>

//             </div>
//           )}
//         </div>

//         {/* PAYMENT */}
//         <div className="sidebar-dropdown-group">
//           <button 
//             className="sidebar-menu-btn dropdown-trigger"
//             onClick={() => toggleMenu('payment')}
//           >
//             <div className="menu-btn-left">
//               <Banknote size={16} className="menu-icon" />
//               <span className="uppercase-label">PAYMENT</span>
//             </div>
//             <ChevronDown size={14} className={`dropdown-arrow ${openMenus.payment ? 'open' : ''}`} />
//           </button>
//           {openMenus.payment && (
//             <div className="sidebar-submenu">
             
//                 <button 
//                 className={`submenu-item ${currentActive === 'payment-pending-efiling' ? 'active' : ''}`}
//                 onClick={() => handleItemClick('payment-pending-efiling')}
//               >
//                 <div className="menu-btn-left">
//                   <ChevronRight size={12} className="chevron-bullet" />
//                   <span>Payment Pending - Efiling</span>
//                 </div>
//                 <span className="sidebar-badge">670</span>
//               </button>

//               <button 
//                 className={`submenu-item ${currentActive === 'payable-pending-paper-filing' ? 'active' : ''}`}
//                 onClick={() => handleItemClick('payable-pending-paper-filing')}
//               >
//                 <div className="menu-btn-left">
//                   <ChevronRight size={12} className="chevron-bullet" />
//                   <span>Payment Pending - Paper filing</span>
//                 </div>
//                 <span className="sidebar-badge">25</span>
//               </button>

//               <button 
//                 className={`submenu-item ${currentActive === 'fee-payment-received-1' ? 'active' : ''}`}
//                 onClick={() => handleItemClick('fee-payment-received-1')}
//               >
//                 <div className="menu-btn-left">
//                   <ChevronRight size={12} className="chevron-bullet" />
//                   <span>Fee Payment Received - I</span>
//                 </div>
//                 <span className="sidebar-badge">0</span>
//               </button>

//               <button 
//                 className={`submenu-item ${currentActive === 'fee-payment-received-2' ? 'active' : ''}`}
//                 onClick={() => handleItemClick('fee-payment-received-2')}
//               >
//                 <div className="menu-btn-left">
//                   <ChevronRight size={12} className="chevron-bullet" />
//                   <span>Fee Payment Received - II</span>
//                 </div>
//                 <span className="sidebar-badge">13</span>
//               </button>
//             </div>
//           )}
//         </div>

//         {/* CLIENT REVIEW */}
//         <div className="sidebar-dropdown-group">
//           <button 
//             className="sidebar-menu-btn dropdown-trigger"
//             onClick={() => toggleMenu('clientReview')}
//           >
//             <div className="menu-btn-left">
//               <Edit3 size={16} className="menu-icon" />
//               <span className="uppercase-label">CLIENT REVIEW</span>
//             </div>
//             <ChevronDown size={14} className={`dropdown-arrow ${openMenus.clientReview ? 'open' : ''}`} />
//           </button>

//           {openMenus.clientReview && (
//             <div className="sidebar-submenu">
//                 <button 
//                 className={`submenu-item ${currentActive === 'client-review-efiling' ? 'active' : ''}`}
//                 onClick={() => handleItemClick('client-review-efiling')}
//               >
//                 <div className="menu-btn-left">
//                   <ChevronRight size={12} className="chevron-bullet" />
//                   <span>Client Review - Efiling</span>
//                 </div>
//                 <span className="sidebar-badge">30</span>
//               </button>

//               <button 
//                 className={`submenu-item ${currentActive === 'client-review-paper-filing' ? 'active' : ''}`}
//                 onClick={() => handleItemClick('client-review-paper-filing')}
//               >
//                 <div className="menu-btn-left">
//                   <ChevronRight size={12} className="chevron-bullet" />
//                   <span>Client Review - Paper Filing</span>
//                 </div>
//                 <span className="sidebar-badge">1</span>
//               </button>
//             </div>
//           )}
//         </div>

//         {/* E-FILING */}
//         <div className="sidebar-dropdown-group">
//           <button 
//             className="sidebar-menu-btn dropdown-trigger"
//             onClick={() => toggleMenu('efiling')}
//           >
//             <div className="menu-btn-left">
//               <Monitor size={16} className="menu-icon" />
//               <span className="uppercase-label">E-FILING</span>
//             </div>
//             <ChevronDown size={14} className={`dropdown-arrow ${openMenus.efiling ? 'open' : ''}`} />
//           </button>

//           {openMenus.efiling && (
//             <div className="sidebar-submenu">
//                 <button 
//                 className={`submenu-item ${currentActive === 'efiling-pending-1' ? 'active' : ''}`}
//                 onClick={() => handleItemClick('efiling-pending-1')}
//               >
//                 <div className="menu-btn-left">
//                   <ChevronRight size={12} className="chevron-bullet" />
//                   <span>Efiling Pending - 1</span>
//                 </div>
//               </button>

//               <button 
//                 className={`submenu-item ${currentActive === 'efiling-pending-2' ? 'active' : ''}`}
//                 onClick={() => handleItemClick('efiling-pending-2')}
//               >
//                 <div className="menu-btn-left">
//                   <ChevronRight size={12} className="chevron-bullet" />
//                   <span>Efiling Pending - 2</span>
//                 </div>
//               </button>

//               <button 
//                 className={`submenu-item ${currentActive === 'efiled-awaiting-1' ? 'active' : ''}`}
//                 onClick={() => handleItemClick('efiled-awaiting-1')}
//               >
//                 <div className="menu-btn-left">
//                   <ChevronRight size={12} className="chevron-bullet" />
//                   <span>E - Filed & Awaiting Acceptance - 1</span>
//                 </div>
//               </button>

//               <button 
//                 className={`submenu-item ${currentActive === 'efiled-awaiting-2' ? 'active' : ''}`}
//                 onClick={() => handleItemClick('efiled-awaiting-2')}
//               >
//                 <div className="menu-btn-left">
//                   <ChevronRight size={12} className="chevron-bullet" />
//                   <span>E - Filed & Awaiting Acceptance - 2</span>
//                 </div>
//               </button>

//               <button 
//                 className={`submenu-item ${currentActive === 'efiled-rejected' ? 'active' : ''}`}
//                 onClick={() => handleItemClick('efiled-rejected')}
//               >
//                 <div className="menu-btn-left">
//                   <ChevronRight size={12} className="chevron-bullet" />
//                   <span>E - Filed & Rejected</span>
//                 </div>
//               </button>

//               <button 
//                 className={`submenu-item ${currentActive === 'city-return' ? 'active' : ''}`}
//                 onClick={() => handleItemClick('city-return')}
//               >
//                 <div className="menu-btn-left">
//                   <ChevronRight size={12} className="chevron-bullet" />
//                   <span>City Return</span>
//                 </div>
//               </button>

//               <button 
//                 className={`submenu-item ${currentActive === 'efiling-accepted-complete' ? 'active' : ''}`}
//                 onClick={() => handleItemClick('efiling-accepted-complete')}
//               >
//                 <div className="menu-btn-left">
//                   <ChevronRight size={12} className="chevron-bullet" />
//                   <span>E-Filing Accepted & Filing Complete</span>
//                 </div>
//               </button>
//             </div>
//           )}

//         </div>

//         {/* PAPER FILING */}
//         <div className="sidebar-dropdown-group">
//           <button 
//             className="sidebar-menu-btn dropdown-trigger"
//             onClick={() => toggleMenu('paperFiling')}
//           >
//             <div className="menu-btn-left">
//               <Paperclip size={16} className="menu-icon" />
//               <span className="uppercase-label">PAPER FILING</span>
//             </div>
//             <ChevronDown size={14} className={`dropdown-arrow ${openMenus.paperFiling ? 'open' : ''}`} />
//           </button>

//           {openMenus.paperFiling && (
//             <div className="sidebar-submenu">
//               <button 
//                 className={`submenu-item ${currentActive === 'paper-filing-pending' ? 'active' : ''}`}
//                 onClick={() => handleItemClick('paper-filing-pending')}
//               >
//                 <div className="menu-btn-left">
//                   <ChevronRight size={12} className="chevron-bullet" />
//                   <span>Paper Filing Pending</span>
//                 </div>
//                 <span className="sidebar-badge">0</span>
//               </button>

//               <button 
//                 className={`submenu-item ${currentActive === 'paper-filing-accepted-complete' ? 'active' : ''}`}
//                 onClick={() => handleItemClick('paper-filing-accepted-complete')}
//               >
//                 <div className="menu-btn-left">
//                   <ChevronRight size={12} className="chevron-bullet" />
//                   <span>Paper Filing Done</span>
//                 </div>
//                 <span className="sidebar-badge">188</span>
//               </button>
//             </div>
//           )}
//         </div>

//         {/* CANCELLED */}
//         <button 
//           className={`sidebar-menu-btn ${currentActive === 'cancelled' ? 'active' : ''}`}
//           onClick={() => handleItemClick('cancelled')}
//         >
//           <div className="menu-btn-left">
//             <AlertTriangle size={16} className="menu-icon" />
//             <span className="uppercase-label">CANCELLED</span>
//           </div>
//         </button>

//         {/* QUERY LIST */}
//         <button 
//           className={`sidebar-menu-btn ${currentActive === 'query-list' ? 'active' : ''}`}
//           onClick={() => handleItemClick('query-list')}
//         >
//           <div className="menu-btn-left">
//             <Search size={16} className="menu-icon" />
//             <span className="uppercase-label">QUERY LIST</span>
//           </div>
//           <span className="sidebar-badge">20</span>
//         </button>

//         {/* CALL BACK REQUESTS */}
//         <button 
//           className={`sidebar-menu-btn ${currentActive === 'call-back-requests' ? 'active' : ''}`}
//           onClick={() => handleItemClick('call-back-requests')}
//         >
//           <div className="menu-btn-left">
//             <PhoneCall size={16} className="menu-icon" />
//             <span className="uppercase-label">CALL BACK REQUESTS</span>
//           </div>
//           <span className="sidebar-badge">20</span>
//         </button>

//         {/* JUST UPLOADED DOCS */}
//         <button 
//           className={`sidebar-menu-btn ${currentActive === 'just-uploaded-docs' ? 'active' : ''}`}
//           onClick={() => handleItemClick('just-uploaded-docs')}
//         >
//           <div className="menu-btn-left">
//             <FileUp size={16} className="menu-icon" />
//             <span className="uppercase-label">JUST UPLOADED DOCS</span>
//           </div>
//           <span className="sidebar-badge">0</span>
//         </button>

//         {/* SEND MAIL */}
//         <button 
//           className={`sidebar-menu-btn ${currentActive === 'send-mail' ? 'active' : ''}`}
//           onClick={() => handleItemClick('send-mail')}
//         >
//           <div className="menu-btn-left">
//             <Send size={16} className="menu-icon" />
//             <span className="uppercase-label">SEND MAIL</span>
//           </div>
//         </button>

//         {/* MAILGUN */}
//         <button 
//           className={`sidebar-menu-btn ${currentActive === 'mailgun' ? 'active' : ''}`}
//           onClick={() => handleItemClick('mailgun')}
//         >
//           <div className="menu-btn-left">
//             <Mail size={16} className="menu-icon" />
//             <span className="uppercase-label">MAILGUN</span>
//           </div>
//         </button>

//         {/* LEADS */}
//         <button 
//           className={`sidebar-menu-btn ${currentActive === 'leads' ? 'active' : ''}`}
//           onClick={() => handleItemClick('leads')}
//         >
//           <div className="menu-btn-left">
//             <Users size={16} className="menu-icon" />
//             <span className="uppercase-label">LEADS</span>
//           </div>
//         </button>

//         {/* NOTES */}
//         <button 
//           className={`sidebar-menu-btn ${currentActive === 'notes' ? 'active' : ''}`}
//           onClick={() => handleItemClick('notes')}
//         >
//           <div className="menu-btn-left">
//             <NotebookPen size={16} className="menu-icon" />
//             <span className="uppercase-label">NOTES</span>
//           </div>
//         </button>
//       </div>
//     </aside>
//   );
// }




import React, { useState, useEffect } from 'react';
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
  Search, PhoneCall, FileUp, Send, Mail, NotebookPen
} from 'lucide-react';
import { URLS } from '../url';
import { INITIAL_MEMBERS } from '../data/mockMembers';

export default function Sidebar({ selectedYear = 'TY2025', currentFilter = 'all-registered', onFilterChange }) {
  const [openMenus, setOpenMenus] = useState({
    preprocessing: true,
    preparation: true,
    payment: false,
    clientReview: false,
    efiling: false,
    paperFiling: false
  });

  const [currentYearData, setCurrentYearData] = useState(null);
  const [loadingYear, setLoadingYear] = useState(false);
  const [yearError, setYearError] = useState('');

  const getAuthToken = () => {
    const keys = ['authToken', 'token', 'adminToken', 'accessToken', 'jwt'];
    for (const key of keys) {
      const value = sessionStorage.getItem(key) || localStorage.getItem(key);
      if (value) return value;
    }
    return null;
  };

  // --- Fetch current year on mount ---
  useEffect(() => {
    const controller = new AbortController();

    const fetchCurrentYear = async () => {
      setLoadingYear(true);
      setYearError('');

      // Try to get the token from storage (same as Navbar)
      const token = getAuthToken();

      if (!token) {
        setYearError('Authentication token missing.');
        setLoadingYear(false);
        return;
      }

      try {
        const response = await fetch(URLS.GetCurrentYear, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          signal: controller.signal,
        });

        if (response.status === 401) {
          // Token expired – clear storage and show error
          sessionStorage.clear();
          localStorage.clear();
          setYearError('Session expired. Please log in again.');
          setLoadingYear(false);
          return;
        }

        if (!response.ok) {
          throw new Error(`Unable to fetch current year. (${response.status})`);
        }

        const result = await response.json();

        if (!result.success || !result.data) {
          throw new Error('Invalid response for current year.');
        }

        // The API returns an object with the current year
        setCurrentYearData(result.data);
        setYearError('');
      } catch (error) {
        if (error.name !== 'AbortError') {
          setYearError(error.message || 'Unable to load current year.');
        }
      } finally {
        setLoadingYear(false);
      }
    };

    fetchCurrentYear();

    return () => controller.abort();
  }, []);

  // --- Toggle menu handlers ---
  const toggleMenu = (menuKey) => {
    setOpenMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  const handleItemClick = (itemId) => {
    if (onFilterChange) {
      onFilterChange(itemId);
    }
  };

  const [apiCounts, setApiCounts] = useState(null);

  // --- Fetch live sidebar counts from API ---
  useEffect(() => {
    let isMounted = true;
    const fetchCounts = async () => {
      try {
        const token = getAuthToken();
        const payload = {
          page: 1,
          limit: 1,
          search: "",
          year_id: currentYearData?._id || "6a59ede933d5d0234c05b6bf",
          filestatus: "",
          filter: "new",
          status_date: ""
        };
        const res = await fetch(URLS.GetAllRegistred, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          const result = await res.json();
          if (isMounted && result.success && result.counts) {
            setApiCounts(result.counts);
          }
        }
      } catch (err) {
        console.warn('Sidebar count fetch error:', err);
      }
    };
    fetchCounts();
    return () => { isMounted = false; };
  }, [currentYearData, currentFilter]);

  const ROUTE_TO_CODE = {
    'all-registered': 'all',
    'registered-users': 'RGO',
    'info-pending': 'BIP',
    'scheduling-pending': 'SP',
    'interview-pending': 'IP',
    'docs-pending': 'DP',
    'preparation-1': 'PP_I',
    'preparation-2': 'PP_II',
    'review-summary-1': 'TR_S_I',
    'review-summary-2': 'TR_S_II',
    'itin-files': 'RE_ES',
    'revised-estimate': 'RE_ES',
    'payment-pending-efiling': 'PP_EF',
    'payable-pending-paper-filing': 'PP_PF',
    'fee-payment-received-1': 'FPR',
    'fee-payment-received-2': 'FPR_II',
    'client-review-efiling': 'CR_EF',
    'client-review-paper-filing': 'CR_PF',
    'efiling-pending-1': 'EFP_I',
    'efiling-pending-2': 'EFP_II',
    'efiled-awaiting-1': 'EF_AA_I',
    'efiled-awaiting-2': 'EF_AA_II',
    'efiled-rejected': 'EF_REJ',
    'city-return': 'C_R',
    'efiling-accepted-complete': 'EFA_FC',
    'paper-filing-pending': 'PF_P',
    'paper-filing-accepted-complete': 'PF_D',
    'cancelled': 'CANC',
  };

  const getCount = (filterKey) => {
    const code = ROUTE_TO_CODE[filterKey];
    if (apiCounts && code && apiCounts[code] !== undefined) {
      return apiCounts[code];
    }
    const preProc = ['Scheduling Pending', 'Information Pending', 'Interview Pending', 'Documents Pending'];
    switch (filterKey) {
      case 'all-registered': return INITIAL_MEMBERS.length;
      case 'registered-users': return INITIAL_MEMBERS.filter(m => preProc.includes(m.status)).length;
      case 'info-pending': return INITIAL_MEMBERS.filter(m => m.status === 'Information Pending').length;
      case 'scheduling-pending': return INITIAL_MEMBERS.filter(m => m.status === 'Scheduling Pending').length;
      case 'interview-pending': return INITIAL_MEMBERS.filter(m => m.status === 'Interview Pending').length;
      case 'docs-pending': return INITIAL_MEMBERS.filter(m => m.status === 'Documents Pending').length;
      case 'preparation-1': return INITIAL_MEMBERS.filter(m => m.status === 'Preparation - 1').length;
      case 'preparation-2': return INITIAL_MEMBERS.filter(m => m.status === 'Preparation - 2').length;
      case 'review-summary-1': return INITIAL_MEMBERS.filter(m => m.status === 'Review & Summary 1').length;
      case 'review-summary-2': return INITIAL_MEMBERS.filter(m => m.status === 'Review & Summary 2').length;
      case 'itin-files': return INITIAL_MEMBERS.filter(m => m.status === 'ITIN Files').length;
      case 'revised-estimate': return INITIAL_MEMBERS.filter(m => m.status === 'Revised Estimate').length;
      case 'payment-pending-efiling': return 0;
      case 'payable-pending-paper-filing': return 0;
      case 'fee-payment-received-1': return 0;
      case 'fee-payment-received-2': return 0;
      case 'client-review-efiling': return 0;
      case 'client-review-paper-filing': return 0;
      case 'efiling-pending-1': return 0;
      case 'efiling-pending-2': return 0;
      case 'efiled-awaiting-1': return 0;
      case 'efiled-awaiting-2': return 0;
      case 'efiled-rejected': return 0;
      case 'city-return': return 0;
      case 'efiling-accepted-complete': return 0;
      case 'paper-filing-pending': return 0;
      case 'paper-filing-accepted-complete': return 0;
      default: return 0;
    }
  };

  const displayYear = currentYearData ? `TY${currentYearData.name}` : selectedYear;

  return (
    <aside className="sidebar-year">
      {/* Header */}
      <div className="sidebar-heading">
        <Users size={18} />
        <span>Tax Year - {displayYear}</span>
      </div>

      <div className="sidebar-menu-container">
        {/* All Registered */}
        <button 
          className={`sidebar-menu-btn ${currentFilter === 'all-registered' ? 'active' : ''}`}
          onClick={() => handleItemClick('all-registered')}
        >
          <div className="menu-btn-left">
            <ChevronRight size={14} className="chevron-bullet" />
            <span>All Registered</span>
          </div>
          <span className="sidebar-badge">{getCount('all-registered')}</span>
        </button>

        {/* PRE-PROCESSING */}
        <div className="sidebar-dropdown-group">
          <button 
            className="sidebar-menu-btn dropdown-trigger"
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
                className={`submenu-item ${currentFilter === 'registered-users' ? 'active' : ''}`}
                onClick={() => handleItemClick('registered-users')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>Registered Users</span>
                </div>
                <span className="sidebar-badge">{getCount('registered-users')}</span>
              </button>

              <button 
                className={`submenu-item ${currentFilter === 'info-pending' ? 'active' : ''}`}
                onClick={() => handleItemClick('info-pending')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>Information Pending</span>
                </div>
                <span className="sidebar-badge">{getCount('info-pending')}</span>
              </button>

              <button 
                className={`submenu-item ${currentFilter === 'scheduling-pending' ? 'active' : ''}`}
                onClick={() => handleItemClick('scheduling-pending')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>Scheduling Pending</span>
                </div>
                <span className="sidebar-badge">{getCount('scheduling-pending')}</span>
              </button>

              <button 
                className={`submenu-item ${currentFilter === 'interview-pending' ? 'active' : ''}`}
                onClick={() => handleItemClick('interview-pending')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>Interview Pending</span>
                </div>
                <span className="sidebar-badge">{getCount('interview-pending')}</span>
              </button>

              <button 
                className={`submenu-item ${currentFilter === 'docs-pending' ? 'active' : ''}`}
                onClick={() => handleItemClick('docs-pending')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>Documents Pending</span>
                </div>
                <span className="sidebar-badge">{getCount('docs-pending')}</span>
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
                className={`submenu-item ${currentFilter === 'preparation-1' ? 'active' : ''}`}
                onClick={() => handleItemClick('preparation-1')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>Preparation - 1</span>
                </div>
                <span className="sidebar-badge">{getCount('preparation-1')}</span>
              </button>

              <button 
                className={`submenu-item ${currentFilter === 'preparation-2' ? 'active' : ''}`}
                onClick={() => handleItemClick('preparation-2')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>Preparation - 2</span>
                </div>
                <span className="sidebar-badge">{getCount('preparation-2')}</span>
              </button>

              <button 
                className={`submenu-item ${currentFilter === 'review-summary-1' ? 'active' : ''}`}
                onClick={() => handleItemClick('review-summary-1')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>Review & Summary 1</span>
                </div>
                <span className="sidebar-badge">{getCount('review-summary-1')}</span>
              </button>

              <button 
                className={`submenu-item ${currentFilter === 'review-summary-2' ? 'active' : ''}`}
                onClick={() => handleItemClick('review-summary-2')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>Review & Summary 2</span>
                </div>
                <span className="sidebar-badge">{getCount('review-summary-2')}</span>
              </button>

              <button 
                className={`submenu-item ${currentFilter === 'itin-files' ? 'active' : ''}`}
                onClick={() => handleItemClick('itin-files')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>ITIN Files</span>
                </div>
                <span className="sidebar-badge">{getCount('itin-files')}</span>
              </button>

              <button 
                className={`submenu-item ${currentFilter === 'revised-estimate' ? 'active' : ''}`}
                onClick={() => handleItemClick('revised-estimate')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>Revised Estimate</span>
                </div>
                <span className="sidebar-badge">{getCount('revised-estimate')}</span>
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
                className={`submenu-item ${currentFilter === 'payment-pending-efiling' ? 'active' : ''}`}
                onClick={() => handleItemClick('payment-pending-efiling')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>Payment Pending - Efiling</span>
                </div>
                <span className="sidebar-badge">{getCount('payment-pending-efiling')}</span>
              </button>

              <button 
                className={`submenu-item ${currentFilter === 'payable-pending-paper-filing' ? 'active' : ''}`}
                onClick={() => handleItemClick('payable-pending-paper-filing')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>Payment Pending - Paper filing</span>
                </div>
                <span className="sidebar-badge">{getCount('payable-pending-paper-filing')}</span>
              </button>

              <button 
                className={`submenu-item ${currentFilter === 'fee-payment-received-1' ? 'active' : ''}`}
                onClick={() => handleItemClick('fee-payment-received-1')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>Fee Payment Received - I</span>
                </div>
                <span className="sidebar-badge">{getCount('fee-payment-received-1')}</span>
              </button>

              <button 
                className={`submenu-item ${currentFilter === 'fee-payment-received-2' ? 'active' : ''}`}
                onClick={() => handleItemClick('fee-payment-received-2')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>Fee Payment Received - II</span>
                </div>
                <span className="sidebar-badge">{getCount('fee-payment-received-2')}</span>
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
                className={`submenu-item ${currentFilter === 'client-review-efiling' ? 'active' : ''}`}
                onClick={() => handleItemClick('client-review-efiling')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>Client Review - Efiling</span>
                </div>
                <span className="sidebar-badge">{getCount('client-review-efiling')}</span>
              </button>

              <button 
                className={`submenu-item ${currentFilter === 'client-review-paper-filing' ? 'active' : ''}`}
                onClick={() => handleItemClick('client-review-paper-filing')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>Client Review - Paper Filing</span>
                </div>
                <span className="sidebar-badge">{getCount('client-review-paper-filing')}</span>
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
                className={`submenu-item ${currentFilter === 'efiling-pending-1' ? 'active' : ''}`}
                onClick={() => handleItemClick('efiling-pending-1')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>Efiling Pending - 1</span>
                </div>
                <span className="sidebar-badge">{getCount('efiling-pending-1')}</span>
              </button>

              <button 
                className={`submenu-item ${currentFilter === 'efiling-pending-2' ? 'active' : ''}`}
                onClick={() => handleItemClick('efiling-pending-2')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>Efiling Pending - 2</span>
                </div>
                <span className="sidebar-badge">{getCount('efiling-pending-2')}</span>
              </button>

              <button 
                className={`submenu-item ${currentFilter === 'efiled-awaiting-1' ? 'active' : ''}`}
                onClick={() => handleItemClick('efiled-awaiting-1')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>E - Filed & Awaiting Acceptance - 1</span>
                </div>
                <span className="sidebar-badge">{getCount('efiled-awaiting-1')}</span>
              </button>

              <button 
                className={`submenu-item ${currentFilter === 'efiled-awaiting-2' ? 'active' : ''}`}
                onClick={() => handleItemClick('efiled-awaiting-2')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>E - Filed & Awaiting Acceptance - 2</span>
                </div>
                <span className="sidebar-badge">{getCount('efiled-awaiting-2')}</span>
              </button>

              <button 
                className={`submenu-item ${currentFilter === 'efiled-rejected' ? 'active' : ''}`}
                onClick={() => handleItemClick('efiled-rejected')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>E - Filed & Rejected</span>
                </div>
                <span className="sidebar-badge">{getCount('efiled-rejected')}</span>
              </button>

              <button 
                className={`submenu-item ${currentFilter === 'city-return' ? 'active' : ''}`}
                onClick={() => handleItemClick('city-return')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>City Return</span>
                </div>
                <span className="sidebar-badge">{getCount('city-return')}</span>
              </button>

              <button 
                className={`submenu-item ${currentFilter === 'efiling-accepted-complete' ? 'active' : ''}`}
                onClick={() => handleItemClick('efiling-accepted-complete')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>E-Filing Accepted & Complete</span>
                </div>
                <span className="sidebar-badge">{getCount('efiling-accepted-complete')}</span>
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
                className={`submenu-item ${currentFilter === 'paper-filing-pending' ? 'active' : ''}`}
                onClick={() => handleItemClick('paper-filing-pending')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>Paper Filing Pending</span>
                </div>
                <span className="sidebar-badge">{getCount('paper-filing-pending')}</span>
              </button>

              <button 
                className={`submenu-item ${currentFilter === 'paper-filing-accepted-complete' ? 'active' : ''}`}
                onClick={() => handleItemClick('paper-filing-accepted-complete')}
              >
                <div className="menu-btn-left">
                  <ChevronRight size={12} className="chevron-bullet" />
                  <span>Paper Filing Done</span>
                </div>
                <span className="sidebar-badge">{getCount('paper-filing-accepted-complete')}</span>
              </button>
            </div>
          )}
        </div>

        {/* CANCELLED */}
        <button 
          className={`sidebar-menu-btn ${currentFilter === 'cancelled' ? 'active' : ''}`}
          onClick={() => handleItemClick('cancelled')}
        >
          <div className="menu-btn-left">
            <AlertTriangle size={16} className="menu-icon" />
            <span className="uppercase-label">CANCELLED</span>
          </div>
        </button>

        {/* QUERY LIST */}
        <button 
          className={`sidebar-menu-btn ${currentFilter === 'query-list' ? 'active' : ''}`}
          onClick={() => handleItemClick('query-list')}
        >
          <div className="menu-btn-left">
            <Search size={16} className="menu-icon" />
            <span className="uppercase-label">QUERY LIST</span>
          </div>
        </button>

        {/* CALL BACK REQUESTS */}
        <button 
          className={`sidebar-menu-btn ${currentFilter === 'call-back-requests' ? 'active' : ''}`}
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
          className={`sidebar-menu-btn ${currentFilter === 'just-uploaded-docs' ? 'active' : ''}`}
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
          className={`sidebar-menu-btn ${currentFilter === 'send-mail' ? 'active' : ''}`}
          onClick={() => handleItemClick('send-mail')}
        >
          <div className="menu-btn-left">
            <Send size={16} className="menu-icon" />
            <span className="uppercase-label">SEND MAIL</span>
          </div>
        </button>

        {/* MAILGUN */}
        <button 
          className={`sidebar-menu-btn ${currentFilter === 'mailgun' ? 'active' : ''}`}
          onClick={() => handleItemClick('mailgun')}
        >
          <div className="menu-btn-left">
            <Mail size={16} className="menu-icon" />
            <span className="uppercase-label">MAILGUN</span>
          </div>
        </button>

        {/* LEADS */}
        <button 
          className={`sidebar-menu-btn ${currentFilter === 'leads' ? 'active' : ''}`}
          onClick={() => handleItemClick('leads')}
        >
          <div className="menu-btn-left">
            <Users size={16} className="menu-icon" />
            <span className="uppercase-label">LEADS</span>
          </div>
        </button>

        {/* NOTES */}
        <button 
          className={`sidebar-menu-btn ${currentFilter === 'notes' ? 'active' : ''}`}
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