// src/pages/EditExpense.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { fetchExpenses, updateExpense } from '../services/api';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Styled Components
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-height: calc(100vh - 80px);
    padding-top: 2rem;
    background: linear-gradient(to right, #4299e1, #3182ce);
`;

const EditExpenseBox = styled.div`
    background: #ffffff;
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
`;

const Title = styled.h2`
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    text-align: center;
    color: #2d3748;
`;

const FormGroup = styled.div`
    margin-bottom: 1rem;
`;

const Label = styled.label`
    display: block;
    font-size: 0.875rem;
    font-weight: 600;
    color: #4a5568;
    margin-bottom: 0.5rem;
`;

const Input = styled.input`
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #cbd5e0;
    border-radius: 0.375rem;
    font-size: 1rem;
    &:focus {
        outline: none;
        border-color: #3182ce;
        box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.5);
    }
`;

const Select = styled.select`
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #cbd5e0;
    border-radius: 0.375rem;
    font-size: 1rem;
    &:focus {
        outline: none;
        border-color: #3182ce;
        box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.5);
    }
`;

const Textarea = styled.textarea`
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #cbd5e0;
    border-radius: 0.375rem;
    font-size: 1rem;
    &:focus {
        outline: none;
        border-color: #3182ce;
        box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.5);
    }
`;

const Button = styled.button`
    width: 100%;
    padding: 0.75rem;
    background-color: #3182ce;
    color: white;
    border: none;
    border-radius: 0.375rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
    margin-top: 1rem;
    &:hover {
        background-color: #2b6cb0;
    }
`;

const CancelButton = styled(Button)`
    background-color: #a0aec0;
    &:hover {
        background-color: #718096;
    }
    margin-top: 0.5rem;
`;

const LoadingMessage = styled.p`
    text-align: center;
    font-size: 1rem;
    color: #2d3748;
`;

const EditExpense = () => {
    const { id } = useParams();
    const [expense, setExpense] = useState(null);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [notes, setNotes] = useState('');
    const navigate = useNavigate();

    const categories = ['Food', 'Transportation', 'Health', 'Shopping', 'Utilities', 'Entertainment', 'Others'];

    useEffect(() => {
        const loadExpense = async () => {
            try {
                const expenses = await fetchExpenses();
                const selectedExpense = expenses.find((exp) => exp.id === parseInt(id, 10));
                if (selectedExpense) {
                    setExpense(selectedExpense);
                    setTitle(selectedExpense.title);
                    setAmount(selectedExpense.amount);
                    setDate(selectedExpense.date);
                    setCategory(selectedExpense.category || '');
                    setNotes(selectedExpense.notes || '');
                } else {
                    navigate('/dashboard'); // Redirect to dashboard if expense not found
                }
            } catch (error) {
                console.error('Error fetching expense:', error);
                navigate('/dashboard'); // Redirect to dashboard on error
            } finally {
                setLoading(false);
            }
        };
        loadExpense();
    }, [id, navigate]);

    const handleTitleChange = (e) => {
        // Allow only letters and spaces
        const value = e.target.value;
        if (/^[A-Za-z\s]*$/.test(value)) {
            setTitle(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const expenseData = { title, amount, date, category, notes };

        try {
            await updateExpense(id, expenseData);
            toast.success('Expense updated successfully!');
            setTimeout(() => {
                navigate('/dashboard');
            }, 1500); // Redirect after 1.5 seconds to allow toast to be visible
        } catch (error) {
            console.error('Error updating the expense:', error);
            toast.error('Something went wrong. Please try again.');
        }
    };

    return (
        <>
            <Navbar />
            <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} />
            <Container>
                <EditExpenseBox>
                    {loading ? (
                        <LoadingMessage>Loading...</LoadingMessage>
                    ) : (
                        <>
                            <Title>Edit Expense</Title>
                            <form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Label>Title</Label>
                                    <Input
                                        type="text"
                                        value={title}
                                        onChange={handleTitleChange}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Amount</Label>
                                    <Input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Date</Label>
                                    <Input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Category</Label>
                                    <Select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>Select a category</option>
                                        {categories.map((cat, index) => (
                                            <option key={index} value={cat}>{cat}</option>
                                        ))}
                                    </Select>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Notes</Label>
                                    <Textarea
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                    />
                                </FormGroup>
                                <Button type="submit">Update Expense</Button>
                                <CancelButton type="button" onClick={() => navigate('/dashboard')}>
                                    Cancel
                                </CancelButton>
                            </form>
                        </>
                    )}
                </EditExpenseBox>
            </Container>
        </>
    );
};

export default EditExpense;
