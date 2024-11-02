import express from 'express';
import { loginAdmin } from '../controller/AdminController.js';

const router = express.Router();

// Rute untuk login admin
router.post('/admin/login', loginAdmin);

export default router;
