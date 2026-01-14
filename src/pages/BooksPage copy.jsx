import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { bookService } from '../services/books';
import BookList from '../components/books/BookList';
import BookForm from '../components/books/BookForm';
import SearchBar from '../components/common/SearchBar';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchBooks(); }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const data = await bookService.getAllBooks();
      setBooks(data);
    } catch (err) {
      toast.error("Database connection failed");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (formData) => {
    try {
      if (selectedBook) {
        await bookService.updateBook(selectedBook.id, formData);
        toast.success("Record updated");
      } else {
        await bookService.createBook(formData);
        toast.success("Book added");
      }
      setShowForm(false);
      fetchBooks();
    } catch (err) {
      toast.error("Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this entry?")) {
      await bookService.deleteBook(id);
      fetchBooks();
    }
  };

  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-10 max-w-6xl mx-auto min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Books Management</h1>
          <p className="text-gray-500">Manage your library's digital inventory</p>
        </div>
        <button 
          onClick={() => { setSelectedBook(null); setShowForm(true); }}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold shadow-md hover:bg-blue-700 transition-all"
        >
          Add New Book
        </button>
      </div>

      <div className="mb-6 bg-white p-4 rounded-xl shadow-sm border">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>

      {loading ? (
         <div className="text-center py-20 font-medium text-gray-400">Loading library data...</div>
      ) : (
        <BookList 
          books={filteredBooks} 
          onEdit={(b) => { setSelectedBook(b); setShowForm(true); }} 
          onDelete={handleDelete} 
        />
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <BookForm 
            book={selectedBook} 
            onClose={() => setShowForm(false)} 
            onSubmit={handleAction} 
          />
        </div>
      )}
    </div>
  );
};

export default BooksPage;