import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const gamesApi = {
    /**
     * Fetch all games or search for games
     * @param {string} searchQuery - Optional search term
     * @returns {Promise} API response with games data
     */
    async getGames(searchQuery = '') {
        try {
            const url = searchQuery
                ? `${API_URL}/list?search=${encodeURIComponent(searchQuery)}`
                : `${API_URL}/list`;

            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error('Error fetching games:', error);
            throw error;
        }
    }
};
