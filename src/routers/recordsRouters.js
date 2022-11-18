import { Router } from "express";
import { records, StatusRecords } from "../controllers/recordsController.js";
import validationToken from "../middlewares/validateTokenMiddleware.js";

const router = Router();

router.post("/records/:status", validationToken, StatusRecords);

router.get("/records", validationToken, records);

export default router;
