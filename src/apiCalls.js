const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY;

// Add retry logic and better error handling
const fetchWithRetry = async (url, options = {}, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (response.ok) {
        return await response.json();
      }

      // Create a proper error message based on status
      const errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      
      // If it's the last retry or a client error (4xx), throw immediately
      if (i === retries - 1 || (response.status >= 400 && response.status < 500)) {
        throw new Error(errorMessage);
      }

      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    } catch (error) {
      if (i === retries - 1) {
        // Ensure we throw a proper Error object with a string message
        if (error instanceof Error) {
          throw error;
        } else {
          throw new Error(String(error));
        }
      }
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
};

export const getArtworks = async () => {
  try {
    // Debug logging
    console.log('Environment check:', {
      nodeEnv: process.env.NODE_ENV,
      apiKeyExists: !!process.env.REACT_APP_API_KEY,
      apiKeyLength: process.env.REACT_APP_API_KEY?.length || 0
    });

    if (!REACT_APP_API_KEY || REACT_APP_API_KEY === 'your_harvard_art_museums_api_key_here') {
      throw new Error('API key is missing or not configured. Please set REACT_APP_API_KEY in your .env file.');
    }

    const url = `https://api.harvardartmuseums.org/object?apikey=${REACT_APP_API_KEY}&hasimage=1&classification=Paintings&size=21&sort`;
    console.log('Fetching artworks from:', url.replace(REACT_APP_API_KEY, '[API_KEY_HIDDEN]'));
    
    const data = await fetchWithRetry(url);
    
    if (!data || !data.records) {
      throw new Error('Invalid response format from API');
    }

    return data;
  } catch (error) {
    console.error('Error fetching artworks:', error);
    // Ensure we always throw a proper Error object
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(String(error));
    }
  }
};

export const getArtwork = async (id) => {
  try {
    if (!REACT_APP_API_KEY || REACT_APP_API_KEY === 'your_harvard_art_museums_api_key_here') {
      throw new Error('API key is missing or not configured. Please set REACT_APP_API_KEY in your .env file.');
    }

    if (!id) {
      throw new Error('Artwork ID is required');
    }

    const url = `https://api.harvardartmuseums.org/object?apikey=${REACT_APP_API_KEY}&id=${id}`;
    console.log('Fetching artwork from:', url.replace(REACT_APP_API_KEY, '[API_KEY_HIDDEN]'));
    
    const data = await fetchWithRetry(url);
    
    if (!data || !data.records) {
      throw new Error('Invalid response format from API');
    }

    return data;
  } catch (error) {
    console.error('Error fetching artwork:', error);
    // Ensure we always throw a proper Error object
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(String(error));
    }
  }
};