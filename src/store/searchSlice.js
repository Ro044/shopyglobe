import { createSlice } from "@reduxjs/toolkit";

// This slice manages the product search query
const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "", // The text user types in search bar
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload;
    },
  },
});

export const { setSearchQuery } = searchSlice.actions;

// Selector to get search query in components
export const selectSearchQuery = (state) => state.search.query;

export default searchSlice.reducer;
