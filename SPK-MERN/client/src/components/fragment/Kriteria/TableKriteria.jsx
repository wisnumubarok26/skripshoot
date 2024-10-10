import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const KriteriaList = () => {
  const [kriteria, setKriteria] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [kriteriaPerPage] = useState(5); // Menampilkan 5 kriteria per halaman

  useEffect(() => {
    getKriteria();
  }, []);

  const getKriteria = async () => {
    const response = await axios.get("http://localhost:5000/kriteria");
    setKriteria(response.data);
  };

 const deleteKriteria = async (id_kriteria) => {
    console.log(`Attempting to delete kriteria with ID: ${id_kriteria}`);
    try {
        const response = await axios.delete(`http://localhost:5000/kriteria/${id_kriteria}`);
        console.log(response.data); // Menampilkan respons dari server
        getKriteria(); // Mengambil ulang data setelah penghapusan
    } catch (error) {
        console.log('Error:', error.response ? error.response.data : error.message);
    }
};


  // Menentukan index data yang akan ditampilkan berdasarkan halaman saat ini
  const indexOfLastKriteria = currentPage * kriteriaPerPage;
  const indexOfFirstKriteria = indexOfLastKriteria - kriteriaPerPage;
  const currentKriteria = kriteria.slice(indexOfFirstKriteria, indexOfLastKriteria);

  // Mengubah halaman
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex justify-center mt-10">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between mb-4">
          <Link
            to="add"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Tambahkan Kriteria
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg table-fixed">
              <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left w-12">No</th>
                    <th className="py-3 px-6 text-left w-1/4">Nama Kriteria</th>
                    <th className="py-3 px-6 text-left w-1/4">Bobot</th>
                    <th className="py-3 px-6 text-left w-1/4">Tipe</th>
                    <th className="py-3 px-6 text-left w-1/6">Action</th>
                  </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
              {currentKriteria.length > 0 ? (
                currentKriteria.map((kriteria, index) => (
                  <tr
                    key={kriteria.id_kriteria}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {indexOfFirstKriteria + index + 1}
                    </td>
                    <td className="py-3 px-6 text-left">{kriteria.nama_kriteria}</td>
                    <td className="py-3 px-6 text-left">{kriteria.bobot}</td>
                    <td className="py-3 px-6 text-left">{kriteria.tipe}</td>
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`edit/${kriteria.id_kriteria}`}
                          className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-xs"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => deleteKriteria(kriteria.id_kriteria)}
                          className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-xs"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-3 px-6">
                    Tidak ada data kriteria.
                  </td>
                </tr>
              )}
              </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <nav>
            <ul className="inline-flex -space-x-px">
              {[...Array(Math.ceil(kriteria.length / kriteriaPerPage)).keys()].map((number) => (
                <li key={number + 1}>
                  <button
                    onClick={() => paginate(number + 1)}
                    className={`py-2 px-3 leading-tight border rounded-l-lg ${
                      currentPage === number + 1
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                    }`}
                  >
                    {number + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default KriteriaList;
