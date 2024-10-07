import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: [], // Initial state for expenses is an empty array
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (state, action) => {
      // Add a new expense to the expenses array
      state.expenses.push(action.payload);
    },
    editExpense: (state, action) => {
      const { id, description, amount, category, date } = action.payload;
      const index = state.expenses.findIndex((expense) => expense.id === id);
      if (index !== -1) {
        // Use spread operator to update the expense
        state.expenses[index] = {
          ...state.expenses[index], // Spread the existing expense
          description, // Update the description
          amount, // Update the amount
          category, // Update the category
          date, // Update the date
        };
      }
    },
    deleteExpense: (state, action) => {
      // Filter out the expense to delete by its id
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload
      );
    },
  },
});

// Export actions to be used in components
export const { addExpense, editExpense, deleteExpense } = expenseSlice.actions;

// Export the reducer to be included in the store
export default expenseSlice.reducer;
