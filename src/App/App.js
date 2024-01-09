import "./App.css"
import { useEffect, useState } from "react";
import { getArtworks } from "../apiCall";

function App() {
  const [artworks, setArtworks] = useState([])
  useEffect(() => {
    getArtworks()
    .then(artworkData => setArtworks(artworkData))
    .catch(err => console.error(err.message))
  }, [])


  return (
    <main className="article-app">
      <h1>Article</h1>
    </main>
  );
}

export default App;
