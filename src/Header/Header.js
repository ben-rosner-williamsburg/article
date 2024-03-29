import BackBtn from '../BackButton/BackButton';
import './Header.css'
import {Link, useLocation} from 'react-router-dom'
const Header = () => {
  let location = useLocation();
  return (
    <div className='header'>
     <section className='back-link-container'>
      {location.pathname === "/favorites" ? (<BackBtn className="back-text-red-header"/>) : <></>}
      </section>
      <main className='heading-text-container'>
      {location.pathname === "/favorites" ? (<h1 className='heading-text'>Favorites</h1>) : (<h1 className='heading-text'>Article</h1>)}
      </main>
      <section className='favorites-link-container'>
      {location.pathname === "/" ? (<Link className='favorite-link' to="/favorites">Favorites</Link>) : <></>}  

      </section>
    </div>
  )
}

export default Header;