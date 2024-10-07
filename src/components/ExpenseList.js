import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteExpense } from "../redux/expenseSlice";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Edit, Trash2, Search } from "lucide-react";
import { Bar, Pie } from "react-chartjs-2";
import { Button, TextField, InputAdornment } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, CardContent, Typography } from "@mui/material";
import { AttachMoney, Category } from "@mui/icons-material";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ExpenseList = () => {
  const expenses = useSelector((state) => state.expenses.expenses);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleDelete = (id) => {
    dispatch(deleteExpense(id));
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleAddExpense = () => {
    navigate("/add");
  };

  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.description.toLowerCase().includes(search.toLowerCase()) ||
      expense.category.toLowerCase().includes(search.toLowerCase())
  );

  // Grouping by category and summing amounts
  const totalByCategory = filteredExpenses.reduce((acc, expense) => {
    const amount = parseFloat(
      expense.amount.toString().replace(/[^\d.-]/g, "")
    );
    acc[expense.category] = (acc[expense.category] || 0) + amount;
    return acc;
  }, {});

  const categories = Object.keys(totalByCategory);
  const amounts = Object.values(totalByCategory);

  const totalExpenses = filteredExpenses.reduce((acc, expense) => {
    return acc + parseFloat(expense.amount.toString().replace(/[^\d.-]/g, ""));
  }, 0);

  const barChartData = {
    labels: categories,
    datasets: [
      {
        label: "Total Amount by Category",
        data: amounts,
        backgroundColor: [
          "#3B82F6",
          "#6366F1",
          "#10B981",
          "#F59E0B",
          "#EF4444",
          "#9CA3AF",
        ],
        borderColor: "#E5E7EB",
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: categories,
    datasets: [
      {
        label: "Expense Distribution by Category",
        data: amounts,
        backgroundColor: [
          "#3B82F6",
          "#6366F1",
          "#10B981",
          "#F59E0B",
          "#EF4444",
          "#9CA3AF",
        ],
        hoverBackgroundColor: [
          "#2563EB",
          "#4F46E5",
          "#059669",
          "#D97706",
          "#DC2626",
          "#6B7280",
        ],
        borderColor: "#E5E7EB",
        borderWidth: 1,
      },
    ],
  };

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      renderCell: (params) => {
        const date = new Date(params.row.date);
        return date.toLocaleDateString();
      },
    },
    { field: "description", headerName: "Description", width: 250 },
    {
      field: "amount",
      headerName: "Amount",
      width: 120,
      renderCell: (params) => {
        return `$${params.row.amount}`;
      },
      sortComparator: (v1, v2) => {
        return v1 - v2;
      },
    },
    { field: "category", headerName: "Category", width: 250 },

    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => (
        <div className="flex flex-row justify-center items-center gap-2">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleEdit(params.row.id)}
            aria-label={`Edit expense ${params.row.description}`}
          >
            <Edit size={16} className="mr-1" />
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleDelete(params.row.id)}
            aria-label={`Delete expense ${params.row.description}`}
          >
            <Trash2 size={16} className="mr-1" />
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <main
      className="container mx-auto p-4"
      aria-labelledby="expense-list-title"
    >
      <h1
        id="expense-list-title"
        className="text-4xl font-bold mb-8 text-center"
      >
        Personal Expense Tracker
      </h1>
      <div className="flex md:flex-row flex-col justify-between items-center gap-5 mb-4">
        <TextField
          label="Search"
          variant="outlined"
          placeholder="Search expenses by description or category"
          value={search}
          onChange={(e) => setSearch(e.target.value.trimStart())}
          className="md:w-1/2 w-full mb-6"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={20} />
              </InputAdornment>
            ),
          }}
          aria-label="Search expenses"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddExpense}
          className="bg-[#1A346B] hover:bg-[#1a2b4d] text-white"
          aria-label="Add new expense"
        >
          <PlusCircle size={16} className="mr-2" />
          Add Expense
        </Button>
      </div>

      {filteredExpenses.length > 0 ? (
        <>
          {/* Expense Summary Card */}
          <section className="mb-6">
            <Typography
              variant="h5"
              component="h2"
              className="text-center mb-4 font-bold"
            >
              Expense Summary
            </Typography>
            <div className="flex flex-wrap justify-between">
              {/* Total Expenses Card */}
              <div className="flex-1 m-2 min-w-[250px]">
                <Card variant="outlined" className="shadow-md">
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="div"
                      className="flex items-center"
                    >
                      <AttachMoney className="mr-2" />
                      Total Expenses
                    </Typography>
                    <Typography
                      variant="h4"
                      component="div"
                      className="font-semibold"
                    >
                      ${totalExpenses.toFixed(2)}
                    </Typography>
                  </CardContent>
                </Card>
              </div>

              {/* Expenses by Category Card */}
              <div className="flex-1 m-2 min-w-[250px]">
                <Card variant="outlined" className="shadow-md">
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="div"
                      className="flex items-center"
                    >
                      <Category className="mr-2" />
                      Expenses by Category
                    </Typography>
                    <ul>
                      {Object.entries(totalByCategory).map(
                        ([category, amount]) => (
                          <li key={category}>
                            <Typography
                              variant="body2"
                              className="flex justify-between"
                            >
                              <span>{category}</span>
                              <span>${amount.toFixed(2)}</span>
                            </Typography>
                          </li>
                        )
                      )}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <section
            className="flex flex-col md:flex-row gap-5 mb-6 items-center"
            aria-labelledby="charts-title"
          >
            <h2 id="charts-title" className="sr-only">
              Charts
            </h2>
            {/* Bar Chart */}
            <div className="flex-grow md:w-1/2">
              <h2 className="text-xl font-semibold mb-2">
                Expenses by Category (Bar Chart)
              </h2>
              <div className="h-[400px]">
                <Bar
                  data={barChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "top",
                        labels: {
                          color: "#4B5563",
                        },
                      },
                      title: {
                        display: true,
                        text: "Total Expenses by Category",
                        color: "#1F2937",
                        font: {
                          size: 18,
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>

            {/* Pie Chart */}
            <div className="flex-grow md:w-1/2">
              <h2 className="text-xl font-semibold mb-2">
                Expense Distribution by Category (Pie Chart)
              </h2>
              <div className="h-[400px]">
                <Pie
                  data={pieChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "top",
                        labels: {
                          color: "#4B5563",
                        },
                      },
                      title: {
                        display: true,
                        text: "Expense Distribution by Category",
                        color: "#1F2937",
                        font: {
                          size: 18,
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </section>

          <section
            style={{ height: 400, width: "100%" }}
            className="bg-white shadow-md rounded-lg"
            aria-labelledby="expense-table-title"
          >
            <h2 id="expense-table-title" className="sr-only">
              Expense Table
            </h2>
            <DataGrid
              rows={filteredExpenses}
              columns={columns}
              autoHeight
              disableSelectionOnClick
              aria-label="Expense data table"
            />
          </section>
        </>
      ) : (
        <p className="text-center text-lg">No expenses found.</p>
      )}
    </main>
  );
};

export default ExpenseList;
