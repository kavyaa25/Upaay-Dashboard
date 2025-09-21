import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../features/tasks/tasksSlice';
import filtersReducer from '../features/filters/filtersSlice';
import { loadState, saveState } from '../utils/localStorage';

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    filters: filtersReducer,
  },
  preloadedState,
});

// persist relevant slices
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
