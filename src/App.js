import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ExpenseForm from './components/ExpenseForm';
import EditExpense from './components/EditExpense'; // Import the new EditExpense component

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/add-expense" element={<ExpenseForm />} />
                <Route path="/edit-expense/:id" element={<EditExpense />} /> {/* New route for editing expenses */}
            </Routes>
        </Router>
    );
};

export default App;
