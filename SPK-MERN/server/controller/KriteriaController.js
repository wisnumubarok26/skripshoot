import Kriteria from "../models/KriteriaModel.js";

export const getKriteria = async (req, res) => {
    try {
        const kriteria = await Kriteria.findAll();
        res.json(kriteria);
    } catch (error) {
        res.status(500).json({
            message: error.message // Perbaikan typo
        });
    }
};

export const getKriteriaById = async (req, res) => {
    try {
        const kriteria = await Kriteria.findByPk(req.params.id);
        if (!kriteria) {
            return res.status(404).json({ message: "Kriteria not found" }); // Respons lebih jelas
        }
        res.json(kriteria);
    } catch (error) {
        res.status(500).json({
            message: error.message // Perbaikan typo
        });
    }
};

export const saveKriteria = async (req, res) => {
    const kriteria = new Kriteria(req.body);
    try {
        const insertKriteria = await kriteria.save();
        res.status(201).json(insertKriteria);
    } catch (error) {
        if (!res.headersSent) {
            res.status(400).json({
                message: error.message // Perbaikan typo
            });
        }
    }
};

export const updateKriteria = async (req, res) => {
    const kriteriaId = req.params.id;
    const { nama_kriteria, bobot, tipe } = req.body;

    try {
        const [updated] = await Kriteria.update(
            { nama_kriteria, bobot, tipe },
            { where: { id_kriteria: kriteriaId } } // Gunakan id_kriteria untuk mencocokkan
        );

        if (!updated) {
            return res.status(404).json({ message: "Kriteria not found" }); // Respons jika tidak ada yang diperbarui
        }

        const updatedKriteria = await Kriteria.findByPk(kriteriaId);
        res.status(200).json(updatedKriteria);
    } catch (error) {
        res.status(400).json({
            message: error.message // Perbaikan typo
        });
    }
};

export const deleteKriteria = async (req, res) => {
    const kriteriaId = req.params.id;
    try {
        const deleted = await Kriteria.destroy({
            where: { id_kriteria: kriteriaId } // Gunakan id_kriteria untuk mencocokkan
        });

        if (!deleted) {
            return res.status(404).json({ message: "Kriteria not found" }); // Respons jika tidak ada yang dihapus
        }

        res.status(200).json({ message: "Kriteria deleted successfully" });
    } catch (error) {
        if (!res.headersSent) {
            res.status(400).json({
                message: error.message // Perbaikan typo
            });
        }
    }
};
