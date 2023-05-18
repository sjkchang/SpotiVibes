import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    uris: [],
};

export const seedsSlice = createSlice({
    name: "seeds",
    initialState,
    reducers: {
        toggleSeeds: (state, action) => {
            if (state.uris.includes(action.payload)) {
                state.uris = state.uris.filter(
                    (uris) => uris !== action.payload
                );
            } else {
                if (state.uris.length < 5) {
                    state.uris = [...state.uris, action.payload];
                }
            }
        },
    },
});

export const { toggleSeeds } = seedsSlice.actions;
export default seedsSlice.reducer;
