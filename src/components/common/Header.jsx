import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  UserCircleIcon, 
  ChevronDownIcon, 
  HomeIcon 
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login'); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="relative z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          
          
          <div className="flex-1 flex items-center space-x-4">
            <button 
              onClick={() => navigate('/')} 
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all focus:outline-none"
              title="Go to Home"
            >
              <HomeIcon className="h-6 w-6" />
            </button>

            <h1 className="text-lg font-semibold text-gray-900">
              Welcome back, <span className="text-blue-600">{user?.username || 'User'}</span>
            </h1>
          </div>

          
          <div className="flex items-center" ref={dropdownRef}>
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 p-1 rounded-lg hover:bg-gray-50 transition-all focus:outline-none"
              >
                <UserCircleIcon className="h-9 w-9 text-gray-400" />
                
                <div className="hidden md:block text-left">
                  <p className="text-sm font-bold text-gray-800 leading-none">
                    {user?.username}
                  </p>
                  <p className="text-xs text-gray-500 font-medium capitalize mt-1">
                    {user?.role}
                  </p>
                </div>

                <ChevronDownIcon 
                  className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} 
                />
              </button>

              
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-xl py-1 z-50 animate-in fade-in zoom-in duration-100">
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-3 text-sm text-red-600 font-semibold hover:bg-red-50 transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;