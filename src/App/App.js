import "./App.css"
import { useEffect, useState } from "react";
import { getArtworks } from "../apiCalls";
import { Routes, Route } from 'react-router-dom'
import MainPage from '../MainPage/MainPage'
import Details from '../Details/Details'
import Favorites from '../Favorites/Favorites'
import Error from '../Error/Error'

function App() {
  const [artworks, setArtworks] = useState([]);
  const [faves, setFaves] = useState([]);
  const [error, setError] = useState("")

  useEffect(() => {
    fetchArtworks();
  }, [])

  const fetchArtworks = () => {
    getArtworks()
    .then(artworkData => setArtworks(artworkData.records))
    .catch(err => setError(err.message))
  }

  const addFave = (newFave) => {
    if (!faves.some((fave) => fave.id === newFave.id)) {
      setFaves([...faves, newFave]);
    }
  };

  const removeFave = (id) => {
    const filteredFaves = faves.filter(fave => fave.id !== id)
    setFaves([...filteredFaves])
  }



  return (
    <main className="article-app">
      <Routes>
        <Route path="/" element={<MainPage artworks={artworks} error={error}/>} />
        <Route path="/details/:id" element={<Details addFave={addFave} />} />
        <Route path="/favorites" element={<Favorites faves={faves} removeFave={removeFave}/>} />
        <Route path="*" element={<Error />} />
      </Routes>
    </main>
  );
}

export default App;
