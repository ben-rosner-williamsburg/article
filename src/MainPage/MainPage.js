import './MainPage.css'
import Header from '../Header/Header'

const MainPage = ({artworks}) => {
  const artwork = artworks.map(work => {
   return (
    <img className="img-work" src={work.baseimageurl} alt={work.alttext} />
   )
  })
  return (
    <main className='main-page'>
      <Header/>
      <div className='artwork-container'>
      {artwork}
      </div>
    </main>
  )
}

export default MainPage;