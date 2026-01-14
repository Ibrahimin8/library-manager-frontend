import React, { useState, useEffect } from 'react';

const PopularGenres = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - in real app, fetch from API
    const mockData = [
      { name: 'Fiction', borrow_count: 150, percentage: 30 },
      { name: 'Science', borrow_count: 120, percentage: 24 },
      { name: 'Technology', borrow_count: 90, percentage: 18 },
      { name: 'History', borrow_count: 75, percentage: 15 },
      { name: 'Biography', borrow_count: 65, percentage: 13 },
    ];
    setGenres(mockData);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const totalBorrows = genres.reduce((sum, genre) => sum + genre.borrow_count, 0);

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">Popular Genres</h3>
        <div className="text-sm text-gray-500">
          Total Borrows: <span className="font-semibold">{totalBorrows}</span>
        </div>
      </div>

      <div className="space-y-4">
        {genres.map((genre, index) => (
          <div key={genre.name} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-700">{genre.name}</span>
              <span className="text-gray-900">
                {genre.borrow_count} borrows ({genre.percentage}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full"
                style={{ width: `${genre.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-gray-200 pt-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Genre Distribution</h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {genres.map((genre) => (
            <div key={genre.name} className="text-center">
              <div className="text-2xl font-semibold text-primary-600">
                {genre.percentage}%
              </div>
              <div className="text-xs text-gray-500 mt-1">{genre.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularGenres;