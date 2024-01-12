import './BackButton.css';
import { Link } from 'react-router-dom';

function BackBtn() {
  return (
    <div className='btn-container'>
      <Link className='back-link' to="/">
        <p className='back-text'>🔙</p>
      </Link>
    </div>
  )
}

export default BackBtn;
