import React from 'react';
import MemberTableLayout from '../../components/MemberTableLayout';

export default function PaperFilingDone({ selectedYear = 'TY2025' }) {
  return (
    <MemberTableLayout
      title="Paper Filing Done"
      subtitle="Completed paper filing tax returns"
      statusCode="PF_D"
      selectedYear={selectedYear}
    />
  );
}
