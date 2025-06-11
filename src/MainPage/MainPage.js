import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import './MainPage.css';
import Header from '../Header/Header';
import SearchBar from '../components/SearchBar/SearchBar';
import ArtworkCard from '../components/ArtworkCard/ArtworkCard';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import propTypes from 'prop-types';

const MainPage = ({ artworks, error, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter artworks based on search term
  const filteredArtworks = useMemo(() => {
    const validArtworks = artworks.filter((work) => 
      work.primaryimageurl !== null && work.peoplecount > 0
    );

    if (!searchTerm) return validArtworks;

    return validArtworks.filter((work) => {
      const searchLower = searchTerm.toLowerCase();
      const titleMatch = work.title?.toLowerCase().includes(searchLower);
      const artistMatch = work.people?.[0]?.displayname?.toLowerCase().includes(searchLower) ||
                         work.people?.[0]?.name?.toLowerCase().includes(searchLower);
      const cultureMatch = work.culture?.toLowerCase().includes(searchLower);
      const divisionMatch = work.division?.toLowerCase().includes(searchLower);
      
      return titleMatch || artistMatch || cultureMatch || divisionMatch;
    });
  }, [artworks, searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  if (loading) {
    return (
      <main className='main-page'>
        <Header />
        <LoadingSpinner size="large" />
      </main>
    );
  }

  if (error) {
    return (
      <main className='main-page'>
        <Header />
        <motion.div 
          className='error-container'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="error-icon">⚠️</div>
          <h1 className="error-message">500 Error! Try again later!</h1>
          <p className="error-description">
            We're having trouble loading the artworks. Please check your connection and try again.
          </p>
        </motion.div>
      </main>
    );
  }

  return (
    <main className='main-page'>
      <Header />
      
      <motion.div 
        className="main-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <SearchBar onSearch={handleSearch} />
        
        {searchTerm && (
          <motion.div 
            className="search-results-info"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p>
              {filteredArtworks.length === 0 
                ? `No artworks found for "${searchTerm}"`
                : `Found ${filteredArtworks.length} artwork${filteredArtworks.length !== 1 ? 's' : ''} for "${searchTerm}"`
              }
            </p>
          </motion.div>
        )}

        {filteredArtworks.length === 0 && !searchTerm ? (
          <motion.div 
            className="no-artworks"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p>No artworks available at the moment.</p>
          </motion.div>
        ) : (
          <div className='artwork-container'>
            {filteredArtworks.map((work, index) => (
              <ArtworkCard 
                key={work.id} 
                artwork={work} 
                index={index}
              />
            ))}
          </div>
        )}
      </motion.div>
    </main>
  );
};

MainPage.propTypes = {
  artworks: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      primaryimageurl: propTypes.string,
      description: propTypes.string,
      title: propTypes.string,
      people: propTypes.array,
      culture: propTypes.string,
      division: propTypes.string
    })
  ).isRequired,
  error: propTypes.string,
  loading: propTypes.bool
};

export default MainPage;