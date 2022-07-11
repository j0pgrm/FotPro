import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 

export const getPlayerStatsByTeam = createAsyncThunk( 
    'playerstatsbyteam/getPlayerStatsByTeam', 
    async(para) => {
        return fetch('https://api.sportsdata.io/v3/soccer/stats/json/PlayerSeasonStatsByTeam/' + para.split('/')[0] + '/' + para.split('/')[1] + '?key=5f12486c770d409fb4a6901307ad99b4')
        .then((res) => res.json())
        .catch((res) => console.log(res)); 
    }
); 

export const playerStatsByTeamSlice = createSlice({ 
    name: 'playerstatsbyteam', 
    initialState: {
        playerstatsloading: true, 
        playerstatsissuccess: null, 
        playerstatsdata: [], 
    }, 

    extraReducers: {
        [getPlayerStatsByTeam.pending]: (state) => {
            state.playerstatsloading = true; 
        }, 
        [getPlayerStatsByTeam.fulfilled]: (state, {payload}) => {
            state.playerstatsdata = payload; 
            state.playerstatsloading = false; 
            state.playerstatsissuccess = true; 
        }, 
        [getPlayerStatsByTeam.rejected]: (state, {payload}) => {
            state.playerstatsloading = false; 
            state.playerstatsdata = payload; 
            state.playerstatsissuccess = false; 
        }
    }
}); 

export const { extraReducers } = playerStatsByTeamSlice.actions; 

export default playerStatsByTeamSlice.reducer; 
