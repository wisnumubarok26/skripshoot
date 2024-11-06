import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../fragment/Navbar";
import KriteriaList from "../fragment/Kriteria/TableKriteria";

const Kriteria = () => {
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
          <h1 className="text-3xl font-bold text-gray-800">Data Kriteria</h1>
        </div>
        <div>
          <KriteriaList />
        </div>
      </div>
    </div>
  );
};

export default Kriteria;
