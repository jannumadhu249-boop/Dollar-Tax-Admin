import React from 'react';
import MemberTableLayout from '../components/MemberTableLayout';

export default function AllRegistered({ selectedYear = '' }) {
  return (
    <MemberTableLayout
      title="All Registered Members"
      subtitle="Overview of all registered member tax returns"
      statusCode="all"
      selectedYear={selectedYear}
    />
  );
}