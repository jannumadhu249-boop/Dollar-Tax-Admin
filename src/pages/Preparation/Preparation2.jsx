import React from 'react';
import MemberTableLayout from '../../components/MemberTableLayout';

export default function Preparation2({ selectedYear = 'TY2025' }) {
  return (
    <MemberTableLayout
      title="Preparation - 2"
      subtitle="Returns in secondary preparation stage"
      statusCode="PP_II"
      selectedYear={selectedYear}
    />
  );
}
