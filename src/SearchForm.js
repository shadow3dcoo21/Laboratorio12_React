// SearchForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://swapi.dev/api/people/?search=${searchTerm}`);
        setResults(response.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (searchTerm.trim() !== '') {
      fetchData();
    } else {
      setResults([]);
    }
  }, [searchTerm]);

  return (
    <div>
      <h1>Star Wars Character Search</h1>
      <form>
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <ul>
        {results.map((character) => (
          <li key={character.name}>{character.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchForm;

