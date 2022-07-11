import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 

export const getGamesDate = createAsyncThunk(
    'gamesdate/getGamesDate', 
    async (date) => {
        return fetch('https://api.sportsdata.io/v3/soccer/scores/json/GamesByDate/' + date + '?key=5f12486c770d409fb4a6901307ad99b4') 
                    .then((res) => res.json()) 
                    .catch((err) => console.log(err)); 
    }
); 

export const gamesDateSlice = createSlice({
    name: 'gamesdate', 
    initialState: {
        gamesdateloading: true, 
        gamesdateissuccess: null, 
        gamesdatedata: [], 
    }, 

    extraReducers: {
        [getGamesDate.pending]: (state) => {
            state.gamesdateloading = true; 
        }, 
        [getGamesDate.fulfilled]: (state, {payload}) => {
            state.gamesdatedata = payload; 
            state.gamesdateloading = false; 
            state.gamesdateissuccess = true; 
        }, 
        [getGamesDate.rejected]: (state, {payload}) => {
            state.gamesdateloading = false; 
            state.gamesdatedata = payload; 
            state.gamesdateissuccess = false; 
        }
    }
}); 

export const { extraReducers } = gamesDateSlice.actions; 

export default gamesDateSlice.reducer; 
