// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Mendapatkan lokasi URL saat ini

  const handleLogout = () => {
    localStorage.removeItem("username");
    setIsLoggedIn(false); // Set status login menjadi false
    navigate("/"); // Arahkan kembali ke halaman login
  };

  // Fungsi untuk menentukan apakah link saat ini aktif
  const isActive = (path) => location.pathname === path;

  return (
    <div className="h-screen w-64 bg-green-600 text-white flex flex-col">
      <h2 className="text-2xl font-bold p-4 mt-4">
        Sistem pendukung keputusan TOPSIS
      </h2>
      {/* <h3 className='mb-10 ml-4'>Taman Baca Msayarakat Kolong Ciputat</h3> */}
      <nav className="flex-grow">
        <ul className="space-y-2 p-4">
          <li>
            <Link
              to="/home"
              className={`p-2 rounded block ${
                isActive("/home") ? "bg-green-500" : "hover:bg-green-500"
              }`}
            >
              Data Relawan
            </Link>
          </li>
          <li>
            <Link
              to="/kriteria"
              className={`p-2 rounded block ${
                isActive("/kriteria") ? "bg-green-500" : "hover:bg-green-500"
              }`}
            >
              Kriteria
            </Link>
          </li>
          <li>
            <Link
              to="/penilaian"
              className={`p-2 rounded block ${
                isActive("/penilaian") ? "bg-green-500" : "hover:bg-green-500"
              }`}
            >
              Penilaian
            </Link>
          </li>
          <li>
            <Link
              to="/rangking"
              className={`p-2 rounded block ${
                isActive("/rangking") ? "bg-green-500" : "hover:bg-green-500"
              }`}
            >
              Hasil
            </Link>
          </li>
          <li>
            <Link
              to="/"
              onClick={handleLogout}
              className="hover:bg-green-500 p-2 rounded block"
            >
              Log Out
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
