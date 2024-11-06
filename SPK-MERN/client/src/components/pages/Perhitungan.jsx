import React from "react";
import Navbar from "../fragment/Navbar";
import Perhitungan from "../fragment/Perhitungan/Perhitungan";
import { useNavigate } from "react-router-dom";

const HasilHitung = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <div className="flex">
      <Navbar />
      <div className="flex-grow bg-gray-100 p-6">
        <div className="mb-4 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Penilaian</h1>
        </div>
        <div>
          <Perhitungan />
        </div>
      </div>
    </div>
  );
};

export default HasilHitung;
