import React, { useEffect, useState } from 'react'; 
import { useParams } from "react-router-dom"; 
import { getTeams } from '../redux/teams'; 
import { useSelector, useDispatch } from 'react-redux'; 
import '../scss/pages/team.scss'; 
import Nav from '../components/Nav';
import TeamOverviewComp from '../components/Teams/TeamOverviewComp';
import { getVenues } from '../redux/venues';
import { getHierarchy } from '../redux/hierarchy';
import { getPlayerStatsByTeam } from '../redux/playerstatsbyteam'; 
import { getStandings } from '../redux/standings';
import { getPlayersInTeam } from '../redux/playerinteam'; 
import { getTeamStats } from '../redux/teamstats'; 
import { getLeagueMatches } from '../redux/leaguematches';
import TeamSeasonComp from '../components/Teams/TeamSeasonComp';
import TeamPlayerComp from '../components/Teams/TeamPlayerComp';
import TeamStatsComp from '../components/Teams/TeamStatsComp';
import TeamMatchesComp from '../components/Teams/TeamMatchesComp';
import Loading from '../components/Loading';

function Team() {

    //url value 
    const { index } = useParams(); 

	const { venuedata, venueloading, venueissuccess } = useSelector((state) => state.venue); 
    const { hierarchydata, hierarchyloading, hierarchyissuccess } = useSelector((state) => state.hierarchy); 
	const { playerstatsdata, playerstatsloading, playerstatsissuccess } = useSelector((state) => state.playerstats); 
	const { teamdata, loading, issuccess } = useSelector((state) => state.team); 
	const { standingloading, standingissuccess } = useSelector((state) => state.standing); 
	const { playersinteamloading, playersinteamissuccess } = useSelector((state) => state.playersinteam); 
	const { teamstatsloading, teamstatsissuccess } = useSelector((state) => state.teamstats); 
	const { leaguematchesloading, leaguematchesissuccess } = useSelector((state) => state.leaguematches); 
    const dispatch = useDispatch();  

	//useState 
	const [info, setInfo] = useState({}); 
	const [pageLoading, setPageLoading] = useState(true); 
	const [contentState, setContentState] = useState("overview"); 


	const [topPlayerIndex, setTopPlayerIndex] = useState([]); 
    const [leagueContent, setLeagueContent] = useState([]); 
	const [currentSeason, setCurrentSeason] = useState([]); 
    const [goalToShotRatio, setGoalToShotRatio] = useState(0); 
    const [successPasses, setSuccessPasses] = useState(0); 

	//useEffect 
	useEffect(() => {
		//fetching data needed to display this page 
		if (teamdata.length === 0) {
			dispatch(getTeams()); 
		}
		if (venuedata.length === 0) {
			dispatch(getVenues()); 
		}
		if (hierarchydata.length === 0) {
			dispatch(getHierarchy()); 
		}
	}, [dispatch, teamdata, venuedata, hierarchydata]); 

	useEffect(() => {
		//making info state into object that equals one team info 
		for (let i = 0; i < teamdata.length; i++) { 
			if (teamdata[i].TeamId == index) {
				setInfo(teamdata[i]); 
				setPageLoading(false); 
			}
		}
	}, [index, teamdata]); 

	useEffect(() => {
		//get league content 
		for (let i = 0; i < hierarchydata.length; i++) {
			if (hierarchydata[i].AreaId	=== info.AreaId) {
				setLeagueContent(hierarchydata[i]); 
			}
		} 
	}, [hierarchydata, info]); 

	useEffect(() => {
		if (leagueContent.length !== 0) {
			//getting current season and player stats 
			const now = new Date(); 
			const month = now.getMonth() + 1; 
			const year = now.getFullYear(); 

			var league = leagueContent.Competitions[0].Seasons; 

			//inside league in hierarchy 
			for (let j = 0; j < league.length; j++) {
				if (month < 8) {
					//get current year league 
					if (league[j].Season == year) {
						setCurrentSeason(league[j]); 
						for (let i = 0; i < league[j].Rounds.length; i++) {
							if (league[j].Rounds[i].Name === "Regular Season") {
								dispatch(getPlayerStatsByTeam(league[j].Rounds[i].RoundId + "/" + info.TeamId)); 
								dispatch(getStandings(league[j].Rounds[i].RoundId)); 
								dispatch(getTeamStats(league[j].Rounds[i].RoundId)); 
								dispatch(getLeagueMatches(league[j].Rounds[i].RoundId)); 
								dispatch(getPlayersInTeam(info.TeamId)); 
							}
						}
					} 
				}

				else {
					//get upcoming year league 
					if (leagueContent.Competitions[0].Seasons[j].Season == year + 1) {
						setCurrentSeason(leagueContent.Competitions[0].Seasons[j]); 
						for (let i = 0; i < league[j].Rounds.length; i++) { 
							if (league[j].Rounds[i].Name === "Regular Season") {
								dispatch(getPlayerStatsByTeam(league[j].Rounds[i].RoundId + "/" + info.TeamId)); 
								dispatch(getStandings(league[j].Rounds[i].RoundId)); 
							}
						}
					}
				}
			}
		}
	}, [dispatch, leagueContent, info]); 

	useEffect(() => {
		//saving player stats to use in child components 
		if (playerstatsdata !== []) {
			//player stuff 
			var goals = []; 
            var assists = [];  
            var passes = []; 
            var topPlayerIdx = []; 

            //team stuff 
            var goalratio = 0; 
            var shotratio = 0; 
            var passratio = 0; 
            var passratiosuccess = 0; 

			for (let i = 0; i < playerstatsdata.length; i++) {
				if (playerstatsdata[i].Goals > 0) {
                    goals.push(playerstatsdata[i].Goals); 
                }
                if (playerstatsdata[i].Assists > 0) {
                    assists.push(playerstatsdata[i].Assists); 
                }
                if (playerstatsdata[i].Passes > 0) {
                    passes.push(playerstatsdata[i].Passes); 
                } 

                goalratio += playerstatsdata[i].Goals * 10; 
                shotratio += playerstatsdata[i].Shots * 10; 
                passratio += playerstatsdata[i].Passes * 10; 
                passratiosuccess += playerstatsdata[i].PassesCompleted * 10; 
			} 

			topPlayerIdx.push(Math.max(...goals)); 
            topPlayerIdx.push(Math.max(...assists)); 
            topPlayerIdx.push(Math.max(...passes)); 

            setTopPlayerIndex(topPlayerIdx); 
            setGoalToShotRatio(Math.round(shotratio/goalratio)); 
            setSuccessPasses(Math.round((passratiosuccess/passratio)  * 100)); 
		}
	}, [dispatch, playerstatsdata]); 

    return (
    	<div>
			{

				issuccess === null || loading ||
				venueissuccess === null || venueloading || 
				hierarchyissuccess === null || hierarchyloading || 
				playerstatsissuccess === null || playerstatsloading ||
				standingissuccess === null || standingloading ||
				playersinteamissuccess === null || playersinteamloading ||
				teamstatsissuccess === null || teamstatsloading ||
				leaguematchesissuccess === null || leaguematchesloading || 
				pageLoading ? 

					<Loading /> 

				: 

				!issuccess || !venueissuccess || !hierarchyissuccess || 
				!playerstatsissuccess || !standingissuccess || 
				!playersinteamissuccess || !teamstatsissuccess || 
				!leaguematchesissuccess ? 

					<div>error occured</div>

				: 

					<div className="team-page">

						<Nav /> 

						<div className="team-container">

							<div className="team-icon-name-container">
								<img alt="" src={info.WikipediaLogoUrl} />
								<h2>{info.Name}</h2> 
								<p>{info.AreaName}</p>
							</div>

						</div>

						<div className="horizontal-scroll-container">
							<div className="horizontal-scroll-content">
								<div id="item" onClick={() => setContentState('overview')} 
									style={{borderBottom: contentState === 'overview' ? 
															' 2px solid rgb(0, 165, 240)' : 
															'2px solid rgb(32, 68, 105)'}}>
															Overview
								</div>
								<div id="item" onClick={() => setContentState('season')} 
									style={{borderBottom: contentState === 'season' ? 
															' 2px solid rgb(0, 165, 240)' : 
															'2px solid rgb(32, 68, 105)'}}>
															Season
								</div>
								<div id="item" onClick={() => setContentState('players')} 
									style={{borderBottom: contentState === 'players' ? 
															'2px solid rgb(0, 165, 240)' : 
															'2px solid rgb(32, 68, 105)'}}>
															Players
								</div>
								<div id="item" onClick={() => setContentState('stats')}
									style={{borderBottom: contentState === 'stats' ? 
															'2px solid rgb(0, 165, 240)' : 
															'2px solid rgb(32, 68, 105)'}}>
															Stats
								</div>
								<div id="item" onClick={() => setContentState('matches')}
									style={{borderBottom: contentState === 'matches' ? 
															'2px solid rgb(0, 165, 240)' : 
															'2px solid rgb(32, 68, 105)'}}>
															Matches
								</div>
							</div>
						</div>

						{
							contentState === "overview" ? 

								<TeamOverviewComp teaminfo={info} topplayeridx={topPlayerIndex} 
												  seasoncontent={currentSeason} goalratio={goalToShotRatio} 
												  passratio={successPasses} /> 

							: 

							contentState === "season" ? 

                    			<TeamSeasonComp teaminfo={info} /> 

                			: 

                			contentState === "players" ? 

								<TeamPlayerComp /> 

							: 

							contentState === "stats" ? 

								<TeamStatsComp teaminfo={info} /> 

                			: 

							contentState === "matches" ? 

								<TeamMatchesComp teaminfo={info} /> 

							: 

                    			null 
						}
					</div>
			}
		</div>
    )
}

export default Team; 
