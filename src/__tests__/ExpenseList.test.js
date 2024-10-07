import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "../redux/expenseSlice"; // Your slice for expenses
import ExpenseList from "../components/ExpenseList";
import { BrowserRouter as Router } from "react-router-dom";

const renderWithProviders = (component) => {
  const store = configureStore({
    reducer: {
      expenses: expenseReducer, // Your slice for expenses
    },
  });

  return render(
    <Provider store={store}>
      <Router>{component}</Router>
    </Provider>
  );
};

describe("ExpenseList Component", () => {
  test("renders the ExpenseList component correctly", () => {
    renderWithProviders(<ExpenseList />);

    // Check if title is present
    const title = screen.getByText(/Personal Expense Tracker/i);
    expect(title).toBeInTheDocument();
  });

  test("renders the search input field", () => {
    renderWithProviders(<ExpenseList />);

    // Check if the search input field is present
    const searchInput = screen.getByPlaceholderText(
      /Search expenses by description or category/i
    );
    expect(searchInput).toBeInTheDocument();
  });

  test('renders the "Add Expense" button', () => {
    renderWithProviders(<ExpenseList />);

    // Check if the "Add Expense" button is present
    const addExpenseButton = screen.getByText(/Add Expense/i);
    expect(addExpenseButton).toBeInTheDocument();
  });
});
