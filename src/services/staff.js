import api from './api';

export const staffService = {
  // GET /auth/users - To list all staff members
  async getAllStaff() {
    const response = await api.get('/auth/users');
    // Based on your controller code, this returns { users: [...] }
    return response.data.users; 
  },

  // POST /auth/signup - To add a new staff member (Admin or Librarian)
  async createStaff(staffData) {
    const response = await api.post('/auth/signup', staffData);
    return response.data;
  },

  // PATCH /staff/{id} - To update existing staff details
  async updateStaff(id, updateData) {
    const response = await api.patch(`/staff/${id}`, updateData);
    return response.data;
  },

  // DELETE /staff/{id} - To remove a staff member
  async deleteStaff(id) {
    const response = await api.delete(`/staff/${id}`);
    return response.data;
  }
};