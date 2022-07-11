import React from 'react'; 
import { useSelector } from 'react-redux'; 

function TeamStatsComp(props) {

    const { teamstatsdata } = useSelector((state) => state.teamstats); 

  return (
    <div className="team-stats-comp-container">
        {
            teamstatsdata.map((x, y) => 

                x.TeamId === props.teaminfo.TeamId ? 

                <div className="team-stats-comp-content" key={y}>

                    <div className="goal-passes-container">
                        <div className="goal-shot-related-container">
                            <div className="left-right">
                                <p>Total Shots</p>
                                <h3>{Math.round(x.Shots)}</h3>
                            </div>
                            <div className="percent-bar-container">
                                <div id="left-text">Goals</div>
                                <div id="bar">
                                    <div id="bar-fill" style={{width: ((x.Goals/x.Shots) * 100) + '%'}}></div>
                                </div>
                                <div id="right-text">{Math.round(x.Goals)}</div>
                            </div>
                            <div className="percent-bar-container">
                                <div id="left-text">On Target</div>
                                <div id="bar">
                                    <div id="bar-fill" style={{width: ((x.ShotsOnGoal/x.Shots) * 100) + '%'}}></div>
                                </div>
                                <div id="right-text">{Math.round(x.ShotsOnGoal)}</div>
                            </div>
                            <div className="percent-bar-container">
                                <div id="left-text">Off Target</div>
                                <div id="bar">
                                    <div id="bar-fill" style={{width: (((x.Shots - (x.Goals + x.ShotsOnGoal))/x.Shots) * 100) + '%'}}></div>
                                </div>
                                <div id="right-text">{Math.round(x.Shots - (x.Goals + x.ShotsOnGoal))}</div>
                            </div>
                        </div>

                        <div className="passes-possession-related-container">
                            <div className="left-right">
                                <p>Total Passes</p>
                                <h3>{Math.round(x.Passes)}</h3>
                            </div>
                            <div className="percent-bar-container">
                                <div id="left-text">Complete</div>
                                <div id="bar">
                                    <div id="bar-fill" style={{width: ((x.PassesCompleted/x.Passes) * 100) + '%'}}></div>
                                </div>
                                <div id="right-text">{Math.round(x.PassesCompleted)}</div>
                            </div>
                            <div className="percent-bar-container">
                                <div id="left-text">Incomplete</div>
                                <div id="bar">
                                    <div id="bar-fill" style={{width: (((x.Passes - x.PassesCompleted)/x.Passes) * 100) + '%'}}></div>
                                </div>
                                <div id="right-text">{Math.round(x.Passes - x.PassesCompleted)}</div>
                            </div>
                        </div>
                    </div>

                    <div className="miscellaneous-related-container">
                        <div className="left-right">
                            <p>Assists</p>
                            <h3>{Math.round(x.Assists)}</h3>
                        </div>
                        <div id="miscellaneous-item">
                            <div className="left-text">Tackles Won</div>
                            <div className="right-text">{Math.round(x.TacklesWon)}</div>
                        </div>
                        <div id="miscellaneous-item">
                            <div className="left-text">Fouls</div>
                            <div className="right-text">{Math.round(x.Fouls)}</div>
                        </div>
                        <div id="miscellaneous-item">
                            <div className="left-text">Crosses</div>
                            <div className="right-text">{Math.round(x.Crosses)}</div>
                        </div>
                        <div id="miscellaneous-item">
                            <div className="left-text">Corners</div>
                            <div className="right-text">{Math.round(x.CornersWon)}</div>
                        </div>
                        <div id="miscellaneous-item">
                            <div className="left-text">Shots Blocked</div>
                            <div className="right-text">{Math.round(x.BlockedShots)}</div>
                        </div>
                        <div id="miscellaneous-item">
                            <div className="left-text">Defender Clean Sheets</div>
                            <div className="right-text">{Math.round(x.DefenderCleanSheets)}</div>
                        </div>
                        <div id="miscellaneous-item">
                            <div className="left-text">Saves</div>
                            <div className="right-text">{Math.round(x.GoalkeeperSaves)}</div>
                        </div>
                        <div id="miscellaneous-item">
                            <div className="left-text">Goalkeeper Clean Sheets</div>
                            <div className="right-text">{Math.round(x.GoalkeeperCleanSheets)}</div>
                        </div>
                        <div id="miscellaneous-item">
                            <div className="left-text">Own Goals</div>
                            <div className="right-text">{Math.round(x.OwnGoals)}</div>
                        </div>
                    </div>

                </div>

            : 

                null 
            )
        }
    </div>
  )
}

export default TeamStatsComp; 
