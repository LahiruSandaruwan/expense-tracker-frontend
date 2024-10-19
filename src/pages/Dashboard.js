// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { setAuthToken, fetchExpenses, deleteExpense } from "../services/api";
import { confirmAlert } from 'react-confirm-alert'; // Import react-confirm-alert
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import default styles
import { ToastContainer, toast } from 'react-toastify'; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css';

// Styled Components
const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f0f4f8;
  border-radius: 0.5rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Header = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #1a202c;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const ErrorMessage = styled.p`
  color: #e53e3e;
  background-color: #fed7d7;
  padding: 0.75rem;
  border-radius: 0.375rem;
  text-align: center;
  margin-bottom: 1rem;
  width: 100%;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1.5rem;
`;

const SearchInput = styled.input`
  width: 70%;
  padding: 0.75rem;
  border: 1px solid #cbd5e0;
  border-radius: 0.375rem;
  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.5);
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #3182ce;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: #2b6cb0;
  }
`;

const Section = styled.div`
  width: 100%;
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.375rem;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  margin-top: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 1rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  overflow: hidden;
  border-radius: 0.375rem;
`;

const TableHeader = styled.th`
  padding: 0.75rem;
  border-bottom: 2px solid #cbd5e0;
  background-color: #edf2f7;
  text-align: left;
  font-weight: 600;
  color: #2d3748;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f7fafc;
  }
`;

const TableCell = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid #e2e8f0;
  color: #2d3748;
`;

const ActionButton = styled.button`
  margin-right: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${(props) => (props.type === "edit" ? "#3182ce" : "#e53e3e")};
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: ${(props) => (props.type === "edit" ? "#2b6cb0" : "#c53030")};
  }
`;

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // Redirect to login if not authenticated
    } else {
      setAuthToken(token);
      loadExpenses();
    }
  }, [navigate]);

  // Function to load all expenses
  const loadExpenses = async () => {
    try {
      const data = await fetchExpenses();
      setExpenses(data);
    } catch (err) {
      setError("Error loading expenses. Please try again later.");
    }
  };

  // Function to handle deleting an expense with confirmation
  const handleDeleteExpense = (id) => {
    confirmAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this expense?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await deleteExpense(id);
              setExpenses(expenses.filter((exp) => exp.id !== id));
              toast.success('Expense deleted successfully!');
            } catch (err) {
              setError("Error deleting expense. Please try again.");
              toast.error('Failed to delete the expense. Please try again.');
            }
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };

  // Filter expenses based on search query
  const filteredExpenses = expenses.filter((expense) =>
    expense.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" autoClose={5000} />
      <DashboardContainer>
        <Header>Dashboard</Header>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Search expenses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button onClick={() => navigate("/add-expense")}>Add New Expense</Button>
        </SearchContainer>
        <Section>
          <SectionTitle>Expenses</SectionTitle>
          <Table>
            <thead>
              <tr>
                <TableHeader>Title</TableHeader>
                <TableHeader>Amount</TableHeader>
                <TableHeader>Date</TableHeader>
                <TableHeader>Category</TableHeader>
                <TableHeader>Notes</TableHeader>
                <TableHeader>Actions</TableHeader>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.length > 0 ? (
                filteredExpenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell>{expense.title}</TableCell>
                    <TableCell>${parseFloat(expense.amount).toFixed(2)}</TableCell>
                    <TableCell>{expense.date}</TableCell>
                    <TableCell>{expense.category}</TableCell>
                    <TableCell>{expense.notes}</TableCell>
                    <TableCell>
                      <ActionButton
                        type="edit"
                        onClick={() => navigate(`/edit-expense/${expense.id}`)}
                      >
                        Edit
                      </ActionButton>
                      <ActionButton
                        type="delete"
                        onClick={() => handleDeleteExpense(expense.id)}
                      >
                        Delete
                      </ActionButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="6" style={{ textAlign: "center" }}>
                    No expenses found.
                  </TableCell>
                </TableRow>
              )}
            </tbody>
          </Table>
        </Section>
      </DashboardContainer>
    </>
  );
};

export default Dashboard;
