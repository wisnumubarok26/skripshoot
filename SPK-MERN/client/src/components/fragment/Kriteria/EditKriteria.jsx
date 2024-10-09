import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate , useParams} from "react-router-dom";

const EditKriteria = () => {
  const [nama_kriteria, setNama_kriteria] = useState("");
  const [bobot,setBobot]= useState("");
  const [tipe,setTipe]=useState("Benefit")
  const navigate = useNavigate();
  const { id_kriteria } = useParams();

  useEffect(() => {
    getKriteriaById();
}, []);

const getKriteriaById = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/kriteria/${id_kriteria}`);
        setNama_kriteria(response.data.nama_kriteria);
        setBobot(response.data.bobot);
        setTipe(response.data.tipe);
    } catch (error) {
        console.log("Error fetching data:", error);
    }
};

const updateKriteria = async (e) => {
    e.preventDefault();
    try {
        await axios.patch(`http://localhost:5000/kriteria/${id_kriteria}`, {
            nama_kriteria,
            bobot,
            tipe
        });
        navigate("/kriteria");
    } catch (error) {
        console.log("Error updating data:", error);
    }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Tambah Kriteria</h2>
        <form onSubmit={updateKriteria} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nama Kriteria</label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              value={nama_kriteria}
              onChange={(e) => setNama_kriteria(e.target.value)}
              placeholder="Masukan Kriteria"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Bobot</label>
            <input
              type="number"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              value={bobot}
              onChange={(e) => setBobot(e.target.value)}
              placeholder="Masukan Bobot"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tipe</label>
            <select
              value={tipe}
              onChange={(e) => setTipe(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            >
              <option value="Benefit">Benefit</option>
              <option value="Cost">Cost</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditKriteria;
