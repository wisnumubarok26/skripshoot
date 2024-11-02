import Admin from '../models/AdminModel.js';
import bcrypt from 'bcrypt';

// Fungsi untuk login admin
export const loginAdmin = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Mencari admin berdasarkan username
        const admin = await Admin.findOne({ where: { username } });

        // Jika admin tidak ditemukan
        if (!admin) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Memeriksa password menggunakan bcrypt
        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Jika login berhasil, kirimkan respons sukses
        res.status(200).json({
            message: 'Login successful',
            admin: {
                id: admin.id,
                username: admin.username,
                // Tambahkan field lain yang ingin Anda kirimkan
            }
        });
    } catch (error) {
        // Mengembalikan status error jika terjadi kesalahan
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
