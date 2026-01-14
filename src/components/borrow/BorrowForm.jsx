import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";
import { calculateDueDate } from "../../utils/helpers";

import { bookService } from "../../services/books";
import { memberService } from "../../services/members";

const BorrowForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    book_id: "",
    member_id: "",
    due_date: calculateDueDate().toISOString().slice(0, 10), // YYYY-MM-DD
  });

  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load real data
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [b, m] = await Promise.all([
          bookService.getAllBooks(),
          memberService.getAllMembers(),
        ]);

        const bookList = Array.isArray(b) ? b : (b?.data ?? b?.books ?? []);
        const memberList = Array.isArray(m) ? m : (m?.data ?? m?.members ?? []);

        setBooks(bookList);
        setMembers(memberList);
      } catch (e) {
        toast.error("Failed to load books/members");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  useEffect(() => {
    if (formData.book_id) {
      const book = books.find((b) => b.id === Number(formData.book_id));
      setSelectedBook(book || null);
    } else {
      setSelectedBook(null);
    }
  }, [formData.book_id, books]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Match Swagger: book_id, member_id are numbers; due_date is string (ISO)
    const payload = {
      book_id: Number(formData.book_id),
      member_id: Number(formData.member_id),
      due_date: new Date(formData.due_date).toISOString(),
    };

    onSubmit(payload);
  };

  const availableBooks = books.filter((book) => Number(book.available_copies) > 0);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Borrow Book</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-500" type="button">
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      {loading ? (
        <div className="py-10 text-center text-gray-600">Loading...</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="member_id" className="block text-sm font-medium text-gray-700 mb-1">
              Select Member *
            </label>
            <select
              id="member_id"
              name="member_id"
              value={formData.member_id}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="" disabled>
                Choose a member
              </option>
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name} ({member.email})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="book_id" className="block text-sm font-medium text-gray-700 mb-1">
              Select Book *
            </label>
            <select
              id="book_id"
              name="book_id"
              value={formData.book_id}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="" disabled>
                Choose a book
              </option>
              {availableBooks.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.title} by {book.author} ({book.available_copies} available)
                </option>
              ))}
            </select>

            {availableBooks.length === 0 && (
              <p className="mt-2 text-sm text-red-600">No books available for borrowing</p>
            )}
          </div>

          {selectedBook && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Selected Book Details</h4>
              <p className="text-sm text-blue-800">Title: {selectedBook.title}</p>
              <p className="text-sm text-blue-800">Author: {selectedBook.author}</p>
              <p className="text-sm text-blue-800">
                Available Copies: {selectedBook.available_copies}
              </p>
            </div>
          )}

          <div>
            <label htmlFor="due_date" className="block text-sm font-medium text-gray-700 mb-1">
              Due Date *
            </label>
            <input
              type="date"
              id="due_date"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
              className="input-field"
              required
              min={new Date().toISOString().slice(0, 10)}
            />
            <p className="mt-1 text-sm text-gray-500">Books are typically due in 14 days</p>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={!formData.book_id || !formData.member_id}
            >
              Process Borrow
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default BorrowForm;