import React, { useState, useEffect } from 'react';
import { genreService } from '../../services/genres'; // Verified path
import { toast } from 'react-hot-toast';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

const GenreList = () => {
  const [genres, setGenres] = useState([]);
  const [newGenreName, setNewGenreName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGenres();
  }, []);

  const loadGenres = async () => {
    try {
      setLoading(true);
      const data = await genreService.getAllGenres();
      setGenres(data);
    } catch (error) {
      // Handles the 401 Unauthorized or 500 Server Error
      toast.error(error.response?.data?.message || "Failed to load genres");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newGenreName.trim()) return;

    try {
      await genreService.createGenre({ name: newGenreName });
      toast.success("Genre added successfully!");
      setNewGenreName('');
      loadGenres(); // Refresh list
    } catch (error) {
      toast.error(error.response?.data?.message || "Unauthorized action");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure? This may affect books assigned to this genre.")) return;
    
    try {
      await genreService.deleteGenre(id);
      toast.success("Genre deleted");
      loadGenres();
    } catch (error) {
      toast.error("Could not delete genre");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Manage Genres</h2>

      {/* Quick Add Form */}
      <form onSubmit={handleCreate} className="flex gap-2 mb-8">
        <input
          type="text"
          placeholder="New Genre Name (e.g. Fantasy)"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          value={newGenreName}
          onChange={(e) => setNewGenreName(e.target.value)}
        />
        <button 
          type="submit" 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition-all flex items-center gap-2"
        >
          <PlusIcon className="h-5 w-5" /> Add
        </button>
      </form>

      {/* Genre Table */}
      {loading ? (
        <div className="text-center py-4 text-gray-400 italic">Updating categories...</div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-100">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-xs font-bold text-gray-400 uppercase">ID</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-400 uppercase">Genre Name</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-400 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {genres.map((genre) => (
                <tr key={genre.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-400">#{genre.id}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{genre.name}</td>
                  <td className="px-4 py-3 text-right">
                    <button 
                      onClick={() => handleDelete(genre.id)}
                      className="text-red-500 hover:bg-red-50 p-1.5 rounded-md transition-colors"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GenreList;