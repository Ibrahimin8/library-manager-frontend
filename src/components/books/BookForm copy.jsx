import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const BookForm = ({ book, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    title: '', author: '', published_year: 2024, available_copies: 1, genre_id: 1
  });

  useEffect(() => {
    if (book) setFormData({
        ...book,
        genre_id: book.genre_id || book.genre?.id || 1
    });
  }, [book]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="p-8 bg-white rounded-2xl max-w-lg w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">{book ? 'Edit Book' : 'Add New Book'}</h2>
        <button onClick={onClose}><XMarkIcon className="h-6 w-6 text-gray-400" /></button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          className="w-full border p-3 rounded-lg" 
          placeholder="Title" 
          value={formData.title}
          onChange={e => setFormData({...formData, title: e.target.value})}
          required 
        />
        <input 
          className="w-full border p-3 rounded-lg" 
          placeholder="Author" 
          value={formData.author}
          onChange={e => setFormData({...formData, author: e.target.value})}
          required 
        />
        <div className="grid grid-cols-2 gap-4">
          <input 
            type="number" className="border p-3 rounded-lg" placeholder="Year" 
            value={formData.published_year}
            onChange={e => setFormData({...formData, published_year: e.target.value})}
          />
          <input 
            type="number" className="border p-3 rounded-lg" placeholder="Copies" 
            value={formData.available_copies}
            onChange={e => setFormData({...formData, available_copies: e.target.value})}
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
          {book ? 'Update Inventory' : 'Add to Collection'}
        </button>
      </form>
    </div>
  );
};

export default BookForm;