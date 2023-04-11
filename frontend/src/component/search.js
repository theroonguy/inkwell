import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/search.css';

const Search = () => {
  const history = useNavigate();
  const [searchInputVisible, setSearchInputVisible] = useState(false);
  const searchInputRef = useRef();
  const searchIconRef = useRef();

  const toggleSearchInput = () => {
    setSearchInputVisible(!searchInputVisible);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const query = searchInputRef.current.value;
  
    try {
      const response = await axios.get('/api/search', { params: { query } });
      // Replace '/search-results' with the path you want for the search results page
      history.push({
        pathname: '/search-results',
        state: {
          query,
          books: response.data.books,
          users: response.data.users,
        },
      });
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchInputRef.current &&
        searchIconRef.current &&
        !searchInputRef.current.contains(event.target) &&
        !searchIconRef.current.contains(event.target)
      ) {
        setSearchInputVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="search-container">
        <form onSubmit={handleSearchSubmit}>
          <input
            ref={searchInputRef}
            className={`search expandright ${searchInputVisible ? 'visible' : ''}`}
            type="search"
            name="q"
            placeholder="Search for books or users..."
          />
          <label
            ref={searchIconRef}
            className="button searchbutton"
            htmlFor="searchright"
            onClick={toggleSearchInput}
          >
            <FontAwesomeIcon icon={faSearch} />
          </label>
        </form>
      </div>
    </>
  );
};

export default Search;
