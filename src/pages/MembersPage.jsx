import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

import MemberList from "../components/members/MemberList";
import MemberForm from "../components/members/MemberForm";
import SearchBar from "../components/common/SearchBar";
import { memberService } from "../services/members";

const MembersPage = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const data = await memberService.getAllMembers();

      // handle possible API shapes: [] OR {data: []} OR {members: []}
      const list = Array.isArray(data) ? data : (data?.data ?? data?.members ?? data?.items ?? []);
      setMembers(list);
    } catch (error) {
      toast.error("Failed to fetch members");
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const filteredMembers = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return members;

    return members.filter((m) => {
      const name = (m.name || "").toLowerCase();
      const email = (m.email || "").toLowerCase();
      return name.includes(term) || email.includes(term);
    });
  }, [members, searchTerm]);

  const handleCreate = async (memberData) => {
    try {
      await memberService.createMember(memberData);
      toast.success("Member registered successfully");
      setShowForm(false);
      setSelectedMember(null);
      fetchMembers();
    } catch (error) {
      toast.error("Failed to register member");
    }
  };

  const handleUpdate = async (id, memberData) => {
    try {
      await memberService.updateMember(id, memberData);
      toast.success("Member updated successfully");
      setShowForm(false);
      setSelectedMember(null);
      fetchMembers();
    } catch (error) {
      toast.error("Failed to update member");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;

    try {
      await memberService.deleteMember(id);
      toast.success("Member deleted successfully");
      fetchMembers();
    } catch (error) {
      toast.error("Failed to delete member");
    }
  };

  const handleEdit = (member) => {
    setSelectedMember(member);
    setShowForm(true);
  };

  const handleViewHistory = async (member) => {
    try {
      
      toast.success(`Viewing history for ${member.name}`);
    } catch (e) {
      toast.error("Failed to load borrowing history");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Members Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage library members and their accounts
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedMember(null);
            setShowForm(true);
          }}
          className="btn-primary"
        >
          Register Member
        </button>
      </div>

      
      <div className="card mb-6">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search members by name or email..."
        />
      </div>

      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <MemberList
          members={filteredMembers}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onViewHistory={handleViewHistory}
        />
      )}

      
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <MemberForm
              member={selectedMember}
              onSubmit={
                selectedMember
                  ? (data) => handleUpdate(selectedMember.id, data)
                  : handleCreate
              }
              onClose={() => {
                setShowForm(false);
                setSelectedMember(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MembersPage;