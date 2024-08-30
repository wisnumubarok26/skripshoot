import Relawan from "../models/RelawanModel.js";

export const getRelawan = async(req,res)=>{
    try {
        const relawan = await Relawan.findAll();
        res.json(relawan);
    } catch (error) {
        res.status(500).json({
            massage : error.massage
        })
    }
}

export const getRelawanById = async(req,res)=>{
    try {
        const relawan = await Relawan.findByPk(req.params.id);
        res.json(relawan);
    } catch (error) {
        res.status(404).json({
            massage : error.massage
        })
    }
}

export const saveRelawan = async (req, res) => {
    const relawan = new Relawan(req.body);
    try {
        const insertUser = await relawan.save();
        // Mengirimkan respons hanya sekali
        res.status(201).json(insertUser);
    } catch (error) {
        // Pastikan respons error tidak dikirimkan lebih dari sekali
        if (!res.headersSent) {
            res.status(400).json({
                message: error.message // Typo corrected
            });
        }
    }
}


export const UpdateRelawan = async(req,res)=>{    
    try {
        const relawanId = req.params.id;
        const { nama_relawan, email_relawan, no_relawan, gender_relawan } = req.body;
        const updateUser = await Relawan.update(
            { nama_relawan, email_relawan, no_relawan, gender_relawan }, // Nilai yang ingin diperbarui
            { where: { id: relawanId } } // Kriteria untuk menentukan entri yang akan diperbarui
        );
        res.status(200).json(updateUser);
    } catch (error) {
        res.status(400).json({
            message : error.message // Typo: gunakan 'message' bukan 'massage'
        });
    }
}


export const DeleteRelawan = async (req, res) => {
    try {
        const relawanId = req.params.id;
        const result = await Relawan.destroy({
            where: { id: relawanId }
        });
        res.status(200).json({ message: "Relawan deleted successfully" });
    } catch (error) {
        // Pastikan respons error hanya dikirim sekali
        if (!res.headersSent) {
            res.status(400).json({
                message: error.message // Typo corrected
            });
        }
    }
};
