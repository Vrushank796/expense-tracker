import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addExpense, editExpense } from "../redux/expenseSlice";
import { v4 as uuidv4 } from "uuid"; // For generating unique IDs
import { Button } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const categories = [
  "Food",
  "Grocery",
  "Travel",
  "Shopping",
  "Entertainment",
  "Utilities",
  "Healthcare",
  "Miscellaneous",
];

const ExpenseForm = ({ isEditing }) => {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses); // Get the expenses from the state

  // Find the expense to edit
  const expenseToEdit = expenses.find((expense) => expense.id === id);

  const [formData, setFormData] = useState({
    description: expenseToEdit?.description || "",
    amount: expenseToEdit?.amount || "",
    category: expenseToEdit?.category || "",
    date: expenseToEdit?.date || new Date(),
  });

  const [errors, setErrors] = useState({});

  // Set initial form data based on expenseToEdit
  useEffect(() => {
    if (isEditing && expenseToEdit) {
      setFormData({
        description: expenseToEdit.description,
        amount: expenseToEdit.amount,
        category: expenseToEdit.category,
        date: new Date(expenseToEdit.date), // Convert to Date object
      });
    }
  }, [expenseToEdit, isEditing]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle date change
  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.description)
      newErrors.description = "Description is required.";
    if (!formData.amount || isNaN(formData.amount))
      newErrors.amount = "Valid amount is required.";
    if (!formData.category) newErrors.category = "Category is required.";
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      if (expenseToEdit) {
        dispatch(
          editExpense({
            description: formData.description,
            amount: formData.amount,
            category: formData.category,
            date: formData.date.toISOString(),
            id: expenseToEdit.id,
          })
        );
      } else {
        dispatch(
          addExpense({
            date: formData.date.toISOString(),
            category: formData.category,
            description: formData.description,
            amount: formData.amount,
            id: uuidv4(),
          })
        );
      }
      setFormData({
        description: "",
        amount: "",
        category: "",
        date: new Date(),
      }); // Reset form
      setErrors({});
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <Button
          className="mb-4"
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        >
          Back to Dashboard
        </Button>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 mt-5">
          {expenseToEdit ? "Edit Expense" : "Add New Expense"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <input
              id="description"
              name="description"
              type="text"
              placeholder="Enter expense description"
              value={formData.description}
              onChange={handleChange}
              className={`block w-full mt-1 p-2 border ${
                errors.description ? "border-red-500" : "border-gray-300"
              } 
                         rounded-md focus:outline-none focus:ring focus:ring-indigo-500`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Amount
            </label>
            <input
              id="amount"
              name="amount"
              type="number"
              placeholder="0.00"
              value={formData.amount}
              onChange={handleChange}
              className={`block w-full mt-1 p-2 border ${
                errors.amount ? "border-red-500" : "border-gray-300"
              } 
                         rounded-md focus:outline-none focus:ring focus:ring-indigo-500`}
            />
            {errors.amount && (
              <p className="text-red-500 text-sm">{errors.amount}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`block w-full mt-1 p-2 border ${
                errors.category ? "border-red-500" : "border-gray-300"
              } 
                         rounded-md focus:outline-none focus:ring focus:ring-indigo-500`}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Date
            </label>
            <DatePicker
              selected={formData.date}
              onChange={handleDateChange}
              className={`block w-full mt-1 p-2 border ${
                errors.date ? "border-red-500" : "border-gray-300"
              } 
                         rounded-md focus:outline-none focus:ring focus:ring-indigo-500`}
              dateFormat="yyyy/MM/dd" // Change the format as needed
            />
            {errors.date && (
              <p className="text-red-500 text-sm">{errors.date}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-[#1A346B] text-white py-2 rounded-md hover:bg-[#1A346B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A346B]"
            >
              {expenseToEdit ? "Update Expense" : "Add Expense"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;
