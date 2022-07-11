import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 

export const getPlayer = createAsyncThunk(
    'player/getPlayer', 
    async (id) => {
        return fetch('https://api.sportsdata.io/v3/soccer/scores/json/Player/' + id + '?key=5f12486c770d409fb4a6901307ad99b4')
        .then((res) => res.json())
        .catch((err) => console.log(err)); 
    }
); 

export const playerSlice = createSlice({
    name: 'player', 
    initialState: {
        playerloading: true, 
        playerissuccess: null, 
        playerdata: [], 
    }, 

    extraReducers: {
        [getPlayer.pending]: (state) => {
            state.playerloading = true; 
        }, 
        [getPlayer.fulfilled]: (state, {payload}) => {
            state.playerdata = payload; 
            state.playerloading = false; 
            state.playerissuccess = true; 
        }, 
        [getPlayer.rejected]: (state, {payload}) => {
            state.playerloading = false; 
            state.playerdata = payload; 
            state.playerissuccess = false; 
        }
    }
}); 

export const { extraReducers } = playerSlice.actions; 

export default playerSlice.reducer; 
