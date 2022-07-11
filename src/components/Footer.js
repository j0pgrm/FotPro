import React from 'react'; 
import '../scss/components/footer.scss'; 
import { Link } from 'react-router-dom'; 

function Footer() {
  return (
    <footer>
        <div id="footer-wrapper">
            <h3>FotPro is a vital key in knowing what's next in soccer </h3>

            <div className="footer-content-container">
                <div className="footer-box">
                    <h4 id="top-text">Soccer</h4>
                    <div className="stick"></div>
                    <div className="link-container">
                        <Link to="">Teams</Link> 
                        <Link to="">Players in Teams</Link> 
                        <Link to="">Matches</Link> 
                        <Link to="">Leagues</Link> 
                    </div>
                </div>

                <div className="footer-box">
                    <h4 id="top-text">Resources</h4>
                    <div className="stick"></div>
                    <div className="link-container">
                        <a target="_blank" href="https://sportsdata.io/" rel="noreferrer">Third Party API</a> 
                        <a target="_blank" href="https://sportsdata.io/soccer-api" rel="noreferrer">API Used</a> 
                        <a target="_blank" href="https://sportsdata.io/developers/api-documentation/soccer" rel="noreferrer">API Documentation</a> 
                    </div>
                </div> 

                <div className="footer-box">
                    <h4 id="top-text">Social</h4>
                    <div className="stick"></div>
                    <div className="link-container">
                        <a target="_blank" href="https://github.com" rel="noreferrer">Github</a> 
                        <a target="_blank" href="https://facebook.com" rel="noreferrer">FaceBook</a>
                        <a target="_blank" href="https://twitter.com" rel="noreferrer">Twitter</a> 
                        <a target="_blank" href="https://instagram.com" rel="noreferrer">Instagram</a> 
                    </div>
                </div>
            </div>

        </div> 
    </footer>
  )
}

export default Footer; 
