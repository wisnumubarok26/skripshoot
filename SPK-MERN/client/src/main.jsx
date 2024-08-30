import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import LoginPage from './components/pages/Login.jsx';
import RegisterPage from './components/pages/Register.jsx';
import Home from './components/pages/Home.jsx';

// ProtectedRoute component
const ProtectedRoute = ({ isLoggedIn, children }) => {
    return isLoggedIn ? children : <Navigate to="/" />;
};

// Membuat router
const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <LoginPage setIsLoggedIn={setIsLoggedIn} />
        },
        {
            path: "/register",
            element: <RegisterPage />
        },
        {
            path: "/home",
            element: (
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Home />
                </ProtectedRoute>
            )
        }
    ]);

    return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
