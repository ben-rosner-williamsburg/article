import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from 'framer-motion';
import { getArtwork } from "../apiCalls";
import BackButton from '../BackButton/BackButton';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import propTypes from 'prop-types';
import './Details.css';

function Details({ addFave }) {
  const [artwork, setArtwork] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [favoriteAdded, setFavoriteAdded] = useState(false);
  
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;

  useEffect(() => {
    fetchArtwork(id);
  }, [id]);

  const fetchArtwork = async (id) => {
    try {
      setLoading(true);
      setError('');
      const artworkData = await getArtwork(id);
      
      if (artworkData && artworkData.records) {
        setArtwork(artworkData.records);
      } else {
        setError('Artwork not found');
      }
    } catch (err) {
      setError('Failed to load artwork details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFave = () => {
    addFave(artwork);
    setFavoriteAdded(true);
    
    // Show feedback and navigate after delay
    setTimeout(() => {
      navigate("/favorites");
    }, 1000);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  if (loading) {
    return (
      <section className="details-page">
        <div className="details-header">
          <BackButton />
          <h1 className='detail-heading-text'>Article</h1>
          <div></div>
        </div>
        <LoadingSpinner size="large" />
      </section>
    );
  }

  if (error || !artwork.length) {
    return (
      <section className="details-page">
        <div className="details-header">
          <BackButton />
          <h1 className='detail-heading-text'>Article</h1>
          <div></div>
        </div>
        <motion.div 
          className="error-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="error-icon">⚠️</div>
          <h2 className="error-message">{error || 'Artwork not found'}</h2>
          <p className="error-description">
            The artwork you're looking for might have been moved or doesn't exist.
          </p>
        </motion.div>
      </section>
    );
  }

  const work = artwork[0];

  return (
    <motion.section 
      className="details-page" 
      id={params.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="details-header"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <BackButton />
        <h1 className='detail-heading-text'>Article</h1>
        <motion.button
          className={`heart-button ${favoriteAdded ? 'added' : ''}`}
          onClick={handleFave}
          disabled={favoriteAdded}
          whileHover={{ scale: favoriteAdded ? 1 : 1.05 }}
          whileTap={{ scale: favoriteAdded ? 1 : 0.95 }}
        >
          {favoriteAdded ? (
            <>
              <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="20,6 9,17 4,12"></polyline>
              </svg>
              <span>Added!</span>
            </>
          ) : (
            <>
              <svg className="heart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span>Add to Favorites</span>
            </>
          )}
        </motion.button>
      </motion.div>

      <motion.div 
        className="details-content"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="artwork-display">
          <div className="image-container">
            {!imageLoaded && (
              <div className="image-placeholder loading-shimmer"></div>
            )}
            <img 
              className={`artwork-image ${imageLoaded ? 'loaded' : ''}`}
              alt={work.description || work.title || 'Artwork'}
              src={work.primaryimageurl}
              onLoad={handleImageLoad}
            />
          </div>
          
          <div className="artwork-info">
            <motion.h1 
              className='artwork-title'
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {work.title || 'Untitled'}
            </motion.h1>
            
            <motion.div 
              className="info-grid"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {work.people && work.people[0] && (
                <div className="info-item">
                  <span className="info-label">Artist:</span>
                  <span className="info-value">
                    {work.people[0].displayname || work.people[0].name}
                  </span>
                </div>
              )}
              
              {work.division && (
                <div className="info-item">
                  <span className="info-label">Division:</span>
                  <span className="info-value">{work.division}</span>
                </div>
              )}
              
              {work.culture && (
                <div className="info-item">
                  <span className="info-label">Culture:</span>
                  <span className="info-value">{work.culture}</span>
                </div>
              )}
              
              {work.dated && (
                <div className="info-item">
                  <span className="info-label">Date:</span>
                  <span className="info-value">{work.dated}</span>
                </div>
              )}
              
              {work.medium && (
                <div className="info-item">
                  <span className="info-label">Medium:</span>
                  <span className="info-value">{work.medium}</span>
                </div>
              )}
              
              {work.dimensions && (
                <div className="info-item">
                  <span className="info-label">Dimensions:</span>
                  <span className="info-value">{work.dimensions}</span>
                </div>
              )}
            </motion.div>
            
            {work.description && (
              <motion.div 
                className="artwork-description"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <h3>Description</h3>
                <p>{work.description}</p>
              </motion.div>
            )}
            
            <motion.div 
              className="external-link"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <a 
                href={work.url}
                target="_blank"
                rel="noopener noreferrer"
                className="museum-link"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15,3 21,3 21,9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                View at Harvard Art Museums
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}

Details.propTypes = {
  addFave: propTypes.func.isRequired
};

export default Details;