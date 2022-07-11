import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 

export const getLeagueMatches = createAsyncThunk(
    'leaguematches/getLeagueMatches', 
    async(roundId) => {
        return fetch('https://api.sportsdata.io/v3/soccer/scores/json/Schedule/' + roundId + '?key=5f12486c770d409fb4a6901307ad99b4')
                .then((res) => res.json()) 
                .catch((err) => console.log(err)); 
    }
); 

export const leagueMatchesSlice = createSlice({
    name: 'leaguematches', 
    initialState: {
        leaguematchesloading: true, 
        leaguematchesissuccess: null, 
        leaguematchesdata: [], 
    }, 

    extraReducers: {
        [getLeagueMatches.pending]: (state) => {
            state.leaguematchesloading = true; 
        }, 
        [getLeagueMatches.fulfilled]: (state, {payload}) => {
            state.leaguematchesdata = payload; 
            state.leaguematchesloading = false; 
            state.leaguematchesissuccess = true; 
        }, 
        [getLeagueMatches.rejected]: (state, {payload}) => {
            state.leaguematchesloading = false; 
            state.leaguematchesdata = payload; 
            state.leaguematchesissuccess = false; 
        }
    }
}); 

export const { extraReducers } = leagueMatchesSlice.actions; 

export default leagueMatchesSlice.reducer; 
