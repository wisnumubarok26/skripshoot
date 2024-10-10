import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const FormPenilaian = () => {
  const { id } = useParams(); // Ambil ID relawan dari URL
  const [kriteria, setKriteria] = useState([]);
  const [penilaian, setPenilaian] = useState({});

  useEffect(() => {
    fetchKriteria();
  }, []);

  const fetchKriteria = async () => {
    try {
      const response = await axios.get("http://localhost:5000/kriteria");
      setKriteria(response.data);
    } catch (error) {
      console.error("Error fetching kriteria:", error);
    }
  };

  const handleChange = (e, id_kriteria) => {
    setPenilaian({
      ...penilaian,
      [id_kriteria]: e.target.value,
    });
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Kirim nilai penilaian untuk setiap kriteria
//       for (const id_kriteria in penilaian) {
//         await axios.post("http://localhost:5000/penilaian", {
//           id_relawan: id,
//           id_kriteria: id_kriteria,
//           nilai: penilaian[id_kriteria],
//         });
//       }
//       alert("Penilaian berhasil disimpan!");
//     } catch (error) {
//       console.error("Error submitting penilaian:", error);
//     }
//   };
const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Gunakan Promise.all untuk mengirim semua request sekaligus
      const promises = Object.keys(penilaian).map(async (id_kriteria) => {
        const dataToSend = {
          id: id,  // ID relawan diambil dari URL
          id_kriteria: id_kriteria,  // ID kriteria yang dinamis
          nilai: penilaian[id_kriteria]  // Nilai yang diinput user
        };
  
        console.log("Data yang dikirim: ", dataToSend);  // Debugging log
  
        return axios.post("http://localhost:5000/penilaian", dataToSend);
      });
  
      // Menunggu semua request selesai
      await Promise.all(promises);
      
      alert("Penilaian berhasil disimpan!");
  
    } catch (error) {
      console.error("Error submitting penilaian:", error);
    }
  };
  

  return (
    <div className="flex justify-center mt-10">
      <div className="w-full max-w-2xl">
        <h2 className="text-xl mb-4">Form Penilaian Relawan</h2>
        <form onSubmit={handleSubmit}>
          {kriteria.map((item) => (
            <div key={item.id_kriteria} className="mb-4">
              <label className="block mb-2">{item.nama_kriteria}</label>
              <input
                type="number"
                className="border p-2 w-full"
                onChange={(e) => handleChange(e, item.id_kriteria)}
                required
              />
            </div>
          ))}
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
          >
            Simpan Penilaian
          </button>
          <Link
            to={`/editPenilaian/${id}`}
            className="ml-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Edit Penilaian
          </Link>
        </form>
      </div>
    </div>
  );
};

export default FormPenilaian;
