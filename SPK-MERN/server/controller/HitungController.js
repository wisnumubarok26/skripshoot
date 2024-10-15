import Kriteria from '../models/KriteriaModel.js';
import Relawan from '../models/RelawanModel.js';
import Penilaian from '../models/PenilaianModel.js';
import HasilPerhitungan from '../models/HasilModel.js'; // Import HasilPerhitungan

// Fungsi untuk normalisasi nilai
const normalisasi = (nilai, pembagi) => nilai / pembagi;

// Fungsi untuk melakukan perhitungan TOPSIS
export const hitungTOPSIS = async (req, res) => {
    try {
        const existingResults = await HasilPerhitungan.findAll();
        if (existingResults.length > 0) {
            return res.status(400).json({ message: 'Hasil TOPSIS sudah ada. Hapus hasil untuk melakukan perhitungan ulang.' });
        }
        // 1. Ambil semua data relawan, kriteria, dan penilaian
        const kriteria = await Kriteria.findAll();
        const relawans = await Relawan.findAll();
        const penilaians = await Penilaian.findAll();

        // 2. Siapkan struktur data untuk menyimpan hasil
        let matriksKeputusan = {};
        let bobot = kriteria.map(k => k.bobot);
        let tipeKriteria = kriteria.map(k => k.tipe);

        // 3. Masukkan nilai penilaian ke dalam matriks keputusan
        for (const relawan of relawans) {
            matriksKeputusan[relawan.id] = {};
            for (const krit of kriteria) {
                const nilai = penilaians.find(p => p.id_relawan === relawan.id && p.id_kriteria === krit.id_kriteria)?.nilai || 0;
                matriksKeputusan[relawan.id][krit.id_kriteria] = parseFloat(nilai);
            }
        }

        // 4. Normalisasi matriks keputusan
        let pembagi = {};
        kriteria.forEach(krit => {
            const sumKuadrat = Object.values(matriksKeputusan).reduce((acc, cur) => acc + Math.pow(cur[krit.id_kriteria], 2), 0);
            pembagi[krit.id_kriteria] = Math.sqrt(sumKuadrat);
        });

        let matriksTernormalisasi = {};
        for (const relawan of relawans) {
            matriksTernormalisasi[relawan.id] = {};
            kriteria.forEach(krit => {
                matriksTernormalisasi[relawan.id][krit.id_kriteria] = normalisasi(matriksKeputusan[relawan.id][krit.id_kriteria], pembagi[krit.id_kriteria]);
            });
        }

        // 5. Hitung matriks ternormalisasi terbobot
        let matriksTerbobot = {};
        for (const relawan of relawans) {
            matriksTerbobot[relawan.id] = {};
            kriteria.forEach((krit, idx) => {
                matriksTerbobot[relawan.id][krit.id_kriteria] = matriksTernormalisasi[relawan.id][krit.id_kriteria] * bobot[idx];
            });
        }

        // 6. Tentukan solusi ideal positif dan negatif
        let solusiIdealPositif = {};
        let solusiIdealNegatif = {};
        kriteria.forEach((krit, idx) => {
            const nilaiKriteria = Object.values(matriksTerbobot).map(n => n[krit.id_kriteria]);
            if (tipeKriteria[idx] === 'benefit') {
                solusiIdealPositif[krit.id_kriteria] = Math.max(...nilaiKriteria);
                solusiIdealNegatif[krit.id_kriteria] = Math.min(...nilaiKriteria);
            } else {
                solusiIdealPositif[krit.id_kriteria] = Math.min(...nilaiKriteria);
                solusiIdealNegatif[krit.id_kriteria] = Math.max(...nilaiKriteria);
            }
        });

        // 7. Hitung jarak dari solusi ideal positif dan negatif
        let jarakPositif = {};
        let jarakNegatif = {};
        relawans.forEach(relawan => {
            jarakPositif[relawan.id] = Math.sqrt(
                kriteria.reduce((acc, krit) => acc + Math.pow(matriksTerbobot[relawan.id][krit.id_kriteria] - solusiIdealPositif[krit.id_kriteria], 2), 0)
            );
            jarakNegatif[relawan.id] = Math.sqrt(
                kriteria.reduce((acc, krit) => acc + Math.pow(matriksTerbobot[relawan.id][krit.id_kriteria] - solusiIdealNegatif[krit.id_kriteria], 2), 0)
            );
        });

        // 8. Hitung skor preferensi
        let hasilAkhir = [];
        relawans.forEach(relawan => {
            const skorPreferensi = jarakNegatif[relawan.id] / (jarakPositif[relawan.id] + jarakNegatif[relawan.id]);
            hasilAkhir.push({
                id_relawan: relawan.id,
                nama_relawan: relawan.nama_relawan,
                skor: skorPreferensi
            });
        });

        // 9. Urutkan berdasarkan skor tertinggi
        hasilAkhir.sort((a, b) => b.skor - a.skor);

        // 10. Simpan hasil ke dalam tabel `hasil_perhitungan`
        for (const hasil of hasilAkhir) {
            await HasilPerhitungan.create({
                id_relawan: hasil.id_relawan,
                nama_relawan: hasil.nama_relawan,
                skor: hasil.skor
            });
        }

        // 11. Kembalikan hasil ke client
        res.status(200).json(hasilAkhir);

    } catch (error) {
        console.error('Error in TOPSIS calculation:', error);
        res.status(500).json({ message: 'Error in TOPSIS calculation' });
    }
};

export const resetHasilTOPSIS = async (req, res) => {
    try {
        await HasilPerhitungan.destroy({ where: {}, truncate: true });
        res.status(200).json({ message: 'Hasil TOPSIS telah direset.' });
    } catch (error) {
        console.error('Error resetting TOPSIS results:', error);
        res.status(500).json({ message: 'Error resetting TOPSIS results' });
    }
};

export const getSkorTOPSIS = async (req, res) => {
    try {
        const hasilPerhitungan = await HasilPerhitungan.findAll({
            attributes: ['id_relawan', 'nama_relawan', 'skor'],
            order: [['skor', 'DESC']],
        });

        if (hasilPerhitungan.length === 0) {
            console.log('Belum ada hasil perhitungan');
            return res.status(404).json({ message: 'Belum ada hasil TOPSIS yang dihitung.' });
        }

        console.log('Hasil perhitungan ditemukan:', hasilPerhitungan);
        res.status(200).json(hasilPerhitungan);
    } catch (error) {
        console.error('Error fetching TOPSIS scores:', error);
        res.status(500).json({ message: 'Error fetching TOPSIS scores' });
    }
};

