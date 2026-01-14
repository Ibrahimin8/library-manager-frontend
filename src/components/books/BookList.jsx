import React from 'react';
import BookCard from './BookCard';

const BookList = ({ books, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Title</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Author</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Genre</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase text-center">Year</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase text-center">Copies</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Status</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {books.map((book) => (
            <BookCard key={book.id} book={book} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;