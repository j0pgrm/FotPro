import React from 'react'; 
import Nav from '../components/Nav'; 
import '../scss/pages/leagueshowcase.scss'; 
import premiericon from '../images/premier-league-icon.png'; 
import premierlandscape from '../images/premier-league-landscape.jfif'; 
import laligalandscape from '../images/la-liga-landscape.jpg'; 
import laligaicon from '../images/la-liga-icon.svg'; 
import serieaicon from '../images/serie-a-icon.svg'; 
import seriealandscape from '../images/serie-a-landscape.png'; 
import bundesligalandscape  from '../images/bundesliga-landscape.jpg'; 
import bundesligaicon from '../images/bundesliga-icon.png'; 
import ligue1landscape from '../images/ligue-1-landscape.jpg'; 
import ligue1icon from '../images/ligue-1-icon.png'; 
import mlslandscape from '../images/mls-landscape.jpg'; 
import mlsicon from '../images/mls-icon.png'; 
import eredivisieicon from '../images/eredivisie-icon.png'; 
import eredivisielandscape from '../images/eredivisie-landscape.jfif'; 
import ligamxlandscape from '../images/liga-mx-landscape.jpg'; 
import ligamxicon from '../images/liga-mx-icon.png'; 
import { Link } from 'react-router-dom'; 

function LeagueShowCase() {
    return (
        <div className="league-show-case-page">

            <Nav /> 

            <div className="league-show-case-content">

                <h2>Popular Leagues</h2>

                <div className="league-content-grid-container">
                    <Link className="league-content" to={"/FotPro/League/" + 68}>
                        <div className="background-img" style={{background: 'url(' + premierlandscape + ') center center no-repeat'}}></div>
                        <div id="img-title-container">
                            <img alt="" src={premiericon} /> 
                            <h3>Premier League</h3>
                        </div>
                    </Link>
                    <Link className="league-content" to={"/FotPro/League/" + 176}>
                        <div className="background-img" style={{background: 'url(' + laligalandscape + ') center center no-repeat'}}></div>
                        <div id="img-title-container">
                            <img alt="" src={laligaicon} /> 
                            <h3>La Liga</h3>
                        </div>
                    </Link>
                    <Link className="league-content" to={"/FotPro/League/" + 35}>
                        <div className="background-img" style={{background: 'url(' + seriealandscape + ') center center no-repeat'}}></div>
                        <div id="img-title-container">
                            <img alt="" src={serieaicon} /> 
                            <h3>Serie A</h3>
                        </div>
                    </Link>
                    <Link className="league-content" to={"/FotPro/League/" + 80}>
                        <div className="background-img" style={{background: 'url(' + bundesligalandscape +  ') center center no-repeat'}}></div>
                        <div id="img-title-container">
                            <img alt="" src={bundesligaicon} /> 
                            <h3>Bundesliga</h3>
                        </div>
                    </Link>
                    <Link className="league-content" to={"/FotPro/League/" + 76}>
                        <div className="background-img" style={{background: 'url(' + ligue1landscape + ') center center no-repeat'}}></div>
                        <div id="img-title-container">
                            <img alt="" src={ligue1icon} style={{filter: 'brightness(0) invert(1)'}} /> 
                            <h3>Ligue 1</h3>
                        </div>
                    </Link>
                    <Link className="league-content" to={"/FotPro/League/" + 203}>
                        <div className="background-img" style={{background: 'url(' + mlslandscape + ') center center no-repeat'}}></div>
                        <div id="img-title-container">
                            <img alt="" src={mlsicon} /> 
                            <h3>MLS</h3>
                        </div>
                    </Link>
                    <Link className="league-content" to={"/FotPro/League/" + 138}>
                        <div className="background-img" style={{background: 'url(' + eredivisielandscape + ') center center no-repeat'}}></div>
                        <div id="img-title-container">
                            <img alt="" src={eredivisieicon} style={{filter: 'brightness(0) invert(1)'}} /> 
                            <h3>Eredivisie</h3>
                        </div>
                    </Link>
                    <Link className="league-content" to={"/FotPro/League/" + 129}>
                        <div className="background-img" style={{background: 'url(' + ligamxlandscape + ') center center no-repeat'}}></div>
                        <div id="img-title-container">
                            <img alt="" src={ligamxicon} /> 
                            <h3>Liga MX</h3>
                        </div>
                    </Link>
                </div>

            </div>

        </div>
    )
}

export default LeagueShowCase; 
