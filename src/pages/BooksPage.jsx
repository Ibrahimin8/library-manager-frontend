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
    } catch (error) {
      toast.error("Error loading books");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = async (formData) => {
    try {
      if (selectedBook) {
        await bookService.updateBook(selectedBook.id, formData);
        toast.success("Book updated!");
      } else {
        await bookService.createBook(formData);
        toast.success("Book created!");
      }
      setShowForm(false);
      fetchBooks();
    } catch (error) {
      toast.error("Action failed");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this book?")) {
      await bookService.deleteBook(id);
      fetchBooks();
    }
  };

  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Library Inventory</h1>
        <button 
          onClick={() => { setSelectedBook(null); setShowForm(true); }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add New Book
        </button>
      </div>

      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      {loading ? <p>Loading...</p> : (
        <BookList 
          books={filteredBooks} 
          onEdit={(book) => { setSelectedBook(book); setShowForm(true); }} 
          onDelete={handleDelete} 
        />
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <BookForm 
            book={selectedBook} 
            onClose={() => setShowForm(false)} 
            onSubmit={handleCreateOrUpdate} 
          />
        </div>
      )}
    </div>
  );
};

export default BooksPage;