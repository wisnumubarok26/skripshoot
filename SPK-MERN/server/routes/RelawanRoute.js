import express from "express";
import { getRelawan,getRelawanById,saveRelawan,UpdateRelawan,DeleteRelawan } from "../controller/RelawanController.js";

const router = express.Router();

router.get('/relawan',getRelawan);
router.get('/relawan/:id',getRelawanById);
router.post('/relawan', saveRelawan);
router.patch('/relawan/:id', UpdateRelawan);
router.delete('/relawan/:id', DeleteRelawan);

export default router;