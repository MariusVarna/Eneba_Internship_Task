import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import GameGrid from './components/GameGrid';
import { gamesApi } from './api/games';
import './index.css';

function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchGames = useCallback(async (query = '') => {
    try {
      setLoading(true);
      setError(null);
      const response = await gamesApi.getGames(query);

      if (response.success) {
        setGames(response.data);
      } else {
        setError('Failed to fetch games');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching games');
      console.error('Error fetching games:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    fetchGames(query);
  }, [fetchGames]);

  return (
    <div className="min-h-screen">
      <Header />
      <SearchBar
        onSearch={handleSearch}
        resultsCount={!loading && !error ? games.length : null}
      />
      <GameGrid
        games={games}
        loading={loading}
        error={error}
      />
    </div>
  );
}

export default App;
