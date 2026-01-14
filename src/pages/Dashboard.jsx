import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import StatCard from '../components/common/StatCard';
import { 
  BookOpenIcon, UsersIcon, ClockIcon, 
  ExclamationTriangleIcon, PlusIcon 
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalMembers: 0,
    activeBorrows: 0,
    overdueBooks: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - in real app, fetch from API
    setTimeout(() => {
      setStats({
        totalBooks: 1245,
        totalMembers: 342,
        activeBorrows: 56,
        overdueBooks: 12,
      });
      setLoading(false);
    }, 1000);
  }, []);

  const quickActions = [
    { 
      title: 'Add New Book', 
      icon: PlusIcon, 
      action: () => window.location.href = '/books?action=create',
      color: 'bg-blue-500'
    },
    { 
      title: 'Register Member', 
      icon: UsersIcon, 
      action: () => window.location.href = '/members?action=create',
      color: 'bg-green-500'
    },
    { 
      title: 'Borrow Book', 
      icon: BookOpenIcon, 
      action: () => window.location.href = '/borrow',
      color: 'bg-purple-500'
    },
    { 
      title: 'View Overdue', 
      icon: ExclamationTriangleIcon, 
      action: () => window.location.href = '/reports',
      color: 'bg-red-500'
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-700">
          Overview of your library management system
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Books"
          value={stats.totalBooks}
          icon={BookOpenIcon}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Members"
          value={stats.totalMembers}
          icon={UsersIcon}
          color="bg-green-500"
        />
        <StatCard
          title="Active Borrows"
          value={stats.activeBorrows}
          icon={ClockIcon}
          color="bg-yellow-500"
        />
        <StatCard
          title="Overdue Books"
          value={stats.overdueBooks}
          icon={ExclamationTriangleIcon}
          color="bg-red-500"
        />
      </div>

      {/* Quick Actions */}
      <div className="card mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className="flex items-center justify-center p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors"
            >
              <div className={`p-2 rounded-lg ${action.color} mr-3`}>
                <action.icon className="h-5 w-5 text-white" />
              </div>
              <span className="font-medium text-gray-700">{action.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { user: 'John Doe', action: 'borrowed', book: 'The Great Gatsby', time: '2 hours ago' },
            { user: 'Jane Smith', action: 'returned', book: 'To Kill a Mockingbird', time: '4 hours ago' },
            { user: 'Bob Johnson', action: 'borrowed', book: '1984', time: '1 day ago' },
            { user: 'Alice Brown', action: 'registered', book: 'as new member', time: '2 days ago' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div>
                <span className="font-medium text-gray-900">{activity.user}</span>
                <span className="text-gray-600"> {activity.action} </span>
                <span className="font-medium text-gray-900">{activity.book}</span>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;