import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { getProfile, saveProfile } from "../controllers/profile.controller.js";

const router = Router();

router.get("/", requireAuth, getProfile);
router.put("/", requireAuth, saveProfile);

export default router;
