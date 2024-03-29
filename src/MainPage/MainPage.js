import './MainPage.css'
import Header from '../Header/Header'
import { Link } from 'react-router-dom'
import propTypes from 'prop-types'

const MainPage = ({ artworks, error}) => {
  const artwork = artworks.filter((work) => work.primaryimageurl !== null 
  && work.peoplecount > 0)
  const artImage = artwork.map(work => {
    return (
      <Link key={work.id} to={`/details/${work.id}`}>
      <img src={work.primaryimageurl}
        alt={work.description}
        className='img-work'
      />
      </Link>
    )
  })
  return (
    <main className='main-page'>
      <Header />
      {!error ? <div className='artwork-container'>
        {artImage}
      </div> : <div className='five-error-message-container'><h1 className="error-message">500 Error! Try again later!</h1></div>}
    </main>
  )
}

MainPage.propTypes = {
  artworks: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      primaryimageurl: propTypes.string,
      description: propTypes.string
    })
  ).isRequired,
  error: propTypes.string
}


export default MainPage;