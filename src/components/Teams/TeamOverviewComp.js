import React from 'react'; 
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { useSelector } from 'react-redux'; 
import HandlePlayerImg from '../HandlePlayerImg'; 
import yellowcard from '../../images/yellow-card.png'; 
import redcard from '../../images/red-card.png'; 
import { Link } from 'react-router-dom'; 

function TeamOverviewComp(props) { 

    const { venuedata } = useSelector((state) => state.venue); 
    const { playerstatsdata } = useSelector((state) => state.playerstats); 
    const { teamstatsdata } = useSelector((state) => state.teamstats); 

    return (
        <div className="team-overview-comp-container">
            {
                <div className="overview-content">

                    <div className="stadium-league-content-container">
                        <div className="stadium-container">
                            <div id="stadium-name">
                                <h4>{props.teaminfo.VenueName}</h4>
                                <FontAwesomeIcon icon={faLocationDot} color="white" /> 
                            </div>
                            <div className="opened-grass-info-container">
                                <div id="item" >
                                    <p>Surface</p>
                                    <h4>{venuedata[props.teaminfo.VenueId].Surface}</h4>
                                </div>
                                <div id="stick"></div>
                                <div id="item">
                                    <p>Opened</p>
                                    <h4>{props.teaminfo.Founded}</h4>
                                </div>
                            </div>
                        </div>

                        <div className="league-container">
                            <div className="league-content-top">
                                <h4>{props.seasoncontent.CompetitionName}</h4>
                            </div>
                            <div className="league-week-year-content">
                                <div id="item">
                                    <p>Year</p>
                                    <h4>{props.seasoncontent.Season}</h4>
                                </div>
                                <div id="stick"></div>
                                <div id="item">
                                    <p>Season</p>
                                    <h4>{props.seasoncontent.Name}</h4>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="team-color-container">
                        <h4>Colors</h4>
                        <div className="color-content">
                            {
                                props.teaminfo.ClubColor1 !== null ? 
                                    <div style={{backgroundColor: (props.teaminfo.ClubColor1.replace(" ", ""))}}></div> : null 
                            }
                            {
                                props.teaminfo.ClubColor2 !== null ? 
                                    <div style={{backgroundColor: (props.teaminfo.ClubColor2.replace(" ", ""))}}></div> : null 
                            }
                            { 
                                props.teaminfo.ClubColor3 !== null ? 
                                    <div style={{backgroundColor: (props.teaminfo.ClubColor3.replace(" ", ""))}}></div> : null 
                            }
                        </div>
                    </div>

                    <div className="top-player-container">
                        {
                            playerstatsdata.map((x, y) =>

                                x.Goals === props.topplayeridx[0] ? 

                                    <Link to={"/FotPro/Player/" + x.PlayerId} key={y} className="top-player-content">
                                        <h4>Top Scorer</h4>
                                        <div className="top-player-left-right">
                                            <div id="player-info">
                                                <HandlePlayerImg id={x.PlayerId} /> 
                                                <div>{x.Name}</div>
                                            </div>
                                            <div id="player-info">
                                                <h2>{props.topplayeridx[0] * 10}</h2>
                                                <div id="goals">Goals</div>
                                            </div>
                                        </div> 
                                    </Link> 

                                : 

                                x.Assists === props.topplayeridx[1] ? 

                                    <Link to={"/FotPro/Player/" + x.PlayerId} key={y} className="top-player-content">
                                        <h4>Most Assists</h4>
                                        <div className="top-player-left-right">
                                            <div id="player-info">
                                                <HandlePlayerImg id={x.PlayerId} /> 
                                                <div>{x.Name}</div>
                                            </div>
                                            <div id="player-info">
                                                <h2>{props.topplayeridx[1] * 10}</h2>
                                                <div id="goals">Assists</div>
                                            </div>
                                        </div>
                                    </Link>

                                : 

                                x.Passes === props.topplayeridx[2] ? 

                                    <Link to={"/FotPro/Player/" + x.PlayerId} key={y} className="top-player-content">
                                        <h4>Most Passes</h4>
                                        <div className="top-player-left-right">
                                            <div id="player-info">
                                                <HandlePlayerImg id={x.PlayerId} /> 
                                                <div>{x.Name}</div>
                                            </div>
                                            <div id="player-info">
                                                <h2>{Math.round((x.PassesCompleted/x.Passes) * 100)}%</h2>
                                                <div id="goals">Pass Accuracy</div>
                                            </div>
                                        </div>
                                    </Link>

                                : 

                                    null
                            )
                        }
                    </div>

                    <div className="yellow-red-other-content-container">
                        <div className="single-data-container">
                            <h4>Yellow Cards</h4>
                            <div className="left-right">
                                <h2>{teamstatsdata.map((x, y) => x.TeamId === props.teaminfo.TeamId ? Math.round(x.YellowCards) : null )}</h2>
                                <img alt="" src={yellowcard} /> 
                            </div>
                        </div>

                        <div className="single-data-container">
                            <h4>Red Cards</h4>
                            <div className="left-right">
                                <h2>{teamstatsdata.map((x, y) => x.TeamId === props.teaminfo.TeamId ? Math.round(x.RedCards) : null )}</h2>
                                <img alt="" src={redcard} /> 
                            </div>
                        </div>

                        <div className="single-data-container">
                            <h4>Shot to Goal Ratio</h4>
                            <div className="left-right">
                                <h2>{Number.isNaN(props.goalratio) ? '--' : props.goalratio + '%'}</h2>
                            </div>
                        </div>

                        <div className="single-data-container">
                            <h4>Successful Passes Ratio</h4>
                            <div className="left-right">
                                <h2>{Number.isNaN(props.passratio) ? '--' : props.passratio + '%'}</h2>
                            </div>
                        </div>
                    </div>

                </div>
            }
        </div>
    )
}

export default TeamOverviewComp; 
