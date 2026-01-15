import api from "./api"; // Your central axios instance

export const bookService = {
  
  async getAllBooks() {
    const response = await api.get('/books');
    return response.data;
  },

  
  async createBook(bookData) {
    const payload = {
      ...bookData,
      published_year: Number(bookData.published_year),
      available_copies: Number(bookData.available_copies),
      genre_id: Number(bookData.genre_id)
    };
    const response = await api.post('/books', payload);
    return response.data;
  },

  
  async updateBook(id, bookData) {
    const response = await api.put(`/books/${id}`, bookData);
    return response.data;
  },

  
  async deleteBook(id) {
    const response = await api.delete(`/books/${id}`);
    return response.data;
  }
};