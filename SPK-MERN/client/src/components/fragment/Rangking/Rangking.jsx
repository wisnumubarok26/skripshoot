import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Rangking = () => {
    const [relawans, setRelawans] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchRelawansWithScores = async () => {
            try {
                // Fetch data relawan
                const responseRelawans = await axios.get('http://localhost:5000/relawan');
                
                // Fetch data skor
                const responseScores = await axios.get('http://localhost:5000/skor');
                const scoresArray = Array.isArray(responseScores.data) ? responseScores.data : responseScores.data.scores;

                // Jika data skor ada, kita gabungkan dengan data relawan
                const relawansWithScores = responseRelawans.data.map((relawan) => {
                    const skor = scoresArray.find((score) => score.id_relawan === relawan.id)?.skor || 0; // Default skor 0 jika tidak ada
                    return { ...relawan, skor: parseFloat(skor) };
                });
                

                setRelawans(relawansWithScores);
            } catch (error) {
                console.error('Error fetching relawans and scores:', error);
                // Jika terjadi error, kita tetap tampilkan relawan tanpa skor (dengan skor 0)
                setRelawans((prev) => prev.map((relawan) => ({ ...relawan, skor: 0 })));
            }
        };

        fetchRelawansWithScores();
    }, []);

    const handleHitungTOPSIS = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/hitung-topsis'); 
            const hasilAkhir = response.data;

            const updatedRelawans = relawans.map((relawan) => {
                const hasil = hasilAkhir.find((item) => item.id_relawan === relawan.id);
                return {
                    ...relawan,
                    skor: hasil ? parseFloat(hasil.skor) : 0,
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
            await axios.delete('http://localhost:5000/reset-topsis');
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

    const getRankedRelawans = () => {
        const rankedRelawans = [...relawans].sort((a, b) => b.skor - a.skor);
        return rankedRelawans.map((relawan, index) => ({
            ...relawan,
            rank: index + 1,
        }));
    };

    const rankedRelawans = getRankedRelawans();

    return (
        <div className="p-5">
            <h2 className="text-xl font-semibold mb-4">Hasil Perhitungan TOPSIS</h2>
            <button
                onClick={handleHitungTOPSIS}
                className="m-1 p-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
                {loading ? 'Menghitung...' : 'Hitung TOPSIS'}
            </button>
            <button
                onClick={handleReset}
                className="m-4 p-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
                Reset Hasil TOPSIS
            </button>

            {/* Tabel tetap dirender meskipun skor kosong */}
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">Peringkat</th>
                        <th className="border border-gray-300 p-2">Nama Relawan</th>
                        <th className="border border-gray-300 p-2">Skor</th>
                    </tr>
                </thead>
                <tbody>
                    {rankedRelawans.length > 0 ? (
                        rankedRelawans.map((relawan, index) => (
                            <tr key={index}>
                                <td className="border border-gray-300 p-2">{relawan.rank}</td>
                                <td className="border border-gray-300 p-2">{relawan.nama_relawan}</td>
                                <td className="border border-gray-300 p-2">{relawan.skor.toFixed(2)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="border border-gray-300 p-2 text-center">Tidak ada data relawan</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Rangking;
