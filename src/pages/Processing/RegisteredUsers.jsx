import React from 'react';
import MemberTableLayout from '../../components/MemberTableLayout';

export default function RegisteredUsers({ selectedYear = 'TY2025' }) {
  return (
    <MemberTableLayout
      title="Registered Users"
      subtitle="Newly registered users"
      statusCode="RGO"
      selectedYear={selectedYear}
    />
  );
}
