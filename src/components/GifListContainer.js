// GifListContainer.js
import React, { useState, useEffect } from 'react';
import GifList from './GifList';
import GifSearch from './GifSearch';

function GifListContainer() {
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
   
    fetchGifs('anime'); 
  }, []);

  const fetchGifs = async (query) => {
    setLoading(true);

    try {
      const apiKey = 'o0OvtK9PzSKVjE5I3inPzu1pEbALzCkW'; // 
      const apiUrl = `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${apiKey}&rating=g&limit=3`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (response.ok) {
        setGifs(data.data);
        setError(null);
      } else {
        setError(`Error: ${data.message}`);
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (query) => {
    fetchGifs(query);
  };

  return (
    <div>
      <GifSearch onSearchSubmit={handleSearchSubmit} />
      
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && <GifList gifs={gifs} />}
    </div>
  );
}

export default GifListContainer;
