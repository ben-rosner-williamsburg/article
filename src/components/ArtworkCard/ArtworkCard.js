import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './ArtworkCard.css';

const ArtworkCard = ({ artwork, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <motion.div
      ref={ref}
      className="artwork-card"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ y: -8 }}
    >
      <Link to={`/details/${artwork.id}`} className="artwork-link">
        <div className="artwork-image-container">
          {!imageLoaded && !imageError && (
            <div className="image-placeholder loading-shimmer"></div>
          )}
          
          {imageError ? (
            <div className="image-error">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21,15 16,10 5,21"></polyline>
              </svg>
              <span>Image unavailable</span>
            </div>
          ) : (
            <img
              src={artwork.primaryimageurl}
              alt={artwork.title || 'Artwork'}
              className={`artwork-image ${imageLoaded ? 'loaded' : ''}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="lazy"
            />
          )}
          
          <div className="artwork-overlay">
            <div className="artwork-info">
              <h3 className="artwork-title">
                {artwork.title || 'Untitled'}
              </h3>
              {artwork.people && artwork.people[0] && (
                <p className="artwork-artist">
                  {artwork.people[0].displayname || artwork.people[0].name}
                </p>
              )}
              {artwork.dated && (
                <p className="artwork-date">{artwork.dated}</p>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ArtworkCard;