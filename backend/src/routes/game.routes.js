import express from "express";
import { generateLogicalQuestions } from "../controllers/game.controller.js";

const router = express.Router();

router.post("/logical", generateLogicalQuestions);

export default router;