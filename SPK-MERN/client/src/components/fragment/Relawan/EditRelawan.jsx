import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditRelawan = () => {
    const [nama_relawan, setNama] = useState("");
    const [email_relawan, setEmail] = useState("");
    const [no_relawan, setNo] = useState("");
    const [gender_relawan, setGender] = useState("Laki-Laki");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getRelawanById();
    }, []);

    const getRelawanById = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/relawan/${id}`);
            setNama(response.data.nama_relawan);
            setEmail(response.data.email_relawan);
            setNo(response.data.no_relawan);
            setGender(response.data.gender_relawan);
        } catch (error) {
            console.log("Error fetching data:", error);
        }
    };

    const updateRelawan = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/relawan/${id}`, {
                nama_relawan,
                email_relawan,
                no_relawan,
                gender_relawan
            });
            navigate("/home");
        } catch (error) {
            console.log("Error updating data:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">Edit Relawan</h1>
                <form onSubmit={updateRelawan} className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-gray-700 font-semibold">Nama</label>
                        <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            value={nama_relawan}
                            onChange={(e) => setNama(e.target.value)}
                            placeholder="Masukan Nama"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-gray-700 font-semibold">Email</label>
                        <input
                            type="email"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            value={email_relawan}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Masukan Email"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-gray-700 font-semibold">Nomor</label>
                        <input
                            type="number"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            value={no_relawan}
                            onChange={(e) => setNo(e.target.value)}
                            placeholder="Masukan Nomor"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-gray-700 font-semibold">Gender</label>
                        <select
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            value={gender_relawan}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="Laki-laki">Laki-laki</option>
                            <option value="Perempuan">Perempuan</option>
                        </select>
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold"
                        >
                            Perbarui
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditRelawan;
