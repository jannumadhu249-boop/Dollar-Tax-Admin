import React, { useState, useEffect, useRef } from 'react';
import { User, Key, LogOut, ChevronDown } from 'lucide-react';
import logoLg from '../assets/logo-lg.png';

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

  // Close dropdowns when clicking outside
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

  const handleLogout = () => {
    setIsProfileOpen(false);
    setActiveDropdown(null);
    if (confirm('Are you sure you want to log out of Admin Session?')) {
      alert('Logging out... session terminated.');
      sessionStorage.removeItem('isLoggedIn');
      window.location.reload();
    }
  };

  const toggleDropdown = (dropdownKey) => {
    setActiveDropdown(prev => prev === dropdownKey ? null : dropdownKey);
    setIsProfileOpen(false);
  };

  const handleProfileClick = () => {
    toggleProfileDropdown();
    setActiveDropdown(null);
  };

  const handleSelectYear = (year) => {
    if (setSelectedYear) setSelectedYear('TY' + year);
    setActiveTab('members');
    setActiveDropdown(null);
  };

  const handleSelectClientSearch = (year) => {
    if (setSelectedYear) setSelectedYear('TY' + year);
    setActiveTab('client-search');
    setActiveDropdown(null);
  };

  const handleSelectReferrals = (year) => {
    if (setSelectedYear) setSelectedYear('TY' + year);
    setActiveTab('referrals');
    setActiveDropdown(null);
  };

  const handleSelectPayments = (year) => {
    if (setSelectedYear) setSelectedYear('TY' + year);
    setActiveTab('payments');
    setActiveDropdown(null);
  };

  const yearsOptions = Array.from({ length: 9 }, (_, i) => 2025 - i); // 2025 to 2017
  const referralsPaymentsOptions = Array.from({ length: 5 }, (_, i) => 2025 - i); // 2025 to 2021

  return (
    <header className="top-navbar" ref={navbarRef}>
      {/* Left Side: Logo Branding block as per image */}
      <div className="logo-container">
        <img
          src={logoLg}
          alt="Dollar Tax Filer"
          style={{
            height: "60px",
            width: "auto",
            objectFit: "contain",
          }}
        />
      </div>

      {/* Center Navigation links */}
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
                {yearsOptions.map(year => (
                  <li key={year} className="navbar-dropdown-item">
                    <button className="navbar-dropdown-btn" onClick={() => handleSelectYear(year)}>
                      {year}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Client Stage Link */}
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

          {/* Client Search Dropdown */}
          <li className="navbar-dropdown-container">
            <button 
              className={`navbar-link ${activeDropdown === 'clientSearch' ? 'active' : ''} ${activeTab === 'client-search' ? 'active' : ''}`}
              onClick={() => toggleDropdown('clientSearch')}
            >
              <span>Client Search</span>
              <ChevronDown size={14} />
            </button>
            {activeDropdown === 'clientSearch' && (
              <ul className="navbar-dropdown-menu animate-fade-in">
                {yearsOptions.map(year => (
                  <li key={year} className="navbar-dropdown-item">
                    <button className="navbar-dropdown-btn" onClick={() => handleSelectClientSearch(year)}>
                      {year}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Referrals Dropdown */}
          <li className="navbar-dropdown-container">
            <button 
              className={`navbar-link ${activeDropdown === 'referrals' ? 'active' : ''} ${activeTab === 'referrals' ? 'active' : ''}`}
              onClick={() => toggleDropdown('referrals')}
            >
              <span>Referrals</span>
              <ChevronDown size={14} />
            </button>
            {activeDropdown === 'referrals' && (
              <ul className="navbar-dropdown-menu animate-fade-in">
                {referralsPaymentsOptions.map(year => (
                  <li key={year} className="navbar-dropdown-item">
                    <button className="navbar-dropdown-btn" onClick={() => handleSelectReferrals(year)}>
                      {year}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Referee Link */}
          <li>
            <button className="navbar-link" onClick={() => { setActiveDropdown(null); alert('Referee Page loaded.'); }}>
              Referee
            </button>
          </li>

          {/* M Note Link */}
          <li>
            <button className="navbar-link" onClick={() => { setActiveDropdown(null); alert('M Note Page loaded.'); }}>
              M Note
            </button>
          </li>

          {/* Payments Dropdown */}
          <li className="navbar-dropdown-container">
            <button 
              className={`navbar-link ${activeDropdown === 'payments' ? 'active' : ''} ${activeTab === 'payments' ? 'active' : ''}`}
              onClick={() => toggleDropdown('payments')}
            >
              <span>Payments</span>
              <ChevronDown size={14} />
            </button>
            {activeDropdown === 'payments' && (
              <ul className="navbar-dropdown-menu animate-fade-in">
                {referralsPaymentsOptions.map(year => (
                  <li key={year} className="navbar-dropdown-item">
                    <button className="navbar-dropdown-btn" onClick={() => handleSelectPayments(year)}>
                      {year}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </nav>

      {/* Right Side: Profile dropdown */}
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
