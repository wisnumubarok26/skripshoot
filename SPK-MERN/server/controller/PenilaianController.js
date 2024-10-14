import Penilaian from '../models/PenilaianModel.js';
import Relawan from '../models/RelawanModel.js'; // Importing the Relawan model if needed
import Kriteria from '../models/KriteriaModel.js'; // Importing the Kriteria model if needed


// Controller: Get penilaian by id_relawan
export const getPenilaianByRelawanId = async (req, res) => {
    try {
      console.log("Fetching penilaian for relawan ID:", req.params.id_relawan);
      const penilaian = await Penilaian.findAll({
        where: { id_relawan: req.params.id_relawan },
        include: [
          {
            model: Relawan,
            attributes: ['nama_relawan']
          },
          {
            model: Kriteria,
            attributes: ['nama_kriteria']
          }
        ]
      });

      if (penilaian.length > 0) {
        res.status(200).json(penilaian);
      } else {
        res.status(404).json({ message: 'Penilaian untuk relawan ini tidak ditemukan' });
      }
    } catch (error) {
      console.error("Error fetching penilaian by relawan id:", error);
      res.status(500).json({ message: "Error fetching penilaian", error });
    }
};
  
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
    const { id_relawan } = req.params;
    const { id_kriteria, nilai } = req.body;

    try {
        const penilaian = await Penilaian.findOne({
            where: {
                id_relawan: id_relawan,
                id_kriteria: id_kriteria
            }
        });

        if (!penilaian) {
            return res.status(404).json({ message: "Penilaian not found" });
        }

        console.log("Request body:", req.body);
        console.log("Request params:", req.params);

        penilaian.nilai = nilai;

        const updatedPenilaian = await penilaian.save();
        console.log("Updated penilaian:", updatedPenilaian);

        return res.status(200).json({ message: "Penilaian updated successfully", penilaian: updatedPenilaian });
    } catch (error) {
        console.error("Error updating penilaian:", error);
        return res.status(500).json({ message: "Error updating penilaian", error: error.message });
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
