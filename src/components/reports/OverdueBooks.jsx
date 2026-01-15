import React, { useState, useEffect } from 'react';
import { formatDate, daysOverdue } from '../../utils/helpers';

const OverdueBooks = () => {
  const [overdueBooks, setOverdueBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // currently i can not find usefull end point api for overdue books report
    // so i am using mock data for demonstration purposes
    const mockData = [
      { 
        id: 1, 
        book_title: 'Ethiopean History', 
        member_name: 'Semu K', 
        member_email: 'semu@example.com',
        borrow_date: '2022-01-01', 
        due_date: '2024-01-15',
        days_overdue: 5
      },
      { 
        id: 2, 
        book_title: 'Happy Family', 
        member_name: 'Ibrahim', 
        member_email: 'ibrahim@example.com',
        borrow_date: '2021-01-02', 
        due_date: '2024-01-16',
        days_overdue: 4
      },
      { 
        id: 3, 
        book_title: '13 Tsega', 
        member_name: 'Tsehaynesh Hussein', 
        member_email: 'tsehaynesh@example.com',
        borrow_date: '2024-01-03', 
        due_date: '2024-01-17',
        days_overdue: 3
      },
    ];
    setOverdueBooks(mockData);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Overdue Books Report</h3>
      
      {overdueBooks.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Book Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Borrow Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Days Overdue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {overdueBooks.map((record) => (
                <tr key={record.id} className="hover:bg-red-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {record.book_title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>{record.member_name}</div>
                    <div className="text-xs text-gray-500">{record.member_email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(record.borrow_date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(record.due_date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-red-600">
                    {record.days_overdue} days
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Overdue
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No overdue books found</p>
        </div>
      )}
    </div>
  );
};

export default OverdueBooks;