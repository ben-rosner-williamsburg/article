import './Details.css'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArtwork } from "../apiCalls";
import Header from '../Header/Header'
import BackButton from '../BackButton/BackButton';

function Details() {
  const [artwork, setArtwork] = useState([])
  const [error, setError] = useState("")
  const params = useParams();

  let id = params.id;
  useEffect(() => {
    fetchArtwork(id);
  }, [])


  const fetchArtwork = (id) => {
    getArtwork(id)
      .then(artworkData => setArtwork(artworkData.records))
      .catch(err => console.error(err.message))
  }
  const work = artwork.map(work => {
    return (
      <div className='details'>
      <img className='artwork-element image' src={work.images[0].baseimageurl}/>
      <h1 className='artwork-element title'> Title: {work.title}</h1>
      <h3 className="artwork-element artist-name">Artist: {work.people[0].name}</h3>
      <h4 className='artwork-element division'> Division: {work.division} </h4>

      </div>
    )
  }
  )
  return (
    <section className="details-page" id={params.id}>
      <section className='elements-container'>
        <BackButton className="back-button" />
        <h1 className='detail-heading-text'>Article</h1>
      </section>
      <h3 className="artwork-facts">{work}</h3>
    </section>
  )
}

export default Details;