import express from "express";
import {
    getPenilaian,
    getPenilaianById,
    savePenilaian,
    updatePenilaian,
    deletePenilaian
} from "../controller/PenilaianController.js"; // Adjust the import path as necessary

const router_penilaian = express.Router();

// Define routes for Penilaian
router_penilaian.get('/penilaian', getPenilaian); // Get all evaluations
router_penilaian.get('/penilaian/:id_penilaian', getPenilaianById); // Get evaluation by ID
router_penilaian.post('/penilaian', savePenilaian); // Save a new evaluation
router_penilaian.patch('/penilaian/:id_penilaian', updatePenilaian); // Update an evaluation
router_penilaian.delete('/penilaian/:id_penilaian', deletePenilaian); // Delete an evaluation

export default router_penilaian;
