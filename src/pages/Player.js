import React, { useEffect } from 'react'; 
import { useParams } from "react-router-dom"; 
import { useSelector, useDispatch } from 'react-redux'; 
import { getPlayer } from '../redux/player'; 
import { getPlayerMatches } from '../redux/playermatches'; 
import Nav from '../components/Nav'; 
import '../scss/pages/player.scss'; 
import GetTeamLogo from '../components/GetTeamLogo'; 
import { Link } from 'react-router-dom'; 
import Loading from '../components/Loading';

function Player() {

    const { playerid } = useParams(); 

    const { playerloading, playerdata, playerissuccess } = useSelector((state) => state.player); 
    const { playermatchesloading, playermatchesdata, playermatchesissuccess } = useSelector((state) => state.playermatches); 
    const dispatch = useDispatch(); 

    //useEffect 
    useEffect(() => {
        dispatch(getPlayer(playerid)); 
        dispatch(getPlayerMatches(playerid)); 
    }, [dispatch, playerid]); 

    return (
        <div>
            {
                //playerloading || playermatchesloading ? 
                playerissuccess === null || playerloading || 
                playermatchesissuccess === null || playermatchesloading ? 

                    <Loading /> 

                : 

                !playerissuccess || !playermatchesissuccess ? 

                    <div>error occured</div>

                : 

                    <div className="player-page">

                        <Nav /> 

                        <div className="player-container">
                            
                            <div className="general-info-container">
                                <div className="head-background">
                                    <img alt="" src={playerdata.PhotoUrl} /> 
                                </div>
                                <h2>{playerdata.CommonName}</h2>
                                <p>{playerdata.Nationality}</p>
                            </div>

                            <div className="player-sub-info-container">
                                <div id="content">
                                    <h3>{playerdata.Jersey}</h3>
                                    <p>Shirt</p>
                                </div>
                                <div id="content">
                                    <h3>{playerdata.Position}</h3>
                                    <p>Position</p>
                                </div>
                                <div id="content">
                                    <h3>{playerdata.Weight === null ? '--' : playerdata.Weight + ' kg'}</h3>
                                    <p>Weight</p>
                                </div>
                                <div id="content">
                                    <h3>{playerdata.Height === null ? '--' : playerdata.Height + ' cm'}</h3>
                                    <p>Height</p>
                                </div>
                                <div id="content">
                                    <h3>{playerdata.Foot === null ? '--' : playerdata.Foot}</h3>
                                    <p>Foot</p>
                                </div>
                                <div id="content">
                                    <h3>{playerdata.BirthCountry}</h3>
                                    <p>Country</p>
                                </div>
                                <div id="content">
                                    <h3>{playerdata.BirthCity === null ? '--' : playerdata.BirthCity}</h3>
                                    <p>City</p>
                                </div>
                                <div id="content">
                                    <h3>{playerdata.Gender}</h3>
                                    <p>Gender</p>
                                </div>
                            </div>

                            <div className="upcoming-matches-container">
                                
                                <h2>Upcoming Games</h2>
                            
                                <div className="upcoming-matches-content-container">

                                    {
                                        playermatchesdata.length === 0 ? 

                                            <h4>No Upcoming Games</h4>

                                        : 

                                        playermatchesdata.map((x, y) => 

                                            y < 10 ? 

                                                <div className="upcoming-matches-content" key={y}>
                                                    <div className="upcoming-matches">
                                                        <Link id="left-team-content" to={"/FotPro/Team/" + x.HomeTeamId}>
                                                            <GetTeamLogo id={x.HomeTeamId} />
                                                            <div id="team-names">{x.HomeTeamName}</div> 
                                                        </Link>
                                                        <p>vs</p>
                                                        <Link id="right-team-content" to={"/FotPro/Team/" + x.AwayTeamId}>
                                                            <div id="team-names">{x.AwayTeamName}</div>
                                                            <GetTeamLogo id={x.AwayTeamId} /> 
                                                        </Link>
                                                    </div>
                                                </div>

                                            : 

                                                null 
                                        )
                                    }
                                </div>

                            </div>

                        </div>
                    </div>
            }
        </div>
    )
}

export default Player; 
