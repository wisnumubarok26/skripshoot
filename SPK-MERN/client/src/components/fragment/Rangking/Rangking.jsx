import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Rangking = () => {
    const [relawans, setRelawans] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchRelawansWithScores = async () => {
            try {
                const responseRelawans = await axios.get('http://localhost:5000/relawan');
                const responseScores = await axios.get('http://localhost:5000/skor');
        
                const scoresArray = Array.isArray(responseScores.data) ? responseScores.data : responseScores.data.scores;
        
                if (Array.isArray(scoresArray)) {
                    const relawansWithScores = responseRelawans.data.map((relawan) => {
                        const skor = scoresArray.find((score) => score.id_relawan === relawan.id)?.skor || 0;
                        return { ...relawan, skor: parseFloat(skor) }; // Konversi skor ke number
                    });
                    setRelawans(relawansWithScores);
                } else {
                    console.error('Scores data is not an array:', responseScores.data);
                }
            } catch (error) {
                console.error('Error fetching relawans and scores:', error);
            }
        };
        
        const handleHitungTOPSIS = async () => {
            setLoading(true);
            try {
                const response = await axios.post('http://localhost:5000/hitung-topsis');
                const hasilAkhir = response.data;
        
                // Perbarui skor relawan berdasarkan hasil perhitungan
                const updatedRelawans = relawans.map(relawan => {
                    const hasil = hasilAkhir.find(item => item.id_relawan === relawan.id);
                    return {
                        ...relawan,
                        skor: hasil ? parseFloat(hasil.skor) : 0, // Pastikan skor dalam bentuk number
                    };
                });
        
                setRelawans(updatedRelawans);
                setLoading(false);
            } catch (error) {
                console.error('Error calculating TOPSIS:', error);
                setLoading(false);
            }
        };        
    
        fetchRelawansWithScores();
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
                    skor: hasil ? hasil.skor : 0,
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

    // Mendapatkan peringkat berdasarkan skor
    const getRankedRelawans = () => {
        // Buat salinan relawans dan urutkan berdasarkan skor
        const rankedRelawans = [...relawans].sort((a, b) => b.skor - a.skor);
        return rankedRelawans.map((relawan, index) => ({
            ...relawan,
            rank: index + 1, // Peringkat dimulai dari 1
        }));
    };

    const rankedRelawans = getRankedRelawans();

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
                        <th className="border border-gray-300 p-2">Peringkat</th>
                        <th className="border border-gray-300 p-2">Nama Relawan</th>
                        <th className="border border-gray-300 p-2">Skor</th>
                    </tr>
                </thead>
                <tbody>
                    {rankedRelawans.map((relawan, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300 p-2">{relawan.rank}</td>
                            <td className="border border-gray-300 p-2">{relawan.nama_relawan}</td>
                            <td className="border border-gray-300 p-2">{relawan.skor.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Rangking;
