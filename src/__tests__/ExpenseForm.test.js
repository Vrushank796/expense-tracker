// ExpenseForm.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExpenseForm from "../components/ExpenseForm";
import { addExpense } from "../redux/expenseSlice";

const mockStore = configureStore([]);

describe("ExpenseForm Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      expenses: {
        expenses: [],
      },
    });
  });

  it("renders the form correctly for adding a new expense", () => {
    render(
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<ExpenseForm isEditing={false} />} />
          </Routes>
        </Router>
      </Provider>
    );

    expect(screen.getByText("Add New Expense")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter expense description")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("0.00")).toBeInTheDocument();
    expect(screen.getByText("Select Category")).toBeInTheDocument();
  });

  it("handles input changes correctly", () => {
    render(
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<ExpenseForm isEditing={false} />} />
          </Routes>
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter expense description"), {
      target: { value: "Test Expense" },
    });
    fireEvent.change(screen.getByPlaceholderText("0.00"), {
      target: { value: "100" },
    });
    fireEvent.change(screen.getByRole("combobox", { name: /category/i }), {
      target: { value: "Food" },
    });

    expect(screen.getByPlaceholderText("Enter expense description").value).toBe(
      "Test Expense"
    );
    expect(screen.getByPlaceholderText("0.00").value).toBe("100");
    expect(screen.getByRole("combobox", { name: /category/i }).value).toBe(
      "Food"
    );
  });

  it("submits the form with correct data for adding a new expense", () => {
    const mockDispatch = jest.fn();
    jest.spyOn(store, "dispatch").mockImplementation(mockDispatch);

    render(
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<ExpenseForm isEditing={false} />} />
          </Routes>
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter expense description"), {
      target: { value: "Test Expense" },
    });
    fireEvent.change(screen.getByPlaceholderText("0.00"), {
      target: { value: "100" },
    });
    fireEvent.change(screen.getByRole("combobox", { name: /category/i }), {
      target: { value: "Food" },
    });

    fireEvent.click(screen.getByText("Add Expense"));

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: addExpense.type,
        payload: expect.objectContaining({
          description: "Test Expense",
          amount: "100",
          category: "Food",
        }),
      })
    );
  });
});
