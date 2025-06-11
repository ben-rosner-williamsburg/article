// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://api.harvardartmuseums.org',
  ENDPOINTS: {
    OBJECTS: '/object',
  },
  DEFAULT_PARAMS: {
    hasimage: 1,
    classification: 'Paintings',
    size: 21,
    sort: '',
  },
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // milliseconds
};

// Error Messages
export const ERROR_MESSAGES = {
  API_KEY_MISSING: 'API key is missing. Please check your environment configuration.',
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  SERVER_ERROR: 'Server error. The Harvard Art Museums API is currently unavailable.',
  RATE_LIMIT: 'Too many requests. Please wait a moment and try again.',
  ACCESS_DENIED: 'Access denied. Please check your API key.',
  INVALID_RESPONSE: 'Invalid response format from API',
  ARTWORK_NOT_FOUND: 'Artwork not found',
  GENERAL_ERROR: 'An error occurred while loading artworks',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  FAVORITES: 'artworkFavorites',
};