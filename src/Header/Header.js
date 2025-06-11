import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import BackBtn from '../BackButton/BackButton';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isFavoritesPage = location.pathname === "/favorites";

  return (
    <motion.header 
      className='header'
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className='header-content'>
        <div className='back-link-container'>
          {isFavoritesPage && <BackBtn />}
        </div>
        
        <motion.div 
          className='heading-text-container'
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link to="/" className="logo-link">
            <h1 className='heading-text'>
              {isFavoritesPage ? 'Favorites' : 'Article'}
            </h1>
          </Link>
        </motion.div>
        
        <div className='favorites-link-container'>
          {isHomePage && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link className='favorite-link' to="/favorites">
                <div className="favorite-link-content">
                  <svg className="heart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                  <span className="favorite-text">Favorites</span>
                </div>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;