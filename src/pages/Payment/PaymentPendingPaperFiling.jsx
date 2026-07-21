import React from 'react';
import MemberTableLayout from '../../components/MemberTableLayout';

export default function PaymentPendingPaperFiling({ selectedYear = 'TY2025' }) {
  return (
    <MemberTableLayout
      title="Payment Pending - Paper filing"
      subtitle="Paper filing returns with payment pending"
      statusCode="PP_PF"
      selectedYear={selectedYear}
    />
  );
}
