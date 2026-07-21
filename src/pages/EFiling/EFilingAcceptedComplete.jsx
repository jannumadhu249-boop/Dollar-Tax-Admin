import React from 'react';
import MemberTableLayout from '../../components/MemberTableLayout';

export default function EFilingAcceptedComplete({ selectedYear = 'TY2025' }) {
  return (
    <MemberTableLayout
      title="E-Filing Accepted & Filing Complete"
      subtitle="E-filed returns accepted and completed"
      statusCode="EFA_FC"
      selectedYear={selectedYear}
    />
  );
}
