// src/components/ExpenseList.js
import React from 'react';
import { deleteExpense } from '../services/api'; // Import the deleteExpense function
import { confirmAlert } from 'react-confirm-alert'; // Import the react-confirm-alert component
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import the default styles

const ExpenseList = ({ expenses, onEditExpense, onDeleteExpense }) => {
    // Function to handle the delete confirmation and call the API
    const handleDelete = (id) => {
        // Show the custom confirmation dialog
        confirmAlert({
            title: 'Confirm Deletion',
            message: 'Are you sure you want to delete this expense?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            // Call the API function to delete the expense
                            await deleteExpense(id);
                            // If successful, call the onDeleteExpense prop to update the state
                            onDeleteExpense(id);
                        } catch (error) {
                            console.error('Error deleting expense:', error);
                            alert('Failed to delete the expense. Please try again.');
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => {} // Do nothing if the user cancels
                }
            ]
        });
    };

    return (
        <div className="bg-white p-6 shadow rounded">
            <h2 className="text-xl font-bold mb-4">Expenses</h2>
            {expenses.length === 0 ? (
                <p>No expenses found.</p>
            ) : (
                <ul>
                    {expenses.map((expense) => (
                        <li key={expense.id} className="border-b p-4 flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-semibold">{expense.title}</h3>
                                <p className="text-sm text-gray-600">Amount: ${expense.amount}</p>
                                <p className="text-sm text-gray-600">Date: {expense.date}</p>
                                <p className="text-sm text-gray-600">Category: {expense.category}</p>
                                <p className="text-sm text-gray-600">Notes: {expense.notes}</p>
                            </div>
                            <div>
                                <button
                                    onClick={() => onEditExpense(expense)}
                                    className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600 mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(expense.id)}
                                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ExpenseList;
