import "./App.css"
import { useEffect, useState } from "react";
import { getArtworks, getArtwork } from "../apiCalls";
import { Routes, Route } from 'react-router-dom'
import MainPage from '../MainPage/MainPage'
import Details from '../Details/Details'

function App() {
  const [artworks, setArtworks] = useState([])
  const [error, setError] = useState("")

  useEffect(() => {
    fetchArtworks()
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
      </Routes>
    </main>
  );
}

export default App;
