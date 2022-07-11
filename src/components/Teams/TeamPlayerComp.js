import React, { useState } from 'react'; 
import { useSelector } from 'react-redux'; 
import { faShirt, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { Link } from 'react-router-dom'; 

function TeamPlayerComp() {

    const { playersinteamdata } = useSelector((state) => state.playersinteam); 

    //useState 
    const [keeperDisplay, setKeeperDisplay] = useState("flex"); 
    const [defenderDisplay, setDefenderDisplay] = useState("flex"); 
    const [midfielderDisplay, setMidfielderDisplay] = useState("flex"); 
    const [attackerDisplay, setAttackerDisplay] = useState("flex"); 

    return (
        <div className="team-players-comp-container">

            <div className="player-position-container">
                <div id="position-label">
                    <div id="position-label-content">
                        <h4>GoalKeeper</h4>
                        <FontAwesomeIcon icon={faChevronDown} onClick={() => keeperDisplay === "flex" ? setKeeperDisplay("none") : setKeeperDisplay("flex")} style={{transform: keeperDisplay === "flex" ? 'rotate(180deg)' : null}} /> 
                    </div>
                </div>
                <div id="player-container" style={{display: keeperDisplay}}>
                    {
                        playersinteamdata.map((x, y) => 

                            x.PositionCategory === "GK" ? 

                                <Link to={"/FotPro/Player/" + x.PlayerId} key={y} id="player-content">
                                    <div id="player-main-content">
                                        <div id="player-img-background">
                                            <img alt="" src={x.PhotoUrl} /> 
                                        </div>
                                        <h5>{x.CommonName}</h5>
                                        <div className="jersey-container">
                                            <FontAwesomeIcon icon={faShirt} /> 
                                            <span>{x.Jersey}</span>
                                        </div>
                                    </div>
                                </Link>

                            : 

                                null 
                        )
                    }
                </div>

                <div id="position-label">
                    <div id="position-label-content">
                        <h4>Defender</h4>
                        <FontAwesomeIcon icon={faChevronDown} onClick={() => defenderDisplay === "flex" ? setDefenderDisplay("none") : setDefenderDisplay("flex")} style={{transform: defenderDisplay === "flex" ? 'rotate(180deg)' : null}} /> 
                    </div>
                </div>
                <div id="player-container" style={{display: defenderDisplay}}>
                    {
                        playersinteamdata.map((x, y) => 
                        
                            x.PositionCategory === "D" ? 

                                <Link to={"/FotPro/Player/" + x.PlayerId} key={y} id="player-content">
                                    <div id="player-main-content">
                                        <div id="player-img-background">
                                            <img alt="" src={x.PhotoUrl} /> 
                                        </div>
                                        <h5>{x.CommonName}</h5>
                                        <div className="jersey-container">
                                            <FontAwesomeIcon icon={faShirt} /> 
                                            <span>{x.Jersey}</span>
                                        </div>
                                    </div>
                                </Link>

                            : 

                                null 

                        )
                    }
                </div>

                <div id="position-label"> 
                    <div id="position-label-content">
                        <h4>Midfielder</h4>
                        <FontAwesomeIcon icon={faChevronDown} onClick={() => midfielderDisplay === "flex" ? setMidfielderDisplay("none") : setMidfielderDisplay("flex")} style={{transform: midfielderDisplay === "flex" ? 'rotate(180deg)' : null}} /> 
                    </div>
                </div>
                <div id="player-container" style={{display: midfielderDisplay}}>
                    {
                        playersinteamdata.map((x, y) => 

                            x.PositionCategory === "M" ? 

                                <Link to={"/FotPro/Player/" + x.PlayerId} key={y} id="player-content">
                                    <div id="player-main-content">
                                        <div id="player-img-background">
                                            <img alt="" src={x.PhotoUrl} /> 
                                        </div>
                                        <h5>{x.CommonName}</h5>
                                        <div className="jersey-container">
                                            <FontAwesomeIcon icon={faShirt} /> 
                                            <span>{x.Jersey}</span>
                                        </div>
                                    </div>
                                </Link>

                            : 

                                null 

                        )
                    }
                </div>

                <div id="position-label">
                    <div id="position-label-content">
                        <h4>Attacker</h4>
                        <FontAwesomeIcon icon={faChevronDown} onClick={() => attackerDisplay === "flex" ? setAttackerDisplay("none") : setAttackerDisplay("flex")} style={{transform: attackerDisplay === "flex" ? 'rotate(180deg)' : null}} /> 
                    </div>
                </div>
                <div id="player-container" style={{display: attackerDisplay}}>
                    {
                        playersinteamdata.map((x, y) => 

                            x.PositionCategory === "A" ? 

                                <Link to={"/FotPro/Player/" + x.PlayerId} key={y} id="player-content">
                                    <div id="player-main-content">
                                        <div id="player-img-background">
                                            <img alt="" src={x.PhotoUrl} /> 
                                        </div>
                                        <h5>{x.CommonName}</h5>
                                        <div className="jersey-container">
                                            <FontAwesomeIcon icon={faShirt} /> 
                                            <span>{x.Jersey}</span>
                                        </div>
                                    </div>
                                </Link>

                            : 

                                null 

                        )
                    }
                </div>

            </div>
        </div>
    )
}

export default TeamPlayerComp; 
