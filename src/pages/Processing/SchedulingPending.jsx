import React from 'react';
import MemberTableLayout from '../../components/MemberTableLayout';

export default function SchedulingPending({ selectedYear = 'TY2025' }) {
  return (
    <MemberTableLayout
      title="Scheduling Pending"
      subtitle="Members with interview/meeting scheduling pending"
      statusCode="SP"
      selectedYear={selectedYear}
    />
  );
}
