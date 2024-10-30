import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Products from './components/Products';
import Transactions from './components/Transactions';
import Users from './components/Users';
import Navbar from './components/Navbar';
import './App.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location = useLocation();

    return (
        <div className="App">
            {/* Render heading and Navbar only if not on the login page */}
            {location.pathname !== '/login' && (
                <header>
                    <h2>Wings Cafe</h2> {/* Heading at the top */}
                    <Navbar /> {/* Navigation bar below the heading */}
                </header>
            )}

            <Routes>
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
                <Route path="/products" element={isAuthenticated ? <Products /> : <Navigate to="/login" />} />
                <Route path="/transactions" element={isAuthenticated ? <Transactions /> : <Navigate to="/login" />} />
                <Route path="/users" element={isAuthenticated ? <Users /> : <Navigate to="/login" />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </div>
    );
}

export default App;
