import React, { useState } from 'react'; 
import { useSelector } from 'react-redux'; 
import { Link } from 'react-router-dom'; 
import GetTeamLogo from '../GetTeamLogo'; 
import { useParams } from "react-router-dom"; 

function TeamMatchesComp(props) { 

    const { leaguematchesdata } = useSelector((state) => state.leaguematches); 

    //current date 
    const date = new Date(); 
    const today = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate(); 
    // const today = date.getFullYear()+'-'+ '2' +'-'+date.getDate(); 

    //useState 
    const [gameState, setGameState] = useState("Previous"); 

    //functions 
    const previousMatchesClick = () => {
        if (gameState !== 'Previous') {
            setGameState('Previous'); 
        }
    }; 

    const upcomingMatchesClick = () => {
        if (gameState !== 'Upcoming') {
            setGameState('Upcoming'); 
        }
    }

    return (
        <div className="team-matches-comp-container">
            <div className="team-matches-content">

                <div className="prev-upcoming-games-container">
                    <div id="item" onClick={previousMatchesClick} style={gameState === 'Previous' ? {color:  'rgb(0, 165, 240)', fontWeight: 'bold' } : null}>Previous</div>
                    <div id="item" onClick={upcomingMatchesClick} style={gameState === 'Upcoming' ? {color:  'rgb(0, 165, 240)', fontWeight: 'bold'} : null}>Upcoming</div>
                </div>

                {
                    leaguematchesdata.map((x, y) => 
                        x.HomeTeamId === props.teaminfo.TeamId || 
                        x.AwayTeamId === props.teaminfo.TeamId ? 

                            gameState === "Previous" ? 

                                //year display 
                                ((x.Day.split('T')[0]).split('-')[0] < today.split('-')[0]) ? 

                                    <Link to={"/FotPro/Game/" + x.GameId} className="match-game-container" key={y}>
                                        <div className="match-game-content">
                                            <div id="team-name-team-logo-container">
                                                <GetTeamLogo id={x.HomeTeamId} /> 
                                                <div id="team-names" className="right">{x.HomeTeamName}</div>
                                            </div>
                                            <div id="score">vs</div>
                                            <div id="team-name-team-logo-container">
                                                <div id="team-names" className="left">{x.AwayTeamName}</div> 
                                                <GetTeamLogo id={x.AwayTeamId} /> 
                                            </div>
                                        </div>
                                    </Link>

                                : 
                
                                //month display 
                                ((x.Day.split('T')[0]).split('-')[0] === today.split('-')[0]) && 
                                (parseInt(x.Day.split('-')[1]) < today.split('-')[1]) ? 

                                    <Link to={"/FotPro/Game/" + x.GameId} className="match-game-container" key={y}>
                                        <div className="match-game-content">
                                            <div id="team-name-team-logo-container">
                                                <GetTeamLogo id={x.HomeTeamId} /> 
                                                <div id="team-names" className="right">{x.HomeTeamName}</div>
                                            </div>
                                            <div id="score">vs</div>
                                            <div id="team-name-team-logo-container">
                                                <div id="team-names" className="left">{x.AwayTeamName}</div> 
                                                <GetTeamLogo id={x.AwayTeamId} /> 
                                            </div>
                                        </div>
                                    </Link> 

                                : 

                                //day display 
                                ((x.Day.split('T')[0]).split('-')[0] === today.split('-')[0]) && 
                                (parseInt(x.Day.split('-')[1]) === parseInt(today.split('-')[1])) && 
                                (parseInt(x.Day.split('-')[2]) < parseInt(today.split('-')[2])) ? 

                                    <Link to={"/FotPro/Game/" + x.GameId} className="match-game-container" key={y}>
                                        <div className="match-game-content">
                                            <div id="team-name-team-logo-container">
                                                <GetTeamLogo id={x.HomeTeamId} /> 
                                                <div id="team-names" className="right">{x.HomeTeamName}</div>
                                            </div>
                                            <div id="score">vs</div>
                                            <div id="team-name-team-logo-container">
                                                <div id="team-names" className="left">{x.AwayTeamName}</div> 
                                                <GetTeamLogo id={x.AwayTeamId} /> 
                                            </div>
                                        </div>
                                    </Link>   

                                : 

                                    x.Week === 1 ? 

                                        <div key={y} id="no-games">no previous games</div>                           

                                    : 

                                        null 

                            : 

                            gameState === "Upcoming" ? 

                                //year display 
                                ((x.Day.split('T')[0]).split('-')[0] > today.split('-')[0]) ? 

                                    <div to={"/FotPro/Game/" + x.GameId} className="match-game-container" key={y}>
                                        <div className="match-game-content">
                                            <div id="team-name-team-logo-container">
                                                <GetTeamLogo id={x.HomeTeamId} /> 
                                                <div id="team-names" className="right">{x.HomeTeamName}</div>
                                            </div>
                                            <div id="score">vs</div>
                                            <div id="team-name-team-logo-container">
                                                <div id="team-names" className="left">{x.AwayTeamName}</div> 
                                                <GetTeamLogo id={x.AwayTeamId} /> 
                                            </div>
                                        </div>
                                    </div>

                                : 
                
                                //month display 
                                ((x.Day.split('T')[0]).split('-')[0] === today.split('-')[0]) && 
                                (parseInt(x.Day.split('-')[1]) > today.split('-')[1]) ? 

                                    <div to={"/FotPro/Game/" + x.GameId} className="match-game-container" key={y}>
                                        <div className="match-game-content">
                                            <div id="team-name-team-logo-container">
                                                <GetTeamLogo id={x.HomeTeamId} /> 
                                                <div id="team-names" className="right">{x.HomeTeamName}</div>
                                            </div>
                                            <div id="score">vs</div>
                                            <div id="team-name-team-logo-container">
                                                <div id="team-names" className="left">{x.AwayTeamName}</div> 
                                                <GetTeamLogo id={x.AwayTeamId} /> 
                                            </div>
                                        </div>
                                    </div> 

                                : 

                                //day display 
                                ((x.Day.split('T')[0]).split('-')[0] === today.split('-')[0]) && 
                                (parseInt(x.Day.split('-')[1]) === parseInt(today.split('-')[1])) && 
                                (parseInt(x.Day.split('-')[2]) > parseInt(today.split('-')[2])) ? 

                                    <div to={"/FotPro/Game/" + x.GameId} className="match-game-container" key={y}>
                                        <div className="match-game-content">
                                            <div id="team-name-team-logo-container">
                                                <GetTeamLogo id={x.HomeTeamId} /> 
                                                <div id="team-names" className="right">{x.HomeTeamName}</div>
                                            </div>
                                            <div id="score">vs</div>
                                            <div id="team-name-team-logo-container">
                                                <div id="team-names" className="left">{x.AwayTeamName}</div> 
                                                <GetTeamLogo id={x.AwayTeamId} /> 
                                            </div>
                                        </div>
                                    </div> 

                                : 

                                    x.Week === 1 ? 

                                        <div key={y} id="no-games">no upcoming games</div>
                                    : 
                                    
                                        null 

                            : 

                                null 

                        : 

                            null 
                    )
                }
            </div>
        </div>
    )
} 

export default TeamMatchesComp; 
