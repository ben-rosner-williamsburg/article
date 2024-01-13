import './Favorites.css'
import Header from '../Header/Header'

function Favorites({faves}) {
  const faveImages = faves.map(faveWorks => faveWorks.map(work =>{
      return (
        <img key={work.id} src={work.primaryimageurl}
          alt={work.description}
          className='img-work'
        />
      )}
  )) 
  return (
    <main className='faves-page'>
      <Header/>
      <div className='artwork-container text-container'>
      {faveImages.length ? faveImages : <h1 className='no-img-text'>No images here!</h1>}
      </div>
    </main>
  )
}

export default Favorites;