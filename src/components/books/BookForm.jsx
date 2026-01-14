import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { genreService } from "../../services/genres"; // <-- adjust name to your service}; // <-- create/import this

const BookForm = ({ book, onSubmit, onClose }) => {
  const [genres, setGenres] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    published_year: 2024,
    available_copies: 1,
    genre_id: 1,
  });

  // Load genres
  useEffect(() => {
    const loadGenres = async () => {
      try {
        const data = await genreService.getAllGenres(); // <-- adjust name to your service
        setGenres(data);

        // set default genre_id if not set
        if (!book && data?.length && !formData.genre_id) {
          setFormData((p) => ({ ...p, genre_id: data[0].id }));
        }
      } catch (e) {
        toast.error("Failed to load genres");
      }
    };

    loadGenres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fill form when editing
  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || "",
        author: book.author || "",
        published_year: book.published_year ?? 2024,
        available_copies: book.available_copies ?? 1,
        genre_id: book.genre_id || book.genre?.id || 1,
      });
    }
  }, [book]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      published_year: Number(formData.published_year),
      available_copies: Number(formData.available_copies),
      genre_id: Number(formData.genre_id),
    });
  };

  return (
    <div className="p-8 bg-white rounded-2xl max-w-lg w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">{book ? "Edit Book" : "Add New Book"}</h2>
        <button onClick={onClose}>
          <XMarkIcon className="h-6 w-6 text-gray-400" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-3 rounded-lg"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />

        <input
          className="w-full border p-3 rounded-lg"
          placeholder="Author"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          required
        />

        {/* ✅ GENRE SELECT (this is what you're missing) */}
        <select
          className="w-full border p-3 rounded-lg"
          value={formData.genre_id}
          onChange={(e) => setFormData({ ...formData, genre_id: Number(e.target.value) })}
          required
        >
          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            className="border p-3 rounded-lg"
            placeholder="Year"
            value={formData.published_year}
            onChange={(e) => setFormData({ ...formData, published_year: e.target.value })}
          />
          <input
            type="number"
            className="border p-3 rounded-lg"
            placeholder="Copies"
            value={formData.available_copies}
            onChange={(e) => setFormData({ ...formData, available_copies: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
        >
          {book ? "Update Inventory" : "Add to Collection"}
        </button>
      </form>
    </div>
  );
};

export default BookForm;