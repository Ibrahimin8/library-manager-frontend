import api from "./api"; // Your central axios instance

export const bookService = {
  // GET /books
  async getAllBooks() {
    const response = await api.get('/books');
    return response.data;
  },

  // POST /books
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

  // PUT /books/:id
  async updateBook(id, bookData) {
    const response = await api.put(`/books/${id}`, bookData);
    return response.data;
  },

  // DELETE /books/:id
  async deleteBook(id) {
    const response = await api.delete(`/books/${id}`);
    return response.data;
  }
};