import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../Header/Header';
import propTypes from 'prop-types';
import './Favorites.css';

function Favorites({ faves, removeFave }) {
  const handleRemoveFave = (id, event) => {
    event.preventDefault();
    event.stopPropagation();
    removeFave(id);
  };

  return (
    <motion.main 
      className='faves-page'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      
      <div className="favorites-content">
        {faves.length === 0 ? (
          <motion.div 
            className='empty-state'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="empty-icon">💔</div>
            <h2 className='no-favorites-title'>No Favorites Yet</h2>
            <p className='no-favorites-text'>
              Start exploring artworks and add them to your favorites to see them here!
            </p>
          </motion.div>
        ) : (
          <>
            <motion.div 
              className="favorites-header"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="favorites-count">
                {faves.length} Favorite{faves.length !== 1 ? 's' : ''}
              </h2>
            </motion.div>
            
            <motion.div 
              className='favorites-grid'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <AnimatePresence>
                {faves.map((faveWork, index) => (
                  <motion.div
                    key={faveWork.id}
                    className='favorite-card'
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8, x: -100 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: index * 0.1,
                      layout: { duration: 0.3 }
                    }}
                    layout
                    whileHover={{ y: -8 }}
                  >
                    <div className="favorite-image-container">
                      <img 
                        src={faveWork.primaryimageurl}
                        alt={faveWork.title || 'Favorite artwork'}
                        className='favorite-image'
                        loading="lazy"
                      />
                      
                      <div className="favorite-overlay">
                        <div className="favorite-info">
                          <h3 className="favorite-title">
                            {faveWork.title || 'Untitled'}
                          </h3>
                          {faveWork.people && faveWork.people[0] && (
                            <p className="favorite-artist">
                              {faveWork.people[0].displayname || faveWork.people[0].name}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <motion.button
                      className='remove-button'
                      onClick={(e) => handleRemoveFave(faveWork.id, e)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Remove from favorites"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </div>
    </motion.main>
  );
}

Favorites.propTypes = {
  faves: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      primaryimageurl: propTypes.string.isRequired,
      title: propTypes.string,
      people: propTypes.array
    })
  ),
  removeFave: propTypes.func.isRequired
};

export default Favorites;