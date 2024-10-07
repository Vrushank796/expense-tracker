import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ExpenseList />} />
        <Route path="/add" element={<ExpenseForm isEditing={false} />} />
        <Route path="/edit/:id" element={<ExpenseForm isEditing={true} />} />
      </Routes>
    </Router>
  );
}

export default App;
