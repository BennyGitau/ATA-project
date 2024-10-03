import React, { useState } from 'react';
import axios from 'axios';
import { userAuth } from '../../Context/Auth';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { passwordReset, passwordResetMessage } = userAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    passwordReset({ email });

    setEmail('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        
        {passwordResetMessage && <p className="text-green-500 text-center mb-4">{passwordResetMessage}</p>}
        {/* {error && <p className="text-red-500 text-center mb-4">{error}</p>} */}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Send Password Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
