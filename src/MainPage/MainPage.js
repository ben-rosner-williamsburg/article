import './MainPage.css'
import Header from '../Header/Header'
import {Link, useParams} from 'react-router-dom'

const MainPage = ({ artworks }) => {
  let id = useParams()
  const artwork = artworks.map(work => {
    if (!work.primaryimageurl){
      return <h1 class="no-image">"No image found!"</h1>
    }
    else {
      return (
        <Link key={work.id} to={`/details/${id}`}>
        <img
          className="img-work"
          src={work.primaryimageurl}
          id={work.id}
          alt={work.description}
        />
        </Link>
      )
    }   
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