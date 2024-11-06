import React from "react";
import Navbar from "../fragment/Navbar";
import PenilaianTable from "../fragment/Penilaian/TablePenilaian";
import { useNavigate } from "react-router-dom";

const Penilaian = () => {
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
          <PenilaianTable />
        </div>
      </div>
    </div>
  );
};

export default Penilaian;
