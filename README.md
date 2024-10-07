# Personal Expense Tracker

## Project Overview

This is a personal expense tracking web application built with **React** and **Redux** for state management. The application allows users to:

- Add new expense entries.
- View a list of all expense entries.
- Edit existing expenses.
- Delete expenses from the list.
- Visualize expenses by category using charts.
- Get a summary of total expenses and categorized breakdowns.

This application was built as part of a front-end assessment focusing on **React**, **Redux**, and **front-end design** best practices.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Setup](#project-setup)
- [State Management](#state-management)
- [Data Visualization](#data-visualization)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Assumptions](#assumptions)
- [Future Enhancements](#future-enhancements)

---

## Tech Stack

- **React** - JavaScript library for building user interfaces.
- **Redux** - State management library.
- **Tailwind CSS** - Utility-first CSS framework for styling.
- **Recharts** - For data visualization (charts).
- **React Router** - For client-side routing.
- **Jest** and **React Testing Library** - For testing.

---

## Features

- **Add Expense:** A form to add a new expense with fields such as description, amount, date, and category.
- **View Expenses:** A table that displays a list of all entered expenses with options to edit or delete each.
- **Edit Expense:** Ability to modify an existing expense.
- **Delete Expense:** Remove an expense from the list.
- **Expense Summary:** Displays the total expenses and breakdown by category.
- **Charts:** Pie chart visualization of expenses categorized by type using Recharts.
- **Local Storage:** Data persistence using browser's local storage.

---

## Project Setup

### Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed **Node.js** (v12 or higher) and **npm** (v6 or higher).
- You have a code editor such as **VSCode**.

### Installation

1. Clone this repository:

```bash
git clone https://github.com/Vrushank796/expense-tracker.git
cd expense-tracker
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

This will start the app on `http://localhost:3000`.

---

## State Management

**Redux** is used for state management in the application. The global state is managed in the `expenseSlice.js` file where actions like `addExpense`, `editExpense`, and `deleteExpense` are defined.

---

## Data Visualization

**Recharts** is used to visualize the expenses by category. A **Pie Chart** is implemented in the `ExpenseChart.js` component and is displayed on the **Expense Summary** page.

---

## Testing

### Running Tests

To run the unit tests, execute the following command:

```bash
npm test
```

**Jest** and **React Testing Library** are used to test key components and Redux reducers. Some examples of tests:

- Adding a new expense.
- Editing an existing expense.
- Deleting an expense.

The test files are located in the `src/__tests__` directory and contain tests for:

- **Redux Reducers** (testing state management logic).
- **React Components** (testing rendering and form functionality).

---

## Project Structure

```bash
src
├── components          # React components
│   ├── ExpenseForm.js    # Form to add or edit expense
│   ├── ExpenseList.js    # Main Dashboard to check the list of expenses
├── reduxs
│   ├── expenseSlice.js  # Redux state slice for managing expenses
│   └── store.js         # Redux store configuration
├── __tests__            # Test files for components and reducers
├── App.js               # Main application component
├── index.js             # Entry point for React app
```

---

## Assumptions

- **Data Storage:** Since no backend was required, local storage was used to persist data.
- **Currency Format:** All amounts are treated as CAD by default.
- **Simple Category System:** Categories like "Food", "Grocery", "Travel", "Shopping", "Entertainment", "Utilities", "Healthcare", and "Miscellaneous", are predefined.

---

## Future Enhancements

- **Authentication:** Add user login functionality so that multiple users can track their expenses individually.
- **Backend Integration:** Integrate with a backend to allow users to store and retrieve their expenses in a database.
- **Graphs:** Add more types of graphs such as line charts to visualize expenses over time.
- **Sorting and Filtering:** Allow users to filter and sort expenses by date, category, or amount.
- **Notifications:** Add alerts or notifications for upcoming payments or budgets exceeded.

---

## Author

- **Vrushank Amin** - [LinkedIn](https://www.linkedin.com/in/vrushank-amin/)
