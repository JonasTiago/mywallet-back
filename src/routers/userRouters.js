import { Router } from "express";
import { signUp, signIn } from "../controllers/userController.js";
import userSchemaValidate from "../middlewares/userSchemaValidateMiddleware.js";
import userValidate from "../middlewares/userValidateMiddleware.js";

const router = Router();
router.use(userValidate)

router.post("/sign-up",userSchemaValidate, signUp);

router.post("/sign-in", signIn);

export default router;
