import express from "express";
import { getKriteria,getKriteriaById,saveKriteria,updateKriteria,deleteKriteria } from "../controller/KriteriaController.js";

const router_kriteria = express.Router();

router_kriteria.get('/kriteria',getKriteria);
router_kriteria.get('/kriteria/:id',getKriteriaById);
router_kriteria.post('/kriteria', saveKriteria);
router_kriteria.patch('/kriteria/:id', updateKriteria);
router_kriteria.delete('/kriteria/:id', deleteKriteria);

export default router_kriteria;