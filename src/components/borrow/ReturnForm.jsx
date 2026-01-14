import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";
import api from "../../services/api";

const ReturnForm = ({ onSubmit, onClose }) => {
  const [borrowRecords, setBorrowRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecords = async () => {
      try {
        setLoading(true);

        // ✅ CHANGE THIS to your real GET endpoint that lists borrow records
        // Examples:
        // const res = await api.get("/borrow-records");
        // const res = await api.get("/borrow-records/active");
        const res = await api.get("/borrow-records"); // <-- adjust if needed

        const data = res.data;
        const list = Array.isArray(data) ? data : (data?.data ?? data?.items ?? data?.records ?? []);
        setBorrowRecords(list);
      } catch (e) {
        toast.error("Failed to load borrow records");
        setBorrowRecords([]);
      } finally {
        setLoading(false);
      }
    };

    loadRecords();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedRecord) return;

    // ✅ Swagger expects a number
    onSubmit({ borrow_record_id: Number(selectedRecord) });
  };

  // keep only active (not returned)
  const activeRecords = borrowRecords.filter((r) => !r.return_date);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Return Book</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-500" type="button">
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      {loading ? (
        <div className="py-10 text-center text-gray-600">Loading...</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="borrow_record" className="block text-sm font-medium text-gray-700 mb-1">
              Select Borrow Record *
            </label>

            <select
              id="borrow_record"
              value={selectedRecord}
              onChange={(e) => setSelectedRecord(e.target.value)}
              className="input-field"
              required
            >
              <option value="" disabled>
                Choose a borrow record
              </option>

              {activeRecords.map((record) => (
                <option key={record.id} value={record.id}>
                  {/* adjust these fields to match your API response */}
                  {(record.book_title || record.book?.title || "Book")} - Borrowed by{" "}
                  {(record.member_name || record.member?.name || "Member")} (Due:{" "}
                  {String(record.due_date || "").slice(0, 10)})
                </option>
              ))}
            </select>

            {activeRecords.length === 0 && (
              <p className="mt-2 text-sm text-gray-500">No active borrow records found</p>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={!selectedRecord}>
              Process Return
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ReturnForm;