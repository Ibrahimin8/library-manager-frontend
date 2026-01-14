import api from './api';

export const genreService = {
  async getAllGenres() {
    const response = await api.get('/genres');
    return response.data;
  },

  async getGenreById(id) {
    const response = await api.get(`/genres/${id}`);
    return response.data;
  },

  async createGenre(genreData) {
    const response = await api.post('/genres', genreData);
    return response.data;
  },

  async updateGenre(id, genreData) {
    const response = await api.patch(`/genres/${id}`, genreData);
    return response.data;
  },

  async deleteGenre(id) {
    const response = await api.delete(`/genres/${id}`);
    return response.data;
  }
};