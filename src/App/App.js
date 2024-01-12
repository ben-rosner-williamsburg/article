import "./App.css"
import { useEffect, useState } from "react";
import { getArtworks } from "../apiCalls";
import { Routes, Route } from 'react-router-dom'
import MainPage from '../MainPage/MainPage'
import Details from '../Details/Details'
import Favorites from '../Favorites/Favorites'

function App() {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    fetchArtworks();
  }, [])

  const fetchArtworks = () => {
    getArtworks()
    .then(artworkData => setArtworks(artworkData.records))
    .catch(err => console.error(err.message))
  }

  return (
    <main className="article-app">
      <Routes>
        <Route path="/" element={<MainPage artworks={artworks}/>} />
        <Route path="/details/:id" element={<Details/>} />
        <Route path="/favorites" element={<Favorites/>} />
      </Routes>
    </main>
  );
}

export default App;
