import React from 'react';
import MemberTableLayout from '../../components/MemberTableLayout';

export default function EFiledRejected({ selectedYear = 'TY2025' }) {
  return (
    <MemberTableLayout
      title="E - Filed & Rejected"
      subtitle="E-filed returns rejected by IRS"
      statusCode="EF_REJ"
      selectedYear={selectedYear}
    />
  );
}
