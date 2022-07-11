import React from 'react'; 
import hasbulla2 from '../images/hasbulla-2.png'; 
import '../scss/pages/error.scss'; 
import { Link } from 'react-router-dom'; 

function ErrorPage() {
  return (
    <div className="error-page">
        <h1 id="four">404</h1>
        <h1 id="not-found">Page Not Found</h1>
        <Link to="/FotPro/">
            <button>Back to Website</button>
        </Link>
        <img alt="" src={hasbulla2} />
    </div>
  )
}

export default ErrorPage; 
