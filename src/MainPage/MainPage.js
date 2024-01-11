import './MainPage.css'
import Header from '../Header/Header'
import { Link } from 'react-router-dom'

const MainPage = ({artworks}) => {
  const artwork = artworks.map(work => {
    console.log(work)
    return (
      <Link key={work.id} className='link' to={`/details/${work.id}`}>
        <img className="img-work" src={work.images[0].baseimageurl} alt={work.images[0].alttext} />
      </Link>
    )
  })
  return (
    <main className='main-page'>
      <Header />
      <div className='artwork-container'>
        {artwork}
      </div>
    </main>
  )
}

export default MainPage;