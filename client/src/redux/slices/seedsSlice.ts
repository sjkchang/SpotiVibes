import { createSlice, Action, PayloadAction } from "@reduxjs/toolkit";

interface seedState {
    uris: Array<string>;
}

const initialState: seedState = {
    uris: [],
};

export const seedsSlice = createSlice({
    name: "seeds",
    initialState,
    reducers: {
        toggleSeeds: (state: seedState, action: PayloadAction<string>) => {
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
