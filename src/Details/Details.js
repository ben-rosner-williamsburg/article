import './Details.css'
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getArtwork } from "../apiCalls";
import BackButton from '../BackButton/BackButton';
import propTypes from 'prop-types';

function Details({addFave}) {
  const [artwork, setArtwork] = useState([]);
  const params = useParams();
  const navigate = useNavigate()
  let id = params.id;

  useEffect(() => {
    fetchArtwork(id);
  }, [id])


  const fetchArtwork = (id) => {
    getArtwork(id)
      .then(artworkData => setArtwork(artworkData.records))
      .catch(err => console.error(err.message))
   }

   const handleFave = () => {
    addFave(artwork)
    navigate("/favorites")
   }

  const work = artwork.map(work => {
    return (
      <div className='details' key={work.id}>
        <img className='artwork-element image' alt={work.description} src={work.primaryimageurl} />
        <h1 className='artwork-element title'> Title: {work.title}</h1>
        <h3 className="artwork-element artist-name">Artist: {work.people[0].name}</h3>
        <h4 className='artwork-element division'> Division: {work.division} </h4>
        <a className='artwork-element link' href={work.url}>More Info</a>
      </div>
    )
  })
  return (
    <section className="details-page" id={params.id}>
      <section className='elements-container'>
      <BackButton className="back-button"/>
        <section className="header-container">
          <h1 className='detail-heading-text'>Article</h1>
        </section>
        <h1 className='favorite-text' onClick={handleFave}>Favorite</h1>
      </section>
      <h3 className="artwork-facts">{work}</h3>
    </section>
  )
}

Details.propTypes = {
  addFave: propTypes.func.isRequired
}


export default Details;