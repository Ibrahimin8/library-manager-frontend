import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  HomeIcon, BookOpenIcon, UsersIcon, 
  ArrowRightOnRectangleIcon, TagIcon, 
  UserGroupIcon, ChartBarIcon 
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Books', href: '/books', icon: BookOpenIcon },
  { name: 'Members', href: '/members', icon: UsersIcon },
  { name: 'Borrow/Return', href: '/borrow', icon: ArrowRightOnRectangleIcon },
  { name: 'Genres', href: '/genres', icon: TagIcon },
  { name: 'Staff', href: '/staff', icon: UserGroupIcon },
  { name: 'Reports', href: '/reports', icon: ChartBarIcon },
];

const Sidebar = () => {
  const { logout, user } = useAuth();

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-200 lg:bg-white lg:pt-5 lg:pb-4">
      <div className="flex flex-col flex-1">
        <div className="px-6">
          <h1 className="text-2xl font-bold text-primary-700">Library Manager</h1>
          <p className="mt-1 text-sm text-gray-500">
            {user?.role === 'admin' ? 'Administrator' : 'Librarian'}
          </p>
        </div>
        <nav className="mt-8 flex-1 space-y-1 px-6">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `group flex items-center px-2 py-2 text-sm font-medium rounded-lg ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto p-6">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;