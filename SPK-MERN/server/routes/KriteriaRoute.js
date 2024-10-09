import express from "express";
import { getKriteria,getKriteriaById,saveKriteria,updateKriteria,deleteKriteria } from "../controller/KriteriaController.js";

const router_kriteria = express.Router();

router_kriteria.get('/kriteria',getKriteria);
router_kriteria.get('/kriteria/:id_kriteria',getKriteriaById);
router_kriteria.post('/kriteria', saveKriteria);
router_kriteria.patch('/kriteria/:id_kriteria', updateKriteria);
router_kriteria.delete('/kriteria/:id_kriteria', deleteKriteria);

export default router_kriteria;