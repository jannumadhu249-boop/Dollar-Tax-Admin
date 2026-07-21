import React from 'react';
import MemberTableLayout from '../../components/MemberTableLayout';

export default function ItinFiles({ selectedYear = 'TY2025' }) {
  return (
    <MemberTableLayout
      title="ITIN Files"
      subtitle="Tax returns requiring ITIN application or filing"
      statusCode="RE_ES"
      selectedYear={selectedYear}
    />
  );
}
