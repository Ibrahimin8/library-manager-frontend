import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import DataTable from "../components/common/DataTable";
import { genreService } from "../services/genres";

const GenresPage = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAdd, setShowAdd] = useState(false);
  const [newGenreName, setNewGenreName] = useState("");

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      setLoading(true);
      const data = await genreService.getAllGenres();

      const list = Array.isArray(data) ? data : (data?.data ?? data?.genres ?? data?.items ?? []);
      setGenres(list);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch genres");
      setGenres([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGenre = async (e) => {
    e.preventDefault();

    if (!newGenreName.trim()) {
      toast.error("Please enter genre name");
      return;
    }

    try {
      await genreService.createGenre({ name: newGenreName.trim() });
      toast.success("Genre added successfully");
      setNewGenreName("");
      setShowAdd(false);
      fetchGenres();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add genre");
    }
  };

  const columns = [
    { key: "name", title: "Genre Name" },
    { key: "book_count", title: "Books Count" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Genres Management</h1>
          <p className="mt-2 text-sm text-gray-700">Manage book genres and categories</p>
        </div>

        <button type="button" className="btn-primary" onClick={() => setShowAdd(true)}>
          Add Genre
        </button>
      </div>

      <div className="card">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <DataTable columns={columns} data={genres} emptyMessage="No genres found" />
        )}
      </div>

      {/* Add Genre Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Add Genre</h2>
              <button type="button" onClick={() => setShowAdd(false)} className="text-gray-500">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateGenre} className="space-y-4">
              <input
                className="w-full border p-3 rounded-lg"
                placeholder="Genre name (e.g. Fantasy)"
                value={newGenreName}
                onChange={(e) => setNewGenreName(e.target.value)}
                required
              />

              <div className="flex justify-end gap-3">
                <button type="button" className="btn-secondary" onClick={() => setShowAdd(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenresPage;