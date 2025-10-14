// backend/src/routes/terminal.routes.js
import express from "express";
import { runCommand } from "../controllers/terminal.controller.js";

const router = express.Router();

router.post("/terminal", runCommand);

export default router;
