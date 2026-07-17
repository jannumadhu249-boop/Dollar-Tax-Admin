import React, { useState } from 'react';
import { 
  User, 
  Key, 
  LogOut, 
  ChevronDown, 
  Calendar,
  Users
} from 'lucide-react';
import MemberList from './components/MemberList';
import Estimator from './components/Estimator';
import ClientTracker from './components/ClientTracker';
import DocumentHub from './components/DocumentHub';
import ChangePasswordModal from './components/ChangePasswordModal';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import CallbackRequests from './components/CallbackRequests';
import QueryList from './components/QueryList';
import Notes from './components/Notes';
import Leads from './components/Leads';
import SendMail from './components/SendMail';
import Mailgun from './components/Mailgun';
import PaperFiling from './components/PaperFiling';
import PaperFilingDone from './components/PaperFilingDone';
import EFilingView from './components/EFilingView';
import ReferralsReport from './components/ReferralsReport';
import PaymentsReport from './components/PaymentsReport';
import ClientSearch from './components/ClientSearch';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem('isLoggedIn') === 'true';
  });
  const [activeTab, setActiveTab] = useState('members');
  const [selectedYear, setSelectedYear] = useState('TY2025');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all-registered');

  // Default mock states to support other views
  const [taxEstimatorData, setTaxEstimatorData] = useState({
    filingStatus: 'Single',
    grossIncome: 65000,
    preTaxDeductions: 5000,
    deductionType: 'Standard',
    itemizedDeductions: 0,
    taxCredits: 2000,
    estimatedTax: 3168,
    effectiveRate: 4.9,
    totalDeductions: 20000
  });

  const [clients, setClients] = useState([
    { name: 'Alice Cooper', email: 'alice@cooper.com', formType: 'Form 1040 (W-2)', estTax: 1200, status: 'Ready to File', updatedAt: '2026-06-12' },
    { name: 'Bob Marley', email: 'bob@marley.org', formType: 'Schedule C (Sole Prop)', estTax: 5400, status: 'Documents Pending', updatedAt: '2026-06-14' },
    { name: 'Charlie Chaplin', email: 'charlie@chaplin.io', formType: 'Form 1120-S (S-Corp)', estTax: -850, status: 'Filed', updatedAt: '2026-06-10' },
    { name: 'Diana Ross', email: 'diana@ross.net', formType: 'Form 1040 (1099-NEC)', estTax: 320, status: 'Documents Pending', updatedAt: '2026-06-15' },
    { name: 'Elvis Presley', email: 'elvis@presley.co', formType: 'Form 1065 (Partnership)', estTax: 12500, status: 'Not Started', updatedAt: '2026-06-01' }
  ]);

  const [documents, setDocuments] = useState([
    { name: '2025_W2_employer.pdf', category: 'Income', size: '1.2 MB', uploadedAt: '2026-04-10' },
    { name: '1099_NEC_freelance_consulting.pdf', category: 'Income', size: '420 KB', uploadedAt: '2026-05-12' },
    { name: 'mortgage_interest_1098.pdf', category: 'Expense', size: '850 KB', uploadedAt: '2026-06-01' },
    { name: 'passport_scan_verified.pdf', category: 'ID & Corporate', size: '2.1 MB', uploadedAt: '2026-03-20' }
  ]);

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    setIsProfileOpen(false);
    if (confirm('Are you sure you want to log out of Admin Session?')) {
      alert('Logging out... session terminated.');
      sessionStorage.removeItem('isLoggedIn');
      window.location.reload();
    }
  };

  // Render view
  const renderViewContent = () => {
    if (activeTab === 'members') {
      if (selectedStatus === 'call-back-requests') {
        return <CallbackRequests />;
      }
      if (selectedStatus === 'query-list') {
        return <QueryList />;
      }
      if (selectedStatus === 'send-mail') {
        return <SendMail selectedYear={selectedYear} />;
      }
      if (selectedStatus === 'mailgun') {
        return <Mailgun selectedYear={selectedYear} />;
      }
      if (selectedStatus === 'leads') {
        return <Leads />;
      }
      if (selectedStatus === 'notes') {
        return <Notes />;
      }
      if (selectedStatus === 'paper-filing-pending') {
        return <PaperFiling mode="pending" />;
      }
      if (selectedStatus === 'paper-filing-accepted-complete') {
        return <PaperFilingDone />;
      }
      // E-Filing views
      const eFilingKeys = [
        'efiling-pending-1','efiling-pending-2',
        'efiled-awaiting-1','efiled-awaiting-2',
        'efiled-rejected','city-return','efiling-accepted-complete'
      ];
      if (eFilingKeys.includes(selectedStatus)) {
        return <EFilingView mode={selectedStatus} />;
      }
      return <MemberList selectedStatus={selectedStatus} selectedYear={selectedYear} />;
    }

    switch (activeTab) {
      case 'client-search':
        return <ClientSearch selectedYear={selectedYear} setSelectedYear={setSelectedYear} />;
      case 'referrals':
        return <ReferralsReport selectedYear={selectedYear} setSelectedYear={setSelectedYear} />;
      case 'payments':
        return <PaymentsReport selectedYear={selectedYear} setSelectedYear={setSelectedYear} />;
      case 'estimator':
        return <Estimator currentEstimate={taxEstimatorData} onSaveEstimate={setTaxEstimatorData} />;
      case 'pipeline':
        return <ClientTracker clients={clients} onUpdateClients={setClients} />;
      case 'documents':
        return <DocumentHub documents={documents} onUpdateDocuments={setDocuments} />;
      default:
        return <MemberList selectedStatus={selectedStatus} selectedYear={selectedYear} />;
    }
  };

  if (!isLoggedIn) {
    return <Login onLoginSuccess={() => {
      setIsLoggedIn(true);
      sessionStorage.setItem('isLoggedIn', 'true');
    }} />;
  }

  return (
    <div className="app-shell">
      <Navbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isProfileOpen={isProfileOpen}
        toggleProfileDropdown={toggleProfileDropdown}
        setIsProfileOpen={setIsProfileOpen}
        setIsChangePasswordOpen={setIsChangePasswordOpen}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />
      {/* Sub navbar & Sidebar layout */}
      <div className="shell-body">
        <Sidebar 
          selectedYear={selectedYear}
          currentFilter={selectedStatus}
          onFilterChange={(filter) => {
            setSelectedStatus(filter);
            setActiveTab('members');
          }}
        />
        {/* Main content display */}
        <main className="main-viewport">
          {renderViewContent()}
        </main>
      </div>
      {/* Change Password modal overlay */}
      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
      />
    </div>
  );
}
