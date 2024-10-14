import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TablePenilaian = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [volunteersPerPage] = useState(5);
  const [kriteria, setKriteria] = useState([]);
  const [nilaiKriteria, setNilaiKriteria] = useState({});
  const [isEditing, setIsEditing] = useState(null);
  const [penilaian, setPenilaian] = useState({});

  useEffect(() => {
    fetchVolunteers();
    fetchKriteria();
  }, []);

  // Fetch volunteers
  const fetchVolunteers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/relawan");
      setVolunteers(response.data);
    } catch (error) {
      console.error("Error fetching volunteers:", error);
    }
  };

  // Fetch criteria
  const fetchKriteria = async () => {
    try {
      const response = await axios.get("http://localhost:5000/kriteria");
      setKriteria(response.data);
    } catch (error) {
      console.error("Error fetching kriteria:", error);
    }
  };

  // Fetch scores for each volunteer
  const fetchNilaiKriteria = async (idRelawan) => {
    try {
      const response = await axios.get(`http://localhost:5000/penilaian/relawan/${idRelawan}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching nilai kriteria:", error);
      return [];
    }
  };

  // Move fetchAllNilaiKriteria to component scope
  const fetchAllNilaiKriteria = async () => {
    const newNilaiKriteria = {};
    for (const volunteer of volunteers) {
      const nilai = await fetchNilaiKriteria(volunteer.id);
      newNilaiKriteria[volunteer.id] = nilai;
    }
    setNilaiKriteria(newNilaiKriteria);
  };

  useEffect(() => {
    if (volunteers.length > 0) {
      fetchAllNilaiKriteria();
    }
  }, [volunteers]);

  // Handle input change for nilai
  const handleInputChange = (volunteerId, id_kriteria, value) => {
    setPenilaian((prevPenilaian) => ({
      ...prevPenilaian,
      [volunteerId]: {
        ...prevPenilaian[volunteerId],
        [id_kriteria]: value,
      },
    }));
  };

  // Save changes for each kriteria
  const handleSave = async (volunteerId) => {
    try {
      const nilaiToUpdate = nilaiKriteria[volunteerId].map((kriteria) => {
        return {
          id_kriteria: kriteria.id_kriteria,
          nilai: penilaian[volunteerId]?.[kriteria.id_kriteria] || kriteria.nilai,
        };
      });

      // Update each nilai in the database
      for (const { id_kriteria, nilai } of nilaiToUpdate) {
        await axios.patch(`http://localhost:5000/penilaian/${volunteerId}`, {
          id_kriteria,
          nilai,
        });
      }

      setIsEditing(null);
      // Clear the penilaian state for this volunteer
      setPenilaian((prevPenilaian) => {
        const updatedPenilaian = { ...prevPenilaian };
        delete updatedPenilaian[volunteerId];
        return updatedPenilaian;
      });

      // Refresh all nilaiKriteria for all volunteers
      await fetchAllNilaiKriteria();
    } catch (error) {
      console.error("Error updating nilai kriteria:", error);
    }
  };

  const indexOfLastVolunteer = currentPage * volunteersPerPage;
  const indexOfFirstVolunteer = indexOfLastVolunteer - volunteersPerPage;
  const currentVolunteers = volunteers.slice(indexOfFirstVolunteer, indexOfLastVolunteer);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex justify-center mt-10">
      <div className="w-full max-w-4xl">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg table-fixed">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left w-12">No</th>
                <th className="py-3 px-6 text-left w-1/4">Nama Relawan</th>
                {kriteria.map((k) => (
                  <th key={k.id_kriteria} className="py-3 px-6 text-left">
                    {k.nama_kriteria}
                  </th>
                ))}
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

                    {kriteria.map((k) => {
                      const nilai = nilaiKriteria[volunteer.id]?.find(
                        (p) => p.id_kriteria === k.id_kriteria
                      )?.nilai || 0;
                      return (
                        <td key={k.id_kriteria} className="py-3 px-6 text-left">
                          {isEditing === volunteer.id ? (
                            <input
                              type="number"
                              value={penilaian[volunteer.id]?.[k.id_kriteria] || nilai}
                              onChange={(e) =>
                                handleInputChange(volunteer.id, k.id_kriteria, e.target.value)
                              }
                              className="border border-gray-300 rounded py-1 px-2"
                            />
                          ) : (
                            nilai
                          )}
                        </td>
                      );
                    })}

                    <td className="py-3 px-6 text-left">
                      {isEditing === volunteer.id ? (
                        <button
                          onClick={() => handleSave(volunteer.id)}
                          className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded text-xs"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => setIsEditing(volunteer.id)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded text-xs"
                        >
                          Edit
                        </button>
                      )}
                      <Link
                        to={`/penilaian/${volunteer.id}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-xs ml-2"
                      >
                        Isi Nilai
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={kriteria.length + 3} className="text-center py-3 px-6">
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
