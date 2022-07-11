import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 

export const getPlayersInTeam = createAsyncThunk(
    'playersinteam/getPlayersInTeam', 
    async (teamid) => {
        return fetch('https://api.sportsdata.io/v3/soccer/scores/json/PlayersByTeam/' + teamid + '?key=5f12486c770d409fb4a6901307ad99b4')
                .then((res) => res.json()) 
                .catch((err) => console.log(err)); 
    }
); 

export const playersInTeamSlice = createSlice({
    name: 'playersinteam', 
    initialState: {
        playersinteamloading: true, 
        playersinteamissuccess: null, 
        playersinteamdata: [], 
    }, 

    extraReducers: {
        [getPlayersInTeam.pending]: (state) => {
            state.playersinteamloading = true; 
        }, 
        [getPlayersInTeam.fulfilled]: (state, {payload}) => {
            state.playersinteamdata = payload; 
            state.playersinteamloading = false; 
            state.playersinteamissuccess = true; 
        }, 
        [getPlayersInTeam.rejected]: (state, {payload}) => {
            state.playersinteamloading = false; 
            state.playersinteamdata = payload; 
            state.playersinteamissuccess = false; 
        }
    }
})

export const { extraReducers } = playersInTeamSlice.actions; 

export default playersInTeamSlice.reducer; 
