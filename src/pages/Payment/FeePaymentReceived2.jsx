import React from 'react';
import MemberTableLayout from '../../components/MemberTableLayout';

export default function FeePaymentReceived2({ selectedYear = 'TY2025' }) {
  return (
    <MemberTableLayout
      title="Fee Payment Received - II"
      subtitle="Returns with fee payment received - Batch 2"
      statusCode="FPR_II"
      selectedYear={selectedYear}
    />
  );
}
