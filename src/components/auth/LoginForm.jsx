import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [authError, setAuthError] = useState(false); 
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError(false); 

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      const result = await login(email, password);
      
      if (result.success) {
        toast.success('Login successful!');
        navigate('/');
      } else {
       
        setAuthError(true);
        toast.error(result.error || 'Invalid email or password');
      }
    } catch (error) {
      setAuthError(true);
      toast.error('Server connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (authError) setAuthError(false); 
  };

  const getInputStyles = (isError) => `
    appearance-none relative block w-full px-3 py-2 border rounded-md 
    placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 sm:text-sm transition-all
    ${isError 
      ? 'border-red-500 bg-red-50 focus:ring-red-500 focus:border-red-500' 
      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}
  `;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-transparent">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Library Manager
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Secure Sign-in
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label 
                htmlFor="email-address" 
                className={`block text-sm font-medium mb-1 ${authError ? 'text-red-600' : 'text-gray-700'}`}
              >
                User Name
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                value={email}
                onChange={handleInputChange(setEmail)}
                className={getInputStyles(authError)}
                placeholder="admin@library.com"
              />
            </div>
            <div>
              <label 
                htmlFor="password" 
                className={`block text-sm font-medium mb-1 ${authError ? 'text-red-600' : 'text-gray-700'}`}
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={handleInputChange(setPassword)}
                className={getInputStyles(authError)}
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white transition-colors
                ${authError ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'} 
                disabled:opacity-50`}
            >
              {loading ? 'Verifying...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;