import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Perhitungan = () => {
    const [relawans, setRelawans] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch relawans when component mounts
        const fetchRelawans = async () => {
            try {
                const response = await axios.get('http://localhost:5000/relawan'); // Ganti dengan endpoint yang sesuai
                // Tambahkan skor awal 0 ke setiap relawan
                const relawansWithSkor = response.data.map(relawan => ({
                    ...relawan,
                    skor: 0,
                }));
                setRelawans(relawansWithSkor);
            } catch (error) {
                console.error('Error fetching relawans:', error);
            }
        };
        fetchRelawans();
    }, []);

    const handleHitungTOPSIS = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/hitung-topsis'); // Ganti dengan endpoint yang sesuai
            const hasilAkhir = response.data;

            // Perbarui skor relawan berdasarkan hasil perhitungan
            const updatedRelawans = relawans.map(relawan => {
                const hasil = hasilAkhir.find(item => item.id_relawan === relawan.id);
                return {
                    ...relawan,
                    skor: hasil ? hasil.skor : 0, // Jika tidak ada hasil, skor tetap 0
                };
            });

            setRelawans(updatedRelawans);
            setLoading(false);
        } catch (error) {
            console.error('Error calculating TOPSIS:', error);
            setLoading(false);
        }
    };

    const handleReset = async () => {
        setLoading(true);
        try {
            await axios.delete('http://localhost:5000/reset-topsis'); // Ganti dengan endpoint yang sesuai
            // Reset skor relawans ke 0
            const resetRelawans = relawans.map(relawan => ({
                ...relawan,
                skor: 0,
            }));
            setRelawans(resetRelawans);
            setLoading(false);
        } catch (error) {
            console.error('Error resetting TOPSIS results:', error);
            setLoading(false);
        }
    };

    return (
        <div className="p-5">
            <h2 className="text-xl font-semibold mb-4">Hasil Perhitungan TOPSIS</h2>
            <button
                onClick={handleHitungTOPSIS}
                className="mb-4 p-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
                {loading ? 'Menghitung...' : 'Hitung TOPSIS'}
            </button>
            <button
                onClick={handleReset}
                className="mb-4 p-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
                Reset Hasil TOPSIS
            </button>
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">Nama Relawan</th>
                        <th className="border border-gray-300 p-2">Skor</th>
                    </tr>
                </thead>
                <tbody>
                    {relawans.map((relawan, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300 p-2">{relawan.nama_relawan}</td>
                            <td className="border border-gray-300 p-2">{relawan.skor.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Perhitungan;
