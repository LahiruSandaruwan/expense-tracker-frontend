import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import api, { setAuthToken, getCsrfToken } from '../services/api';
import Cookies from 'js-cookie';

// Styled Components
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(to right, #4299e1, #3182ce);
`;

const LoginBox = styled.div`
    background: #ffffff;
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    margin: 0 1rem;
`;

const Title = styled.h2`
    font-size: 1.875rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    text-align: center;
    color: #2d3748;
`;

const ErrorMessage = styled.p`
    color: #e53e3e;
    background: #fed7d7;
    padding: 0.5rem;
    border-radius: 0.375rem;
    text-align: center;
    margin-bottom: 1rem;
`;

const Label = styled.label`
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: #4a5568;
`;

const Input = styled.input`
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #cbd5e0;
    border-radius: 0.375rem;
    margin-bottom: 1rem;
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
    &:hover {
        background-color: #2b6cb0;
    }
`;

const SignUpLink = styled.p`
    text-align: center;
    font-size: 0.875rem;
    color: #718096;
    margin-top: 1.5rem;
    a {
        color: #4299e1;
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }
`;

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch CSRF token when the component mounts
        const fetchCsrfToken = async () => {
            try {
                await getCsrfToken();
                console.log('CSRF token fetched successfully');
            } catch (error) {
                console.error('Error fetching CSRF token:', error);
                setError('There was an issue with CSRF token validation. Please refresh the page and try again.');
            }
        };

        fetchCsrfToken();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message
        try {
            // Retrieve the CSRF token from cookies (if not already set)
            const csrfToken = Cookies.get('XSRF-TOKEN');

            if (!csrfToken) {
                setError('CSRF token not found. Please refresh the page and try again.');
                return;
            }

            // Send the login request
            const response = await api.post('/login', { email, password }, {
                headers: {
                    'X-XSRF-TOKEN': csrfToken, // Include the CSRF token in the headers
                }
            });

            const token = response.data.token;
            localStorage.setItem('token', token);
            setAuthToken(token);
            navigate('/dashboard');
        } catch (err) {
            console.error('Login error:', err);
            if (err.response && err.response.status === 401) {
                setError('Invalid email or password. Please try again.');
            } else if (err.response && err.response.status === 419) {
                setError('Session expired or CSRF token mismatch. Please refresh the page and try again.');
            } else {
                setError('An unexpected error occurred. Please try again later.');
            }
        }
    };

    return (
        <Container>
            <LoginBox>
                <Title>Welcome Back</Title>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <Button type="submit">Login</Button>
                </form>
                <SignUpLink>
                    Don't have an account? <a href="/register">Sign up</a>
                </SignUpLink>
            </LoginBox>
        </Container>
    );
};

export default Login;
