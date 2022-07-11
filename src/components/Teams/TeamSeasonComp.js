import React, { useState} from 'react'; 
import { useSelector/*, useDispatch*/ } from 'react-redux'; 
import GetTeamLogo from '../GetTeamLogo'; 
import { Link } from 'react-router-dom'; 

function TeamSeasonComp(props) {

    const { standingdata } = useSelector((state) => state.standing); 

    //useState 
    const [gameState, setGameState] = useState("Total"); 

    return (
        <div className="team-season-comp-container">

            <div className="top-choose-games-container">
                <div id="item" onClick={() => setGameState('Total')} style={ gameState === 'Total' ? {color: 'rgb(0, 165, 240)', fontWeight: 'bold'} : null }>All</div>
                <div id="item" onClick={() => setGameState('Home')} style={ gameState === 'Home' ? {color: 'rgb(0, 165, 240)', fontWeight: 'bold'} : null }>Home</div>
                <div id="item" onClick={() => setGameState('Away')} style={ gameState === 'Away' ? {color: 'rgb(0, 165, 240)', fontWeight: 'bold'} : null }>Away</div>
            </div>

            <div className="top-column-names">
                <div className="top-column-names-content">
                    <div id="team">Team</div>
                    <div id="other">W</div>
                    <div id="other">D</div>
                    <div id="other">L</div>
                    <div id="other">+/-</div>
                    <div id="other-right">PTS</div>
                </div>
            </div>


            {/* copy exact html and css from team component to league page s */}



            {
                standingdata.map((x, y) => 

                    x.Scope === gameState ? 
                    
                        <Link to={"/FotPro/Team/" + x.TeamId} key={y} className="team-item" style={{backgroundColor: props.teaminfo.TeamId === x.TeamId ? 'rgb(32, 68, 105)' : null }}>
                            <div className="team-item-content">
                                <div id="team">
                                    <GetTeamLogo id={x.TeamId} /> 
                                    <div>{x.Name}</div>
                                </div>
                                <div id="other">{x.Wins}</div>
                                <div id="other">{x.Draws}</div>
                                <div id="other">{x.Losses}</div>
                                <div id="other">{x.GoalsScored}/{x.GoalsAgainst}</div>
                                <div id="other-right">{x.Points}</div>
                            </div>
                        </Link>

                    : 

                        null 
                
                )
            }
        </div>
    )
}

export default TeamSeasonComp; 
