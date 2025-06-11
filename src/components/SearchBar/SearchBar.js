import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import './SearchBar.css';

const SearchBar = ({ onSearch, placeholder = "Search artworks..." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = useCallback((value) => {
    setSearchTerm(value);
    onSearch(value);
  }, [onSearch]);

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <motion.div 
      className="search-bar-container"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`search-input-wrapper ${isFocused ? 'focused' : ''}`}>
        <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        
        {searchTerm && (
          <motion.button
            className="clear-button"
            onClick={clearSearch}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default SearchBar;