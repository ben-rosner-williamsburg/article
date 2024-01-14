import './Favorites.css'
import Header from '../Header/Header'
import propTypes from 'prop-types'

function Favorites({faves, removeFave}) {
  const faveImages = faves.map(faveWork => {
      return (
        <div className='img' key={faveWork.id}>
        <img src={faveWork.primaryimageurl}
          alt={faveWork.description}
          className='img-work'
        />
        <h1 className='remove-fave' onClick={() => {removeFave(faveWork.id)}}>❌</h1>
        </div>
      )}
  )
  return (
    <main className='faves-page'>
      <Header/>
      {faveImages.length ? <div className='favorites-container'>{faveImages} </div> : <div className='text=container'>{<h1 className='no-img-text'>No images here!</h1>}</div>}
    </main>
  )
}

Favorites.propTypes = {
  faves: propTypes.arrayOf(
      propTypes.shape({
      id: propTypes.number.isRequired,
      primaryimageurl: propTypes.string.isRequired,
      description: propTypes.string
    })
  ),
  removeFave: propTypes.func.isRequired
}


export default Favorites;