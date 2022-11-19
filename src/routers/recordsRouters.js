import { Router } from "express";
import { records, StatusRecords } from "../controllers/recordsController.js";
import validateSchema from "../middlewares/validateSchemaMiddleware.js";
import validationToken from "../middlewares/validateTokenMiddleware.js";

const router = Router();

router.use(validationToken);

router.post("/records/:status", validateSchema, StatusRecords);

router.get("/records", records);

export default router;
