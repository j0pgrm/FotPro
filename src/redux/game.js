import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 

export const getGame = createAsyncThunk(
    'game/GetGame', 
    async (gameId) => {
        return fetch('https://api.sportsdata.io/v3/soccer/stats/json/BoxScore/' + gameId + '?key=5f12486c770d409fb4a6901307ad99b4')
                    .then((res) => res.json())
                    .catch((err) => console.log(err)); 
    }
); 

export const gameSlice = createSlice({
    name: 'game', 
    initialState: {
        gameloading: true, 
        gameissuccess: null, 
        gamedata: [], 
    }, 

    extraReducers: {
        [getGame.pending]: (state) => {
            state.gameloading = true; 
        }, 
        [getGame.fulfilled]: (state, {payload}) => {
            state.gamedata = payload; 
            state.gameloading = false; 
            state.gameissuccess = true; 
        }, 
        [getGame.rejected]: (state, {payload}) => {
            state.gameloading = false; 
            state.gamedata = payload; 
            state.gameissuccess = false; 
        }
    }
}); 

export const { extraReducers } = gameSlice.actions; 

export default gameSlice.reducer; 
