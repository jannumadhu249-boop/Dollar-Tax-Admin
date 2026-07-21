import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import ChangePasswordModal from './pages/ChangePasswordModal';

// ──────────────────────────────────────────────────────────
//  Top-level pages
// ──────────────────────────────────────────────────────────
import Estimator from './pages/Estimator';
import ClientTracker from './pages/ClientTracker';
import DocumentHub from './pages/DocumentHub';
import CallbackRequests from './pages/CallbackRequests';
import QueryList from './pages/QueryList';
import Notes from './pages/Notes';
import Leads from './pages/Leads';
import SendMail from './pages/SendMail';
import Mailgun from './pages/Mailgun';
import ReferralsReport from './pages/ReferralsReport';
import PaymentsReport from './pages/PaymentsReport';
import ClientSearch from './pages/ClientSearch';

// ──────────────────────────────────────────────────────────
//  Modular Pages — API integrated with MemberTableLayout
// ──────────────────────────────────────────────────────────
import AllRegistered from './pages/AllRegistered';
import Cancelled from './pages/Cancelled';

// Processing folder
import RegisteredUsers from './pages/Processing/RegisteredUsers';
import InfoPending from './pages/Processing/InfoPending';
import SchedulingPending from './pages/Processing/SchedulingPending';
import InterviewPending from './pages/Processing/InterviewPending';
import DocumentPending from './pages/Processing/DocumentPending';

// Preparation folder
import Preparation1 from './pages/Preparation/Preparation1';
import Preparation2 from './pages/Preparation/Preparation2';
import ReviewSummary1 from './pages/Preparation/ReviewSummary1';
import ReviewSummary2 from './pages/Preparation/ReviewSummary2';
import ItinFiles from './pages/Preparation/ItinFiles';
import RevisedEstimate from './pages/Preparation/RevisedEstimate';

// Payment folder
import PaymentPendingEfiling from './pages/Payment/PaymentPendingEfiling';
import PaymentPendingPaperFiling from './pages/Payment/PaymentPendingPaperFiling';
import FeePaymentReceived1 from './pages/Payment/FeePaymentReceived1';
import FeePaymentReceived2 from './pages/Payment/FeePaymentReceived2';

// Client Review folder
import ClientReviewEfiling from './pages/ClientReview/ClientReviewEfiling';
import ClientReviewPaperFiling from './pages/ClientReview/ClientReviewPaperFiling';

// E-Filing folder
import EFilingPending1 from './pages/EFiling/EFilingPending1';
import EFilingPending2 from './pages/EFiling/EFilingPending2';
import EFiledAwaitingAcceptance1 from './pages/EFiling/EFiledAwaitingAcceptance1';
import EFiledAwaitingAcceptance2 from './pages/EFiling/EFiledAwaitingAcceptance2';
import EFiledRejected from './pages/EFiling/EFiledRejected';
import CityReturn from './pages/EFiling/CityReturn';
import EFilingAcceptedComplete from './pages/EFiling/EFilingAcceptedComplete';

// Paper Filing folder
import PaperFilingPending from './pages/PaperFiling/PaperFilingPending';
import PaperFilingDoneFolder from './pages/PaperFiling/PaperFilingDone';

/* ─────────────────────────────────────────────────────────────
   URL Hash → Filter Key mapping
───────────────────────────────────────────────────────────── */
const ROUTE_MAP = {
  'all-registered':                '#/all-registered',
  'registered-users':              '#/processing/registered-users',
  'info-pending':                  '#/processing/info-pending',
  'scheduling-pending':            '#/processing/scheduling-pending',
  'interview-pending':             '#/processing/interview-pending',
  'docs-pending':                  '#/processing/document-pending',
  'preparation-1':                 '#/preparation/preparation-1',
  'preparation-2':                 '#/preparation/preparation-2',
  'review-summary-1':              '#/preparation/review-summary-1',
  'review-summary-2':              '#/preparation/review-summary-2',
  'itin-files':                    '#/preparation/itin-files',
  'revised-estimate':              '#/preparation/revised-estimate',
  'payment-pending-efiling':       '#/payment/pending-efiling',
  'payable-pending-paper-filing':  '#/payment/pending-paper-filing',
  'fee-payment-received-1':        '#/payment/fee-received-1',
  'fee-payment-received-2':        '#/payment/fee-received-2',
  'client-review-efiling':         '#/client-review/efiling',
  'client-review-paper-filing':    '#/client-review/paper-filing',
  'efiling-pending-1':             '#/efiling/pending-1',
  'efiling-pending-2':             '#/efiling/pending-2',
  'efiled-awaiting-1':             '#/efiling/awaiting-1',
  'efiled-awaiting-2':             '#/efiling/awaiting-2',
  'efiled-rejected':               '#/efiling/rejected',
  'city-return':                   '#/efiling/city-return',
  'efiling-accepted-complete':     '#/efiling/accepted-complete',
  'paper-filing-pending':          '#/paper-filing/pending',
  'paper-filing-accepted-complete':'#/paper-filing/done',
  'cancelled':                     '#/cancelled',
  'query-list':                    '#/query-list',
  'call-back-requests':            '#/call-back-requests',
  'just-uploaded-docs':            '#/just-uploaded-docs',
  'send-mail':                     '#/send-mail',
  'mailgun':                       '#/mailgun',
  'leads':                         '#/leads',
  'notes':                         '#/notes',
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem('isLoggedIn') === 'true';
  });

  const [activeTab, setActiveTab] = useState('members');
  const [selectedYear, setSelectedYear] = useState('TY2025');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  // Default on login: All Registered
  const [selectedStatus, setSelectedStatus] = useState('all-registered');

  // URL Hash Sync
  useEffect(() => {
    if (!isLoggedIn) return;

    const updateFromHash = () => {
      const hash = window.location.hash;
      const foundKey = Object.keys(ROUTE_MAP).find(k => ROUTE_MAP[k] === hash);
      if (foundKey) {
        setSelectedStatus(foundKey);
        setActiveTab('members');
      } else if (!hash || hash === '#' || hash === '#/') {
        window.location.hash = '#/all-registered';
        setSelectedStatus('all-registered');
      }
    };

    updateFromHash();
    window.addEventListener('hashchange', updateFromHash);
    return () => window.removeEventListener('hashchange', updateFromHash);
  }, [isLoggedIn]);

  const handleFilterChange = (statusKey) => {
    setSelectedStatus(statusKey);
    setActiveTab('members');
    if (ROUTE_MAP[statusKey]) {
      window.location.hash = ROUTE_MAP[statusKey];
    }
  };

  const renderViewContent = () => {
    if (activeTab === 'members') {
      switch (selectedStatus) {
        // ── Default / All Registered ──
        case 'all-registered':
          return <AllRegistered selectedYear={selectedYear} />;

        // ── Processing Folder ──
        case 'registered-users':
          return <RegisteredUsers selectedYear={selectedYear} />;
        case 'info-pending':
          return <InfoPending selectedYear={selectedYear} />;
        case 'scheduling-pending':
          return <SchedulingPending selectedYear={selectedYear} />;
        case 'interview-pending':
          return <InterviewPending selectedYear={selectedYear} />;
        case 'docs-pending':
          return <DocumentPending selectedYear={selectedYear} />;

        // ── Preparation Folder ──
        case 'preparation-1':
          return <Preparation1 selectedYear={selectedYear} />;
        case 'preparation-2':
          return <Preparation2 selectedYear={selectedYear} />;
        case 'review-summary-1':
          return <ReviewSummary1 selectedYear={selectedYear} />;
        case 'review-summary-2':
          return <ReviewSummary2 selectedYear={selectedYear} />;
        case 'itin-files':
          return <ItinFiles selectedYear={selectedYear} />;
        case 'revised-estimate':
          return <RevisedEstimate selectedYear={selectedYear} />;

        // ── Payment Folder ──
        case 'payment-pending-efiling':
          return <PaymentPendingEfiling selectedYear={selectedYear} />;
        case 'payable-pending-paper-filing':
          return <PaymentPendingPaperFiling selectedYear={selectedYear} />;
        case 'fee-payment-received-1':
          return <FeePaymentReceived1 selectedYear={selectedYear} />;
        case 'fee-payment-received-2':
          return <FeePaymentReceived2 selectedYear={selectedYear} />;

        // ── Client Review Folder ──
        case 'client-review-efiling':
          return <ClientReviewEfiling selectedYear={selectedYear} />;
        case 'client-review-paper-filing':
          return <ClientReviewPaperFiling selectedYear={selectedYear} />;

        // ── E-Filing Folder ──
        case 'efiling-pending-1':
          return <EFilingPending1 selectedYear={selectedYear} />;
        case 'efiling-pending-2':
          return <EFilingPending2 selectedYear={selectedYear} />;
        case 'efiled-awaiting-1':
          return <EFiledAwaitingAcceptance1 selectedYear={selectedYear} />;
        case 'efiled-awaiting-2':
          return <EFiledAwaitingAcceptance2 selectedYear={selectedYear} />;
        case 'efiled-rejected':
          return <EFiledRejected selectedYear={selectedYear} />;
        case 'city-return':
          return <CityReturn selectedYear={selectedYear} />;
        case 'efiling-accepted-complete':
          return <EFilingAcceptedComplete selectedYear={selectedYear} />;

        // ── Paper Filing Folder ──
        case 'paper-filing-pending':
          return <PaperFilingPending selectedYear={selectedYear} />;
        case 'paper-filing-accepted-complete':
          return <PaperFilingDoneFolder selectedYear={selectedYear} />;

        // ── Other ──
        case 'cancelled':
          return <Cancelled selectedYear={selectedYear} />;
        case 'call-back-requests':
          return <CallbackRequests />;
        case 'query-list':
          return <QueryList />;
        case 'send-mail':
          return <SendMail selectedYear={selectedYear} />;
        case 'mailgun':
          return <Mailgun selectedYear={selectedYear} />;
        case 'leads':
          return <Leads />;
        case 'notes':
          return <Notes />;

        default:
          return <AllRegistered selectedYear={selectedYear} />;
      }
    }

    // Non-member tabs
    switch (activeTab) {
      case 'client-search':
        return <ClientSearch selectedYear={selectedYear} setSelectedYear={setSelectedYear} />;
      case 'referrals':
        return <ReferralsReport selectedYear={selectedYear} setSelectedYear={setSelectedYear} />;
      case 'payments':
        return <PaymentsReport selectedYear={selectedYear} setSelectedYear={setSelectedYear} />;
      case 'estimator':
        return <Estimator />;
      case 'pipeline':
        return <ClientTracker />;
      case 'documents':
        return <DocumentHub />;
      default:
        return <AllRegistered selectedYear={selectedYear} />;
    }
  };

  if (!isLoggedIn) {
    return (
      <Login
        onLoginSuccess={() => {
          setIsLoggedIn(true);
          sessionStorage.setItem('isLoggedIn', 'true');
          window.location.hash = '#/all-registered';
        }}
      />
    );
  }

  return (
    <div className="app-shell">
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'members') {
            window.location.hash = `#/${tab}`;
          } else {
            window.location.hash = ROUTE_MAP[selectedStatus] || '#/all-registered';
          }
        }}
        isProfileOpen={isProfileOpen}
        toggleProfileDropdown={() => setIsProfileOpen(!isProfileOpen)}
        setIsProfileOpen={setIsProfileOpen}
        setIsChangePasswordOpen={setIsChangePasswordOpen}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />
      <div className="shell-body">
        <Sidebar
          selectedYear={selectedYear}
          currentFilter={selectedStatus}
          onFilterChange={handleFilterChange}
        />
        <main className="main-viewport">
          {renderViewContent()}
        </main>
      </div>
      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
      />
    </div>
  );
}
