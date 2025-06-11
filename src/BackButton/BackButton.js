import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './BackButton.css';

function BackBtn() {
  return (
    <motion.div 
      className='btn-container'
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link className='back-link' to="/">
        <svg className="back-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <polyline points="15,18 9,12 15,6"></polyline>
        </svg>
        <span className='back-text'>Back</span>
      </Link>
    </motion.div>
  );
}

export default BackBtn;