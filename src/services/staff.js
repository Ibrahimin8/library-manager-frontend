import api from "./api";

export const staffService = {
  async createStaff(payload) {
    // payload: { username, email, password, role }
    const res = await api.post("/staff", payload);
    return res.data;
  },

  async updateStaff(id, payload) {
    // payload: { username, email, password, role }
    const res = await api.patch(`/staff/${id}`, payload);
    return res.data;
  },

  async deleteStaff(id) {
    const res = await api.delete(`/staff/${id}`);
    return res.data;
  },
};
