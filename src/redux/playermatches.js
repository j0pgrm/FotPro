import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 

export const getPlayerMatches = createAsyncThunk(
    'playermatches/GetPlayerMatches', 
    async (playerid) => {
        return fetch('https://api.sportsdata.io/v3/soccer/scores/json/UpcomingScheduleByPlayer/' + playerid + '?key=5f12486c770d409fb4a6901307ad99b4') 
                .then((res) => res.json()) 
                .catch((err) => console.log(err)); 
    }
); 

export const playerMatchesSlice = createSlice({
    name: 'playermatches', 
    initialState: {
        playermatchesloading: true, 
        playermatchesissuccess: null, 
        playermatchesdata: [], 
    }, 

    extraReducers: {
        [getPlayerMatches.pending]: (state) => {
            state.playermatchesloading = true; 
        }, 
        [getPlayerMatches.fulfilled]: (state, {payload}) => {
            state.playermatchesdata = payload; 
            state.playermatchesloading = false; 
            state.playermatchesissuccess = true; 
        }, 
        [getPlayerMatches.rejected]: (state, {payload}) => {
            state.playermatchesloading = false; 
            state.playermatchesdata = payload; 
            state.playermatchesissuccess = false; 
        }
    }
}); 

export const { extraReducers } = playerMatchesSlice.actions; 

export default playerMatchesSlice.reducer; 
