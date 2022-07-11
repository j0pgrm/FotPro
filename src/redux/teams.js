import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 

export const getTeams = createAsyncThunk(
    'team/getTeams', 
    async () => {
        return fetch('https://fly.sportsdata.io/v3/soccer/scores/json/Teams?key=5f12486c770d409fb4a6901307ad99b4')
                .then((res) => res.json())
                .catch((err) => console.log(err)); 
    }
); 

export const teamSlice = createSlice({ 
    name: 'team', 
    initialState: {
        loading: true, 
        issuccess: null, 
        teamdata: [], 
        teamindexresult: [], 
        inputerrorbool: false, 
    }, 

    reducers: {
        changeSearchValue: (state, action) => {
            state.teamindexresult = action.payload; 
        }, 

        changeInputErrorTrue: (state) => {
            state.inputerrorbool = true; 
        }, 

        changeInputErrorFalse: (state) => {
            state.inputerrorbool = false; 
        }
    }, 

    extraReducers: {
        [getTeams.pending]: (state) => {
            state.loading = true; 
        }, 
        [getTeams.fulfilled]: (state, {payload}) => {
            state.teamdata = payload;  
            state.loading = false; 
            state.issuccess = true; 
        }, 
        [getTeams.rejected]: (state, {payload}) => {
            state.loading = false; 
            state.teamdata = payload; 
            state.issuccess = false; 
        }
    }
}); 

export const { extraReducers, changeSearchValue, changeInputErrorTrue, changeInputErrorFalse } = teamSlice.actions; 

export default teamSlice.reducer; 
