import React, { useState, useEffect } from 'react';
import ReferralsReportView from '../ReferralReport/ReferralReportView';
import { URLS } from '../../url';

const getAuthToken = () => {
  const keys = ['authToken', 'token', 'adminToken', 'accessToken', 'jwt'];
  for (const key of keys) {
    const value = sessionStorage.getItem(key) || localStorage.getItem(key);
    if (value) return value;
  }
  throw new Error('Authentication token not found. Please log in.');
};

export default function ReferralsReport({ selectedYear }) {
  // ---------- Filter state ----------
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [submittedSearch, setSubmittedSearch] = useState({ term: '', from: '', to: '' });
  const [page, setPage] = useState(1);
  const limit = 10;

  // ---------- Data states ----------
  const [referralsData, setReferralsData] = useState([]);
  const [pagination, setPagination] = useState({ currentPage: 1, limit: 10, totalRecords: 0, totalPages: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ---------- OTP state ----------
  const [unmaskedFields, setUnmaskedFields] = useState({});
  const [verificationOtp, setVerificationOtp] = useState('');
  const [verificationFieldKey, setVerificationFieldKey] = useState(null);
  const [verificationItemId, setVerificationItemId] = useState(null);
  const [verificationType, setVerificationType] = useState(null);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [timeLeft, setTimeLeft] = useState(120);
  const [isVerifying, setIsVerifying] = useState(false);
  const [success, setSuccess] = useState('');

  // ---------- View List Modal state ----------
  const [showViewListModal, setShowViewListModal] = useState(false);
  const [selectedReferrer, setSelectedReferrer] = useState(null);
  const [viewListLoading, setViewListLoading] = useState(false);

  // ---------- Derived ----------
  const numericYear = selectedYear ? selectedYear.replace('TY', '') : '2026';

  // ---------- API calls ----------
  const fetchReferrals = async (pageNum = page, email = searchTerm, from = dateFrom, to = dateTo) => {
    setLoading(true);
    setError('');
    try {
      const token = getAuthToken();
      const body = {
        page: pageNum,
        limit,
        email: email || '',
        from_date: from || '',
        to_date: to || ''
      };
      const response = await fetch(URLS.GetReferalReport, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const result = await response.json();
      if (result.success) {
        const mapped = result.data.map((item, idx) => ({
          sNo: (pageNum - 1) * limit + idx + 1,
          _id: item._id,
          memberId: item.member_id || item._id,
          name: item.name || '—',
          email: item.email || '—',
          referralsCount: item.referrals_count || 0,
          dollarsEarned: item.dollars_earned || 0,
          balance: item.balance_amount || 0,
        }));
        setReferralsData(mapped);
        setPagination(result.pagination || { currentPage: 1, limit: 10, totalRecords: 0, totalPages: 0 });
      } else {
        setError(result.message || 'Failed to fetch referrals.');
      }
    } catch (err) {
      setError(err.message || 'Network error.');
    } finally {
      setLoading(false);
    }
  };

  const fetchMemberReferrals = async (memberId) => {
    setViewListLoading(true);
    try {
      const token = getAuthToken();
      const response = await fetch(`${URLS.ViewReferalMember}${memberId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const result = await response.json();
      if (result.success) {
        const member = referralsData.find(r => r.memberId === memberId);
        const referrer = {
          name: member?.name || '—',
          referralsCount: member?.referralsCount || 0,
          dollarsEarned: member?.dollarsEarned || 0,
          referredMembers: result.data.map(item => ({
            _id: item._id, // referral id
            name: item.friend_name || '—',
            email: item.friend_email || '—',
            mobile: item.friend_mobile || '—',
            year: item.year?.name || '—',
            amount: item.amount || 0,
            paidAmount: item.paid_amount || 0,
            status: item.status || '—',
            createdAt: item.createdAt || '—'
          }))
        };
        setSelectedReferrer(referrer);
        setShowViewListModal(true);
      } else {
        setError(result.message || 'Failed to fetch member referrals.');
      }
    } catch (err) {
      setError(err.message || 'Network error.');
    } finally {
      setViewListLoading(false);
    }
  };

  // ---------- OTP helpers ----------
  const sendOtp = async (itemId, type) => {
    try {
      const token = getAuthToken();
      const url = type === 'member' ? URLS.SendEmailOtp : URLS.RefereeSendEmailOtp;
      const body = type === 'member' ? { member_id: itemId } : { referral_id: itemId };
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });
      const result = await response.json();
      if (!result.success) {
        setOtpError(result.message || 'Failed to send OTP.');
      }
    } catch (err) {
      setOtpError(err.message || 'Network error sending OTP.');
    }
  };

  const handleFieldClick = (fieldKey, isCurrentlyUnmasked, itemId, type) => {
    if (isCurrentlyUnmasked) {
      setUnmaskedFields(prev => ({ ...prev, [fieldKey]: false }));
    } else {
      setVerificationFieldKey(fieldKey);
      setVerificationItemId(itemId);
      setVerificationType(type);
      sendOtp(itemId, type);
      setOtp(['', '', '', '', '', '']);
      setOtpError('');
      setSuccess('Verification code sent to your email.');
      setShowOtpModal(true);
    }
  };

  const handleVerifyOtp = async () => {
    const code = otp.join('');
    if (code.length < 6) {
      setOtpError('Please enter the complete 6-digit code.');
      return;
    }
    setIsVerifying(true);
    setOtpError('');
    try {
      const token = getAuthToken();
      const url = verificationType === 'member' ? URLS.VerifyEmailOtp : URLS.RefereeVerifyEmailOtp;
      const body = verificationType === 'member'
        ? { member_id: verificationItemId, otp: code }
        : { referral_id: verificationItemId, otp: code };
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });
      const result = await response.json();
      if (result.success) {
        setUnmaskedFields(prev => ({ ...prev, [verificationFieldKey]: true }));
        setSuccess('Verified successfully!');
        setTimeout(() => {
          setShowOtpModal(false);
          setIsVerifying(false);
        }, 400);
      } else {
        setOtpError(result.message || 'Invalid OTP. Please try again.');
      }
    } catch (err) {
      setOtpError(err.message || 'Network error verifying OTP.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = () => {
    if (timeLeft > 0) return;
    setTimeLeft(120);
    sendOtp(verificationItemId, verificationType);
    setOtp(['', '', '', '', '', '']);
    setSuccess('New verification code sent.');
  };

  // ---------- Timer effect ----------
  useEffect(() => {
    if (!showOtpModal) return;
    setOtp(['', '', '', '', '', '']);
    setTimeLeft(120);
    setOtpError('');
    setSuccess('Verification code sent to your email.');
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(timer); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [showOtpModal]);

  // ---------- Fetch on filter change ----------
  useEffect(() => {
    fetchReferrals(1);
    setPage(1);
  }, [searchTerm, dateFrom, dateTo, page, selectedYear]);

  // ---------- Handlers ----------
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedSearch({ term: searchTerm, from: dateFrom, to: dateTo });
  };

  const handleViewList = (referrer) => {
    fetchMemberReferrals(referrer.memberId);
  };

  const handleCloseViewList = () => {
    setShowViewListModal(false);
    setSelectedReferrer(null);
  };

  const getMaskedEmail = (email) => {
    if (!email) return '';
    const parts = email.split('@');
    return 'XXXXXXXXXX.' + (parts[parts.length - 1]?.split('.').pop() || '');
  };

  // ---------- Render ----------
  return (
    <ReferralsReportView
      // Filter
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      dateFrom={dateFrom}
      setDateFrom={setDateFrom}
      dateTo={dateTo}
      setDateTo={setDateTo}
      handleSubmit={handleSubmit}
      // Data
      filteredReferrals={referralsData}
      numericYear={numericYear}
      loading={loading}
      error={error}
      pagination={pagination}
      onPageChange={(newPage) => {
        setPage(newPage);
        fetchReferrals(newPage);
      }}
      // OTP
      showOtpModal={showOtpModal}
      setShowOtpModal={setShowOtpModal}
      otp={otp}
      otpError={otpError}
      timeLeft={timeLeft}
      isVerifying={isVerifying}
      success={success}
      handleOtpChange={setOtp}
      handleVerifyOtp={handleVerifyOtp}
      handleResend={handleResend}
      handleFieldClick={handleFieldClick}
      getMaskedEmail={getMaskedEmail}
      unmaskedFields={unmaskedFields}
      // View List
      showViewListModal={showViewListModal}
      selectedReferrer={selectedReferrer}
      handleViewList={handleViewList}
      handleCloseViewList={handleCloseViewList}
      viewListLoading={viewListLoading}
    />
  );
}