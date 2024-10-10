import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TablePenilaian = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [volunteersPerPage] = useState(5); // Menampilkan 5 relawan per halaman

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/relawan");
      setVolunteers(response.data);
    } catch (error) {
      console.error("Error fetching volunteers:", error);
    }
  };

  // Menentukan index data yang akan ditampilkan berdasarkan halaman saat ini
  const indexOfLastVolunteer = currentPage * volunteersPerPage;
  const indexOfFirstVolunteer = indexOfLastVolunteer - volunteersPerPage;
  const currentVolunteers = volunteers.slice(indexOfFirstVolunteer, indexOfLastVolunteer);

  // Fungsi untuk mengubah halaman
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex justify-center mt-10">
      <div className="w-full max-w-4xl">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg table-fixed">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left w-12">No</th>
                <th className="py-3 px-6 text-left w-1/2">Nama Relawan</th>
                <th className="py-3 px-6 text-left w-1/4">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {currentVolunteers.length > 0 ? (
                currentVolunteers.map((volunteer, index) => (
                  <tr key={volunteer.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {indexOfFirstVolunteer + index + 1}
                    </td>
                    <td className="py-3 px-6 text-left">{volunteer.nama_relawan}</td>
                    <td className="py-3 px-6 text-left">
                      <Link
                        to={`/penilaian/${volunteer.id}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-xs"
                      >
                        Isi Nilai
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-3 px-6">
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
              {[...Array(Math.ceil(volunteers.length / volunteersPerPage)).keys()].map((number) => (
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

export default TablePenilaian;
