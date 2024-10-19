import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiLogOut } from 'react-icons/fi'; // Import the logout icon from react-icons

// Styled Components
const NavbarContainer = styled.nav`
    background-color: #1e3a8a;
    padding: 1rem;
`;

const NavbarContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
`;

const NavbarBrand = styled(Link)`
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: none;
    &:hover {
        color: #cbd5e0;
    }
`;

const LogoutButton = styled.button`
    display: flex;
    align-items: center;
    background-color: #e11d48;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
    font-size: 1rem;
    &:hover {
        background-color: #be123c;
    }
`;

const IconWrapper = styled.span`
    margin-right: 0.5rem;
    display: flex;
    align-items: center;
`;

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token from localStorage
        navigate('/'); // Redirect to the login page
    };

    return (
        <NavbarContainer>
            <NavbarContent>
                <NavbarBrand to="/dashboard">Expense Tracker</NavbarBrand>
                <LogoutButton onClick={handleLogout}>
                    <IconWrapper>
                        <FiLogOut />
                    </IconWrapper>
                    Logout
                </LogoutButton>
            </NavbarContent>
        </NavbarContainer>
    );
};

export default Navbar;
