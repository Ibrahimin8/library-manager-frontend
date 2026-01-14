import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import MemberList from '../components/members/MemberList';
import MemberForm from '../components/members/MemberForm';
import SearchBar from '../components/common/SearchBar';

const MembersPage = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMembers();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = members.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMembers(filtered);
    } else {
      setFilteredMembers(members);
    }
  }, [searchTerm, members]);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      // Mock data - in real app, fetch from API
      const mockMembers = [
        { 
          id: 1, 
          name: 'John Doe', 
          email: 'john@example.com',
          phone: '+1 (555) 123-4567',
          join_date: '2024-01-01',
          status: 'active'
        },
        { 
          id: 2, 
          name: 'Jane Smith', 
          email: 'jane@example.com',
          phone: '+1 (555) 987-6543',
          join_date: '2024-01-15',
          status: 'active'
        },
        { 
          id: 3, 
          name: 'Bob Johnson', 
          email: 'bob@example.com',
          phone: '+1 (555) 456-7890',
          join_date: '2024-02-01',
          status: 'suspended'
        },
      ];
      setMembers(mockMembers);
      setFilteredMembers(mockMembers);
    } catch (error) {
      toast.error('Failed to fetch members');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (memberData) => {
    try {
      // Mock API call
      toast.success('Member registered successfully');
      setShowForm(false);
      fetchMembers();
    } catch (error) {
      toast.error('Failed to register member');
    }
  };

  const handleUpdate = async (id, memberData) => {
    try {
      // Mock API call
      toast.success('Member updated successfully');
      setShowForm(false);
      setSelectedMember(null);
      fetchMembers();
    } catch (error) {
      toast.error('Failed to update member');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        // Mock API call
        toast.success('Member deleted successfully');
        fetchMembers();
      } catch (error) {
        toast.error('Failed to delete member');
      }
    }
  };

  const handleEdit = (member) => {
    setSelectedMember(member);
    setShowForm(true);
  };

  const handleViewHistory = (member) => {
    // Navigate to member detail page or show modal
    toast.success(`Viewing history for ${member.name}`);
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
          onClick={() => setShowForm(true)}
          className="btn-primary"
        >
          Register Member
        </button>
      </div>

      {/* Search Bar */}
      <div className="card mb-6">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search members by name or email..."
        />
      </div>

      {/* Member List */}
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

      {/* Member Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <MemberForm
              member={selectedMember}
              onSubmit={selectedMember ? 
                (data) => handleUpdate(selectedMember.id, data) : 
                handleCreate
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