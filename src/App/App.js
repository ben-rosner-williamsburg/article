import "./App.css"
import { useEffect, useState } from "react";
import { getArtworks } from "../apiCall";
import { Routes, Route } from 'react-router-dom'
import MainPage from '../MainPage/MainPage'

function App() {
  const [artworks, setArtworks] = useState([])
  useEffect(() => {
    getArtworks()
    .then(artworkData => setArtworks(artworkData.records))
    .catch(err => console.error(err.message))
  }, [])


  return (
    <main className="article-app">
      <Routes>
        <Route path="/" element={<MainPage artworks={artworks}/>} />
      </Routes>
    </main>
  );
}

export default App;
