import './Error.css'
import BackBtn from '../BackButton/BackButton'

function Error() {
  return (
    <section className='error-container'>
      <div className="error-btn-container">
        <BackBtn className="back-button"/>
      </div>
      <div className="error-message-container">
        <h1 className="error">404 Error: Page Not Found</h1>
      </div>
    </section>
  )
}

export default Error;