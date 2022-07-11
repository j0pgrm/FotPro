import React, { useEffect } from 'react'; 
import '../scss/pages/main.scss'; 
import { useSelector, useDispatch } from 'react-redux'; 
import { getTeams } from '../redux/teams'; 
import realMadrid from '../images/real-madrid.jpg'; 
import manCity from '../images/man-city.jpg'; 
import barcelona from '../images/barcelona.jpg'; 
import chelsea from '../images/chelsea.jpg'; 
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Loading from '../components/Loading'; 
import { Link } from 'react-router-dom'; 
import premierleague from '../images/premier-league-landscape.jfif'; 
import laliga from '../images/la-liga-landscape.jpg'; 
import seriea from '../images/serie-a-landscape.png'; 
import bundesliga from '../images/bundesliga-landscape.jpg'; 
import Carousel from 'react-material-ui-carousel'; 

function Main() { 

    const { teamdata, loading, issuccess } = useSelector((state) => state.team); 

    const dispatch = useDispatch(); 

    //useEffect
    useEffect(() => {
        dispatch(getTeams()); 
    }, [dispatch]); 

    return (
        <div>
        {
            issuccess === null || loading ? 

                <Loading />

            : 

            !issuccess ? 

                <div>error occured</div>

            : 

                <div className="main-page">

                    <Nav /> 

                    <Carousel swipe={true}>
                        <div className="slider-content" style={{background: 'url(' + premierleague + ') center center / cover no-repeat'}}>
                            <div className="background-overlay"></div>
                            <div className="center-content">
                                <h1>Premier League</h1>
                                <Link to="/FotPro/League/68">
                                    <button>Look at League</button>
                                </Link>
                            </div>
                        </div>
                        <div className="slider-content" style={{background: 'url(' + laliga + ') center center / cover no-repeat'}}>
                            <div className="background-overlay"></div>
                            <div className="center-content">
                                <h1>La Liga</h1>
                                <Link to="/FotPro/League/176">
                                    <button>Look at League</button>
                                </Link>
                            </div>
                        </div>
                        <div className="slider-content" style={{background: 'url(' + seriea + ') center center / cover no-repeat'}}>
                            <div className="background-overlay"></div>
                            <div className="center-content">
                                <h1>Serie A</h1>
                                <Link to="/FotPro/League/35">
                                    <button>Look at League</button>
                                </Link>
                            </div>
                        </div>
                        <div className="slider-content" style={{background: 'url(' + bundesliga + ') center center / cover no-repeat'}}>
                            <div className="background-overlay"></div>
                            <div className="center-content">
                                <h1>Bundesliga</h1>
                                <Link to="/FotPro/League/80">
                                    <button>Look at League</button>
                                </Link>
                            </div>
                        </div>
                    </Carousel>

                    <div className="list-of-teams-container">
                        <Link id="item" to="/FotPro/Team/605">
                            <div className="item-background-img" style={{background: 'url(' + realMadrid + ') no-repeat center'}}></div>
                            <div className="img-title-container">
                                <img alt="" src={teamdata[97].WikipediaLogoUrl} /> 
                                <h1>{teamdata[97].Name}</h1> 
                            </div>
                        </Link>
                        <Link id="item" to="/FotPro/Team/516">
                            <div className="item-background-img" style={{background: 'url(' + manCity + ') no-repeat center'}}></div>
                            <div className="img-title-container">
                                <img alt="" src={teamdata[8].WikipediaLogoUrl} /> 
                                <h1>{teamdata[8].Name}</h1>
                            </div>
                        </Link>
                        <Link id="item" to="/FotPro/Team/559">
                            <div className="item-background-img" style={{background: 'url(' + barcelona + ') no-repeat center'}}></div>
                            <div className="img-title-container">
                                <img alt="" src={teamdata[51].WikipediaLogoUrl} /> 
                                <h1>{teamdata[51].Name}</h1>
                            </div>
                        </Link>
                        <Link id="item" to="/FotPro/Team/511">
                            <div className="item-background-img" style={{background: 'url(' + chelsea + ') no-repeat center'}}></div>
                            <div className="img-title-container">
                                <img alt="" src={teamdata[3].WikipediaLogoUrl} /> 
                                <h1>{teamdata[3].Name}</h1>
                            </div>
                        </Link>
                    </div>

                    <div className="advertise-container"> 
                        <h1>FotPro</h1>
                        <div id="small-stick">
                        <div id="left"></div>
                        <div id="right"></div>
                        </div>
                        <p>
                            FotPro is a vital key in knowing what's next in soccer
                        </p>
                    </div>

                    <div className="recent-container">
                        <h2>Recent</h2> 
                        <div className="recent-content">
                        <div id="recent-item">There are a total of {teamdata.length} soccer teams worldwide</div>
                        <div id="recent-item">Partizan will be playing in a few days</div>
                        <div id="recent-item">The one and only {teamdata[97].VenueName} belongs to {teamdata[97].Name}</div>
                        </div>
                    </div>

                    <Footer /> 

                </div>
        }
        </div>
    )
}

export default Main; 
