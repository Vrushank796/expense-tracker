import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./expenseSlice"; // Adjust the path as necessary
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../utils/localStorage";

const preloadedState = loadFromLocalStorage(); // Load initial state from local storage

const store = configureStore({
  reducer: {
    expenses: expenseReducer,
  },
  preloadedState, // Use the loaded state
});

// Save the state to local storage whenever it changes
store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export default store;
