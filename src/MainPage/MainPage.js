import './MainPage.css'
import Header from '../Header/Header'
import { Link } from 'react-router-dom'

const MainPage = ({ artworks}) => {
  const artwork = artworks.map(work => {
    return (
      <Link className='link' to={`/details/${work.id}`}>
        <img className="img-work" src={work.baseimageurl} alt={work.alttext} />
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