import React from "react";
import Navbar from "../fragment/Navbar";
import RelawanList from "../fragment/Relawan/TableRelawan";
import { useNavigate } from "react-router-dom";
// if (!username) {
//   window.location.replace("/");
// }

const Home = () => {
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
          <h1 className="text-3xl font-bold text-gray-800">Data Relawan</h1>
        </div>
        <div>
          <RelawanList />
        </div>
      </div>
    </div>
  );
};

export default Home;
