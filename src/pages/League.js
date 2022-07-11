import React, { useEffect, useState } from 'react'; 
import '../scss/pages/league.scss'; 
import { useSelector, useDispatch } from 'react-redux'; 
import { getHierarchy } from '../redux/hierarchy'; 
import { useParams } from "react-router-dom"; 
import Nav from '../components/Nav'; 
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
import { getStandings } from '../redux/standings'; 
import { Link } from 'react-router-dom'; 
import GetTeamLogo from '../components/GetTeamLogo'; 
import { getLeagueMatches } from '../redux/leaguematches'; 
import Loading from '../components/Loading'; 
import Footer from '../components/Footer'; 


function League() {

    //url value 
    const { areaid } = useParams(); 

    const { hierarchydata, hierarchyloading, hierarchyissuccess } = useSelector((state) => state.hierarchy); 
    const { standingloading, standingdata, standingissuccess } = useSelector((state) => state.standing); 
    const { leaguematchesloading, leaguematchesdata, leaguematchesissuccess } = useSelector((state) => state.leaguematches); 
    const dispatch = useDispatch(); 

    //useState 
    const [leagueData, setLeagueData] = useState(); 
    const [possibleSeasonData, setPossibleSeasonData] = useState([]); 
    const [currentSeasonData, setCurrentSeasonData] = useState([]); 
    const [roundIdState, setRoundIdState] = useState(); 
    const [gameState, setGameState] = useState("Total"); 
    const [componentState, setComponentState] = useState("teams"); 
    const [matchesState, setMatchesState] = useState("Previous"); 
    const [lengthOfGamesArr, setLengthOfGamesArr] = useState(20); 

    const [amountOfPrevious, setAmountOfPrevious] = useState(0); 
    const [amountOfUpcoming, setAmountOfUpcoming] = useState(0); 

    //current date 
    const date = new Date(); 
    const today = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate(); 

    //useEffect 
    useEffect(() => {
        if (hierarchydata.length === 0) {
            dispatch(getHierarchy()); 
        }
    }, [dispatch, hierarchydata]); 

    useEffect(() => {
        if (hierarchydata.length > 0) {
            //search for league 
            for (let i = 0; i < hierarchydata.length; i++) {
                if (hierarchydata[i].AreaId == areaid) {
                    setLeagueData(hierarchydata[i]); 

                    var league = hierarchydata[i].Competitions[0].Seasons; 

                    setPossibleSeasonData(league); 
                }
            }
        }
    }, [hierarchydata, areaid]); 

    useEffect(() => {
        if (possibleSeasonData.length !== 0) {

            const now = new Date(); 
            const month = now.getMonth() + 1; 
            const year = now.getFullYear(); 

            for (let i = 0; i < possibleSeasonData.length; i++) {
                if (month < 8) {
                    if (possibleSeasonData[i].Season == year) {
                        setCurrentSeasonData(possibleSeasonData[i]); 
                    }
                }

                else {
                    if (possibleSeasonData[i].Season == year + 1) {
                        setCurrentSeasonData(possibleSeasonData[i]); 
                    }
                }
            }
        }
    }, [possibleSeasonData]); 

    useEffect(() => {
        if (currentSeasonData.length !== 0) {
            for (let i = 0; i < currentSeasonData.Rounds.length; i++) {
                if (currentSeasonData.Rounds[i].Name === "Regular Season") {
                    setRoundIdState(currentSeasonData.Rounds[i].RoundId); 
                    dispatch(getStandings(currentSeasonData.Rounds[i].RoundId)); 
                }
            }
        }
    }, [dispatch, currentSeasonData]); 

    useEffect(() => {
        if (roundIdState !== undefined) {
            dispatch(getLeagueMatches(roundIdState)); 
        }
    }, [dispatch, roundIdState]); 

    useEffect(() => {
        if (leaguematchesdata.length !== 0) {
            for (let i = 0; i < leaguematchesdata.length; i++) {
                let x = leaguematchesdata[i]; 
                //year display 
                if ((x.Day.split('T')[0]).split('-')[0] < today.split('-')[0]) {
                    setAmountOfPrevious(a => a + 1); 
                }
                //month display 
                else if (((x.Day.split('T')[0]).split('-')[0] === today.split('-')[0]) && 
                (parseInt(x.Day.split('-')[1]) < today.split('-')[1])) {
                    setAmountOfPrevious(a => a + 1); 
                } 
                //day display 
                else if (((x.Day.split('T')[0]).split('-')[0] === today.split('-')[0]) && 
                (parseInt(x.Day.split('-')[1]) === parseInt(today.split('-')[1])) && 
                (parseInt(x.Day.split('-')[2]) < parseInt(today.split('-')[2]))) {
                    setAmountOfPrevious(a => a + 1); 
                } 
                //year display 
                else if (((x.Day.split('T')[0]).split('-')[0] > today.split('-')[0])) {
                    setAmountOfUpcoming(a => a + 1); 
                } 
                //month display 
                else if (((x.Day.split('T')[0]).split('-')[0] === today.split('-')[0]) && 
                (parseInt(x.Day.split('-')[1]) > today.split('-')[1])) {
                    setAmountOfUpcoming(a => a + 1); 
                } 
                //day display 
                else if (((x.Day.split('T')[0]).split('-')[0] === today.split('-')[0]) && 
                (parseInt(x.Day.split('-')[1]) === parseInt(today.split('-')[1])) && 
                (parseInt(x.Day.split('-')[2]) > parseInt(today.split('-')[2]))) {
                    setAmountOfUpcoming(a => a + 1); 
                }
            }
        }
        
    }, [leaguematchesdata, leaguematchesloading, today]); 

    //functions 
    const loadMoreArrItems = () => {
        let newLength = lengthOfGamesArr + 25 
        setLengthOfGamesArr(newLength); 
    }; 

    const previousMatchesClick = () => {
        if (matchesState !== 'Previous') {
            setMatchesState('Previous'); 
            setLengthOfGamesArr(20); 
        }
    }; 

    const upcomingMatchesClick = () => {
        if (matchesState !== 'Upcoming') {
            setMatchesState('Upcoming'); 
            setLengthOfGamesArr(20); 
        }
    }; 

    return (
        <div>
            {
                //hierarchyloading || standingloading || leaguematchesloading ? 
                hierarchyissuccess === null || hierarchyloading || 
                standingissuccess === null || standingloading || 
                leaguematchesissuccess === null || leaguematchesloading ? 

                    <Loading /> 

                : 

                !hierarchyissuccess || !standingissuccess ||
                !leaguematchesissuccess ? 

                    <div>error occured</div>

                : 

                    <div className="league-page">
                        
                        <Nav /> 

                        <div className="league-container">

                            <div className="top-background-league-container">

                                <div className="background-img" style={{
                                    background: 'url(' + 
                                        (areaid === '68' ? premierlandscape : areaid === '176' ? laligalandscape : 
                                        areaid === '35' ? seriealandscape : areaid === '80' ? bundesligalandscape : 
                                        areaid === '76' ? ligue1landscape : areaid === '203' ? mlslandscape : 
                                        areaid === '138' ? eredivisielandscape : 
                                        areaid === '129' ? ligamxlandscape : null) + ') center center no-repeat'}}>
                                </div>

                                <img alt="" 
                                    src={
                                        areaid === '68' ? premiericon : areaid === '176' ? laligaicon : 
                                        areaid === '35' ? serieaicon : areaid === '80' ? bundesligaicon : 
                                        areaid === '76' ? ligue1icon : areaid === '203' ? mlsicon : 
                                        areaid === '138' ? eredivisieicon : 
                                        areaid === '129' ? ligamxicon : null
                                    } /> 
                                <h1>{currentSeasonData.CompetitionName}</h1>

                            </div> 

                            <div className="horizontal-scroll-container">
                                <div className="horizontal-scroll-content">
                                    <div id="item" onClick={() => setComponentState("teams")} style={componentState === "teams" ? {borderBottom: '2px solid rgb(0, 165, 240)'} : {borderBottom: '2px solid rgb(23, 48, 75)'}}>Teams</div>
                                    <div id="item" onClick={() => setComponentState("matches")} style={componentState === "matches" ? {borderBottom: '2px solid rgb(0, 165, 240)'} : {borderBottom: '2px solid rgb(23, 48, 75)'}}>Matches</div>
                                </div>
                            </div>

                            {
                                componentState === "teams" ? 

                                    <div className="league-teams-container">
                                        <div className="top-choose-games-container">
                                                <div id="item" onClick={() => setGameState('Total')} style={ gameState === "Total" ? {color: 'rgb(0, 165, 240)', fontWeight: 'bold'} : null}>All</div>
                                                <div id="item" onClick={() => setGameState('Home')} style={ gameState === "Home" ? {color: 'rgb(0, 165, 240)', fontWeight: 'bold'} : null}>Home</div>
                                                <div id="item" onClick={() => setGameState('Away')} style={ gameState === "Away" ? {color: 'rgb(0, 165, 240)', fontWeight: 'bold'} : null}>Away</div>
                                        </div>

                                        <div className="top-column-names">
                                            <div className="top-column-names-content">
                                                <div id="team">Team</div>
                                                <div id="other">W</div>
                                                <div id="other">D</div>
                                                <div id="other">L</div>
                                                <div id="other">+/-</div>
                                                <div id="other" className="right-text">PTS</div>
                                            </div>
                                        </div>

                                        <div className="list-of-team-container">
                                            {
                                                standingdata.map((x, y) => 

                                                x.Scope === gameState ? 

                                                    <Link to={"/FotPro/Team/" + x.TeamId} key={y} className="team-item">
                                                        <div className="team-item-content">
                                                            <div id="team">
                                                                <GetTeamLogo id={x.TeamId} /> 
                                                                <div>{x.Name}</div>
                                                            </div>
                                                            <div id="other">{x.Wins}</div>
                                                            <div id="other">{x.Draws}</div>
                                                            <div id="other">{x.Losses}</div>
                                                            <div id="other">{x.GoalsScored}/{x.GoalsAgainst}</div>
                                                            <div id="other" className="right-text">{x.Points}</div>
                                                        </div>
                                                    </Link>

                                                : 

                                                    null 

                                                )
                                            }
                                        </div>
                                    </div>

                                : 

                                    <div className="league-matches-container">
                                        <div className="prev-upcoming-games-container">
                                            <div id="item" onClick={previousMatchesClick} style={matchesState === 'Previous' ? {color:  'rgb(0, 165, 240)', fontWeight: 'bold'} : null }>Previous</div>
                                            <div id="item" onClick={upcomingMatchesClick} style={matchesState === 'Upcoming' ? {color:  'rgb(0, 165, 240)', fontWeight: 'bold'} : null }>Upcoming</div>
                                        </div>

                                        {
                                            leaguematchesdata.map((x, y) => 

                                            y < lengthOfGamesArr ? 

                                                matchesState === "Previous" ? 

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

                                                            <h2 key={y} id="no-games">no previous games</h2>

                                                        : 

                                                            null 
                                                
                                                : 

                                                matchesState === "Upcoming" ? 

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

                                                        y === 1 ? 

                                                            <h2 key={y} id="no-games">no upcoming games</h2>

                                                        : 

                                                            null 

                                                : 

                                                    null 

                                            : 

                                                null 
                                            )
                                        }

                                        {
                                            matchesState === "Previous" ? 

                                                amountOfPrevious <= 20 ? 

                                                    null 

                                                : 

                                                    <div className="center-load-button">
                                                        <button onClick={loadMoreArrItems}>Load More</button>
                                                    </div>

                                            : 

                                            matchesState === "Upcoming" ? 

                                                amountOfUpcoming <= 20 || amountOfUpcoming === 0 ? 

                                                    null 

                                                : 

                                                    <div className="center-load-button">
                                                        <button onClick={loadMoreArrItems}>Load More</button>
                                                    </div>

                                            : 

                                                null 
                                        }
                                        

                                    </div>  
                            }

                        </div>

                    </div>
            }

            <Footer /> 

        </div>
    )
}

export default League; 
