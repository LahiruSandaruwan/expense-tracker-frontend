import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

// Create an Axios instance for API routes
const api = axios.create({
    baseURL: 'http://localhost:8000/api', // Base URL for API routes
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Ensures cookies are sent with each request
});

// Create an Axios instance for web routes (for CSRF token)
const web = axios.create({
    baseURL: 'http://localhost:8000', // Base URL for web routes
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Ensures cookies are sent with each request
});

// Function to set the authorization token for authenticated requests
export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

// Function to fetch and set CSRF token for Laravel Sanctum
export const getCsrfToken = async () => {
    try {
        // Fetch CSRF token using the 'web' instance
        const response = await web.get('/sanctum/csrf-cookie'); // Sets the CSRF token cookie for the session
        
        // Retrieve the CSRF token from cookies
        const csrfToken = Cookies.get('XSRF-TOKEN');
        console.log('CSRF token fetched successfully:', csrfToken);
        
        if (csrfToken) {
            // Add the CSRF token to the API instance headers
            api.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;
        } else {
            console.error('CSRF token not found in cookies');
            throw new Error('CSRF token not found');
        }
    } catch (error) {
        console.error('Error fetching CSRF token:', error);
        throw error;
    }
};

// Axios response interceptor to handle 401 unauthorized responses
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            // Show an alert using react-toastify and redirect to login page
            toast.error('You are not authenticated. Redirecting to login page...', {
                position: "top-center",
                autoClose: 3000,
            });
            setTimeout(() => {
                window.location.href = '/'; // Redirect to login page after 3 seconds
            }, 3000);
        }
        return Promise.reject(error);
    }
);

// Function to make a GET request for all expenses
export const fetchExpenses = async () => {
    try {
        const response = await api.get('/expenses');
        return response.data;
    } catch (error) {
        console.error('Error fetching expenses:', error);
        throw error;
    }
};

// Function to make a POST request to add a new expense
export const addExpense = async (expenseData) => {
    try {
        const response = await api.post('/expenses', expenseData);
        return response.data;
    } catch (error) {
        console.error('Error adding expense:', error);
        throw error;
    }
};

// Function to make a PUT request to update an existing expense
export const updateExpense = async (id, expenseData) => {
    try {
        const response = await api.put(`/expenses/${id}`, expenseData);
        return response.data;
    } catch (error) {
        console.error('Error updating expense:', error);
        throw error;
    }
};

// Function to make a DELETE request to remove an expense
export const deleteExpense = async (id) => {
    try {
        const response = await api.delete(`/expenses/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting expense:', error);
        throw error;
    }
};

// Initialize the CSRF token when the app starts
const initializeCsrfToken = async () => {
    try {
        await getCsrfToken(); // Call this once when the app initializes
    } catch (error) {
        console.error('Error initializing CSRF token:', error);
    }
};

// Initialize CSRF token at startup
initializeCsrfToken();

export default api;
