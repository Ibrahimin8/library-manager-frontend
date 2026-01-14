import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { staffService } from "../services/staff";

const StaffPage = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  // Create form
  const [createData, setCreateData] = useState({
    username: "",
    email: "",
    password: "",
    role: "librarian",
  });

  // Update form (requires id)
  const [updateId, setUpdateId] = useState("");
  const [updateData, setUpdateData] = useState({
    username: "",
    email: "",
    password: "",
    role: "librarian",
  });

  // Delete form
  const [deleteId, setDeleteId] = useState("");

  const getErrorMsg = (error, fallback) =>
    error?.response?.data?.message?.[0] ||
    error?.response?.data?.message ||
    fallback;

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await staffService.createStaff({
        username: createData.username.trim(),
        email: createData.email.trim(),
        password: createData.password,
        role: createData.role,
      });
      toast.success("Staff created successfully");
      setShowCreate(false);
      setCreateData({ username: "", email: "", password: "", role: "librarian" });
    } catch (error) {
      toast.error(getErrorMsg(error, "Failed to create staff"));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!updateId) return toast.error("Staff ID is required");

    try {
      await staffService.updateStaff(updateId, {
        username: updateData.username.trim(),
        email: updateData.email.trim(),
        password: updateData.password, // Swagger shows required; keep it required in UI
        role: updateData.role,
      });
      toast.success("Staff updated successfully");
      setShowUpdate(false);
      setUpdateId("");
      setUpdateData({ username: "", email: "", password: "", role: "librarian" });
    } catch (error) {
      toast.error(getErrorMsg(error, "Failed to update staff"));
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!deleteId) return toast.error("Staff ID is required");

    if (!window.confirm("Delete this staff member?")) return;

    try {
      await staffService.deleteStaff(deleteId);
      toast.success("Staff deleted successfully");
      setShowDelete(false);
      setDeleteId("");
    } catch (error) {
      toast.error(getErrorMsg(error, "Failed to delete staff"));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Staff Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            Create, update, and delete staff accounts (API has no staff list endpoint).
          </p>
        </div>

        <div className="flex gap-3">
          <button className="btn-primary" type="button" onClick={() => setShowCreate(true)}>
            Add Staff
          </button>
          <button className="btn-secondary" type="button" onClick={() => setShowUpdate(true)}>
            Update Staff
          </button>
          <button className="btn-secondary" type="button" onClick={() => setShowDelete(true)}>
            Delete Staff
          </button>
        </div>
      </div>

      {/* CREATE MODAL */}
      {showCreate && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-lg font-semibold mb-4">Create Staff (POST /staff)</h2>

            <form onSubmit={handleCreate} className="space-y-4">
              <input
                className="input-field"
                placeholder="Username"
                value={createData.username}
                onChange={(e) => setCreateData((p) => ({ ...p, username: e.target.value }))}
                required
              />
              <input
                className="input-field"
                placeholder="Email"
                type="email"
                value={createData.email}
                onChange={(e) => setCreateData((p) => ({ ...p, email: e.target.value }))}
                required
              />
              <input
                className="input-field"
                placeholder="Password"
                type="password"
                value={createData.password}
                onChange={(e) => setCreateData((p) => ({ ...p, password: e.target.value }))}
                required
              />
              <select
                className="input-field"
                value={createData.role}
                onChange={(e) => setCreateData((p) => ({ ...p, role: e.target.value }))}
                required
              >
                <option value="librarian">librarian</option>
                <option value="admin">admin</option>
              </select>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" className="btn-secondary" onClick={() => setShowCreate(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* UPDATE MODAL */}
      {showUpdate && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-lg font-semibold mb-4">Update Staff (PATCH /staff/:id)</h2>

            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                className="input-field"
                placeholder="Staff ID"
                value={updateId}
                onChange={(e) => setUpdateId(e.target.value)}
                required
              />
              <input
                className="input-field"
                placeholder="Username"
                value={updateData.username}
                onChange={(e) => setUpdateData((p) => ({ ...p, username: e.target.value }))}
                required
              />
              <input
                className="input-field"
                placeholder="Email"
                type="email"
                value={updateData.email}
                onChange={(e) => setUpdateData((p) => ({ ...p, email: e.target.value }))}
                required
              />
              <input
                className="input-field"
                placeholder="Password"
                type="password"
                value={updateData.password}
                onChange={(e) => setUpdateData((p) => ({ ...p, password: e.target.value }))}
                required
              />
              <select
                className="input-field"
                value={updateData.role}
                onChange={(e) => setUpdateData((p) => ({ ...p, role: e.target.value }))}
                required
              >
                <option value="librarian">librarian</option>
                <option value="admin">admin</option>
              </select>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" className="btn-secondary" onClick={() => setShowUpdate(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {showDelete && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-lg font-semibold mb-4">Delete Staff (DELETE /staff/:id)</h2>

            <form onSubmit={handleDelete} className="space-y-4">
              <input
                className="input-field"
                placeholder="Staff ID"
                value={deleteId}
                onChange={(e) => setDeleteId(e.target.value)}
                required
              />

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" className="btn-secondary" onClick={() => setShowDelete(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffPage;