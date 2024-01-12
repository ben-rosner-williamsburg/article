import './Header.css'
import {Link, useLocation} from 'react-router-dom'
const Header = () => {
  return (
    <div className='header'>
      <main className='heading-text-container'>
      <h1 className='heading-text'>Article</h1>
      </main>
      <section className='favorites-link-container'>
      <Link className='favorite-link' to="/favorites">🖼️</Link>
      </section>
    </div>
  )
}

export default Header;