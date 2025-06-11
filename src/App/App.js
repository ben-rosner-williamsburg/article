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
        const artworkData = await getArtworks();
        
        if (artworkData && artworkData.records) {
          setArtworks(artworkData.records);
        } else {
          setError("Failed to load artworks");
        }
      } catch (err) {
        setError(err.message || "An error occurred while loading artworks");
        console.error("Error loading artworks:", err);
      } finally {
        setLoading(false);
      }
    };

    loadArtworks();
  }, []);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFaves = localStorage.getItem('artworkFavorites');
    if (savedFaves) {
      try {
        setFaves(JSON.parse(savedFaves));
      } catch (err) {
        console.error("Error loading favorites from localStorage:", err);
      }
    }
  }, []);

  // Save favorites to localStorage whenever faves changes
  useEffect(() => {
    localStorage.setItem('artworkFavorites', JSON.stringify(faves));
  }, [faves]);

  const addFave = (newFave) => {
    if (!newFave || !newFave[0]) return;
    
    const artwork = newFave[0];
    if (!faves.some(fave => fave.id === artwork.id)) {
      setFaves(prevFaves => [...prevFaves, artwork]);
    }
  };

  const removeFave = (id) => {
    setFaves(prevFaves => prevFaves.filter(fave => fave.id !== id));
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