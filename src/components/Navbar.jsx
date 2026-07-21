// import React, { useState, useEffect, useRef } from 'react';
// import { User, Key, LogOut, ChevronDown } from 'lucide-react';
// import logoLg from '../assets/logo-white.png';

// export default function Navbar({
//   activeTab,
//   setActiveTab,
//   isProfileOpen,
//   toggleProfileDropdown,
//   setIsProfileOpen,
//   setIsChangePasswordOpen,
//   selectedYear,
//   setSelectedYear,
// }) {
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const navbarRef = useRef(null);

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (navbarRef.current && !navbarRef.current.contains(event.target)) {
//         setActiveDropdown(null);
//         setIsProfileOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [setIsProfileOpen]);

//   const handleLogout = () => {
//     setIsProfileOpen(false);
//     setActiveDropdown(null);
//     if (confirm('Are you sure you want to log out of Admin Session?')) {
//       alert('Logging out... session terminated.');
//       sessionStorage.removeItem('isLoggedIn');
//       window.location.reload();
//     }
//   };

//   const toggleDropdown = (dropdownKey) => {
//     setActiveDropdown(prev => prev === dropdownKey ? null : dropdownKey);
//     setIsProfileOpen(false);
//   };

//   const handleProfileClick = () => {
//     toggleProfileDropdown();
//     setActiveDropdown(null);
//   };

//   const handleSelectYear = (year) => {
//     if (setSelectedYear) setSelectedYear('TY' + year);
//     setActiveTab('members');
//     setActiveDropdown(null);
//   };

//   const handleSelectClientSearch = (year) => {
//     if (setSelectedYear) setSelectedYear('TY' + year);
//     setActiveTab('client-search');
//     setActiveDropdown(null);
//   };

//   const handleSelectReferrals = (year) => {
//     if (setSelectedYear) setSelectedYear('TY' + year);
//     setActiveTab('referrals');
//     setActiveDropdown(null);
//   };

//   const handleSelectPayments = (year) => {
//     if (setSelectedYear) setSelectedYear('TY' + year);
//     setActiveTab('payments');
//     setActiveDropdown(null);
//   };

//   const yearsOptions = Array.from({ length: 9 }, (_, i) => 2025 - i);
//   const referralsPaymentsOptions = Array.from({ length: 5 }, (_, i) => 2025 - i);

//   return (
//     <header className="top-navbar" ref={navbarRef}>
//       {/* Left Side: Logo Branding block as per image */}
//       <div className="logo-container">
//         <img
//           src={logoLg}
//           alt="Dollar Tax Filer"
//           style={{
//             height: "60px",
//             width: "auto",
//             objectFit: "contain",
//           }}
//         />
//       </div>

//       {/* Center Navigation links */}
//       <nav>
//         <ul className="navbar-nav">
//           {/* Years Dropdown */}
//           <li className="navbar-dropdown-container">
//             <button 
//               className={`navbar-link ${activeDropdown === 'years' ? 'active' : ''}`}
//               onClick={() => toggleDropdown('years')}
//             >
//               <span>Years</span>
//               <ChevronDown size={14} />
//             </button>
//             {activeDropdown === 'years' && (
//               <ul className="navbar-dropdown-menu animate-fade-in">
//                 {yearsOptions.map(year => (
//                   <li key={year} className="navbar-dropdown-item">
//                     <button className="navbar-dropdown-btn" onClick={() => handleSelectYear(year)}>
//                       {year}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </li>

//           {/* Client Stage Link */}
//           <li>
//             <button
//               className={`navbar-link ${activeTab === 'members' ? 'active' : ''}`}
//               onClick={() => {
//                 setActiveTab('members');
//                 setActiveDropdown(null);
//               }}
//             >
//               Client Stage
//             </button>
//           </li>

//           {/* Client Search Dropdown */}
//           <li className="navbar-dropdown-container">
//             <button 
//               className={`navbar-link ${activeDropdown === 'clientSearch' ? 'active' : ''} ${activeTab === 'client-search' ? 'active' : ''}`}
//               onClick={() => toggleDropdown('clientSearch')}
//             >
//               <span>Client Search</span>
//               <ChevronDown size={14} />
//             </button>
//             {activeDropdown === 'clientSearch' && (
//               <ul className="navbar-dropdown-menu animate-fade-in">
//                 {yearsOptions.map(year => (
//                   <li key={year} className="navbar-dropdown-item">
//                     <button className="navbar-dropdown-btn" onClick={() => handleSelectClientSearch(year)}>
//                       {year}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </li>

//           {/* Referrals Dropdown */}
//           <li className="navbar-dropdown-container">
//             <button 
//               className={`navbar-link ${activeDropdown === 'referrals' ? 'active' : ''} ${activeTab === 'referrals' ? 'active' : ''}`}
//               onClick={() => toggleDropdown('referrals')}
//             >
//               <span>Referrals</span>
//               <ChevronDown size={14} />
//             </button>
//             {activeDropdown === 'referrals' && (
//               <ul className="navbar-dropdown-menu animate-fade-in">
//                 {referralsPaymentsOptions.map(year => (
//                   <li key={year} className="navbar-dropdown-item">
//                     <button className="navbar-dropdown-btn" onClick={() => handleSelectReferrals(year)}>
//                       {year}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </li>

//           {/* Referee Link */}
//           <li>
//             <button className="navbar-link" onClick={() => { setActiveDropdown(null); alert('Referee Page loaded.'); }}>
//               Referee
//             </button>
//           </li>

//           {/* M Note Link */}
//           <li>
//             <button className="navbar-link" onClick={() => { setActiveDropdown(null); alert('M Note Page loaded.'); }}>
//               M Note
//             </button>
//           </li>

//           {/* Payments Dropdown */}
//           <li className="navbar-dropdown-container">
//             <button 
//               className={`navbar-link ${activeDropdown === 'payments' ? 'active' : ''} ${activeTab === 'payments' ? 'active' : ''}`}
//               onClick={() => toggleDropdown('payments')}
//             >
//               <span>Payments</span>
//               <ChevronDown size={14} />
//             </button>
//             {activeDropdown === 'payments' && (
//               <ul className="navbar-dropdown-menu animate-fade-in">
//                 {referralsPaymentsOptions.map(year => (
//                   <li key={year} className="navbar-dropdown-item">
//                     <button className="navbar-dropdown-btn" onClick={() => handleSelectPayments(year)}>
//                       {year}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </li>
//         </ul>
//       </nav>

//       {/* Right Side: Profile dropdown */}
//       <div className="profile-dropdown-container">
//         <button className="profile-trigger" onClick={handleProfileClick}>
//           <User size={16} />
//           <span>Hi, Admin Admin</span>
//           <ChevronDown size={14} />
//         </button>
//         {isProfileOpen && (
//           <div className="profile-dropdown-menu">
//             <button
//               className="dropdown-item"
//               onClick={() => {
//                 setIsProfileOpen(false);
//                 setIsChangePasswordOpen(true);
//               }}
//             >
//               <Key size={14} />
//               <span>Change Password</span>
//             </button>
//             <div className="dropdown-divider"></div>
//             <button className="dropdown-item danger" onClick={handleLogout}>
//               <LogOut size={14} />
//               <span>Logout</span>
//             </button>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }


import React, { useState, useEffect, useRef } from 'react';
import { User, Key, LogOut, ChevronDown } from 'lucide-react';
import logoLg from '../assets/logo-white.png';
import { URLS } from '../url';

export default function Navbar({
  activeTab,
  setActiveTab,
  isProfileOpen,
  toggleProfileDropdown,
  setIsProfileOpen,
  setIsChangePasswordOpen,
  selectedYear,
  setSelectedYear,
}) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navbarRef = useRef(null);

  // --- State for years fetched from API ---
  const [yearsOptions, setYearsOptions] = useState([]);
  const [isLoadingYears, setIsLoadingYears] = useState(false);
  const [yearsError, setYearsError] = useState('');

  // --- Helper to get the token from any known key ---
  const getAuthToken = () => {
    const possibleKeys = [
      'authToken',
      'token',
      'adminToken',
      'accessToken',
      'jwt',
      'bearer',
    ];
    for (const key of possibleKeys) {
      const value =
        sessionStorage.getItem(key) || localStorage.getItem(key);
      if (value) return value;
    }
    // Debug: log all storage keys to see what’s available
    // console.log('🔑 SessionStorage keys:', Object.keys(sessionStorage));
    // console.log('🔑 LocalStorage keys:', Object.keys(localStorage));
    return null;
  };

  // --- Fetch years on mount ---
  useEffect(() => {
    const controller = new AbortController();

    const fetchYears = async () => {
      setIsLoadingYears(true);
      setYearsError('');

      const token = getAuthToken();

      // 🧪 For testing only – uncomment if you want to use the token from the curl
      // const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IjZhNThiZDFjNzE1ZjE4ZTYxZDQxY2Y5MiIsImVtYWlsIjoiZGl2eWFwZW5keWFsYTA3MTdAZ21haWwuY29tIiwiYWRtaW5fc3RhZ2UiOiJzdXBlciIsImlhdCI6MTc4NDIwNDE1OCwiZXhwIjoxODE1NzQwMTU4fQ.1pjPlGU41H1G5ei3AfTEcaWk9O1eyRTG769xnpj5xts';
      // const token = testToken; // override for testing

      if (!token) {
        setYearsError('Authentication token missing. Please log in again.');
        setIsLoadingYears(false);
        // Optionally redirect to login:
        // window.location.href = '/login';
        return;
      }

      try {
        const response = await fetch(URLS.GetYears, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          signal: controller.signal,
        });

        if (response.status === 401) {
          // Token expired – clear everything and show error
          sessionStorage.clear();
          localStorage.clear();
          setYearsError('Session expired. Please log in again.');
          // window.location.href = '/login';
          setIsLoadingYears(false);
          return;
        }

        if (!response.ok) {
          throw new Error(`Unable to load years. (${response.status})`);
        }

        const result = await response.json();

        if (!result.success || !Array.isArray(result.data)) {
          throw new Error('Invalid years response received.');
        }

        const activeYears = result.data
          .filter((year) => year.status === 'active')
          .sort((a, b) => b.name - a.name);

        setYearsOptions(activeYears);
      } catch (error) {
        if (error.name !== 'AbortError') {
          setYearsError(error.message || 'Unable to load years.');
        }
      } finally {
        setIsLoadingYears(false);
      }
    };

    fetchYears();

    return () => controller.abort();
  }, []);

  // --- Close dropdowns on outside click ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setActiveDropdown(null);
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsProfileOpen]);

  // --- Handlers ---
  const handleLogout = () => {
    setIsProfileOpen(false);
    setActiveDropdown(null);
    if (confirm('Are you sure you want to log out of Admin Session?')) {
      sessionStorage.clear();
      localStorage.clear();
      window.location.reload();
    }
  };

  const toggleDropdown = (dropdownKey) => {
    setActiveDropdown((prev) => (prev === dropdownKey ? null : dropdownKey));
    setIsProfileOpen(false);
  };

  const handleProfileClick = () => {
    toggleProfileDropdown();
    setActiveDropdown(null);
  };

  const selectYearAndNavigate = (year, tab) => {
    if (setSelectedYear) setSelectedYear('TY' + year.name);
    setActiveTab(tab);
    setActiveDropdown(null);
  };

  const handleSelectYear = (year) => selectYearAndNavigate(year, 'members');
  const handleSelectClientSearch = (year) =>
    selectYearAndNavigate(year, 'client-search');
  const handleSelectReferrals = (year) =>
    selectYearAndNavigate(year, 'referrals');
  const handleSelectPayments = (year) =>
    selectYearAndNavigate(year, 'payments');

  const renderYearsList = (onSelect) => {
    if (isLoadingYears) {
      return (
        <li className="navbar-dropdown-item">
          <span className="navbar-dropdown-btn">Loading years...</span>
        </li>
      );
    }

    if (yearsError) {
      return (
        <li className="navbar-dropdown-item">
          <span className="navbar-dropdown-btn" style={{ color: '#e74c3c' }}>
            {yearsError}
          </span>
        </li>
      );
    }

    if (yearsOptions.length === 0) {
      return (
        <li className="navbar-dropdown-item">
          <span className="navbar-dropdown-btn">No active years found.</span>
        </li>
      );
    }

    return yearsOptions.map((year) => (
      <li key={year._id} className="navbar-dropdown-item">
        <button className="navbar-dropdown-btn" onClick={() => onSelect(year)}>
          {year.name}
          {year.current_year}
        </button>
      </li>
    ));
  };

  // --- Render ---
  return (
    <header className="top-navbar" ref={navbarRef}>
      {/* Left Side: Logo */}
      <div className="logo-container">
        <img
          src={logoLg}
          alt="Dollar Tax Filer"
          style={{ height: '60px', width: 'auto', objectFit: 'contain' }}
        />
      </div>

      {/* Center Navigation */}
      <nav>
        <ul className="navbar-nav">
          {/* Years Dropdown */}
          <li className="navbar-dropdown-container">
            <button
              className={`navbar-link ${activeDropdown === 'years' ? 'active' : ''}`}
              onClick={() => toggleDropdown('years')}
            >
              <span>Years</span>
              <ChevronDown size={14} />
            </button>
            {activeDropdown === 'years' && (
              <ul className="navbar-dropdown-menu animate-fade-in">
                {renderYearsList(handleSelectYear)}
              </ul>
            )}
          </li>

          {/* Client Stage */}
          <li>
            <button
              className={`navbar-link ${activeTab === 'members' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('members');
                setActiveDropdown(null);
              }}
            >
              Client Stage
            </button>
          </li>

          {/* Client Search */}
          <li className="navbar-dropdown-container">
            <button
              className={`navbar-link ${
                activeDropdown === 'clientSearch' ? 'active' : ''
              } ${activeTab === 'client-search' ? 'active' : ''}`}
              onClick={() => toggleDropdown('clientSearch')}
            >
              <span>Client Search</span>
              <ChevronDown size={14} />
            </button>
            {activeDropdown === 'clientSearch' && (
              <ul className="navbar-dropdown-menu animate-fade-in">
                {renderYearsList(handleSelectClientSearch)}
              </ul>
            )}
          </li>

          {/* Referrals */}
          <li className="navbar-dropdown-container">
            <button
              className={`navbar-link ${
                activeDropdown === 'referrals' ? 'active' : ''
              } ${activeTab === 'referrals' ? 'active' : ''}`}
              onClick={() => toggleDropdown('referrals')}
            >
              <span>Referrals</span>
              <ChevronDown size={14} />
            </button>
            {activeDropdown === 'referrals' && (
              <ul className="navbar-dropdown-menu animate-fade-in">
                {renderYearsList(handleSelectReferrals)}
              </ul>
            )}
          </li>

          {/* Referee */}
          <li>
            <button
              className="navbar-link"
              onClick={() => {
                setActiveDropdown(null);
                alert('Referee Page loaded.');
              }}
            >
              Referee
            </button>
          </li>

          {/* M Note */}
          <li>
            <button
              className="navbar-link"
              onClick={() => {
                setActiveDropdown(null);
                alert('M Note Page loaded.');
              }}
            >
              M Note
            </button>
          </li>

          {/* Payments */}
          <li className="navbar-dropdown-container">
            <button
              className={`navbar-link ${
                activeDropdown === 'payments' ? 'active' : ''
              } ${activeTab === 'payments' ? 'active' : ''}`}
              onClick={() => toggleDropdown('payments')}
            >
              <span>Payments</span>
              <ChevronDown size={14} />
            </button>
            {activeDropdown === 'payments' && (
              <ul className="navbar-dropdown-menu animate-fade-in">
                {renderYearsList(handleSelectPayments)}
              </ul>
            )}
          </li>
        </ul>
      </nav>

      {/* Profile */}
      <div className="profile-dropdown-container">
        <button className="profile-trigger" onClick={handleProfileClick}>
          <User size={16} />
          <span>Hi, Admin Admin</span>
          <ChevronDown size={14} />
        </button>
        {isProfileOpen && (
          <div className="profile-dropdown-menu">
            <button
              className="dropdown-item"
              onClick={() => {
                setIsProfileOpen(false);
                setIsChangePasswordOpen(true);
              }}
            >
              <Key size={14} />
              <span>Change Password</span>
            </button>
            <div className="dropdown-divider"></div>
            <button className="dropdown-item danger" onClick={handleLogout}>
              <LogOut size={14} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}