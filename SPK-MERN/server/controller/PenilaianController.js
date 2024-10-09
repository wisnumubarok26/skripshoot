import Penilaian from '../models/PenilaianModel.js';
import Relawan from '../models/RelawanModel.js'; // Importing the Relawan model if needed
import Kriteria from '../models/KriteriaModel.js'; // Importing the Kriteria model if needed

// Get all evaluations
export const getPenilaian = async (req, res) => {
    try {
        const penilaian = await Penilaian.findAll({
            include: [
                { model: Relawan, attributes: ['nama_relawan'] }, // Include relawan details
                { model: Kriteria, attributes: ['nama_kriteria'] } // Include kriteria details
            ]
        });
        res.json(penilaian);
    } catch (error) {
        res.status(500).json({
            message: error.message // Correctly spelled 'message'
        });
    }
};

// Get evaluation by ID
export const getPenilaianById = async (req, res) => {
    try {
        const penilaian = await Penilaian.findByPk(req.params.id_penilaian, {
            include: [
                { model: Relawan, attributes: ['nama_relawan'] }, // Include relawan details
                { model: Kriteria, attributes: ['nama_kriteria'] } // Include kriteria details
            ]
        });
        if (!penilaian) {
            return res.status(404).json({ message: 'Penilaian not found' });
        }
        res.json(penilaian);
    } catch (error) {
        res.status(500).json({
            message: error.message // Correctly spelled 'message'
        });
    }
};

// Save a new evaluation
export const savePenilaian = async (req, res) => {
    const { id, id_kriteria, nilai } = req.body; // Use 'id' instead of 'id_relawan'
    const penilaian = new Penilaian({ id_relawan: id, id_kriteria, nilai }); // Map it accordingly
    try {
        const insertPenilaian = await penilaian.save();
        res.status(201).json(insertPenilaian);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// Update an evaluation
export const updatePenilaian = async (req, res) => {
    const penilaianId = req.params.id_penilaian;
    const { id, id_kriteria, nilai } = req.body; // Use 'id' instead of 'id_relawan'

    try {
        const updateResult = await Penilaian.update(
            { id_relawan: id, id_kriteria, nilai }, // Values to update
            { where: { id_penilaian: penilaianId } } // Criteria to find the entry to update
        );

        if (updateResult[0] === 0) {
            return res.status(404).json({ message: 'Penilaian not found' });
        }

        const updatedPenilaian = await Penilaian.findOne({ where: { id_penilaian: penilaianId } });
        res.status(200).json(updatedPenilaian);
    } catch (error) {
        res.status(400).json({
            message: error.message // Correctly spelled 'message'
        });
    }
};

// Delete an evaluation
export const deletePenilaian = async (req, res) => {
    const penilaianId = req.params.id_penilaian;

    try {
        const result = await Penilaian.destroy({
            where: { id_penilaian: penilaianId }
        });

        if (result === 0) {
            return res.status(404).json({ message: 'Penilaian not found' });
        }

        res.status(200).json({ message: 'Penilaian deleted successfully' });
    } catch (error) {
        if (!res.headersSent) {
            res.status(400).json({
                message: error.message // Correctly spelled 'message'
            });
        }
    }
};
