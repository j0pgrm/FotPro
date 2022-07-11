import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 

export const getTeamStats = createAsyncThunk(
    'teamstats/getTeamStats', 
    async(roundId) => {
        return fetch('https://api.sportsdata.io/v3/soccer/scores/json/TeamSeasonStats/' + roundId + '?key=5f12486c770d409fb4a6901307ad99b4') 
        .then((res) => res.json()) 
        .catch((err) => console.log(err)); 
    }
); 

export const teamStatsSlice = createSlice({
    name: 'teamstats', 
    initialState: {
        teamstatsloading: true, 
        teamstatsissuccess: null, 
        teamstatsdata: [], 
    }, 

    extraReducers: {
        [getTeamStats.pending]: (state) => {
            state.teamstatsloading = true; 
        }, 
        [getTeamStats.fulfilled]: (state, {payload}) => {
            state.teamstatsdata = payload;  
            state.teamstatsloading = false; 
            state.teamstatsissuccess = true; 
        }, 
        [getTeamStats.rejected]: (state, {payload}) => {
            state.teamstatsloading = false; 
            state.teamstatsdata = payload; 
            state.teamstatsissuccess = false; 
        }
    }
}); 

export const { extraReducers } = teamStatsSlice.actions; 

export default teamStatsSlice.reducer; 
