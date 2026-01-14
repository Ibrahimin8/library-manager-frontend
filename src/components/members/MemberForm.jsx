import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const MemberForm = ({ member, onSubmit, onClose }) => {
  const isEdit = Boolean(member);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    join_date: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
  });

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name || "",
        email: member.email || "",
        phone: member.phone || "",
        join_date: member.join_date ? String(member.join_date).slice(0, 10) : new Date().toISOString().slice(0, 10),
      });
    }
  }, [member]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ payload must match Swagger DTOs
    const payload = isEdit
      ? {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
        }
      : {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          join_date: new Date(formData.join_date).toISOString(), // ISO 8601
        };

    onSubmit(payload);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {isEdit ? "Edit Member" : "Register New Member"}
        </h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-500" type="button">
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
          <input name="name" value={formData.name} onChange={handleChange} className="input-field" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-field" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
          <input name="phone" value={formData.phone} onChange={handleChange} className="input-field" required />
        </div>

        {/* Join Date should be sent only on CREATE (POST) to match Swagger */}
        {!isEdit && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Join Date *</label>
            <input
              type="date"
              name="join_date"
              value={formData.join_date}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
          <button type="submit" className="btn-primary">{isEdit ? "Update Member" : "Register Member"}</button>
        </div>
      </form>
    </div>
  );
};

export default MemberForm;