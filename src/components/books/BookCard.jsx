import React from 'react';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

const BookCard = ({ book, onEdit, onDelete }) => {
  const isAvailable = book.available_copies > 0;

  return (
    <tr className="hover:bg-gray-50 transition-colors border-b">
      <td className="px-6 py-4 font-bold text-gray-900">{book.title}</td>
      <td className="px-6 py-4 text-gray-600">{book.author}</td>
      <td className="px-6 py-4">
        <span className="bg-gray-100 px-2 py-1 rounded text-xs font-semibold">
          {book.genre?.name || 'General'}
        </span>
      </td>
      <td className="px-6 py-4 text-center">{book.published_year}</td>
      <td className="px-6 py-4 text-center">
        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-sm font-bold">
          {book.available_copies}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
          isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {isAvailable ? 'Available' : 'Out of Stock'}
        </span>
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end gap-3">
          <button onClick={() => onEdit(book)} className="text-blue-600 hover:text-blue-800">
            <PencilSquareIcon className="h-5 w-5" />
          </button>
          <button onClick={() => onDelete(book.id)} className="text-red-600 hover:text-red-800">
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default BookCard;