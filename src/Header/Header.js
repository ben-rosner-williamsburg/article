import BackBtn from '../BackButton/BackButton';
import './Header.css'
import {Link, useLocation} from 'react-router-dom'
const Header = () => {
  let location = useLocation();
  return (
    <div className='header'>
      <main className='heading-text-container'>
      <h1 className='heading-text'>Article</h1>
      </main>
      <section className='favorites-link-container'>
      {location.pathname === "/favorites" ? (<div className='back-btn-container'><Link className='back-link' to="/"><BackBtn className="back-text-red-header"/></Link></div>) :  
      (<Link className='favorite-link' to="/favorites">🖼️</Link>)}
      </section>
    </div>
  )
}

export default Header;