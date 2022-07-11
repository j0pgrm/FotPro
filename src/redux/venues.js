import { createSlice, createAsyncThunk} from "@reduxjs/toolkit"; 

export const getVenues = createAsyncThunk(
    'venue/getVenues', 
    async () => {
        return fetch('https://api.sportsdata.io/v3/soccer/scores/json/Venues?key=5f12486c770d409fb4a6901307ad99b4')
        .then((res) => res.json())
        .catch((err) => console.log(err)); 
    }
); 

export const venueSlice = createSlice({
    name: 'venue', 
    initialState: {
        venueloading: true, 
        venueissuccess: null, 
        venuedata: [], 
    }, 

    extraReducers: {
        [getVenues.pending]: (state) => {
            state.venueloading = true; 
        }, 
        [getVenues.fulfilled]: (state, {payload}) => {
            state.venuedata = payload; 
            state.venueloading = false; 
            state.venueissuccess = true; 
        }, 
        [getVenues.rejected]: (state, payload) => {
            state.venueloading = false; 
            state.venuedata = payload; 
            state.venueissuccess = false; 
        }
    }
}); 

export const { extraReducers } = venueSlice.actions; 

export default venueSlice.reducer; 
