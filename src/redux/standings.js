import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 

export const getStandings = createAsyncThunk(
    'standing/getStandings', 
    async (info) => {
        return fetch('https://api.sportsdata.io/v3/soccer/scores/json/Standings/' + info + '?key=5f12486c770d409fb4a6901307ad99b4')
                .then((res) => res.json())
                .catch((err) => console.log(err)); 
    }
); 

export const standingSlice = createSlice({
    name: 'standing', 
    initialState: {
        standingloading: true, 
        standingissuccess: null, 
        standingdata: [], 
    }, 

    extraReducers: {
        [getStandings.pending]: (state, action) => {
            state.standingloading = true; 
        }, 
        [getStandings.fulfilled]: (state, {payload}) => {
            state.standingdata = payload; 
            state.standingloading = false; 
            state.standingissuccess = true; 
        }, 
        [getStandings.rejected]: (state, {payload}) => {
            state.standingloading = false; 
            state.standingdata = payload; 
            state.standingissuccess = false; 
        }
    }
}); 

export const { extraReducers } = standingSlice.actions; 

export default standingSlice.reducer; 
 