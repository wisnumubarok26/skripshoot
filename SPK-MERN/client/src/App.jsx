import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useState } from 'react';
import LoginPage from './components/pages/Login'; // Ganti dengan path yang sesuai // Ganti dengan path yang sesuai
import Home from './components/pages/Home';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, children }) => {
    return isLoggedIn ? children : <Navigate to="/" />;
}


const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <LoginPage setIsLoggedIn={setIsLoggedIn} />
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

export default App;
