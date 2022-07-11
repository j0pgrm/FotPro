import { configureStore } from "@reduxjs/toolkit";
import teamReducer from './teams'; 
import venueReducer from './venues'; 
import hierarchyReducer from './hierarchy'; 
import playerStatsByTeamReducer from './playerstatsbyteam'; 
import playerReducer from './player'; 
import standingReducer from './standings';  
import playersInTeamReducer from './playerinteam'; 
import teamStatsReducer from './teamstats'; 
import leagueMatchesReducer from './leaguematches'; 
import gameReducer from './game'; 
import gamesDateReducer from './gamesdate'; 
import playerMatchesReducer from './playermatches'; 

export default configureStore({
    reducer: {
        team: teamReducer, 
        venue: venueReducer, 
        hierarchy: hierarchyReducer, 
        playerstats: playerStatsByTeamReducer, 
        player: playerReducer, 
        standing: standingReducer, 
        playersinteam: playersInTeamReducer, 
        teamstats: teamStatsReducer, 
        leaguematches: leagueMatchesReducer, 
        game: gameReducer, 
        gamesdate: gamesDateReducer, 
        playermatches: playerMatchesReducer, 
    }
}); 
