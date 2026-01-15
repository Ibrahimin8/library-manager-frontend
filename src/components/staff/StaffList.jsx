import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const StaffForm = ({ staff, onSubmit, onClose }) => {
  const isEdit = Boolean(staff);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "librarian",
  });

  useEffect(() => {
    if (staff) {
      setFormData({
        username: staff.username || "",
        email: staff.email || "",
        password: "", 
        role: staff.role || "librarian",
      });
    } else {
      setFormData({
        username: "",
        email: "",
        password: "",
        role: "librarian",
      });
    }
  }, [staff]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // match Swagger payload
    const payload = {
      username: formData.username.trim(),
      email: formData.email.trim(),
      role: formData.role,
      ...(formData.password.trim() ? { password: formData.password } : {}),
    };

    onSubmit(payload);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {isEdit ? "Edit Staff" : "Add Staff"}
        </h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-500" type="button">
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Username *</label>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password {isEdit ? "(leave blank to keep unchanged)" : "*"}
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="input-field"
            required={!isEdit}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="input-field"
            required
          >
            <option value="librarian">librarian</option>
            <option value="admin">admin</option>
          </select>
        </div>

        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <button type="button" onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            {isEdit ? "Update Staff" : "Create Staff"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StaffForm;