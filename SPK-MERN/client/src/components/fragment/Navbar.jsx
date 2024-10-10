// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../element/Logo/Logo';
import { Navigate,useNavigate } from 'react-router-dom';

const Navbar = ({setIsLoggedIn}) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsLoggedIn(false); // Set status login menjadi false
        navigate('/'); // Arahkan kembali ke halaman login
    };

    return (
        <div className="h-screen w-64 bg-green-600 text-white flex flex-col">
            {/* <Logo/> */}
            <h2 className="text-2xl font-bold p-4">SPK TOPSIS</h2>
            <nav className="flex-grow">
                <ul className="space-y-2 p-4">
                    <li>
                        <Link to="/home" className="hover:bg-green-500 p-2 rounded block">Data Relawan</Link>
                    </li>
                    <li>
                        <Link to="/kriteria" className="hover:bg-green-500 p-2 rounded block">Kriteria</Link>
                    </li>
                    <li>
                        <Link to="/penilaian" className="hover:bg-green-500 p-2 rounded block">Penilaian</Link>
                    </li>
                    <li>
                        <Link to="/perhitungan" className="hover:bg-green-500 p-2 rounded block">Perhitungan</Link>
                    </li>
                    <li>
                        <Link to="/hasil" className="hover:bg-green-500 p-2 rounded block">Hasil</Link>
                    </li>
                    <li>
                        <Link to="/" onClick={handleLogout} className="hover:bg-green-500 p-2 rounded block">Log Out</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
