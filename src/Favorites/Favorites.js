import './Favorites.css'
import Header from '../Header/Header'

function Favorites({faves, removeFave}) {
  const faveImages = faves.map(faveWorks => faveWorks.map(work =>{
      return (
        <div className='img'>
        <img key={work.id} src={work.primaryimageurl}
          alt={work.description}
          className='img-work'
        />
        <h1 className='remove-fave' onClick={(work) => {removeFave(work.id)}}>❌</h1>
        </div>
      )}
  )) 
  return (
    <main className='faves-page'>
      <Header/>
      {faveImages.length ? <div className='favorites-container'>{faveImages} </div> : <div className='text=container'>{<h1 className='no-img-text'>No images here!</h1>}</div>}
    </main>
  )
}

export default Favorites;