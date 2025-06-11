import { ERROR_MESSAGES } from './constants';

export const getErrorMessage = (error) => {
  if (!error) return ERROR_MESSAGES.GENERAL_ERROR;
  
  const message = error.message || error.toString();
  
  if (message.includes('API key')) {
    return ERROR_MESSAGES.API_KEY_MISSING;
  }
  
  if (message.includes('HTTP 500')) {
    return ERROR_MESSAGES.SERVER_ERROR;
  }
  
  if (message.includes('HTTP 429')) {
    return ERROR_MESSAGES.RATE_LIMIT;
  }
  
  if (message.includes('HTTP 403')) {
    return ERROR_MESSAGES.ACCESS_DENIED;
  }
  
  if (message.includes('Failed to fetch') || message.includes('NetworkError')) {
    return ERROR_MESSAGES.NETWORK_ERROR;
  }
  
  return message || ERROR_MESSAGES.GENERAL_ERROR;
};

export const logError = (context, error, additionalInfo = {}) => {
  console.error(`[${context}] Error:`, {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    ...additionalInfo,
  });
};