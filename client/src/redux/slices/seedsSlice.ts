import { createSlice, Action, PayloadAction } from "@reduxjs/toolkit";

interface seedState {
    uris: Array<string>;
}

let seeds = window.localStorage.getItem("selected_seeds");
let seed_array: Array<string> = [];
if (seeds) {
    seed_array = seeds.split(",");
}

const initialState: seedState = {
    uris: seed_array,
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
                if (state.uris.length < 4) {
                    state.uris = [...state.uris, action.payload];
                }
            }
            window.localStorage.setItem(
                "selected_seeds",
                state.uris.toString()
            );
        },
    },
});

export const { toggleSeeds } = seedsSlice.actions;
export default seedsSlice.reducer;
