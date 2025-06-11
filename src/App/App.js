import React, { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import { getArtworks } from "../apiCalls";
import MainPage from '../MainPage/MainPage';
import Details from '../Details/Details';
import Favorites from '../Favorites/Favorites';
import Error from '../Error/Error';
import "./App.css";

function App() {
  const [artworks, setArtworks] = useState([]);
  const [faves, setFaves] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArtworks = async () => {
      try {
        setLoading(true);
        setError("");
        
        // Add environment check
        if (!process.env.REACT_APP_API_KEY) {
          throw new Error("API key is not configured. Please check your environment variables.");
        }
        
        console.log('Loading artworks...');
        const artworkData = await getArtworks();
        
        if (artworkData && artworkData.records) {
          console.log(`Successfully loaded ${artworkData.records.length} artworks`);
          setArtworks(artworkData.records);
        } else {
          throw new Error("No artwork data received from API");
        }
      } catch (err) {
        console.error("Error loading artworks:", err);
        
        // Provide more specific error messages
        let errorMessage = "An error occurred while loading artworks";
        
        if (err.message.includes('API key')) {
          errorMessage = "API configuration error. Please check your setup.";
        } else if (err.message.includes('HTTP 500')) {
          errorMessage = "Server error. The Harvard Art Museums API is currently unavailable.";
        } else if (err.message.includes('HTTP 429')) {
          errorMessage = "Too many requests. Please wait a moment and try again.";
        } else if (err.message.includes('HTTP 403')) {
          errorMessage = "Access denied. Please check your API key.";
        } else if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
          errorMessage = "Network error. Please check your internet connection.";
        } else if (err.message) {
          errorMessage = err.message;
        }
        
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadArtworks();
  }, []);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    try {
      const savedFaves = localStorage.getItem('artworkFavorites');
      if (savedFaves) {
        const parsedFaves = JSON.parse(savedFaves);
        if (Array.isArray(parsedFaves)) {
          setFaves(parsedFaves);
        }
      }
    } catch (err) {
      console.error("Error loading favorites from localStorage:", err);
      // Clear corrupted data
      localStorage.removeItem('artworkFavorites');
    }
  }, []);

  // Save favorites to localStorage whenever faves changes
  useEffect(() => {
    try {
      localStorage.setItem('artworkFavorites', JSON.stringify(faves));
    } catch (err) {
      console.error("Error saving favorites to localStorage:", err);
    }
  }, [faves]);

  const addFave = (newFave) => {
    try {
      if (!newFave || !newFave[0]) {
        console.warn("Invalid favorite data provided");
        return;
      }
      
      const artwork = newFave[0];
      if (!artwork.id) {
        console.warn("Artwork missing required ID");
        return;
      }
      
      if (!faves.some(fave => fave.id === artwork.id)) {
        setFaves(prevFaves => [...prevFaves, artwork]);
        console.log(`Added artwork ${artwork.id} to favorites`);
      } else {
        console.log(`Artwork ${artwork.id} already in favorites`);
      }
    } catch (err) {
      console.error("Error adding favorite:", err);
    }
  };

  const removeFave = (id) => {
    try {
      if (!id) {
        console.warn("No ID provided for favorite removal");
        return;
      }
      
      setFaves(prevFaves => prevFaves.filter(fave => fave.id !== id));
      console.log(`Removed artwork ${id} from favorites`);
    } catch (err) {
      console.error("Error removing favorite:", err);
    }
  };

  return (
    <main className="article-app">
      <Routes>
        <Route 
          path="/" 
          element={
            <MainPage 
              artworks={artworks} 
              error={error} 
              loading={loading}
            />
          } 
        />
        <Route 
          path="/details/:id" 
          element={<Details addFave={addFave} />} 
        />
        <Route 
          path="/favorites" 
          element={
            <Favorites 
              faves={faves} 
              removeFave={removeFave}
            />
          } 
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </main>
  );
}

export default App;