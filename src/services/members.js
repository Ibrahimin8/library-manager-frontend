import api from './api';

export const memberService = {
  async getAllMembers() {
    const response = await api.get('/members');
    return response.data;
  },

  async getMemberById(id) {
    const response = await api.get(`/members/${id}`);
    return response.data;
  },

  async getMemberBorrowingHistory(id) {
    const response = await api.get(`/members/${id}/borrowing-history`);
    return response.data;
  },

  async createMember(memberData) {
    const response = await api.post('/members', memberData);
    return response.data;
  },

  async updateMember(id, memberData) {
    const response = await api.patch(`/members/${id}`, memberData);
    return response.data;
  },

  async deleteMember(id) {
    const response = await api.delete(`/members/${id}`);
    return response.data;
  }
};