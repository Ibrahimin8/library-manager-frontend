import React from 'react';
import OverdueBooks from '../components/reports/OverdueBooks';
import PopularGenres from '../components/reports/PopularGenres';

const ReportsPage = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Reports & Analytics</h1>
        <p className="mt-2 text-sm text-gray-700">
          View library statistics and generate reports
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <OverdueBooks />
        <PopularGenres />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Most Borrowed Book</p>
              <p className="text-lg font-semibold text-gray-900">The Great Gatsby</p>
              <p className="text-sm text-gray-500">45 borrows this month</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Most Active Member</p>
              <p className="text-lg font-semibold text-gray-900">John Doe</p>
              <p className="text-sm text-gray-500">12 books borrowed</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Return Rate</p>
              <p className="text-lg font-semibold text-green-600">94.5%</p>
              <p className="text-sm text-gray-500">On-time returns</p>
            </div>
          </div>
        </div>

        <div className="card md:col-span-2">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Activity</h3>
          <div className="text-center py-12">
            <p className="text-gray-500">Monthly activity chart will appear here</p>
            <p className="text-sm text-gray-400 mt-2">(Chart integration coming soon)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;