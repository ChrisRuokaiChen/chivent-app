import React, { useContext } from 'react';
import { AuthContext } from '../state/AuthContext';

export default function AccountPage() {
  const { user } = useContext(AuthContext);
  return (
    <div className="account-page">
      <h2>Your Account</h2>
      <p>Email: <strong>{user?.email}</strong></p>
      {/* You can add more profile fields here */}
    </div>
  );
}
