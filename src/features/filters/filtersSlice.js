import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: 'All',
  priority: 'All',
  search: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
    setPriority(state, action) {
      state.priority = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const { setCategory, setPriority, setSearch, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
