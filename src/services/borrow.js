import api from './api';

export const borrowService = {
  async borrowBook(borrowData) {
    const response = await api.post('/borrow-records/borrow', borrowData);
    return response.data;
  },

  async returnBook(returnData) {
    const response = await api.post('/borrow-records/return', returnData);
    return response.data;
  },

  async getOverdueBooks() {
    const response = await api.get('/borrow-records/reports/overdue');
    return response.data;
  },

  async getPopularGenres() {
    const response = await api.get('/borrow-records/reports/popular-genres');
    return response.data;
  },

  async getAllBorrowRecords() {
    const response = await api.get('/borrow-records');
    return response.data;
  }
};