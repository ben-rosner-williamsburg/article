import React from 'react';
import { motion } from 'framer-motion';
import BackBtn from '../BackButton/BackButton';
import './Error.css';

function Error() {
  return (
    <motion.section 
      className='error-page'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="error-header">
        <BackBtn />
        <h1 className="error-page-title">Article</h1>
        <div></div>
      </div>
      
      <motion.div 
        className="error-content"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="error-illustration">
          <motion.div 
            className="error-icon"
            animate={{ 
              rotate: [0, -10, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
          >
            🎨
          </motion.div>
          <div className="error-code">404</div>
        </div>
        
        <div className="error-text">
          <h2 className="error-title">Oops! Page Not Found</h2>
          <p className="error-description">
            The artwork you're looking for seems to have wandered off to another gallery. 
            Let's get you back to exploring our collection!
          </p>
        </div>
        
        <motion.div 
          className="error-actions"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.a
            href="/"
            className="home-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9,22 9,12 15,12 15,22"></polyline>
            </svg>
            Back to Gallery
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

export default Error;