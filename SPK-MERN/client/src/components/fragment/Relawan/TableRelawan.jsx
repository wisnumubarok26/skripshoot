import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RelawanList = () => {
  const [relawans, setRelawan] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [relawansPerPage] = useState(5); // Menampilkan 5 data per halaman

  useEffect(() => {
    getRelawan();
  }, []);

  const getRelawan = async () => {
    const response = await axios.get("http://localhost:5000/relawan");
    setRelawan(response.data);
  };

  const deleteRelawan = async (id) => {
    console.log(`Attempting to delete relawan with ID: ${id}`);
    try {
      await axios.delete(`http://localhost:5000/relawan/${id}`);
      getRelawan();
    } catch (error) {
      console.log(error);
    }
  };

  // Menentukan index data yang akan ditampilkan berdasarkan halaman saat ini
  const indexOfLastRelawan = currentPage * relawansPerPage;
  const indexOfFirstRelawan = indexOfLastRelawan - relawansPerPage;
  const currentRelawans = relawans.slice(indexOfFirstRelawan, indexOfLastRelawan);

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
            Tambahkan
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg table-fixed">
              <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left w-12">No</th>
                    <th className="py-3 px-6 text-left w-1/4">Nama</th>
                    <th className="py-3 px-6 text-left w-1/4">Email</th>
                    <th className="py-3 px-6 text-left w-1/6">Nomor</th>
                    <th className="py-3 px-6 text-left w-1/6">Jenis Kelamin</th>
                    <th className="py-3 px-6 text-left w-1/6">Action</th>
                  </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {currentRelawans.length > 0 ? (
                currentRelawans.map((relawan, index) => (
                  <tr
                    key={relawan.id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {indexOfFirstRelawan + index + 1}
                    </td>
                    <td className="py-3 px-6 text-left">{relawan.nama_relawan}</td>
                    <td className="py-3 px-6 text-left">{relawan.email_relawan}</td>
                    <td className="py-3 px-6 text-left">{relawan.no_relawan}</td>
                    <td className="py-3 px-6 text-left">{relawan.gender_relawan}</td>
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`edit/${relawan.id}`}
                          className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-xs"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => deleteRelawan(relawan.id)}
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
                  <td colSpan="6" className="text-center py-3 px-6">
                    Tidak ada data relawan.
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
              {[...Array(Math.ceil(relawans.length / relawansPerPage)).keys()].map((number) => (
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

export default RelawanList;
