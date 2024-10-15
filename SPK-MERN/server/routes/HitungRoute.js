import express from 'express';
import { hitungTOPSIS,resetHasilTOPSIS,getSkorTOPSIS } from '../controller/HitungController.js';

const router = express.Router();

// Route untuk melakukan perhitungan TOPSIS
router.post('/hitung-topsis', hitungTOPSIS);
router.delete('/reset-topsis', resetHasilTOPSIS);
router.get('/skor', getSkorTOPSIS);

export default router;
