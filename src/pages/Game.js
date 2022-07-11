import React, { useEffect } from 'react'; 
import { getGame } from '../redux/game'; 
import { Link, useParams } from "react-router-dom"; 
import { useSelector, useDispatch } from 'react-redux'; 
import '../scss/pages/game.scss'; 
import GetTeamLogo from '../components/GetTeamLogo'; 
import { getTeams } from '../redux/teams'; 
import Nav from '../components/Nav';
import Loading from '../components/Loading';

function Game() {
    
    //url value 
    const { gameid } = useParams(); 

    const { teamdata, loading, issuccess } = useSelector((state) => state.team); 
    const { gameloading, gamedata, gameissuccess } = useSelector((state) => state.game); 
    const dispatch = useDispatch(); 

    //useEffect 
    useEffect(() => {
        if (teamdata.length === 0) {
            dispatch(getTeams()); 
        }
    }, [dispatch, teamdata]); 

    useEffect(() => {
        dispatch(getGame(gameid)); 
    }, [dispatch, gameid])

    return (
        <div>
            {
                //gameloading || gamedata.length === 0 ? 

                issuccess === null || loading || 
                gameissuccess === null || gameloading ? 

                    <Loading /> 

                : 

                !issuccess || !gameissuccess ? 

                    <div>error occured</div> 

                : 

                    <div className="game-page">

                        <Nav /> 

                        <div className="game-top-content-container">

                            <div className="game-top-content">
                                <div id="img-container">
                                    <Link to={"/FotPro/Team/" + gamedata[0].Game.HomeTeamId}>
                                        <GetTeamLogo id={gamedata[0].Game.HomeTeamId} />  
                                    </Link>
                                    <Link to={"/FotPro/Team/" + gamedata[0].Game.AwayTeamId}>
                                        <GetTeamLogo id={gamedata[0].Game.AwayTeamId} /> 
                                    </Link>
                                </div>
                                <div id="team-name-container">
                                    <Link to={"/FotPro/Team/" + gamedata[0].Game.HomeTeamId}>
                                        <h2 id="left-tex">{gamedata[0].Game.HomeTeamName}</h2>
                                    </Link>
                                    <Link to={"/FotPro/Team/" + gamedata[0].Game.AwayTeamId}>
                                        <h2 id="right-tex">{gamedata[0].Game.AwayTeamName}</h2>
                                    </Link>
                                </div>
                                <div id="score-container">{gamedata[0].Game.HomeTeamScore} - {gamedata[0].Game.AwayTeamScore}</div>
                            </div>
                        </div>

                        <div className="game-content-container">
                            
                            <div className="first-3-content-container">
                                <div className="stats-container">
                                    <div className="stats-name-label">
                                        <h4>Formation</h4>
                                    </div>
                                    <div className="stats-left-right">
                                        <div id="single-content">{gamedata[0].Game.HomeTeamFormation}</div>
                                        <div id="single-content">{gamedata[0].Game.AwayTeamFormation}</div>
                                    </div>
                                </div>
                                <div className="stats-container">
                                    <div className="stats-name-label">
                                        <h4>Coaches</h4>
                                    </div>
                                    <div className="stats-left-right">
                                        <div id="top-bottom-content">
                                            <div id="big-text">{gamedata[0].HomeTeamCoach.ShortName}</div>
                                            <p>{gamedata[0].HomeTeamCoach.Nationality}</p>
                                        </div>
                                        <div id="top-bottom-content">
                                            <div id="big-text">{gamedata[0].AwayTeamCoach.ShortName}</div>
                                            <p>{gamedata[0].AwayTeamCoach.Nationality}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="stats-container">
                                    <div className="stats-name-label">
                                        <h4>Main Referee</h4>
                                    </div>
                                    <div className="single-top-bottom-content">
                                        <div id="big-text">{gamedata[0].MainReferee.ShortName}</div>
                                        <p>{gamedata[0].MainReferee.Nationality}</p>
                                    </div>
                                </div>
                            </div>

                            {
                                gamedata[0].Game.HomeTeamId === gamedata[0].TeamGames[0].TeamId ? 

                                    <div className="stats-container">
                                        <div className="stats-name-label">
                                            <h4>Stats</h4>
                                        </div>
                                        <div className="single-top-bottom-content">

                                            <div className="top-text-bottom-content">
                                                <span>Possession</span>
                                                <div className="left-bar-right">
                                                    <div id="left-text">{gamedata[0].TeamGames[0].Possession}%</div>
                                                    <div className="bar-container">
                                                        <div id="bar-left" style={{width: gamedata[0].TeamGames[0].Possession + '%'}}></div>
                                                        <div id="bar-right" style={{width: gamedata[0].TeamGames[1].Possession + '%'}}></div>
                                                    </div>
                                                    <div id="right-text">{gamedata[0].TeamGames[1].Possession}%</div>
                                                </div>
                                            </div>

                                            <div className="top-text-bottom-content">
                                                <div className="left-bar-right">
                                                    <div id="left-text">{Math.round(gamedata[0].TeamGames[0].Passes)}</div>
                                                    <div className="middle-text">Passes</div>
                                                    <div id="right-text">{Math.round(gamedata[0].TeamGames[1].Passes)}</div>
                                                </div>
                                            </div>

                                            <div className="top-text-bottom-content">
                                                <div className="left-bar-right">
                                                    <div id="left-text">{Math.round(gamedata[0].TeamGames[0].PassesCompleted)}</div>
                                                    <div className="middle-text">Passes Completed</div>
                                                    <div id="right-text">{Math.round(gamedata[0].TeamGames[1].PassesCompleted)}</div>
                                                </div>
                                            </div> 

                                            <div className="top-text-bottom-content">
                                                <div className="left-bar-right">
                                                    <div id="left-text">{Math.round(gamedata[0].TeamGames[0].Touches)}</div>
                                                    <div className="middle-text">Touches</div>
                                                    <div id="right-text">{Math.round(gamedata[0].TeamGames[1].Touches)}</div>
                                                </div>
                                            </div> 

                                            <div className="top-text-bottom-content">
                                                <div className="left-bar-right">
                                                    <div id="left-text">{Math.round(gamedata[0].TeamGames[0].Crosses)}</div>
                                                    <div className="middle-text">Crosses</div>
                                                    <div id="right-text">{Math.round(gamedata[0].TeamGames[1].Crosses)}</div>
                                                </div>
                                            </div>

                                            <div className="top-text-bottom-content">
                                                <div className="left-bar-right">
                                                    <div id="left-text">{Math.round(gamedata[0].TeamGames[0].Fouls)}</div>
                                                    <div className="middle-text">Fouls</div>
                                                    <div id="right-text">{Math.round(gamedata[0].TeamGames[1].Fouls)}</div>
                                                </div>
                                            </div>

                                            <div className="top-text-bottom-content">
                                                <div className="left-bar-right">
                                                    <div id="left-text">{Math.round(gamedata[0].TeamGames[0].Interceptions)}</div>
                                                    <div className="middle-text">Interceptions</div>
                                                    <div id="right-text">{Math.round(gamedata[0].TeamGames[1].Interceptions)}</div>
                                                </div>
                                            </div>

                                            <div className="top-text-bottom-content">
                                                <div className="left-bar-right">
                                                    <div id="left-text">{Math.round(gamedata[0].TeamGames[0].Offsides)}</div>
                                                    <div className="middle-text">Offsides</div>
                                                    <div id="right-text">{Math.round(gamedata[0].TeamGames[1].Offsides)}</div>
                                                </div>
                                            </div>

                                            <div className="top-text-bottom-content">
                                                <div className="left-bar-right">
                                                    <div id="left-text">{Math.round(gamedata[0].TeamGames[0].CornersWon)}</div>
                                                    <div className="middle-text">Corners</div>
                                                    <div id="right-text">{Math.round(gamedata[0].TeamGames[1].CornersWon)}</div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                : 

                                    <div className="stats-container">
                                        <div className="stats-name-label">
                                            <h4>Stats</h4>
                                        </div>
                                        <div className="single-top-bottom-content">

                                            <div className="top-text-bottom-content">
                                                <span>Possession</span>
                                                <div className="left-bar-right">
                                                    <div id="left-text">{gamedata[0].TeamGames[1].Possession}%</div>
                                                    <div className="bar-container">
                                                        <div id="bar-left" style={{width: gamedata[0].TeamGames[1].Possession + '%'}}></div>
                                                        <div id="bar-right" style={{width: gamedata[0].TeamGames[0].Possession + '%'}}></div>
                                                    </div>
                                                    <div id="right-text">{gamedata[0].TeamGames[0].Possession}%</div>
                                                </div>
                                            </div>

                                            <div className="top-text-bottom-content">
                                                <div className="left-bar-right">
                                                    <div id="left-text">{Math.round(gamedata[0].TeamGames[1].Passes)}</div>
                                                    <div className="middle-text">Passes</div>
                                                    <div id="right-text">{Math.round(gamedata[0].TeamGames[0].Passes)}</div>
                                                </div>
                                            </div>

                                            <div className="top-text-bottom-content">
                                                <div className="left-bar-right">
                                                    <div id="left-text">{Math.round(gamedata[0].TeamGames[1].PassesCompleted)}</div>
                                                    <div className="middle-text">Passes Completed</div>
                                                    <div id="right-text">{Math.round(gamedata[0].TeamGames[0].PassesCompleted)}</div>
                                                </div>
                                            </div> 

                                            <div className="top-text-bottom-content">
                                                <div className="left-bar-right">
                                                    <div id="left-text">{Math.round(gamedata[0].TeamGames[1].Touches)}</div>
                                                    <div className="middle-text">Touches</div>
                                                    <div id="right-text">{Math.round(gamedata[0].TeamGames[0].Touches)}</div>
                                                </div>
                                            </div> 

                                            <div className="top-text-bottom-content">
                                                <div className="left-bar-right">
                                                    <div id="left-text">{Math.round(gamedata[0].TeamGames[1].Crosses)}</div>
                                                    <div className="middle-text">Crosses</div>
                                                    <div id="right-text">{Math.round(gamedata[0].TeamGames[0].Crosses)}</div>
                                                </div>
                                            </div>

                                            <div className="top-text-bottom-content">
                                                <div className="left-bar-right">
                                                    <div id="left-text">{Math.round(gamedata[0].TeamGames[1].Fouls)}</div>
                                                    <div className="middle-text">Fouls</div>
                                                    <div id="right-text">{Math.round(gamedata[0].TeamGames[0].Fouls)}</div>
                                                </div>
                                            </div>

                                            <div className="top-text-bottom-content">
                                                <div className="left-bar-right">
                                                    <div id="left-text">{Math.round(gamedata[0].TeamGames[1].Interceptions)}</div>
                                                    <div className="middle-text">Interceptions</div>
                                                    <div id="right-text">{Math.round(gamedata[0].TeamGames[0].Interceptions)}</div>
                                                </div>
                                            </div>

                                            <div className="top-text-bottom-content">
                                                <div className="left-bar-right">
                                                    <div id="left-text">{Math.round(gamedata[0].TeamGames[1].Offsides)}</div>
                                                    <div className="middle-text">Offsides</div>
                                                    <div id="right-text">{Math.round(gamedata[0].TeamGames[0].Offsides)}</div>
                                                </div>
                                            </div>

                                            <div className="top-text-bottom-content">
                                                <div className="left-bar-right">
                                                    <div id="left-text">{Math.round(gamedata[0].TeamGames[1].CornersWon)}</div>
                                                    <div className="middle-text">Corners</div>
                                                    <div id="right-text">{Math.round(gamedata[0].TeamGames[0].CornersWon)}</div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                            }
                            
                        </div>

                    </div>
            }
        </div>
    )
}

export default Game; 
