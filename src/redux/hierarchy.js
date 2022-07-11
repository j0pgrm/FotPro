import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 

export const getHierarchy = createAsyncThunk(
    'hierarchy/getHierarchy', 
    async () => {
        return fetch('https://api.sportsdata.io/v3/soccer/scores/json/CompetitionHierarchy?key=5f12486c770d409fb4a6901307ad99b4')
        .then((res) => res.json())
        .catch((err) => console.log(err)); 
    }
); 

export const hierarchySlice = createSlice({
    name: 'hierarchy', 
    initialState: {
        hierarchyloading: true, 
        hierarchyissuccess: null, 
        hierarchydata: [], 
    }, 

    extraReducers: {
        [getHierarchy.pending]: (state) => {
            state.hierarchyloading = true; 
        }, 
        [getHierarchy.fulfilled]: (state, {payload}) => {
            state.hierarchydata = payload;  
            state.hierarchyloading = false; 
            state.hierarchyissuccess = true; 
        }, 
        [getHierarchy.rejected]: (state, {payload}) => {
            state.hierarchyloading = false; 
            state.hierarchydata = payload; 
            state.hierarchyissuccess = false; 
        }
    }
}); 

export const { extraReducers } = hierarchySlice.actions; 

export default hierarchySlice.reducer; 
