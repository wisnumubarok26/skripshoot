import express from 'express';
import { hitungTOPSIS,resetHasilTOPSIS } from '../controller/HitungController.js';

const router = express.Router();

// Route untuk melakukan perhitungan TOPSIS
router.post('/hitung-topsis', hitungTOPSIS);
router.delete('/reset-topsis', resetHasilTOPSIS);

export default router;
