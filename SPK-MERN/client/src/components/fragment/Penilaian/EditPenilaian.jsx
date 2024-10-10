import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditPenilaian = () => {
  const { id } = useParams(); // Ambil ID relawan dari URL
  const [kriteria, setKriteria] = useState([]);
  const [penilaian, setPenilaian] = useState({});
  const navigate = useNavigate(); // Untuk kembali ke halaman sebelumnya

  useEffect(() => {
    fetchKriteria();
    fetchExistingPenilaian();
  }, []);

  // Mengambil daftar kriteria
  const fetchKriteria = async () => {
    try {
      const response = await axios.get("http://localhost:5000/kriteria");
      setKriteria(response.data);
    } catch (error) {
      console.error("Error fetching kriteria:", error);
    }
  };

  // Mengambil penilaian yang sudah ada
  const fetchExistingPenilaian = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/penilaian/${id}`);
      setPenilaian(response.data); // Mengisi form dengan penilaian yang sudah ada
    } catch (error) {
      console.error("Error fetching existing penilaian:", error);
    }
  };

  const handleChange = (e, id_kriteria) => {
    setPenilaian({
      ...penilaian,
      [id_kriteria]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update nilai penilaian
      for (const id_kriteria in penilaian) {
        await axios.put(`http://localhost:5000/penilaian/${id}`, {
          id: id,
          id_kriteria: id_kriteria,
          nilai: penilaian[id_kriteria],
        });
      }
      alert("Penilaian berhasil diupdate!");
      navigate(-1); // Kembali ke halaman sebelumnya
    } catch (error) {
      console.error("Error updating penilaian:", error);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="w-full max-w-2xl">
        <h2 className="text-xl mb-4">Edit Penilaian Relawan</h2>
        <form onSubmit={handleSubmit}>
          {kriteria.map((item) => (
            <div key={item.id_kriteria} className="mb-4">
              <label className="block mb-2">{item.nama_kriteria}</label>
              <input
                type="number"
                className="border p-2 w-full"
                value={penilaian[item.id_kriteria] || ""}
                onChange={(e) => handleChange(e, item.id_kriteria)}
                required
              />
            </div>
          ))}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Update Penilaian
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPenilaian;
