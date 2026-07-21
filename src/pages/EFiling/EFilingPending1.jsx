import React from 'react';
import MemberTableLayout from '../../components/MemberTableLayout';

export default function EFilingPending1({ selectedYear = 'TY2025' }) {
  return (
    <MemberTableLayout
      title="Efiling Pending - 1"
      subtitle="Pending E-filing returns - Stage 1"
      statusCode="EFP_I"
      selectedYear={selectedYear}
    />
  );
}
