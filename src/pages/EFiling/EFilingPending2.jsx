import React from 'react';
import MemberTableLayout from '../../components/MemberTableLayout';

export default function EFilingPending2({ selectedYear = 'TY2025' }) {
  return (
    <MemberTableLayout
      title="Efiling Pending - 2"
      subtitle="Pending E-filing returns - Stage 2"
      statusCode="EFP_II"
      selectedYear={selectedYear}
    />
  );
}
